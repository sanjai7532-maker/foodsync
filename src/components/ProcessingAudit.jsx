import React, { useState } from 'react';
import { 
  Cpu, 
  AlertOctagon, 
  CheckCircle2, 
  Wrench, 
  Activity, 
  Gauge, 
  Zap, 
  TrendingDown, 
  HelpCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { INDUSTRIAL_EFFICIENCY_METRICS } from '../data/initialData';

export default function ProcessingAudit({ selectedFacility }) {
  const [metrics, setMetrics] = useState(INDUSTRIAL_EFFICIENCY_METRICS);
  const [anomalies, setAnomalies] = useState(INDUSTRIAL_EFFICIENCY_METRICS.anomalies);
  const [actionSuccessMsg, setActionSuccessMsg] = useState(null);

  const handleExecuteMaintenance = (id, actionText) => {
    setAnomalies(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: 'resolved' };
      }
      return a;
    }));
    setActionSuccessMsg(`Maintenance order dispatched: ${actionText}`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Processing Efficiency & Operational Waste Audit</h2>
          <p className="section-subtitle">
            Detecting inefficiencies across food prep lines, peeling yields, refrigeration power anomalies, and machine cycles.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="badge badge-optimal" style={{ padding: '0.5rem 1rem' }}>
            <Activity size={16} /> ISO 22000 & HACCP Monitored
          </span>
        </div>
      </div>

      {actionSuccessMsg && (
        <div style={{ 
          padding: '0.9rem 1.25rem', 
          background: 'rgba(16, 185, 129, 0.2)', 
          border: '1px solid #10b981', 
          borderRadius: '12px', 
          marginBottom: '1.5rem',
          color: '#34d399',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={20} />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Operational KPI Cards */}
      <div className="kpi-grid">
        <div className="glass-panel kpi-card">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
              <Gauge size={22} />
            </div>
            <span className="kpi-trend">Target: 88.0%</span>
          </div>
          <div>
            <div className="kpi-value">{metrics.oee}%</div>
            <div className="kpi-label">Overall Equipment Effectiveness (OEE)</div>
          </div>
        </div>

        <div className="glass-panel kpi-card warning">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <TrendingDown size={22} />
            </div>
            <span className="kpi-trend" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>Limit: &lt;2.0%</span>
          </div>
          <div>
            <div className="kpi-value">{metrics.overproductionRate}%</div>
            <div className="kpi-label">Batch Overproduction Variance</div>
          </div>
        </div>

        <div className="glass-panel kpi-card warning">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
              <AlertOctagon size={22} />
            </div>
            <span className="kpi-trend" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>Target: &lt;6.0%</span>
          </div>
          <div>
            <div className="kpi-value">{metrics.trimmingLoss}%</div>
            <div className="kpi-label">Raw Material Prep & Trimming Loss</div>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-row">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Zap size={22} />
            </div>
            <span className="kpi-trend">Target: 165</span>
          </div>
          <div>
            <div className="kpi-value">{metrics.energyConsumptionKwhPerTon} <span style={{ fontSize: '1rem', color: '#94a3b8' }}>kWh/t</span></div>
            <div className="kpi-label">Refrigeration & Cooking Energy Draw</div>
          </div>
        </div>
      </div>

      {/* Detected Inefficiencies & Root Cause Engine */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wrench size={22} color="#f59e0b" />
              Active Industrial Inefficiencies & Corrective Directives
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Root cause diagnostics powered by sensor vibrations, temperature loops, and batch scale telemetry
            </p>
          </div>
          <span className="badge badge-warning">
            {anomalies.filter(a => a.status !== 'resolved').length} Pending Actions
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {anomalies.map((anom) => {
            const isResolved = anom.status === 'resolved';
            return (
              <div 
                key={anom.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: isResolved ? '#f0fdf4' : '#ffffff',
                  border: `1.5px solid ${isResolved ? '#86efac' : '#e2e8f0'}`,
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ maxWidth: '720px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                      {anom.machine}
                    </span>
                    <span className={`badge ${
                      isResolved ? 'badge-optimal' : anom.status === 'action_needed' ? 'badge-critical' : 'badge-warning'
                    }`}>
                      {isResolved ? 'Calibrated & Resolved' : anom.status === 'action_needed' ? 'Action Required' : 'Scheduled'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.88rem', color: '#334155', marginBottom: '0.35rem' }}>
                    ⚠️ <strong style={{ color: '#0f172a' }}>Issue Detected:</strong> {anom.issue}
                  </div>

                  <div style={{ fontSize: '0.84rem', color: '#b91c1c', marginBottom: '0.4rem', fontWeight: 500 }}>
                    💸 <strong style={{ color: '#991b1b' }}>Waste Impact:</strong> {anom.impact}
                  </div>

                  <div style={{ fontSize: '0.84rem', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={14} color="#0284c7" />
                    <span><strong style={{ color: '#0c4a6e' }}>AI Recommendation:</strong> {anom.recommendation}</span>
                  </div>
                </div>

                <div>
                  {!isResolved ? (
                    <button 
                      className="btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      onClick={() => handleExecuteMaintenance(anom.id, anom.recommendation)}
                    >
                      <Wrench size={16} />
                      <span>Execute Corrective Action</span>
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#047857', fontSize: '0.85rem', fontWeight: 700 }}>
                      <CheckCircle2 size={18} color="#059669" />
                      <span>Efficiency Restored</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
