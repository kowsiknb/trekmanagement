import React, { useState } from 'react';
import { ChecklistItem, Trek, WeatherData } from '../types/trek';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  BookmarkCheck,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

interface ChecklistSectionProps {
  trek: Trek;
  weather?: WeatherData;
  initialItems: ChecklistItem[];
  onSaveToPlan?: (items: ChecklistItem[]) => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  trek,
  weather,
  initialItems,
  onSaveToPlan
}) => {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('Gear');
  const [savedNotification, setSavedNotification] = useState(false);

  const togglePacked = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      mandatory: false,
      packed: false,
      reason: 'User custom item'
    };

    setItems((prev) => [newItem, ...prev]);
    setNewItemName('');
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    setItems(initialItems.map((item) => ({ ...item, packed: false })));
  };

  const handleSave = () => {
    if (onSaveToPlan) {
      onSaveToPlan(items);
    }
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const packedCount = items.filter((i) => i.packed).length;
  const totalCount = items.length;
  const percentage = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const categories: ChecklistItem['category'][] = [
    'Clothing',
    'Gear',
    'Hydration & Food',
    'Medical & Safety',
    'Documents & Tech'
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
      {/* Header & Readiness Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              Personalized Trek Gear Checklist
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Auto-customized for {trek.name} ({trek.difficulty} · {trek.durationDays} Day)
          </p>
        </div>

        {/* Packing Counter & Save Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            Save Checklist
          </button>
        </div>
      </div>

      {/* Progress Bar Display */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-stone-700">
            Trek Readiness: <strong className="text-stone-900 font-mono">{percentage}% Ready</strong>
          </span>
          <span className="font-mono text-stone-600">
            {packedCount} / {totalCount} items packed
          </span>
        </div>
        <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              percentage === 100
                ? 'bg-emerald-600'
                : percentage >= 60
                ? 'bg-emerald-700'
                : 'bg-amber-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {savedNotification && (
          <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Checklist progress successfully saved to your profile!
          </div>
        )}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          placeholder="Add custom item (e.g. Action camera, trekking pole spare tips...)"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
        />
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as any)}
          className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-xs font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Item
        </button>
      </form>

      {/* Categorized Items List */}
      <div className="space-y-6 pt-2">
        {categories.map((category) => {
          const categoryItems = items.filter((i) => i.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold flex items-center justify-between pb-1 border-b border-stone-100">
                <span>{category}</span>
                <span className="text-[11px] font-normal text-stone-600">
                  {categoryItems.filter((i) => i.packed).length}/{categoryItems.length}
                </span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePacked(item.id)}
                    className={`flex items-start justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      item.packed
                        ? 'bg-emerald-50/50 border-emerald-200 text-stone-700'
                        : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-900'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        className="mt-0.5 text-emerald-800 focus:outline-none"
                        aria-label={item.packed ? 'Uncheck item' : 'Check item'}
                      >
                        {item.packed ? (
                          <CheckSquare className="w-4 h-4 text-emerald-700 fill-emerald-100" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${item.packed ? 'line-through text-stone-600' : 'text-stone-900'}`}>
                            {item.name}
                          </span>
                          {item.mandatory && !item.packed && (
                            <span className="text-[10px] text-red-600 font-medium">
                              *Required
                            </span>
                          )}
                        </div>

                        {item.reason && (
                          <span className="text-[11px] text-stone-600 block mt-0.5">
                            {item.reason}
                          </span>
                        )}

                        {item.isDynamicallyAdded && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 border border-emerald-200">
                            <Sparkles className="w-2.5 h-2.5" /> Condition-based addition
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                      }}
                      className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
