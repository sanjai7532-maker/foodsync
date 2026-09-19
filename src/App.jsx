import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import CommandCenter from './components/CommandCenter';
import DemandForecast from './components/DemandForecast';
import QualityInspector from './components/QualityInspector';
import Redistribution from './components/Redistribution';
import LogisticsMap from './components/LogisticsMap';
import ProcessingAudit from './components/ProcessingAudit';
import ESGAnalytics from './components/ESGAnalytics';
import ProductionPlanner from './components/ProductionPlanner';

import { 
  FACILITIES, 
  INITIAL_METRICS, 
  RECENT_ALERTS, 
  INITIAL_SURPLUS_BATCHES 
} from './data/initialData';

export default function App() {
  const [selectedFacility, setSelectedFacility] = useState(FACILITIES[0]);
  const [activeTab, setActiveTab] = useState('command-center');
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [alerts, setAlerts] = useState(RECENT_ALERTS);
  const [surplusBatches, setSurplusBatches] = useState(INITIAL_SURPLUS_BATCHES);

  // Permanently maintain Light Mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  // Resolve alert action
  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  // Claim & dispatch surplus batch
  const handleClaimBatch = (batchId, ngoId) => {
    setSurplusBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          currentStatus: 'claimed',
          matchedNgoId: ngoId
        };
      }
      return b;
    }));

    // Increment overall metrics
    const claimedBatch = surplusBatches.find(b => b.id === batchId);
    if (claimedBatch) {
      setMetrics(prev => ({
        ...prev,
        mealsRedistributed: prev.mealsRedistributed + claimedBatch.servings,
        totalFoodSavedKg: prev.totalFoodSavedKg + claimedBatch.weightKg,
        co2eAvoidedKg: prev.co2eAvoidedKg + claimedBatch.co2eAvoidableKg,
        waterSavedLitres: prev.waterSavedLitres + claimedBatch.waterAvoidableL
      }));
    }
  };

  return (
    <div className="app-layout" data-theme="light">
      {/* Top Header & Horizontal Nav Tabs */}
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedFacility={selectedFacility}
        setSelectedFacility={setSelectedFacility}
        facilities={FACILITIES}
        alertsCount={alerts.length}
      />

      {/* Main Viewport Content */}
      <main className="main-viewport">
        {activeTab === 'command-center' && (
          <CommandCenter 
            metrics={metrics}
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
            setActiveTab={setActiveTab}
            surplusBatches={surplusBatches}
            selectedFacility={selectedFacility}
          />
        )}

        {activeTab === 'demand-forecast' && (
          <DemandForecast 
            selectedFacility={selectedFacility}
          />
        )}

        {activeTab === 'quality-cv' && (
          <QualityInspector 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'redistribution' && (
          <Redistribution 
            surplusBatches={surplusBatches}
            setSurplusBatches={setSurplusBatches}
            onClaimBatch={handleClaimBatch}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'logistics-map' && (
          <LogisticsMap 
            selectedFacility={selectedFacility}
          />
        )}

        {activeTab === 'processing-audit' && (
          <ProcessingAudit 
            selectedFacility={selectedFacility}
          />
        )}

        {activeTab === 'production-planner' && (
          <ProductionPlanner 
            selectedFacility={selectedFacility}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'esg-analytics' && (
          <ESGAnalytics 
            metrics={metrics}
            selectedFacility={selectedFacility}
          />
        )}
      </main>

      {/* Universal Footer */}
      <footer className="app-footer">
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>FoodSync AI Platform</strong> — Autonomous Food Waste Prevention & Dynamic Redistribution Ecosystem
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem' }}>
            <span>UN SDG 12.3 & 2.1 Aligned</span>
            <span>•</span>
            <span>FSSAI Safe Food Handoff Certified</span>
            <span>•</span>
            <span>ISO 14001 Environmental Audit Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
