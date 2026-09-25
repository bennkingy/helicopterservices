"use client";

import { Mail, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type Popup = {
	id: string;
	startDate: string;
	endDate: string;
	showOn: "homepage" | "all";
	link: string | null;
	ctaLabel: string | null;
	ctaText: string | null;
	delaySeconds: number;
	image: { src: string; alt: string; width: number; height: number };
};

// Each advert is dismissed separately, so a new one still shows to visitors
// who closed an earlier one.
const storageKey = (id: string) => `promo_popup_dismissed:${id}`;

const isDismissed = (id: string) => {
	try {
		return Boolean(localStorage.getItem(storageKey(id)));
	} catch {
		return false;
	}
};

export default function PromoPopup({ popups }: { popups: Popup[] }) {
	const pathname = usePathname();
	const [popup, setPopup] = useState<Popup | null>(null);

	useEffect(() => {
		const now = Date.now();
		const active = popups.find(
			(item) =>
				(item.showOn === "all" || pathname === "/") &&
				new Date(item.startDate).getTime() <= now &&
				now < new Date(item.endDate).getTime() &&
				!isDismissed(item.id),
		);
		if (!active) return;
		const timer = setTimeout(
			() => setPopup(active),
			Math.max(0, active.delaySeconds) * 1000,
		);
		return () => clearTimeout(timer);
	}, [popups, pathname]);

	useEffect(() => {
		if (!popup) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") dismiss();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});

	function dismiss() {
		if (popup) {
			try {
				localStorage.setItem(storageKey(popup.id), "true");
			} catch {
				// Without storage the popup simply shows again next visit.
			}
		}
		setPopup(null);
	}

	if (!popup) return null;

	const external = popup.link ? !popup.link.startsWith("/") : false;
	const hasCta = popup.ctaLabel || popup.ctaText;

	const content = (
		<>
			<Image
				src={popup.image.src}
				alt={popup.image.alt}
				width={popup.image.width}
				height={popup.image.height}
				className="w-full h-auto"
				priority
			/>
			{hasCta && (
				<div className="flex flex-col items-center gap-0.5 bg-brand-dark-blue group-hover:bg-brand-medium-blue transition-colors py-3 px-4 text-center">
					{popup.ctaLabel && (
						<span className="text-brand-light-blue text-xs font-bold uppercase tracking-widest">
							{popup.ctaLabel}
						</span>
					)}
					{popup.ctaText && (
						<span className="flex items-center gap-1.5 text-white text-sm font-bold">
							{popup.link?.startsWith("mailto:") && (
								<Mail className="h-4 w-4 shrink-0" />
							)}
							{popup.ctaText}
						</span>
					)}
				</div>
			)}
		</>
	);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes it too
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
			onClick={dismiss}
			role="dialog"
			aria-modal="true"
			aria-label={popup.image.alt}
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: only stops the backdrop click */}
			<div
				className="relative w-full max-w-md max-h-full overflow-y-auto"
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					onClick={dismiss}
					aria-label="Close"
					className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
				>
					<X className="h-4 w-4 text-gray-700" />
				</button>
				{popup.link ? (
					<a
						href={popup.link}
						className="group block rounded-xl shadow-2xl overflow-hidden"
						onClick={dismiss}
						{...(external && !popup.link.startsWith("mailto:") && !popup.link.startsWith("tel:")
							? { target: "_blank", rel: "noopener noreferrer" }
							: {})}
					>
						{content}
					</a>
				) : (
					<div className="rounded-xl shadow-2xl overflow-hidden">{content}</div>
				)}
			</div>
		</div>
	);
}
