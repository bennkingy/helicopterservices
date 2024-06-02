"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback } from "react";

const containerStyle = {
	width: "100%",
	aspectRatio: "1 / 1",
};

const center = {
	lat: 51.5034,
	lng: -0.7648,
};

const mapStyles = [
	{
		elementType: "geometry",
		stylers: [
			{
				color: "#ffffff",
			},
		],
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#102039",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{
				color: "#1FB6DE",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{
				color: "#1FB6DE",
			},
		],
	},
];

const GMap = ({ className }: any) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-maps-script",
		googleMapsApiKey: "AIzaSyCSbACJNUEJ3LYsy46OsktgnCq2pnoG6gg",
	});

	const [map, setMap] = React.useState(null);

	// @ts-ignore
	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	// @ts-ignore
	const onLoad = useCallback(function callback(map) {
		const infoWindow = new window.google.maps.InfoWindow({
			content:
				'<div style="padding-top: 10px;"><strong>Helicopter Services</strong><br/><br/>White Waltham<br/>Maidenhead<br/>SL6 3NJ<br/>United Kingdom<br /><br/><a target="_blank" href="https://www.google.com/maps/place/Helicopter+Services+Ltd/@51.4948917,-0.7733532,15z/data=!4m2!3m1!1s0x0:0x943b2fff6b33f0ee?sa=X&ved=1t:2428&ictx=111" style="color: rgb(31, 182, 222)">Get directions</a></div> ',
			position: center,
		});
		infoWindow.open(map);
		setMap(map);
	}, []);

	return isLoaded ? (
		<div className={`w-full ${className}`}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={13}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={{ styles: mapStyles }}
			>
				<></>
			</GoogleMap>
		</div>
	) : (
		<></>
	);
};

export default React.memo(GMap);
