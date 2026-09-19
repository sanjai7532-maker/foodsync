import React, { useState } from 'react';
import { 
  Utensils, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Scale, 
  Sparkles, 
  Package, 
  Plus, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { INVENTORY_ITEMS } from '../data/initialData';

export default function ProductionPlanner({ selectedFacility, setActiveTab }) {
  const [inventory, setInventory] = useState(INVENTORY_ITEMS);
  const [targetRecipeServings, setTargetRecipeServings] = useState(450);
  const [selectedRecipe, setSelectedRecipe] = useState('paneer_makhani');
  const [recipeDispatched, setRecipeDispatched] = useState(false);

  // Recipe scaling database
  const RECIPES = {
    paneer_makhani: {
      name: "Paneer Makhani & Jeera Rice Combo",
      baseServings: 100,
      ingredients: [
        { name: "Fresh Paneer", baseQty: 12, unit: "kg", matchedInvId: "inv-02" },
        { name: "Desi Tomatoes (Gravy)", baseQty: 18, unit: "kg", matchedInvId: "inv-03" },
        { name: "Cooking Butter", baseQty: 4, unit: "kg", matchedInvId: "inv-04" },
        { name: "Basmati Rice", baseQty: 25, unit: "kg", matchedInvId: "inv-01" },
        { name: "Aromatic Spices & Cashew Paste", baseQty: 3.5, unit: "kg", matchedInvId: null }
      ]
    },
    spinach_subzi: {
      name: "Palak Paneer & Fresh Rotis",
      baseServings: 100,
      ingredients: [
        { name: "English Spinach Greens", baseQty: 22, unit: "kg", matchedInvId: "inv-05" },
        { name: "Fresh Paneer", baseQty: 10, unit: "kg", matchedInvId: "inv-02" },
        { name: "Desi Tomatoes", baseQty: 8, unit: "kg", matchedInvId: "inv-03" },
        { name: "Whole Wheat Atta Flour", baseQty: 20, unit: "kg", matchedInvId: null }
      ]
    }
  };

  const currentRecipe = RECIPES[selectedRecipe];
  const scaleRatio = targetRecipeServings / currentRecipe.baseServings;

  const handleDispatchToKitchen = () => {
    setRecipeDispatched(true);
    setTimeout(() => setRecipeDispatched(false), 3500);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Smart Production & FEFO Inventory Planning</h2>
          <p className="section-subtitle">
            First-Expired, First-Out (FEFO) warehouse rotation coupled with AI-scaled recipe batching to halt pre-consumer waste.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn-primary"
            onClick={handleDispatchToKitchen}
          >
            <CheckCircle2 size={18} />
            <span>{recipeDispatched ? "✓ Scaled Batch Sent to Chef KDS!" : "Send Scaled Batch to Prep Station"}</span>
          </button>
        </div>
      </div>

      <div className="grid-2col" style={{ gridTemplateColumns: '1.2fr 1fr', marginBottom: '2rem' }}>
        {/* Left Column: FEFO Inventory Matrix */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={20} color="#34d399" />
                FEFO Stock Rotation & Expiry Watch
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Automated stock prioritization: Near-expiry lots flagged for immediate recipe incorporation
              </p>
            </div>
            <span className="badge badge-warning">
              {inventory.filter(i => i.daysToExpiry <= 3).length} Priority Items
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {inventory.map((item) => {
              const isUrgent = item.daysToExpiry <= 2;
              const isWarning = item.daysToExpiry <= 5 && !isUrgent;

              return (
                <div 
                  key={item.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: isUrgent ? 'rgba(239, 68, 68, 0.08)' : isWarning ? 'rgba(245, 158, 11, 0.08)' : 'rgba(30, 41, 59, 0.5)',
                    border: `1px solid ${isUrgent ? 'rgba(239, 68, 68, 0.3)' : isWarning ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>{item.name}</span>
                      <span className={`badge ${isUrgent ? 'badge-critical' : isWarning ? 'badge-warning' : 'badge-prime'}`}>
                        {item.fefoPriority} FEFO
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '0.75rem' }}>
                      <span>Location: <strong>{item.storageLocation}</strong></span>
                      <span>•</span>
                      <span>Lot Expiry: <strong>{item.expiryDate}</strong></span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isUrgent ? '#f87171' : '#34d399' }}>
                      {item.quantity} {item.unit}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isUrgent ? '#f87171' : '#94a3b8', fontWeight: isUrgent ? 700 : 400 }}>
                      {item.daysToExpiry} days remaining
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.8rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span><strong>Smart Recommendation:</strong> 85kg Fresh Paneer expires tomorrow. AI has dynamically prioritized Recipe: <em>Paneer Makhani</em> for today's lunch menu.</span>
          </div>
        </div>

        {/* Right Column: Dynamic Recipe Scaler */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scale size={20} color="#06b6d4" />
              Dynamic Precision Recipe Scaler
            </h3>
            <span className="badge badge-optimal">Scale: x{scaleRatio.toFixed(2)}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Select Scheduled Menu Offering</label>
            <select 
              className="form-control"
              value={selectedRecipe}
              onChange={(e) => setSelectedRecipe(e.target.value)}
            >
              <option value="paneer_makhani">Paneer Makhani & Jeera Rice Combo (Priority FEFO)</option>
              <option value="spinach_subzi">Palak Paneer & Fresh Rotis (Greens Depletion)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Target Diners / Servings to Cook</label>
              <strong style={{ color: '#06b6d4', fontSize: '1.15rem' }}>{targetRecipeServings} Servings</strong>
            </div>
            <input 
              type="range"
              className="slider-range"
              min="100"
              max="1500"
              step="25"
              value={targetRecipeServings}
              onChange={(e) => setTargetRecipeServings(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem' }}>
              <span>100 portions</span>
              <span>750 portions</span>
              <span>1,500 portions</span>
            </div>
          </div>

          {/* Dynamically Scaled Ingredients */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.6rem' }}>
              Calibrated Raw Ingredient Draw:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {currentRecipe.ingredients.map((ing, idx) => {
                const scaledQty = (ing.baseQty * scaleRatio).toFixed(1);
                return (
                  <div 
                    key={idx}
                    style={{
                      padding: '0.65rem 0.85rem',
                      background: 'rgba(15, 23, 42, 0.7)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {ing.matchedInvId && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>}
                      {ing.name}
                    </span>
                    <strong style={{ color: '#38bdf8' }}>
                      {scaledQty} {ing.unit}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding: '0.85rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.8rem', color: '#a7f3d0' }}>
            ✓ Exact scaling avoids standard kitchen batch rounding (+12kg excess prevented).
          </div>
        </div>
      </div>
    </div>
  );
}
