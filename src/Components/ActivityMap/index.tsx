import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { useCallback, useRef } from "react";
import mapstyle from "./mapstyle";

const libraries: Libraries = ["places"];
const mapContainerStyle = {
  width: "20rem",
  height: "15rem",
  borderRadius: '4rem',
};

const options = {
  styles: mapstyle,
  disableDefaultUI: true,
  zoomControl: true,
}
type LatLong = {
  lat: string,
  long: string
}
export default function MapActivity(latlong: LatLong) {
  let lat = parseFloat(latlong.lat);
  let lng = parseFloat(latlong.long);
  const center = {
    lat: lat,
    lng: lng
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div> Error Loading Google Maps</div>
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>

    </div>
  )
}

