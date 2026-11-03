import type { Meta, StoryObj } from "@storybook/nextjs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./carousel";
import { Icons } from "./icons";
import { Skeleton } from "./skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta = { title: "UI kit/Display", parameters: { layout: "padded" } };
export default meta;

export const AccordionExample: StoryObj = {
	name: "Accordion",
	render: () => (
		<Accordion type="single" collapsible className="max-w-lg">
			<AccordionItem value="1">
				<AccordionTrigger>Is flying safe?</AccordionTrigger>
				<AccordionContent>Yes. Every flight follows CAA rules and our own safety checks.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="2">
				<AccordionTrigger>How long does a PPL take?</AccordionTrigger>
				<AccordionContent>Usually 6 to 12 months, depending on how often you fly.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const AvatarExample: StoryObj = {
	name: "Avatar",
	render: () => (
		<div className="flex gap-4">
			<Avatar>
				<AvatarImage src="/images/ruth2.jpg" alt="Captain Ruth Downey" />
				<AvatarFallback>RD</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>LS</AvatarFallback>
			</Avatar>
		</div>
	),
};

export const BreadcrumbExample: StoryObj = {
	name: "Breadcrumb",
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/fleet">Fleet</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>R44</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const CardExample: StoryObj = {
	name: "Card",
	render: () => (
		<Card className="max-w-sm">
			<CardHeader>
				<CardTitle>Trial lesson</CardTitle>
				<CardDescription>30 minutes in a Robinson R22</CardDescription>
			</CardHeader>
			<CardContent>Take the controls with an instructor.</CardContent>
			<CardFooter>From £199</CardFooter>
		</Card>
	),
};

export const CarouselExample: StoryObj = {
	name: "Carousel",
	render: () => (
		<Carousel className="max-w-md mx-16">
			<CarouselContent>
				{["R22", "R44", "R66", "AS355"].map((name) => (
					<CarouselItem key={name}>
						<div className="h-40 flex items-center justify-center bg-brand-light-grey text-2xl font-bold">
							{name}
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
};

export const IconSet: StoryObj = {
	name: "Icons",
	render: () => (
		<div className="flex flex-wrap gap-6">
			{Object.entries(Icons).map(([name, Icon]) => (
				<div key={name} className="flex flex-col items-center gap-1 text-xs">
					<Icon className="h-6 w-6" />
					{name}
				</div>
			))}
		</div>
	),
};

export const SkeletonExample: StoryObj = {
	name: "Skeleton",
	render: () => (
		<div className="grid gap-2 max-w-sm">
			<Skeleton className="h-6 w-2/3" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-5/6" />
		</div>
	),
};

export const TableExample: StoryObj = {
	name: "Table",
	render: () => (
		<Table className="max-w-lg">
			<TableCaption>Airport transfer times</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Airport</TableHead>
					<TableHead>By helicopter</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Heathrow</TableCell>
					<TableCell>10 minutes</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Gatwick</TableCell>
					<TableCell>25 minutes</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const TabsExample: StoryObj = {
	name: "Tabs",
	render: () => (
		<Tabs defaultValue="ppl" className="max-w-md">
			<TabsList>
				<TabsTrigger value="ppl">PPL(H)</TabsTrigger>
				<TabsTrigger value="cpl">CPL(H)</TabsTrigger>
			</TabsList>
			<TabsContent value="ppl">Private Pilot Licence: fly for fun.</TabsContent>
			<TabsContent value="cpl">Commercial Pilot Licence: fly for a living.</TabsContent>
		</Tabs>
	),
};
