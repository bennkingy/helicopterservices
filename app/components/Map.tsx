'use client'

import GoogleMapReact from 'google-map-react';

const Map = ({ className }: any) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div className={`w-full ${className}`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCSbACJNUEJ3LYsy46OsktgnCq2pnoG6gg" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* // Add marker */}
      </GoogleMapReact>
    </div>
  );
}

export default Map