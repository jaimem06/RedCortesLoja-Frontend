import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  lat: number;
  lng: number;
  zoom: number;
  onMapClick?: (lat: number, lng: number) => void;
}

const MapEvents: React.FC<{ onMapClick?: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (onMapClick) {
        onMapClick(lat, lng);
      }
    },
  });

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, zoom, onMapClick }) => {
  // Component to update map center
  const MapUpdater: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
  };

  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />  
      <Marker position={[lat, lng]}>
        <Popup>
          Un marcador en la posición seleccionada.
        </Popup>
      </Marker>
      <MapEvents onMapClick={onMapClick} />
      {/* Add MapUpdater to update the map's center */}
      <MapUpdater lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default MapComponent;