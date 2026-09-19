import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  CloudRain, 
  Sun, 
  Sparkles, 
  TrendingDown, 
  ChefHat, 
  CheckCircle, 
  AlertCircle,
  FileSpreadsheet,
  Zap,
  Info
} from 'lucide-react';
import { calculateDemandForecast } from '../utils/aiSimulation';

export default function DemandForecast({ selectedFacility }) {
  const [headcount, setHeadcount] = useState(2400);
  const [dayOfWeek, setDayOfWeek] = useState('Friday');
  const [weather, setWeather] = useState('Rainy');
  const [eventFactor, setEventFactor] = useState('Hybrid / Remote Shift');
  const [mealType, setMealType] = useState('Lunch');
  const [prepSheetExported, setPrepSheetExported] = useState(false);

  const forecast = useMemo(() => {
    return calculateDemandForecast({
      registeredHeadcount: headcount,
      historicalTurnoutRate: 0.88,
      dayOfWeek,
      weather,
      eventFactor,
      mealType
    });
  }, [headcount, dayOfWeek, weather, eventFactor, mealType]);

  const handleExportPrepSheet = () => {
    setPrepSheetExported(true);
    setTimeout(() => setPrepSheetExported(false), 3500);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">AI Food Demand & Surplus Prediction Engine</h2>
          <p className="section-subtitle">
            Dynamic neural forecasting synthesizing headcount, calendar patterns, weather, and historical food consumption.
          </p>
        </div>
        <button 
          id="btn-export-prep" 
          className="btn-primary" 
          onClick={handleExportPrepSheet}
        >
          <FileSpreadsheet size={18} />
          <span>{prepSheetExported ? '✓ Dispatched to Kitchen Display!' : 'Export AI Smart Prep Sheet'}</span>
        </button>
      </div>

      {/* Simulator Control Matrix */}
      <div className="grid-3col" style={{ marginBottom: '2rem' }}>
        {/* Param 1: Attendance & Headcount */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
              <Users size={16} color="#34d399" /> Registered Base Headcount
            </label>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{headcount.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            className="slider-range" 
            min="500" 
            max="6000" 
            step="50"
            value={headcount} 
            onChange={(e) => setHeadcount(Number(e.target.value))} 
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '0.4rem' }}>
            <span>500 pax</span>
            <span>3,000 pax</span>
            <span>6,000 pax</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.75rem' }}>
            Active campus / enterprise ID badge registry for <strong>{selectedFacility.name}</strong>.
          </p>
        </div>

        {/* Param 2: Calendar & Weather Factors */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: '0.85rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} color="#06b6d4" /> Day of Week & Meal Service
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select 
                className="form-control" 
                value={dayOfWeek} 
                onChange={(e) => setDayOfWeek(e.target.value)}
              >
                <option value="Monday">Monday (96% Turnout)</option>
                <option value="Tuesday">Tuesday (102% High Peak)</option>
                <option value="Wednesday">Wednesday (105% Mid-week Peak)</option>
                <option value="Thursday">Thursday (103% Steady)</option>
                <option value="Friday">Friday (82% Hybrid Drop)</option>
                <option value="Saturday">Saturday (45% Weekend Crew)</option>
                <option value="Sunday">Sunday (35% Minimal)</option>
              </select>

              <select 
                className="form-control" 
                value={mealType} 
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch Service</option>
                <option value="Dinner">Dinner</option>
                <option value="Midnight Snack">Night Shift</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CloudRain size={16} color="#38bdf8" /> Weather Sensor Feed
            </label>
            <select 
              className="form-control" 
              value={weather} 
              onChange={(e) => setWeather(e.target.value)}
            >
              <option value="Rainy">🌧️ Heavy Rain / Monsoon (+12% Cafeteria Stay)</option>
              <option value="Sunny">☀️ Sunny & Pleasant (-5% External Outings)</option>
              <option value="Cold">❄️ Chilly / Winter (+4% Warm Food Surge)</option>
              <option value="Hot">🔥 Extreme Heat / Summer (-8% Light Intake)</option>
            </select>
          </div>
        </div>

        {/* Param 3: Dynamic Event Context */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: '0.85rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="#fbbf24" /> Institutional Event Context
            </label>
            <select 
              className="form-control" 
              value={eventFactor} 
              onChange={(e) => setEventFactor(e.target.value)}
            >
              <option value="Regular Day">Standard Regular Operational Day</option>
              <option value="Hybrid / Remote Shift">Hybrid WFH / Remote Policy Day (-24%)</option>
              <option value="Executive Summit / VIPs">Corporate Summit / VIP Delegation (+22%)</option>
              <option value="Sports / Fest Day">Annual Sports / Cultural Fest (+35%)</option>
              <option value="Pre-Holiday Slump">Pre-Festival Long Weekend Eve (-30%)</option>
            </select>
          </div>

          {/* Surplus Risk Meter */}
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <span style={{ color: '#94a3b8' }}>Surplus Generation Risk:</span>
              <strong style={{ 
                color: forecast.surplusRiskScore > 60 ? '#f87171' : forecast.surplusRiskScore > 30 ? '#fbbf24' : '#34d399' 
              }}>
                {forecast.surplusRiskTier} ({forecast.surplusRiskScore}%)
              </strong>
            </div>
            <div style={{ height: '6px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${forecast.surplusRiskScore}%`, 
                  height: '100%', 
                  background: forecast.surplusRiskScore > 60 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #10b981, #f59e0b)',
                  transition: 'width 0.4s ease'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Forecast Output Comparison Cards */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Model Output Breakdown */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} color="#10b981" />
              AI Precision Cooking vs. Legacy Overprep
            </h3>
            <span className="badge badge-optimal">Model Accuracy: 98.4%</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1.25rem', background: '#fef2f2', borderRadius: '12px', border: '1.5px solid #fca5a5' }}>
              <div style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Traditional Habitual Cooking (+18% Excess)
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
                {forecast.traditionalCookServings.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#475569' }}>servings</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.2rem' }}>
                Approx {Math.round(forecast.traditionalCookServings * 0.42).toLocaleString()} kg food batch
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: '#ecfdf5', borderRadius: '12px', border: '1.5px solid #86efac' }}>
              <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                FoodSync AI Precision Batch (+4% Dynamic)
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#047857' }}>
                {forecast.aiRecommendedServings.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#065f46' }}>servings</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.2rem' }}>
                Expected Turnout: <strong style={{ color: '#0f172a' }}>{forecast.expectedTurnout.toLocaleString()} diners</strong>
              </div>
            </div>
          </div>

          {/* Environmental & Cost Avoidance from this meal alone */}
          <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '14px', border: '1.5px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingDown size={18} color="#059669" />
              Pre-Consumer Waste Prevented At Source (This Service):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.75rem 0.5rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857' }}>{forecast.servingsSavedFromOvercooking}</div>
                <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>Servings Saved</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.75rem 0.5rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>{forecast.savedFoodWeightKg} kg</div>
                <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>Raw Food Spared</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.75rem 0.5rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d97706' }}>₹{forecast.costSavedInr.toLocaleString()}</div>
                <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>Direct Cost Saved</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.75rem 0.5rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7c3aed' }}>{forecast.co2SavedKg} kg</div>
                <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>CO₂e Mitigated</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Kitchen Prep Plan */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
              <ChefHat size={20} color="#0284c7" />
              Dynamic Kitchen Staging Prep Sheet
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>Shift: {mealType}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {forecast.dishes.map((dish, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '0.9rem 1.1rem', 
                  background: '#ffffff', 
                  borderRadius: '10px', 
                  borderLeft: '4px solid #10b981',
                  borderTop: '1.5px solid #e2e8f0',
                  borderRight: '1.5px solid #e2e8f0',
                  borderBottom: '1.5px solid #e2e8f0',
                  boxShadow: '0 1px 4px rgba(15, 23, 42, 0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{dish.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#dc2626', textDecoration: 'line-through', fontSize: '0.82rem', fontWeight: 600 }}>{dish.traditionalKg} kg</span>
                    <span style={{ color: '#047857', fontWeight: 800, fontSize: '0.95rem' }}>{dish.recommendedKg} kg</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Info size={14} color="#0284c7" />
                  <span>{dish.prepStage}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #bae6fd', fontSize: '0.82rem', color: '#0369a1' }}>
            💡 <strong style={{ color: '#0c4a6e' }}>Staged Cooking Strategy:</strong> Rather than preparing 100% of volume at opening hour, FoodSync AI splits prep into an initial 70% baseline and dynamic 30% on-demand batches tracked by line queue speed.
          </div>
        </div>
      </div>
    </div>
  );
}

