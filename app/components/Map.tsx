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

const Map = ({ className }: any) => {
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
				'<div><strong>Helicopter Services</strong><br/>White Waltham<br/>Maidenhead<br/>SL6 3NJ<br/>United Kingdom<br /><a href="#" style="color: rgb(31, 182, 222)">Directions</a></div> ',
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

export default React.memo(Map);

// "use client";

// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import React, { useCallback } from "react";

// const containerStyle = {
// 	width: "100%",
// 	aspectRatio: "1 / 1",
// };

// const center = {
// 	lat: 51.5034,
// 	lng: -0.7648,
// };

// const mapStyles = [
// 	{
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#ffffff",
// 			},
// 		],
// 	},
// 	{
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#102039",
// 			},
// 		],
// 	},
// 	{
// 		featureType: "water",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#1FB6DE",
// 			},
// 		],
// 	},
// 	{
// 		featureType: "road",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#1FB6DE",
// 			},
// 		],
// 	},
// ];

// const Map = ({ className }: any) => {
// 	const { isLoaded } = useJsApiLoader({
// 		id: "google-maps-script",
// 		googleMapsApiKey: "AIzaSyCSbACJNUEJ3LYsy46OsktgnCq2pnoG6gg",
// 	});

// 	const [map, setMap] = React.useState(null);

// 	// @ts-ignore
// 	const onUnmount = React.useCallback(function callback(map) {
// 		setMap(null);
// 	}, []);

// 	// @ts-ignore
// 	const onLoad = useCallback(function callback(map) {
// 		const infoWindow = new window.google.maps.InfoWindow({
// 			content:
// 				'<div><strong>Helicopter Services</strong><br/>White Waltham<br/>Maidenhead<br/>SL6 3NJ<br/>United Kingdom<br /><a href="#" style="color: rgb(31, 182, 222)">Directions</a></div> ',
// 			position: center,
// 		});
// 		infoWindow.open(map);
// 		setMap(map);
// 	}, []);

// 	return isLoaded ? (
// 		<div className={`w-full`}>
// 			<GoogleMap
// 				mapContainerStyle={className ? className : containerStyle}
// 				center={center}
// 				zoom={13}
// 				onLoad={onLoad}
// 				onUnmount={onUnmount}
// 				options={{ styles: mapStyles }}
// 			>
// 				<></>
// 			</GoogleMap>
// 		</div>
// 	) : (
// 		<></>
// 	);
// };

// export default React.memo(Map);
