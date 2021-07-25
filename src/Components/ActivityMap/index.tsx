import { GoogleMap, useLoadScript, Marker, InfoWindow,DirectionsService, DirectionsRenderer } from "@react-google-maps/api"
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { useCallback, useRef, useState } from "react";
import { listPointProps, mapProps } from "../../types";
import mapstyle from "./mapstyle";

const libraries: Libraries = ["places"];
const mapContainerStyle = {
  width: "20rem",
  height: "15rem",
  borderRadius: '1rem',
};

const options = {
  styles: mapstyle,
  disableDefaultUI: true,
  zoomControl: true,
}

export default function MapActivity(mapProps: mapProps) {
  let points = [];
  const [response, setResponse] = useState(null);
  if(mapProps.waypoints.length > 0){
    console.log('waypoints',mapProps.waypoints);

     for(var i= 0; i < mapProps.waypoints.length; i+=2 ){
       console.log(mapProps.waypoints[i])
      points.push(
        {
          location: { 
            lat: parseFloat(mapProps.waypoints[i]),
            lng: parseFloat(mapProps.waypoints[i+1]),
          }
        }
      )
    }
    console.log('points',points)

  }
  
  let lat = parseFloat(mapProps.lat);
  let lng = parseFloat(mapProps.long);
  const center = {
    lat: lat,
    lng: lng
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });


  const directionsCallback = (response) => {
    

    if (response !== null) {
      if (response.status === "OK") {
       
        setResponse(response)
        
      } else {
        console.log("response: ", response);
      }
    }
  };

  const mapRef = useRef(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div> Error Loading Google Maps</div>
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      {
        mapProps.waypoints.length > 0 ? <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
{
              points.length === 0  ? <></> :(
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    origin: points[0],
                    destination: points[points.length-1],
                    travelMode: 'WALKING',
                    waypoints: points,
                  }}
                  // required
                  callback={response && directionsCallback}
                  // optional
                 
                  // optional
                 
                />
              )
            }

            {
                response === null  ? <></> : (
                <DirectionsRenderer
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: response,
                  }}
                  // optional
            
                />
              )
            }




      </GoogleMap> :
        <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>

      }
      

    </div>
  )
}

