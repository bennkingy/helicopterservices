'use client'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = ({ className }: any) => {
  const { isLoaded } = useJsApiLoader({
    id: 'AIzaSyCSbACJNUEJ3LYsy46OsktgnCq2pnoG6gg',
    googleMapsApiKey: "AIzaSyCSbACJNUEJ3LYsy46OsktgnCq2pnoG6gg"
  })

  const [map, setMap] = React.useState(null)

  // @ts-ignore
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  // @ts-ignore
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className={`w-full ${className}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </div>
  ) : <></>
}

export default React.memo(Map)