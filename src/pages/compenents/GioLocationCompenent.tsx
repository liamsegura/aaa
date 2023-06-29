import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface Place {
  name: string;
  address: string;
  location: Location;
}

const GioLocationComponent = () => {


  const [places, setPlaces] = useState<Place[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
      searchPlaces();
    }
  }, [location]);

  const searchPlaces = async () => {
    try {
      if (!location) {
        return;
      }
  
      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${location.longitude}&lat=${location.latitude}&kinds=sightseeing&format=json&limit=10`
      );
  
      if (response.ok) {
        const data = await response.json();
        const placesData = data.map((item: any) => ({
          name: item.name,
          address: item.address,
          location: {
            latitude: item.point.lat,
            longitude: item.point.lon,
          },
        }));
        setPlaces(placesData);
      } else {
        console.error('Error searching places:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error searching places:', error);
    }
  };
  

  return (
          <div>
          {places?.length > 0 && places.map((place, index) => (
            <div key={index}>
              <h3>{place.name}</h3>
            </div>
          ))}
          </div>
  );
};

export default GioLocationComponent;
