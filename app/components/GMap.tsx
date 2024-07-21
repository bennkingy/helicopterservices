"use client";

import { mapLocation } from "@/lib/constants";
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

const mapStyles = [
	{
		featureType: "landscape.man_made",
		elementType: "geometry",
		stylers: [
			{
				color: "#f7f1df",
			},
		],
	},
	{
		featureType: "landscape.natural",
		elementType: "geometry",
		stylers: [
			{
				color: "#d0e3b4",
			},
		],
	},
	{
		featureType: "landscape.natural.terrain",
		elementType: "geometry",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "labels",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi.business",
		elementType: "all",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi.medical",
		elementType: "geometry",
		stylers: [
			{
				color: "#fbd3da",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [
			{
				color: "#bde6ab",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road",
		elementType: "labels",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#ffe15f",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#efd151",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#ffffff",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "black",
			},
		],
	},
	{
		featureType: "transit.station.airport",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#cfb2db",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{
				color: "#a2daf2",
			},
		],
	},
];

const GMap = ({ className }: any) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-maps-script",
		googleMapsApiKey: process.env.GMAP_API || "",
	});

	const [map, setMap] = React.useState(null);

	// @ts-ignore
	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	// @ts-ignore
	const onLoad = useCallback(function callback(map) {
		const infoWindow = new window.google.maps.InfoWindow({
			content: `<div style="padding-top: 10px;"><strong>Helicopter Services</strong><br/><br/>White Waltham<br/>Maidenhead<br/>SL6 3NJ<br/>United Kingdom<br /><br/><a target="_blank" href="${mapLocation}" style="color: rgb(31, 182, 222)">Get directions</a></div>`,
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
