import React, { useState } from 'react';
import { 
  Share2, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  UserCheck, 
  PlusCircle, 
  X,
  HeartHandshake,
  TrendingDown
} from 'lucide-react';
import { VERIFIED_NGOS } from '../data/initialData';
import { rankNgoMatches } from '../utils/aiSimulation';

export default function Redistribution({ 
  surplusBatches, 
  setSurplusBatches, 
  onClaimBatch,
  setActiveTab 
}) {
  const [selectedBatch, setSelectedBatch] = useState(surplusBatches[0] || null);
  const [activeModal, setActiveModal] = useState(null); // 'claim' | 'new_batch'
  const [claimedNgo, setClaimedNgo] = useState(null);
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  // New batch form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Cooked Hot Meals');
  const [newServings, setNewServings] = useState(80);
  const [newWeight, setNewWeight] = useState(32);

  // Compute matches for the currently selected surplus batch
  const rankedMatches = selectedBatch 
    ? rankNgoMatches(selectedBatch, VERIFIED_NGOS)
    : [];

  const handleInitiateClaim = (match) => {
    setClaimedNgo(match.ngo);
    setActiveModal('claim');
  };

  const handleConfirmDispatch = () => {
    if (selectedBatch && claimedNgo) {
      onClaimBatch(selectedBatch.id, claimedNgo.id);
      setActiveModal(null);
      setShowSuccessBadge(true);
      setTimeout(() => setShowSuccessBadge(false), 4500);
    }
  };

  const handleCreateNewBatch = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const newBatch = {
      id: `batch-sp-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      servings: Number(newServings),
      weightKg: Number(newWeight),
      preparedAt: "Just now",
      safeUntil: "Today, 06:00 PM",
      timeLeftMinutes: 360,
      dietary: "Vegetarian",
      temperatureLogged: "65.0°C (Safe Holding)",
      currentStatus: "ready_to_match",
      matchedNgoId: null,
      co2eAvoidableKg: Math.round(newWeight * 2.5),
      waterAvoidableL: Math.round(newWeight * 1200)
    };

    setSurplusBatches([newBatch, ...surplusBatches]);
    setSelectedBatch(newBatch);
    setActiveModal(null);
    setNewTitle('');
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Automated Surplus Food Redistribution Network</h2>
          <p className="section-subtitle">
            AI matchmaking connecting freshly audited kitchen surplus with verified NGOs, food banks, and shelters in minutes.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            id="btn-add-surplus" 
            className="btn-primary" 
            onClick={() => setActiveModal('new_batch')}
          >
            <PlusCircle size={18} />
            <span>Log Kitchen Surplus Batch</span>
          </button>
        </div>
      </div>

      {showSuccessBadge && (
        <div style={{ 
          padding: '1rem 1.5rem', 
          background: 'rgba(16, 185, 129, 0.2)', 
          border: '1px solid #10b981', 
          borderRadius: '12px', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <CheckCircle2 size={24} color="#34d399" />
            <div>
              <strong style={{ color: '#fff' }}>Redistribution Dispatched Successfully!</strong>
              <div style={{ fontSize: '0.84rem', color: '#a7f3d0' }}>
                Digital FSSAI consignment issued. Assigned logistics carrier notified for priority pick-up.
              </div>
            </div>
          </div>
          <button 
            className="btn-secondary" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
            onClick={() => setActiveTab('logistics-map')}
          >
            Track Route on Map →
          </button>
        </div>
      )}

      {/* Main Grid: Batches Catalog (Left) + AI Matchmaker (Right) */}
      <div className="grid-2col">
        {/* Left Column: Surplus Food Inventory Batches */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="#06b6d4" />
              Available Institutional Surplus ({surplusBatches.length})
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Click batch to run AI match</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {surplusBatches.map((batch) => {
              const isSelected = selectedBatch?.id === batch.id;
              const hoursRemaining = (batch.timeLeftMinutes / 60).toFixed(1);
              const isUrgent = batch.timeLeftMinutes < 240;

              return (
                <div
                  key={batch.id}
                  onClick={() => setSelectedBatch(batch)}
                  style={{
                    padding: '1.1rem',
                    borderRadius: '12px',
                    background: isSelected ? '#ecfdf5' : '#ffffff',
                    border: `1.5px solid ${isSelected ? '#10b981' : '#e2e8f0'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(16, 185, 129, 0.2)' : '0 1px 3px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a' }}>
                      {batch.title}
                    </h4>
                    <span className={`badge ${
                      batch.currentStatus === 'ready_to_match' ? 'badge-prime' : 'badge-warning'
                    }`}>
                      {batch.currentStatus === 'ready_to_match' ? 'Open for Match' : batch.currentStatus === 'claimed' ? 'Claimed' : 'Dispatched'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.82rem', color: '#334155', marginBottom: '0.6rem' }}>
                    <span>📦 <strong style={{ color: '#0f172a' }}>{batch.servings} Servings</strong> ({batch.weightKg} kg)</span>
                    <span>•</span>
                    <span>🌡️ {batch.temperatureLogged}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                    <span style={{ 
                      color: isUrgent ? '#dc2626' : '#047857', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.3rem',
                      fontWeight: 700 
                    }}>
                      <Clock size={14} /> Safe for {hoursRemaining} hrs ({batch.safeUntil})
                    </span>
                    <span style={{ color: '#475569', fontWeight: 600 }}>
                      Mitigates {batch.co2eAvoidableKg} kg CO₂e
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Multi-Criteria NGO Matchmaker */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
                <HeartHandshake size={20} color="#059669" />
                AI Smart Matching Engine
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#475569' }}>
                Evaluating urgency, capacity, distance, dietary match, & cold-chain
              </p>
            </div>
            {selectedBatch && (
              <span className="badge badge-optimal">
                Batch #{selectedBatch.id.slice(-4)}
              </span>
            )}
          </div>

          {selectedBatch ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {rankedMatches.map((match, idx) => {
                const isTopMatch = idx === 0;
                return (
                  <div 
                    key={match.ngo.id}
                    style={{
                      padding: '1.2rem',
                      borderRadius: '12px',
                      background: isTopMatch ? '#f0fdf4' : '#ffffff',
                      border: `1.5px solid ${isTopMatch ? '#059669' : '#e2e8f0'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                            {match.ngo.name}
                          </h4>
                          {isTopMatch && (
                            <span style={{ background: '#059669', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                              TOP AI MATCH
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                          <MapPin size={13} color="#0284c7" />
                          <span>{match.ngo.distanceKm} km away</span>
                          <span>•</span>
                          <span>ETA: <strong style={{ color: '#0f172a' }}>{match.estimatedArrivalTime}</strong></span>
                          <span>•</span>
                          <span style={{ color: '#047857', fontWeight: 700 }}>Capacity: {match.ngo.currentAvailableCapacity} meals</span>
                        </div>
                      </div>

                      {/* Match Score Gauge */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '1.65rem', 
                          fontWeight: 800, 
                          color: match.matchScore >= 85 ? '#047857' : match.matchScore >= 70 ? '#d97706' : '#475569',
                          lineHeight: 1
                        }}>
                          {match.matchScore}%
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 600 }}>Fit Index</span>
                      </div>
                    </div>

                    {/* Reasons Checklist */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {match.reasons.map((reason, rIdx) => (
                        <span 
                          key={rIdx}
                          style={{
                            fontSize: '0.75rem',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            color: '#1e293b',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <CheckCircle2 size={12} color="#059669" />
                          {reason}
                        </span>
                      ))}
                    </div>

                    {/* Dispatch Action */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                        Tier: <strong style={{ color: '#0284c7' }}>{match.ngo.verificationTier}</strong>
                      </div>
                      <button
                        className="btn-primary"
                        style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
                        onClick={() => handleInitiateClaim(match)}
                      >
                        <Share2 size={14} />
                        <span>Dispatch Consignment</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>
              Select a surplus batch on the left to run matching.
            </div>
          )}
        </div>

      </div>

      {/* Modal 1: Claim & Digital Consignment Handoff */}
      {activeModal === 'claim' && claimedNgo && selectedBatch && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '16px', 
                background: '#ecfdf5', 
                color: '#059669', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '0.75rem',
                border: '1px solid #a7f3d0'
              }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800 }}>
                Digital Redistribution Consignment
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                FSSAI Food Safety Act Section 31 Verified Safe Handoff
              </p>
            </div>

            {/* Consignment Details */}
            <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Surplus Item:</span>
                <strong style={{ color: '#0f172a' }}>{selectedBatch.title}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Quantity:</span>
                <strong style={{ color: '#047857' }}>{selectedBatch.servings} Meals ({selectedBatch.weightKg} kg)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Recipient NGO:</span>
                <strong style={{ color: '#0284c7' }}>{claimedNgo.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Pickup Driver Contact:</span>
                <strong style={{ color: '#0f172a' }}>{claimedNgo.contactPerson} ({claimedNgo.phone})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Estimated Transit Time:</span>
                <strong style={{ color: '#b45309' }}>{claimedNgo.etaMinutes} mins ({claimedNgo.distanceKm} km)</strong>
              </div>
            </div>

            {/* Simulated QR Code Authentication */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.5rem', 
              padding: '1.25rem', 
              background: '#ffffff', 
              borderRadius: '12px', 
              border: '2px dashed #cbd5e1',
              marginBottom: '1.5rem' 
            }}>
              <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '8px', display: 'flex', border: '1px solid #e2e8f0' }}>
                <QrCode size={84} color="#0f172a" />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  Smart Verification Token
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#047857', letterSpacing: '0.1em' }}>
                  FS-SYNC-{selectedBatch.id.slice(-6).toUpperCase()}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', fontWeight: 500 }}>
                  Driver will scan upon temperature-checked handover.
                </div>
              </div>
            </div>


            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn-secondary" 
                style={{ flex: 1 }} 
                onClick={() => setActiveModal(null)}
              >
                Cancel
              </button>
              <button 
                id="btn-confirm-dispatch"
                className="btn-primary" 
                style={{ flex: 2 }} 
                onClick={handleConfirmDispatch}
              >
                <Truck size={18} />
                <span>Confirm & Authorize Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Log New Surplus Batch */}
      {activeModal === 'new_batch' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem' }}>
              Register Institutional Surplus Batch
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
              Instantly broadcast unserved kitchen surplus to verified redistribution partners.
            </p>

            <form onSubmit={handleCreateNewBatch}>
              <div className="form-group">
                <label className="form-label">Food Item / Recipe Description</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Steamed Basmati Rice & Mixed Dal"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  className="form-control"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Cooked Hot Meals">Cooked Hot Meals</option>
                  <option value="Fresh Produce">Fresh Produce (Fruits / Veg)</option>
                  <option value="Bakery">Bakery & Breads</option>
                  <option value="Dairy">Dairy & Milk Products</option>
                  <option value="Packaged Goods">Dry Ration & Packaged</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Portion Servings</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={newServings}
                    onChange={(e) => setNewServings(e.target.value)}
                    min="10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Weight (kg)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    min="2"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ flex: 1 }} 
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ flex: 2 }}
                >
                  <span>Broadcast to NGO Network</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
