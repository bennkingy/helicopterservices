"use client";
import { mapLocation } from "@/lib/constants";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import React, { useCallback, useState, useEffect, useRef } from "react";

const containerStyle = {
	width: "100%",
	aspectRatio: "1 / 1",
};

const locations = {
	randomLocation: {
		name: "The Hangar",
		center: { lat: 51.493033, lng: -0.7738 },
		address: "https://w3w.co/butlers.captive.restores",
	},
	helicopterServices: {
		name: "Office",
		center: { lat: 51.49492, lng: -0.77341 },
		address: "https://w3w.co/salmon.mimic.beaks",
	},
};

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
		googleMapsApiKey: process.env.NEXT_PUBLIC_GMAP_API || "",
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

	const updateInfoWindow = (location) => {
		if (!infoWindowRef.current) {
			infoWindowRef.current = new google.maps.InfoWindow();
		}

		const content = `<div style="font-size: 14px; padding-top: 10px;text-align:center"><strong>${location.name}</strong><br/><br/><a target="_blank" class='gmaplink text-brand-orange pt-3 font-bold' href="${location.address}">Get directions</a></div>`;

		infoWindowRef.current.setContent(content);
		infoWindowRef.current.setPosition(location.center);
		infoWindowRef.current.open(map);
	};

	const handleLocationChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const newLocation = event.target.value;
		const location = locations[newLocation];

		if (map) {
			map.panTo(location.center);
			updateInfoWindow(location);
		}
	};

	const onUnmount = useCallback(() => {
		setMap(null);
		if (infoWindowRef.current) {
			infoWindowRef.current.close();
		}
	}, []);

	const onLoad = useCallback(
		(map) => {
			setMap(map);
			// Show default info window for randomLocation
			updateInfoWindow(locations.randomLocation);

			// Change the dropdown to the other option after load
			setTimeout(() => {
				const select = document.getElementById(
					"locationDropdown",
				) as HTMLSelectElement;
				if (select) {
					select.value = "randomLocation";
					const event = new Event("change", { bubbles: true });
					select.dispatchEvent(event);
				}
			}, 1000); // Adding a delay to ensure the map has fully loaded before switching
		},
		[updateInfoWindow],
	);

	useEffect(() => {
		if (map) {
			// Check if the control already exists
			if (document.getElementById("locationDropdown")) {
				return;
			}

			// Create a custom control to house the dropdown
			const controlDiv = document.createElement("div");

			// Apply Google Maps styling to the dropdown container
			controlDiv.style.backgroundColor = "#fff";
			controlDiv.style.border = "2px solid #fff";
			controlDiv.style.borderRadius = "3px";
			controlDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
			controlDiv.style.cursor = "pointer";
			controlDiv.style.marginBottom = "0px";
			controlDiv.style.marginLeft = "10px";
			controlDiv.style.textAlign = "center";
			controlDiv.style.width = "200px";
			controlDiv.style.padding = "10px";

			// Create and style the select element
			const select = document.createElement("select");
			select.id = "locationDropdown";
			select.style.backgroundColor = "#fff";
			select.style.border = "none";
			select.style.outline = "none";
			select.style.width = "100%";
			select.style.height = "30px";
			select.style.fontSize = "16px";

			// Populate the dropdown with location options
			Object.keys(locations).forEach((key) => {
				const option = document.createElement("option");
				option.value = key;
				option.text = locations[key].name;
				select.appendChild(option);
			});

			select.value = "randomLocation"; // Set initial selection to "The Hangar"
			select.addEventListener("change", handleLocationChange);

			controlDiv.appendChild(select);
			map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(
				controlDiv,
			);
		}
	}, [map]);

	return isLoaded ? (
		<div className={`w-full ${className}`}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={locations.randomLocation.center}
				zoom={13}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={{ styles: mapStyles }}
			>
				<Marker
					position={locations.helicopterServices.center}
					onClick={() => handleMarkerClick("helicopterServices")}
				/>
				<Marker
					position={locations.randomLocation.center}
					onClick={() => handleMarkerClick("randomLocation")}
				/>
			</GoogleMap>
		</div>
	) : (
		<></>
	);
};

export default React.memo(GMap);
