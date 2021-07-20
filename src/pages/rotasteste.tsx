import { GoogleMap, useLoadScript, Marker, InfoWindow,DirectionsService, DirectionsRenderer } from "@react-google-maps/api"
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { formatRelative } from "date-fns"
import { useCallback, useRef, useState, useContext } from "react";
import mapstyle from "../Components/Maps/mapstyle";


import "@reach/combobox/styles.css"



const libraries: Libraries = ["places"];
const mapContainerStyle = {
  width: "50rem",
  height: "50rem",
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
type marker = {
  lat: number,
  lng: number,
  time: any
}
export default function MapView() {
  const [markers,setMarkers] = useState<marker[]>([]);
  //const { location } = activityMapLocation();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  //const [markers, setMarkers] = useState({ lat: 0, lng: 0 });
 
  const onMapClick = (event) => {

    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      } ,
    ]
    
    );
    if(markers.length == 2){
      setMarkers([{
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      }]);
    }
    console.log(event.latLng.lat(), event.latLng.lng());
    console.log(markers)
  };

  const mapRef = useRef(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [response, setResponse] = useState(null);

  const directionsCallback = (response) => {
    

    if (response !== null) {
      if (response.status === "OK") {
       
        setResponse(response)
        
      } else {
        console.log("response: ", response);
      }
    }
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
        {
          markers.length === 2 ? <></> :
          markers.map((marker) => (
            <Marker key={marker.time.toISOString()} 
            position={{ lat: marker.lat, lng: marker.lng }} />

          ))
        }

{
              markers.length !== 2  ? <></> : (
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destination: `${markers[0].lat}, ${markers[0].lng}`,
                    origin: `${markers[1].lat}, ${markers[1].lng}`,
                    travelMode: 'WALKING'
                  
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                 
                  // optional
                 
                />
              )
            }

            {
               markers.length !== 2 || response === null  ? <></> : (
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

   

    </div>
  )
}

