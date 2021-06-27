import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../../services/api';
import { useRouter } from 'next/router'
import Cookie from 'js-cookie';
import { addDays, milliseconds } from 'date-fns'

type marker = {
  lat: number,
  lng: number,
}

type MapContextData = {
  activityLocation: string;
  setActivityLocation: (input: string) => void;
  markers: marker;
  setMarkers: (marker: marker) => void
}

export const MapContext = createContext({} as MapContextData);

type MapContextProviderProps = {
  children: ReactNode;
}
export function MapContextProvider({ children }: MapContextProviderProps) {
  const [activityLocation, setActivityLocation] = useState("");
  const [markers, setMarkers] = useState({ lat: 0, lng: 0 });



  return (
    <MapContext.Provider value={{
      activityLocation, setActivityLocation,
      markers, setMarkers,
    }}>
      {children}
    </MapContext.Provider>
  )
}




