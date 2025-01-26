"use client";
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

interface MapComponentProps {
    zoom: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ zoom }) => {
    const defaultPosition: [number, number] = [-4.0307289470706875, -79.19963225249968];

    const handleCreated = (e: any) => {
        const { layerType, layer } = e;
        if (layerType === 'marker') {
            const { lat, lng } = layer.getLatLng();
            console.log('Marker created at:', lat, lng);
        } else {
            console.log('Layer created:', layer);
        }
    };

    const handleEdited = (e: any) => {
        console.log('Layers edited:', e.layers);
    };

    const handleDeleted = (e: any) => {
        console.log('Layers deleted:', e.layers);
    };

    return (
        <MapContainer center={defaultPosition} zoom={zoom} style={{ height: '475px', width: '100%', borderRadius: "20px", border: "4px solid #020d1a" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup>
                <EditControl
                    position="topright"
                    onCreated={handleCreated}
                    onEdited={handleEdited}
                    onDeleted={handleDeleted}
                    draw={{
                        rectangle: true,
                        polyline: true,
                        polygon: true,
                        circle: true,
                        marker: true,
                        circlemarker: false,
                    }}
                />
            </FeatureGroup>
        </MapContainer>
    );
};

export default MapComponent;