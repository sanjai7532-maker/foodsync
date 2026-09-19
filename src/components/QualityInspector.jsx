import React, { useState } from 'react';
import { 
  Scan, 
  Thermometer, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  Camera, 
  Sparkles,
  Zap
} from 'lucide-react';
import { IOT_SENSORS, CV_SAMPLE_ITEMS } from '../data/initialData';
import { estimateShelfLifeUnderThermalStrain } from '../utils/aiSimulation';

export default function QualityInspector({ setActiveTab, onSelectBatchForRedistribution }) {
  const [sensors, setSensors] = useState(IOT_SENSORS);
  const [selectedSample, setSelectedSample] = useState(CV_SAMPLE_ITEMS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanTimestamp, setScanTimestamp] = useState('Today, 12:15 PM');

  // Trigger simulated scan animation
  const handleTriggerScan = (sample) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsScanning(false);
      setScanTimestamp('Just now (AI Verified)');
    }, 600);
  };

  // Simulate temperature adjustment to demonstrate Arrhenius model
  const handleSimulateColdRoomTemp = (sensorId, delta) => {
    setSensors(prev => prev.map(s => {
      if (s.id === sensorId) {
        const newTemp = Number((s.temp + delta).toFixed(1));
        let newStatus = "optimal";
        if (newTemp > s.targetTemp + 3) newStatus = "critical";
        else if (newTemp > s.targetTemp + 1) newStatus = "warning";
        return {
          ...s,
          temp: newTemp,
          status: newStatus,
          history: [...s.history.slice(1), newTemp],
          lastUpdated: "Just now"
        };
      }
      return s;
    }));
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Smart IoT Telemetry & Computer Vision Quality Inspector</h2>
          <p className="section-subtitle">
            Real-time cold-chain sensor monitoring combined with spectral image-based food freshness and spoilage assessment.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn-secondary"
            onClick={() => handleSimulateColdRoomTemp("sensor-cr2", -2.0)}
          >
            <RefreshCw size={16} />
            <span>Reset Cold Room 02</span>
          </button>
        </div>
      </div>

      {/* Part 1: IoT Storage & Cold Chain Sensor Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Thermometer size={20} color="#10b981" />
            Storage Environment IoT Telemetry Nodes
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Polling 6 Facility Nodes every 5000ms</span>
        </div>

        <div className="grid-3col">
          {sensors.map((sensor) => {
            const isCritical = sensor.status === 'critical';
            const isWarning = sensor.status === 'warning';
            return (
              <div 
                key={sensor.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1.4rem', 
                  borderLeft: `4px solid ${isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981'}` 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>{sensor.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#475569' }}>{sensor.type}</span>
                  </div>
                  <span className={`badge badge-${sensor.status}`}>
                    {sensor.status}
                  </span>
                </div>

                {/* Primary Metric Reading */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span style={{ 
                    fontSize: '2.1rem', 
                    fontWeight: 800, 
                    color: isCritical ? '#dc2626' : isWarning ? '#d97706' : '#059669',
                    lineHeight: 1
                  }}>
                    {sensor.temp}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#475569', fontWeight: 600 }}>{sensor.tempUnit}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: 'auto', fontWeight: 600 }}>
                    Target: {sensor.targetTemp}{sensor.tempUnit}
                  </span>
                </div>

                {/* Auxiliary Gas & Humidity Telemetry */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '0.4rem', 
                  padding: '0.6rem', 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontSize: '0.75rem'
                }}>
                  <div>
                    <div style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Droplets size={12} color="#0284c7" /> Humidity
                    </div>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{sensor.humidity}{sensor.humidityUnit}</div>
                  </div>
                  <div>
                    <div style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Wind size={12} color="#059669" /> Ethylene
                    </div>
                    <div style={{ fontWeight: 800, color: sensor.ethylene > 0.5 ? '#dc2626' : '#0f172a' }}>
                      {sensor.ethylene} ppm
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#475569' }}>VOC / Gas</div>
                    <div style={{ fontWeight: 800, color: sensor.voc > 150 ? '#d97706' : '#0f172a' }}>
                      {sensor.voc} ppb
                    </div>
                  </div>
                </div>


                {/* Sparkline Visual Simulation */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.2rem' }}>7-Hour Temperature Trend</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', height: '26px', gap: '4px' }}>
                    {sensor.history.map((val, i) => {
                      const heightPercent = Math.min(100, Math.max(20, ((val + 25) / 50) * 100));
                      return (
                        <div 
                          key={i} 
                          title={`${val}°C`}
                          style={{ 
                            flex: 1, 
                            height: `${heightPercent}%`, 
                            background: isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981',
                            borderRadius: '2px',
                            opacity: (i + 3) / 10
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Sensor Test Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Updated {sensor.lastUpdated}</span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button 
                      style={{ padding: '2px 6px', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}
                      title="Simulate heat excursion"
                      onClick={() => handleSimulateColdRoomTemp(sensor.id, 1.5)}
                    >
                      +1.5°
                    </button>
                    <button 
                      style={{ padding: '2px 6px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: 'none', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}
                      title="Simulate cooling recovery"
                      onClick={() => handleSimulateColdRoomTemp(sensor.id, -1.5)}
                    >
                      -1.5°
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Computer Vision Food Freshness & Spoilage Scanner */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Scan size={24} color="#06b6d4" />
              Computer Vision Freshness & Spoilage Optical Scanner
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Deep neural spectral segmentation identifying discoloration, cellular breakdown, and microbiological risk.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', maxWidth: '100%', paddingBottom: '0.3rem' }}>
            {CV_SAMPLE_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`btn-secondary ${selectedSample.id === item.id ? 'active' : ''}`}
                style={{ 
                  padding: '0.45rem 0.85rem', 
                  fontSize: '0.8rem',
                  borderColor: selectedSample.id === item.id ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)',
                  background: selectedSample.id === item.id ? 'rgba(6, 182, 212, 0.2)' : 'rgba(30, 41, 59, 0.6)'
                }}
                onClick={() => handleTriggerScan(item)}
              >
                {item.name.split(' ')[0]} {item.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-2col" style={{ alignItems: 'center' }}>
          {/* Scanner Optical Viewport */}
          <div className="cv-scanner-viewport" style={{ position: 'relative' }}>
            <img 
              src={selectedSample.image} 
              alt={selectedSample.name} 
              className="cv-scanner-img" 
            />

            {/* Scanning Laser Animation */}
            {isScanning ? (
              <div className="scan-laser-line" style={{ animationDuration: '0.6s' }}></div>
            ) : (
              <div className="scan-laser-line"></div>
            )}

            {/* Neural Segmentation Bounding Box */}
            <div 
              className="cv-bounding-box"
              style={{
                borderColor: selectedSample.boxColor,
                top: `${selectedSample.boxCoordinates.y}%`,
                left: `${selectedSample.boxCoordinates.x}%`,
                width: `${selectedSample.boxCoordinates.width}%`,
                height: `${selectedSample.boxCoordinates.height}%`
              }}
            >
              <div 
                className="cv-box-label"
                style={{ background: selectedSample.boxColor }}
              >
                {selectedSample.category} • Freshness {selectedSample.freshnessScore}%
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Camera size={14} color="#38bdf8" />
              <span>Inspection Timestamp: {scanTimestamp}</span>
            </div>
          </div>

          {/* AI Diagnostic Output */}
          <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className={`badge badge-${selectedSample.statusBadge}`} style={{ marginBottom: '0.4rem' }}>
                  {selectedSample.condition}
                </span>
                <h4 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800 }}>
                  {selectedSample.name}
                </h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: selectedSample.boxColor === '#10B981' ? '#047857' : selectedSample.boxColor === '#F59E0B' ? '#b45309' : '#dc2626', lineHeight: 1 }}>
                  {selectedSample.freshnessScore}%
                </div>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Freshness Index</span>
              </div>
            </div>

            {/* Remaining Shelf Life Alert */}
            <div style={{ 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '12px', 
              border: '1.5px solid #e2e8f0',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={24} color={selectedSample.freshnessScore < 50 ? '#dc2626' : '#0284c7'} />
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>Estimated Safe Shelf Life</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                    {selectedSample.shelfLifeRemainingHours > 24 
                      ? `${(selectedSample.shelfLifeRemainingHours / 24).toFixed(1)} Days (${selectedSample.shelfLifeRemainingHours} hrs)` 
                      : `${selectedSample.shelfLifeRemainingHours} Hours Remaining`}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 700 }}>
                Physiological Decay Model Active
              </span>
            </div>

            {/* Detected Anomalies List */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Optical Spectral Findings:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedSample.detectedAnomalies.map((anom, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#334155' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedSample.boxColor }}></span>
                    <span>{anom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Recommendation */}
            <div style={{ 
              padding: '1rem', 
              background: selectedSample.freshnessScore > 70 ? '#f0fdf4' : selectedSample.freshnessScore > 45 ? '#fffbeb' : '#fef2f2',
              border: `1.5px solid ${selectedSample.boxColor}`,
              borderRadius: '12px',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: selectedSample.boxColor === '#10B981' ? '#047857' : selectedSample.boxColor === '#F59E0B' ? '#b45309' : '#b91c1c', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                AI Actionable Directive:
              </div>
              <div style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 600 }}>
                {selectedSample.recommendation}
              </div>
            </div>


            {/* Next Action Button */}
            {selectedSample.freshnessScore >= 50 ? (
              <button 
                id="btn-cv-redirect-redistribution"
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={() => setActiveTab('redistribution')}
              >
                <span>Initialize Automated Redistribution Network</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                className="btn-secondary" 
                style={{ width: '100%', borderColor: '#ef4444', color: '#f87171' }}
                onClick={() => setActiveTab('redistribution')}
              >
                <span>Route to GreenBio Biomass & Anaerobic Digester</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
