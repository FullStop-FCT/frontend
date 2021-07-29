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

}
export default function MapView() {
  let npoints = 3;
  const [points, setPoints] = useState([]);
  //const { location } = activityMapLocation();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  //const [markers, setMarkers] = useState({ lat: 0, lng: 0 });
 
  const onMapClick = (event) => {
    setPoints((current) =>[
      ...current, 
      {location: {lat:event.latLng.lat(), lng:event.latLng.lng()}}
    ]
    )
    //console.log('points',points)
  
    if(points.length == npoints){
      setPoints([
        {location: {lat:event.latLng.lat(), lng:event.latLng.lng()}}
      ])
    
    }
    //console.log(event.latLng.lat(), event.latLng.lng());
    //console.log(points)
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
        //console.log("response: ", response);
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
          points.length === npoints ? <></> :
          points.map((point,index) => (
            <Marker key={index} 
            position={{lat: point.location.lat, lng: point.location.lng}} />

          ))
        }

{
              points.length !== npoints  ? <></> : (
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    origin: points[0],
                    destination: points[2],
                    travelMode: 'WALKING',
                    waypoints: points,
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                 
                  // optional
                 
                />
              )
            }

            {
               points.length !== npoints || response === null  ? <></> : (
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

