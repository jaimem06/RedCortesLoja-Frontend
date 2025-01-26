import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  zoom: number;
  onMapClick?: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ zoom, onMapClick }) => {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setHasLocation(true);
      },
      () => {
        console.error('Acceso a la ubicación denegado por el usuario o no disponible.');
      }
    );
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        if (onMapClick) {
          onMapClick(lat, lng);
        }
      },
    });
    return null;
  };

  const UpdateMapCenter: React.FC<{ position: [number, number] }> = ({ position }) => {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
  };

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasLocation && (
        <>
          <Marker position={position}>
            <Popup>
              Tu ubicación actual.
            </Popup>
          </Marker>
          <UpdateMapCenter position={position} />
          <MapEvents />
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;