"use client";

import { Icons } from "@/components/ui/icons";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import { LightGallery as ILightGallery } from "lightgallery/lightgallery";
import lgVideo from "lightgallery/plugins/video";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

type props = {
	className?: string;
	children: any;
	galleryType: "3d-video" | "video" | "gallery" | "gallery-single";
};

const Gallery = forwardRef(
	({ className, galleryType, children }: props, ref) => {
		let lightGalleryRef = useRef<ILightGallery>(null);

		const onInit = useCallback((detail: { instance: any }): any => {
			if (detail) {
				// @ts-ignore
				lightGalleryRef.current = detail.instance;
			}
		}, []);

		useImperativeHandle(ref, () => ({
			openGallery,
		}));

		const openGallery = () => {
			lightGalleryRef?.current?.openGallery();
		};

		return (
			<div className={`relative group ${className}`}>
				{galleryType === "video" && (
					<Image
						priority
						src={"/images/3d-rotate-circle.svg"}
						width={140}
						height={140}
						alt="hero image example"
						onClick={openGallery}
						className="w-[100px] sm:w-[140px] h-[100px] sm:h-[140px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-none z-[1] group-hover:opacity-80 -mt-[17px]"
					/>
				)}
				<LightGallery
					onInit={onInit}
					// @ts-ignore
					ref={lightGalleryRef}
					plugins={[lgZoom, lgVideo]}
					mode="lg-fade"
					// hideScrollbar={true}
					autoplayFirstVideo={
						galleryType === "video" || galleryType === "3d-video"
					}
					youTubePlayerParams={{
						autoplay: 1,
						mute: 1,
						controls: 1,
						showinfo: 0,
						rel: 0,
						loop: 1,
					}}
					addClass="lightbox-gallery"
					elementClassNames={galleryType}
					mobileSettings={{
						controls: true,
						showCloseIcon: true,
						download: true,
						rotate: false,
					}}
				>
					{children}
				</LightGallery>
				<div className="flex mt-4 cursor-pointer items-center text-brand-light-blue transition-colors hover:text-foreground h-[20px]">
					<div>
						<Icons.max height={11} width={11} className="ml-2" />
					</div>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<p className="ml-2 text-sm" onClick={openGallery}>
						{galleryType === "gallery" || galleryType === "gallery-single"
							? "Enlarge and view"
							: "3D view"}
					</p>
				</div>
			</div>
		);
	},
);

Gallery.displayName = "Gallery";

export default Gallery;
