import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { Toaster } from "./toaster";
import { useToast } from "./use-toast";

const meta: Meta = { title: "UI kit/Overlays", parameters: { layout: "padded" } };
export default meta;

export const DialogExample: StoryObj = {
	name: "Dialog",
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Weather update</DialogTitle>
					<DialogDescription>Today&apos;s flights are going ahead as planned.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button>OK</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

export const DrawerExample: StoryObj = {
	name: "Drawer",
	render: () => (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">Open drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Opening hours</DrawerTitle>
					<DrawerDescription>Monday to Friday, 8:30am to 5:00pm. Weekends by appointment.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
};

export const DropdownExample: StoryObj = {
	name: "Dropdown menu",
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Fleet</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Single engine</DropdownMenuLabel>
				<DropdownMenuItem>Robinson R22</DropdownMenuItem>
				<DropdownMenuItem>Robinson R44</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Twin engine</DropdownMenuLabel>
				<DropdownMenuItem>AS355 Twin Squirrel</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

function ToastDemo() {
	const { toast } = useToast();
	return (
		<>
			<Button onClick={() => toast({ title: "Enquiry sent", description: "We'll get back to you within 24 hours." })}>
				Show toast
			</Button>
			<Toaster />
		</>
	);
}
export const Toast: StoryObj = { render: () => <ToastDemo /> };
