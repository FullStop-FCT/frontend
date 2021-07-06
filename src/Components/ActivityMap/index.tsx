import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { formatRelative } from "date-fns"
import { useCallback, useRef, useState, useContext } from "react";
import mapstyle from "./mapstyle";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { TextField, Button } from "@material-ui/core";

import { MapContext } from '../../Context/MapContext'
import styles from './styles.module.scss'
import { createContext } from 'use-context-selector'


import "@reach/combobox/styles.css"



const libraries: Libraries = ["places"];
const mapContainerStyle = {
  width: "20rem",
  height: "15rem",
};

const center = {
  lat: 38.736946,
  lng: -9.142685,
}

const options = {
  styles: mapstyle,
  disableDefaultUI: true,
  zoomControl: true,
}

export default function MapActivity(lat: string, long: string) {
  console.log(lat, long)
  //const { location } = activityMapLocation();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  //const [markers, setMarkers] = useState({ lat: 0, lng: 0 });
  const { activityLocation, setActivityLocation, markers, setMarkers } = useContext(MapContext);
  const onMapClick = useCallback((event) => {

    setMarkers(
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),

      } ,
    );
    console.log(event.latLng.lat(), event.latLng.lng())
  }, []);

  const mapRef = useRef(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
    setMarkers({ lat, lng })

  }, [])

  const inputvalue = (result: string) => {
    //debugger
    let res: string = result;
    console.log(res)
    setActivityLocation(res)
    console.log('local: ' + activityLocation)
  };

  if (loadError) return <div> Error Loading Google Maps</div>
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>

      <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onClick={onMapClick
        }
        onLoad={onMapLoad}
      >
        <Marker position={{ lat: markers.lat, lng: markers.lng }} />

      </GoogleMap>

    </div>
  )
}

