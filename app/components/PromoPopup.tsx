"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Mail } from "lucide-react";

const STORAGE_KEY = "promo_popup_dismissed";

export default function PromoPopup() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (localStorage.getItem(STORAGE_KEY)) return;

		const timer = setTimeout(() => setVisible(true), 4000);
		return () => clearTimeout(timer);
	}, []);

	function dismiss() {
		localStorage.setItem(STORAGE_KEY, "true");
		setVisible(false);
	}

	if (!visible) return null;

	return (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
			onClick={dismiss}
		>
			<div
				className="relative w-full max-w-md"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={dismiss}
					aria-label="Close"
					className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
				>
					<X className="h-4 w-4 text-gray-700" />
				</button>

				{/* Image */}
				<div className="relative overflow-hidden rounded-t-xl shadow-2xl">
					<Image
						src="/images/open-day-v2.png"
						alt="Open Day – Friday 22nd May 2026"
						width={800}
						height={1000}
						className="w-full h-auto"
						priority
					/>
				</div>

				{/* CTA below image */}
				<a
					href="mailto:mike.burns@helicopterservices.co.uk?subject=Open%20Day%20Registration%20%E2%80%93%2022nd%20May%202026"
					className="flex flex-col items-center gap-0.5 rounded-b-xl bg-brand-dark-blue py-3 px-4 text-center hover:bg-brand-medium-blue transition-colors"
					onClick={(e) => e.stopPropagation()}
				>
					<span className="text-brand-light-blue text-xs font-bold uppercase tracking-widest">
						Register your place
					</span>
					<span className="flex items-center gap-1.5 text-white text-sm font-bold">
						<Mail className="h-4 w-4 shrink-0" />
						mike.burns@helicopterservices.co.uk
					</span>
				</a>
			</div>
		</div>
	);
}
