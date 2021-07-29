import { GoogleMap, useLoadScript, Marker,DirectionsService, DirectionsRenderer} from "@react-google-maps/api"
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
  const [routes, setRoutes] = useState(false);
  const [response, setResponse] = useState(null);
  const [points, setPoints] = useState([]);
  const [render,setRender] = useState(false);
  //var npoints = 4;
  const[npoints,setNPoints] = useState<number>(0);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  
  //const [markers, setMarkers] = useState({ lat: 0, lng: 0 });
  const { activityLocation, setActivityLocation, markers, setMarkers, setMappoints } = useContext(MapContext);

  const handleNPoints = useCallback( (event) => {
    setRender(false);
      setNPoints(event.target.value)
      //console.log(npoints);
      setPoints([])
      setResponse(null);
      //console.log(event.target.value);
     // console.log(npoints);
    
  },[npoints]
    
  )  

  const onMapClickPoints = (event) => {
    if(npoints > 1 && npoints < 11){
      //console.log(npoints)
      if(points.length === npoints-1){
       // console.log('render')
       // console.log(points)
        points.map((local) => {
          setMappoints((current) =>
          current.concat(`${local.location.lat}`,`${local.location.lng}`)
         
          )
        })
        setRender(true);
      }
      if(points.length > npoints-1){
        //setResponse(null);
        setRender(false);
        setPoints([{location: {lat:event.latLng.lat(), lng:event.latLng.lng()}}])
        setMappoints([]);
      
      }else{
        setPoints((current) =>[
          ...current, 
          {location: {lat:event.latLng.lat(), lng:event.latLng.lng()}}
        ]
        )
      }
      
      console.log(points)
      //console.log(points.length)
     
    }
   
    //console.log(event.latLng.lat(), event.latLng.lng());
    //console.log(points)
  };



  const handleCheckBox = (event) => {
    !routes ? 
    setRoutes(true) : setRoutes(false)
    
    //console.log(routes)
  }
  const directionsCallback = (response) => {
    

    if (response !== null) {
      if (response.status === "OK") {
       
        setResponse(response)
        
      } else {
        //console.log("response: ", response);
      }
    }
  };


  
  const onMapClick = useCallback((event) => {

    setMarkers(
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),

      } ,
    );
   // console.log(event.latLng.lat(), event.latLng.lng())
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
   // console.log(res)
    setActivityLocation(res)
    //console.log('local: ' + activityLocation)
  };

  if (loadError) return <div> Error Loading Google Maps</div>
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <Search panTo={panTo} inputvalue={inputvalue} />
      <label>
      Criar Rota: <input name="routes"  type="checkbox" checked={routes} onChange={handleCheckBox}/>
      </label>

      {
        routes ? <input name="npoints" id="npoints" type="text" placeholder="Número de pontos, Min: 2 Max: 10" onChange={handleNPoints}></input> : <></>
      }
      
      {
        !routes ? 
        <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onClick={onMapClick
        }
          onLoad={onMapLoad}
        >
        <Marker position={{ lat: markers.lat, lng: markers.lng }} />



      </GoogleMap> : <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onClick={onMapClickPoints
        }
        onLoad={onMapLoad}
      >
        {
         
         render ? <></> : (points.map((point,index) => (
          <Marker key={index} 
          position={{lat: point.location.lat, lng: point.location.lng}} />

        )))
          
        }

{
              !render  ? <></> :(
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    origin: points[0],
                    destination: points[points.length-1],
                    travelMode: 'WALKING',
                    waypoints: points,
                    optimizeWaypoints: true,
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                 
                  // optional
                 
                />
              )
            }

            {
                !render || response === null  ? <></> : (
                <DirectionsRenderer
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: response,
                  }}
                  // optional
            
                />
              )
            }




      </GoogleMap>
      }
     

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
          placeholder="Localização" />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && data.map(({ description }) => <ComboboxOption key={description} value={description} />)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox></div>
  )
}