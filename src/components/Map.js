import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = () => {
  // Coordonnées de l'adresse spécifique
  const location = {
    lat: 5.411105,
    lng: -4.034575,
  };

  // Options de la carte
  const mapOptions = {
    center: location,
    zoom: 14,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBpaMHTjc7yX4kqEcwEPkp4h2S1vMU6HY8">
      <GoogleMap
        mapContainerStyle={{
          height: "400px",
          width: "100%",
          borderRadius: 20,
          margin: 20,
        }}
        center={location}
        zoom={14}
        options={mapOptions}
      >
        {/* Marqueur pour l'adresse spécifique */}
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
