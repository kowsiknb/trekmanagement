import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { TREKS_DATA } from './src/data/treks.ts';
import { calculateTrekRisk } from './src/services/riskAnalysis.ts';
import { generateSmartChecklist } from './src/services/checklistService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'TrekSafe', version: '2.4.0', timestamp: new Date().toISOString() });
  });

  // API Route: List & search treks
  app.get('/api/treks', (req, res) => {
    const { location, difficulty, state } = req.query;
    let results = [...TREKS_DATA];

    if (location && typeof location === 'string') {
      const q = location.toLowerCase().trim();
      results = results.filter(
        (t) =>
          t.city.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q)
      );
    }

    if (difficulty && typeof difficulty === 'string') {
      results = results.filter((t) => t.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (state && typeof state === 'string') {
      results = results.filter((t) => t.state.toLowerCase().includes(state.toLowerCase()));
    }

    res.json(results);
  });

  // API Route: Get specific trek by ID
  app.get('/api/treks/:id', (req, res) => {
    const trek = TREKS_DATA.find((t) => t.id === req.params.id);
    if (!trek) {
      return res.status(404).json({ error: 'Trek not found' });
    }
    res.json(trek);
  });

  // API Route: Get trek route coordinates and waypoints
  app.get('/api/treks/:id/route', (req, res) => {
    const trek = TREKS_DATA.find((t) => t.id === req.params.id);
    if (!trek) {
      return res.status(404).json({ error: 'Trek not found' });
    }
    res.json({
      id: trek.id,
      name: trek.name,
      distanceKm: trek.distanceKm,
      startPoint: trek.startPoint,
      summitPoint: trek.summitPoint,
      routeCoordinates: trek.routeCoordinates,
      waypoints: trek.waypoints,
      elevationProfile: trek.elevationProfile
    });
  });

  // API Route: Get smart checklist for trek
  app.get('/api/treks/:id/checklist', (req, res) => {
    const trek = TREKS_DATA.find((t) => t.id === req.params.id);
    if (!trek) {
      return res.status(404).json({ error: 'Trek not found' });
    }
    const items = generateSmartChecklist(trek);
    res.json({ trekId: trek.id, trekName: trek.name, items });
  });

  // API Route: Calculate risk analysis
  app.post('/api/risk-analysis', (req, res) => {
    const { trekId, weather } = req.body;
    const trek = TREKS_DATA.find((t) => t.id === trekId);
    if (!trek) {
      return res.status(404).json({ error: 'Trek not found' });
    }
    if (!weather) {
      return res.status(400).json({ error: 'Weather payload is required' });
    }

    const analysis = calculateTrekRisk(trek, weather);
    res.json(analysis);
  });

  // Mount Vite middlewares in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`TrekSafe full-stack server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
