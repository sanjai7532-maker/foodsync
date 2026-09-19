import React from 'react';
import { 
  TrendingUp, 
  Leaf, 
  Droplets, 
  Users, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  Share2, 
  Scan, 
  BarChart3,
  Flame
} from 'lucide-react';

export default function CommandCenter({ 
  metrics, 
  alerts, 
  onResolveAlert, 
  setActiveTab, 
  surplusBatches, 
  selectedFacility 
}) {
  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Institutional Food Waste Command Center</h2>
          <p className="section-subtitle">
            Real-time telemetry, predictive analytics & redistribution overview for <strong>{selectedFacility.name}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            id="btn-quick-forecast" 
            className="btn-primary" 
            onClick={() => setActiveTab('demand-forecast')}
          >
            <BarChart3 size={18} />
            <span>AI Demand Simulator</span>
          </button>
          <button 
            id="btn-quick-scan" 
            className="btn-secondary" 
            onClick={() => setActiveTab('quality-cv')}
          >
            <Scan size={18} />
            <span>CV Food Quality Scan</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="kpi-grid">
        <div className="glass-panel kpi-card">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap">
              <Leaf size={22} />
            </div>
            <span className="kpi-trend">+14.2% this mo</span>
          </div>
          <div>
            <div className="kpi-value">{metrics.totalFoodSavedKg.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>kg</span></div>
            <div className="kpi-label">Edible Food Waste Prevented</div>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <Users size={22} />
            </div>
            <span className="kpi-trend" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>Verified Impact</span>
          </div>
          <div>
            <div className="kpi-value">{metrics.mealsRedistributed.toLocaleString()}</div>
            <div className="kpi-label">Meals Provided to Vulnerable Communities</div>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Flame size={22} />
            </div>
            <span className="kpi-trend">Scope 3 ESG</span>
          </div>
          <div>
            <div className="kpi-value">{metrics.co2eAvoidedKg.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>kg</span></div>
            <div className="kpi-label">GHG Emissions Avoided (CO₂e)</div>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Droplets size={22} />
            </div>
            <span className="kpi-trend">FAO Benchmark</span>
          </div>
          <div>
            <div className="kpi-value">{(metrics.waterSavedLitres / 1000000).toFixed(1)} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>M Litres</span></div>
            <div className="kpi-label">Virtual Fresh Water Conserved</div>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <IndianRupee size={22} />
            </div>
            <span className="kpi-trend">+19.8% ROI</span>
          </div>
          <div>
            <div className="kpi-value">₹{(metrics.operationalCostSavedInr / 100000).toFixed(1)} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>Lakh</span></div>
            <div className="kpi-label">Kitchen & Procurement Cost Saved</div>
          </div>
        </div>
      </div>

      {/* Active Operational Alerts Banner */}
      {alerts && alerts.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} color="#f59e0b" />
              Active Critical Alerts ({alerts.length})
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Real-time sensor & kitchen variance trigger</span>
          </div>
          <div className="alerts-container">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-strip ${alert.severity}`}>
                <div className="alert-content">
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: alert.severity === 'critical' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: alert.severity === 'critical' ? '#ef4444' : '#f59e0b',
                    flexShrink: 0
                  }}>
                    <AlertTriangle size={20} />
                  </div>
                  <div className="alert-text-body">
                    <h4>{alert.title} — <span style={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.8rem' }}>{alert.facility}</span></h4>
                    <p>{alert.detail}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={14} /> {alert.timestamp}
                      </span>
                      <span>•</span>
                      <strong style={{ color: '#38bdf8' }}>Action: {alert.actionRequired}</strong>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button 
                    className="alert-action-btn"
                    onClick={() => {
                      if (alert.title.includes('Surplus')) {
                        setActiveTab('redistribution');
                      } else if (alert.title.includes('Temperature')) {
                        setActiveTab('quality-cv');
                      } else {
                        setActiveTab('processing-audit');
                      }
                    }}
                  >
                    Investigate
                  </button>
                  <button 
                    className="alert-action-btn"
                    style={{ background: 'rgba(16, 185, 129, 0.2)', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}
                    onClick={() => onResolveAlert(alert.id)}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Command Center Split Grid */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Real-time Supply-Chain Circular Stream */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} color="#10b981" />
              Circular Food Flow & Waste Prevention Funnel
            </h3>
            <span className="badge badge-optimal">97.4% Efficiency</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>Raw Procurement & Prep Intake</span>
                <span style={{ color: '#475569', fontWeight: 600 }}>100% (24,500 kg / mo)</span>
              </div>
              <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>AI Optimized Cooked Meals (Zero Overproduction)</span>
                <span style={{ color: '#047857', fontWeight: 700 }}>92.8% Utilized (22,736 kg)</span>
              </div>
              <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '92.8%', height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>Surplus Harvested & Given to NGOs</span>
                <span style={{ color: '#0284c7', fontWeight: 700 }}>5.6% Redistributed (1,372 kg)</span>
              </div>
              <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '5.6%', height: '100%', background: 'linear-gradient(90deg, #06b6d4, #0284c7)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>Inedible Organic Trims to Bio-Energy / Compost</span>
                <span style={{ color: '#b45309', fontWeight: 700 }}>1.6% (392 kg)</span>
              </div>
              <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '1.6%', height: '100%', background: '#f59e0b' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>Landfill Inefficiency Rate</span>
                <span style={{ color: '#047857', fontWeight: 800 }}>&lt; 0.1% (Near-Zero Target Met)</span>
              </div>
              <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '0.1%', height: '100%', background: '#ef4444' }}></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <ShieldCheck size={28} color="#059669" />
            <div style={{ fontSize: '0.84rem' }}>
              <div style={{ fontWeight: 800, color: '#065f46' }}>Zero-Waste-to-Landfill Certification Track</div>
              <div style={{ color: '#047857' }}>Audited in compliance with UN Sustainable Development Goal 12.3 (50% per capita food waste reduction).</div>
            </div>
          </div>
        </div>

        {/* Live Pending Redistribution Batches */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
              <Share2 size={20} color="#0284c7" />
              Live Surplus Batches Awaiting Network Claim
            </h3>
            <button 
              className="btn-secondary" 
              style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
              onClick={() => setActiveTab('redistribution')}
            >
              View All ({surplusBatches.length})
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {surplusBatches.map((batch) => {
              const hoursLeft = (batch.timeLeftMinutes / 60).toFixed(1);
              const isUrgent = batch.timeLeftMinutes < 240;
              return (
                <div 
                  key={batch.id} 
                  style={{ 
                    padding: '1rem', 
                    background: '#f8fafc', 
                    borderRadius: '12px', 
                    border: '1.5px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{batch.title}</span>
                      <span className={`badge ${isUrgent ? 'badge-critical' : 'badge-prime'}`}>
                        {batch.category}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', gap: '0.8rem' }}>
                      <span><strong>{batch.servings}</strong> Servings ({batch.weightKg} kg)</span>
                      <span>•</span>
                      <span style={{ color: isUrgent ? '#dc2626' : '#047857', fontWeight: 700 }}>
                        ⏳ Safe for {hoursLeft} hrs ({batch.safeUntil})
                      </span>
                    </div>
                  </div>

                  <div>
                    {batch.currentStatus === 'ready_to_match' ? (
                      <button 
                        className="btn-primary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                        onClick={() => setActiveTab('redistribution')}
                      >
                        Auto-Match NGO
                      </button>
                    ) : batch.currentStatus === 'claimed' ? (
                      <span className="badge badge-warning">Claimed & Assigned</span>
                    ) : (
                      <span className="badge badge-optimal">In Transit</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>


          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              All food handoffs generate tamper-proof digital consignment certificates with temperature tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
