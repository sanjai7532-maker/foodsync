import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Truck, 
  MapPin, 
  Compass, 
  Thermometer, 
  BatteryCharging, 
  Zap, 
  CheckCircle2, 
  Navigation as NavIcon,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { DELIVERY_FLEET, VERIFIED_NGOS, FACILITIES } from '../data/initialData';

export default function LogisticsMap({ selectedFacility }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [fleet, setFleet] = useState(DELIVERY_FLEET);
  const [selectedVan, setSelectedVan] = useState(DELIVERY_FLEET[0]);
  const [routeOptimized, setRouteOptimized] = useState(true);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on NCR / Facility location
    const center = selectedFacility.coords || [28.6280, 77.3649];

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView(center, 12);

      // OpenStreetMap tiles with dark CSS filter
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers & layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // 1. Add Facility Hub Marker
    const hubIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background: #10b981; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 15px #10b981; border: 2px solid white;">
          🏢
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    L.marker(center, { icon: hubIcon })
      .addTo(map)
      .bindPopup(`<b>${selectedFacility.name}</b><br/>Central Dispatch Kitchen`)
      .openPopup();

    // 2. Add NGO Drop-off Markers
    VERIFIED_NGOS.forEach((ngo) => {
      const ngoIcon = L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div style="background: #06b6d4; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 10px #06b6d4; border: 2px solid white; font-size: 14px;">
            🤝
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      L.marker(ngo.coords, { icon: ngoIcon })
        .addTo(map)
        .bindPopup(`<b>${ngo.name}</b><br/>${ngo.category}<br/>Capacity: ${ngo.currentAvailableCapacity} meals`);
    });

    // 3. Add Fleet Vehicle Markers
    fleet.forEach((van) => {
      const vanIcon = L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div style="background: #f59e0b; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 12px #f59e0b; border: 2px solid white; font-size: 14px;">
            🚚
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.marker(van.currentCoords, { icon: vanIcon })
        .addTo(map)
        .bindPopup(`<b>${van.name}</b><br/>Driver: ${van.driver}<br/>Temp: ${van.cabinTemp}°C<br/>Battery: ${van.batteryLevel}%`);
    });

    // 4. Draw Route Path Polyline
    if (routeOptimized) {
      // Optimized multi-stop route
      const routePoints = [
        center,
        VERIFIED_NGOS[1].coords, // Robin Hood (2.3km)
        VERIFIED_NGOS[3].coords, // Snehalaya (3.6km)
        VERIFIED_NGOS[0].coords, // Feeding India (4.8km)
        center
      ];

      L.polyline(routePoints, {
        color: '#10b981',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.85
      }).addTo(map);
    } else {
      // Unoptimized individual routes
      VERIFIED_NGOS.slice(0, 3).forEach((ngo) => {
        L.polyline([center, ngo.coords], {
          color: '#ef4444',
          weight: 2.5,
          opacity: 0.6
        }).addTo(map);
      });
    }

  }, [selectedFacility, fleet, routeOptimized]);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">AI Logistics & Cold-Chain Route Optimization</h2>
          <p className="section-subtitle">
            Carbon-minimized multi-stop routing engine with in-transit thermal telemetry and real-time EV fleet telemetry.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            id="btn-toggle-optimizer"
            className={routeOptimized ? "btn-primary" : "btn-secondary"}
            onClick={() => setRouteOptimized(!routeOptimized)}
          >
            <Compass size={18} />
            <span>{routeOptimized ? "AI Route Solver: OPTIMAL" : "Legacy Uncoordinated Trips"}</span>
          </button>
        </div>
      </div>

      {/* Map + Telemetry Dashboard Split */}
      <div className="grid-2col" style={{ gridTemplateColumns: '1.4fr 1fr', marginBottom: '2rem' }}>
        {/* Interactive Map View */}
        <div className="glass-panel" style={{ padding: '1rem', position: 'relative' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '520px', borderRadius: '14px', zIndex: 1 }} />
          
          {/* Legend overlay */}
          <div style={{ 
            position: 'absolute', 
            bottom: '24px', 
            left: '24px', 
            background: 'rgba(9, 13, 22, 0.9)', 
            backdropFilter: 'blur(8px)', 
            padding: '10px 14px', 
            borderRadius: '10px', 
            zIndex: 1000,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
              <span>Central Kitchen Hub</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4' }}></span>
              <span>Verified NGO Drop Points</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '4px', background: '#f59e0b' }}></span>
              <span>Refrigerated EV Fleet</span>
            </div>
          </div>
        </div>

        {/* Route Optimization Analytics & Active Fleet Telemetry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Route Comparison Stats */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={18} color="#10b981" />
                Dijkstra / TSP Route Efficiency
              </h3>
              <span className={`badge ${routeOptimized ? 'badge-optimal' : 'badge-critical'}`}>
                {routeOptimized ? '-41% Distance' : 'High Inefficiency'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.85rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Total Delivery Transit</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: routeOptimized ? '#34d399' : '#f87171' }}>
                  {routeOptimized ? '24.8 km' : '42.2 km'}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  {routeOptimized ? 'Multi-drop coordinated' : 'Multiple back-and-forths'}
                </div>
              </div>

              <div style={{ padding: '0.85rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Total Transit Time</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: routeOptimized ? '#38bdf8' : '#fbbf24' }}>
                  {routeOptimized ? '58 mins' : '115 mins'}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  {routeOptimized ? 'Optimal fresh window' : 'Risk of thermal breach'}
                </div>
              </div>
            </div>

            {routeOptimized && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <TrendingDown size={22} color="#34d399" />
                <div style={{ fontSize: '0.8rem' }}>
                  <strong style={{ color: '#fff' }}>5.3 kg CO₂e Direct Transport Emissions Saved</strong>
                  <div style={{ color: '#a7f3d0' }}>Via smart order batching and EV fleet assignment.</div>
                </div>
              </div>
            )}
          </div>

          {/* Active Fleet In-Transit Cold Chain Card */}
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={18} color="#06b6d4" />
                Live Vehicle In-Transit Telemetry
              </h3>
              <select 
                className="facility-select" 
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                value={selectedVan.id}
                onChange={(e) => {
                  const van = fleet.find(v => v.id === e.target.value);
                  if (van) setSelectedVan(van);
                }}
              >
                {fleet.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Assigned Driver:</span>
                <strong style={{ color: '#fff' }}>{selectedVan.driver}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Vehicle Model:</span>
                <span style={{ color: '#e2e8f0' }}>{selectedVan.vehicleType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Current Mission:</span>
                <strong style={{ color: '#38bdf8' }}>{selectedVan.status}</strong>
              </div>

              {/* Thermal & Battery Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                    <Thermometer size={14} color="#34d399" />
                    <span>Cabin Temperature</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
                    {selectedVan.cabinTemp}°C
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    Target: {selectedVan.cabinTempTarget}°C (Cold Chain OK)
                  </div>
                </div>

                <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                    <BatteryCharging size={14} color="#06b6d4" />
                    <span>EV Battery Level</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06b6d4' }}>
                    {selectedVan.batteryLevel}%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    Speed: {selectedVan.speedKmh} km/h
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
