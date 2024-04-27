'use client'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 51.501140,
  lng: -0.763710,
};

const Map = ({ className }: any) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: "AIzaSyCSbACJNUEJ3LYsy46OsktgnCq2pnoG6gg"
  })

  const [map, setMap] = React.useState(null)

  // @ts-ignore
  const onLoad = React.useCallback(function callback(map) {
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
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
      </GoogleMap>
    </div>
  ) : <></>
}

export default React.memo(Map);
