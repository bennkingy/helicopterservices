"use client";

import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border-b font-workSans", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-brand-orange" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// Always rendered, so the content is in the server HTML. Radix's height
// variable never updates when force-mounted, so this animates grid rows
// (0fr to 1fr) instead. It has to be a keyframe animation: Radix zeroes
// transition-duration while it measures, which would skip a transition.
// visibility hides closed content from screen readers and tab order.
const ForceMountedContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, forceMount: _, ...props }, ref) => {
	// The close animation is only added after hydration. Before then nothing
	// stops it, so every closed answer would flash open on page load.
	const [hydrated, setHydrated] = React.useState(false);
	React.useEffect(() => setHydrated(true), []);

	return (
		<AccordionPrimitive.Content
			ref={ref}
			forceMount
			className={cn(
				"grid text-base font-openSans data-[state=closed]:grid-rows-[0fr] data-[state=closed]:invisible data-[state=open]:grid-rows-[1fr] data-[state=open]:animate-accordion-grid-down",
				hydrated && "data-[state=closed]:animate-accordion-grid-up",
			)}
			{...props}
		>
			<div className="min-h-0 overflow-hidden">
				<div className={cn("pb-4 pt-0", className)}>{children}</div>
			</div>
		</AccordionPrimitive.Content>
	);
});

ForceMountedContent.displayName = "ForceMountedContent";

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) =>
	props.forceMount ? (
		<ForceMountedContent ref={ref} className={className} {...props}>
			{children}
		</ForceMountedContent>
	) : (
		<AccordionPrimitive.Content
			ref={ref}
			className="overflow-hidden text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down font-openSans"
			{...props}
		>
			<div className={cn("pb-4 pt-0", className)}>{children}</div>
		</AccordionPrimitive.Content>
	),
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
