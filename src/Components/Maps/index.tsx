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
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
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

export default function MapView() {

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

      <Search panTo={panTo} inputvalue={inputvalue} />




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

function Search({ panTo, inputvalue }) {

  const { ready, value, suggestions: { status, data },
    setValue, clearSuggestions, } = usePlacesAutoComplete({
      requestOptions: {
        location: { lat: () => 38.660046, lng: () => -9.198817, },
        radius: 200 * 1000
      },
    });

  return (

    <div className={styles.search}>
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        //inputvalue(address);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0])

          panTo({ lat, lng });

          inputvalue(address);
          console.log(lat, lng)
        } catch (error) {
          console.log("error")
        }
      }}>
        <ComboboxInput value={value} onChange={(e) => {
          setValue(e.target.value);
          console.log(e.target.value)

          inputvalue(e.target.value);
        }}
          disabled={!ready}
          placeholder="Location" />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && data.map(({ description }) => <ComboboxOption key={description} value={description} />)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox></div>
  )
}