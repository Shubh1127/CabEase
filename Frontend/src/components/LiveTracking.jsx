import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { AdvancedMarkerElement } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 28.7041, // Default latitude (e.g., Delhi)
  lng: 77.1025, // Default longitude (e.g., Delhi)
};

const LiveTracking = ({ userLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(center);

  useEffect(() => {
    // Watch the user's location
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error watching position:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    // Cleanup the watcher on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
      >
        {/* Marker for the user's current location */}
        <Marker position={currentLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;