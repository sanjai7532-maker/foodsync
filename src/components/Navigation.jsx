import React from 'react';
import { 
  Activity, 
  BarChart3, 
  Scan, 
  Share2, 
  Truck, 
  Cpu, 
  FileText, 
  Utensils, 
  Bell, 
  Building2,
  Sparkles
} from 'lucide-react';

export default function Navigation({ 
  activeTab, 
  setActiveTab, 
  selectedFacility, 
  setSelectedFacility, 
  facilities, 
  alertsCount
}) {
  const navItems = [
    { id: 'command-center', label: 'Command Center', icon: Activity },
    { id: 'demand-forecast', label: 'AI Demand Forecast', icon: BarChart3 },
    { id: 'quality-cv', label: 'IoT & Computer Vision', icon: Scan },
    { id: 'redistribution', label: 'Surplus Redistribution', icon: Share2 },
    { id: 'logistics-map', label: 'Smart Logistics Map', icon: Truck },
    { id: 'processing-audit', label: 'Unit Efficiency & Losses', icon: Cpu },
    { id: 'production-planner', label: 'FEFO & Recipe Planner', icon: Utensils },
    { id: 'esg-analytics', label: 'ESG & Sustainability', icon: FileText },
  ];

  return (
    <>
      <header className="main-header">
        <div className="header-inner">
          <div className="brand-area">
            <div className="brand-logo-icon">
              <Sparkles size={24} />
            </div>
            <div className="brand-titles">
              <h1>FoodSync AI <span style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.15)', color: '#047857', padding: '2px 8px', borderRadius: '12px', verticalAlign: 'middle', border: '1px solid rgba(16, 185, 129, 0.3)' }}>ENTERPRISE</span></h1>
              <p className="brand-tagline">Intelligent Food Waste Mitigation & Dynamic Redistribution Network</p>
            </div>
          </div>

          <div className="header-status-pill">
            <span className="pulse-dot"></span>
            <span>AI Supply-Chain Guard: ONLINE (Sync 99.8%)</span>
          </div>

          <div className="header-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.82rem' }}>
              <Building2 size={16} />
              <select 
                id="facility-selector"
                className="facility-select" 
                value={selectedFacility.id} 
                onChange={(e) => {
                  const fac = facilities.find(f => f.id === e.target.value);
                  if (fac) setSelectedFacility(fac);
                }}
              >
                {facilities.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.type})</option>
                ))}
              </select>
            </div>

            <button 
              className="btn-secondary" 
              style={{ padding: '0.45rem 0.75rem', position: 'relative' }}
              title={`${alertsCount} Active Operational Alerts`}
              onClick={() => setActiveTab('command-center')}
            >
              <Bell size={18} color="#0f172a" />
              {alertsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '2px 6px',
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>
                  {alertsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>


      <nav className="nav-tabs-bar" aria-label="Main Navigation">
        <div className="nav-tabs-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === 'command-center' && alertsCount > 0 && (
                  <span className="tab-badge">{alertsCount}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
