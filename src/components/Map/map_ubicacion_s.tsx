"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { guardarPoligono, obtenerPoligonos, eliminarPoligono } from "../../hooks/service_ubicacion";

interface MapComponentProps {
  zoom: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ zoom }) => {
  const posicionInicial: [number, number] = [-4.0307289470706875, -79.19963225249968];
  const [poligonos, setPoligonos] = useState([]);

  useEffect(() => {
    const cargarPoligonos = async () => {
      try {
        const respuesta = await obtenerPoligonos();
        const poligonosActualizados = respuesta.data.map((poligono: any) => {
          poligono.geojson.properties._id = poligono._id;
          return poligono;
        });
        setPoligonos(poligonosActualizados);
      } catch (error) {
        console.error("Error al obtener los polígonos:", error);
      }
    };
    cargarPoligonos();
  }, []);

  const manejarCreacion = async (e: any) => {
    const { layerType, layer } = e;
    if (layerType !== "marker") {
      const geojson = layer.toGeoJSON();
      const nombre = prompt("Ingrese el nombre del polígono:") || "Polígono";
      geojson.properties = { nombre };
      try {
        const respuesta = await guardarPoligono({ nombre, geojson });
        if (respuesta.data._id) {
          layer.feature = { properties: { nombre, _id: respuesta.data._id } };
        }
      } catch (error) {
        console.error("Error al guardar el polígono:", error);
      }
    }
  };

  const manejarEdicion = (e: any) => {
    console.log("Polígonos editados:", e.layers);
  };

  const manejarEliminacion = async (e: any) => {
    const layers = e.layers;
    const peticionesEliminar = [];
    layers.eachLayer((layer: any) => {
      const id = layer.toGeoJSON().properties?._id || layer.feature?.properties?._id;
      if (id) {
        peticionesEliminar.push(eliminarPoligono(id));
      } else {
        console.error("El ID del polígono no está definido");
      }
    });
    try {
      await Promise.all(peticionesEliminar);
      const nuevosPoligonos = poligonos.filter(
        (poligono: any) => !peticionesEliminar.some((peticion: any) => peticion === poligono._id)
      );
      setPoligonos(nuevosPoligonos);
    } catch (error) {
      console.error("Error al eliminar los polígonos:", error);
    }
  };

  return (
    <MapContainer
      center={posicionInicial}
      zoom={zoom}
      style={{ height: "475px", width: "100%", borderRadius: "20px", border: "4px solid #020d1a" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={manejarCreacion}
          onEdited={manejarEdicion}
          onDeleted={manejarEliminacion}
          draw={{
            rectangle: true,
            polyline: true,
            polygon: true,
            circle: true,
            marker: true,
            circlemarker: false,
          }}
        />
        {poligonos.map((poligono, index) => (
          <GeoJSON key={index} data={poligono.geojson} />
        ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;