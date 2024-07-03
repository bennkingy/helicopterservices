// @ts-nocheck

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import GetInTouch from "./GetInTouch";
import Weather from "./Weather";
import logo from "/public/images/LogoLightV2New.svg";
import { mapLocation } from "@/lib/constants";

async function getNavigationData() {
	let data: any;

	try {
		const response = await fetch(`${process?.env?.CURRENT_URL}/api/navigation`);
		data = await response.json();
	} catch (error) {
		console.error("Failed to fetch navigation data:", error);
	}

	return data;
}

export default async function Footer() {
	const data = await getNavigationData();

	return <></>;
}
