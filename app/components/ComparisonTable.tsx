"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import Modal from "./Modal";
import TextLink from "./TextLink";

const data2 = [
	{
		title: "AB206",
		workType: {
			charterHelicopter: false,
			aerialWorkHelicopter: false,
			trainingHelicopter: true,
		},
		engineType: "Single",
		capacity: 5,
		ifrcapable: null,
		cruiseSpeed: 109,
		base: "White Waltham",
	},
	{
		engineType: "Single",
		capacity: 7,
		ifrcapable: null,
		cruiseSpeed: 122,
		base: "White Waltham",
		title: "AS350",
		workType: {
			aerialWorkHelicopter: false,
			trainingHelicopter: true,
			charterHelicopter: false,
		},
	},
	{
		base: "Bicester",
		title: "AW109",
		workType: {
			aerialWorkHelicopter: false,
			trainingHelicopter: true,
			charterHelicopter: true,
		},
		engineType: "Twin",
		capacity: 5,
		ifrcapable: true,
		cruiseSpeed: 139,
	},
	{
		title: "EC135",
		workType: {
			aerialWorkHelicopter: false,
			trainingHelicopter: false,
			charterHelicopter: true,
		},
		engineType: "twin",
		capacity: 7,
		ifrcapable: true,
		cruiseSpeed: 140,
		base: "Wycombe",
	},
	{
		capacity: 6,
		ifrcapable: true,
		cruiseSpeed: 120,
		base: "White Waltham",
		title: "AS355",
		workType: {
			charterHelicopter: true,
			aerialWorkHelicopter: true,
			trainingHelicopter: true,
		},
		engineType: "Twin",
	},
	{
		title: "B206L",
		workType: {
			trainingHelicopter: true,
			charterHelicopter: true,
			aerialWorkHelicopter: false,
		},
		engineType: "Single",
		capacity: 6,
		ifrcapable: null,
		cruiseSpeed: 110,
		base: "Leeds",
	},
	{
		title: "R66",
		workType: {
			aerialWorkHelicopter: false,
			trainingHelicopter: true,
			charterHelicopter: false,
		},
		engineType: "Single",
		capacity: 5,
		ifrcapable: null,
		cruiseSpeed: 110,
		base: "White Waltham",
	},
	{
		title: "R22",
		workType: { aerialWorkHelicopter: false, trainingHelicopter: true },
		engineType: "Single",
		capacity: 2,
		ifrcapable: null,
		cruiseSpeed: 75,
		base: "White Waltham",
	},
	{
		base: "White Waltham",
		title: "R44",
		workType: {
			charterHelicopter: true,
			aerialWorkHelicopter: true,
			trainingHelicopter: true,
		},
		engineType: "Single",
		capacity: 2,
		ifrcapable: null,
		cruiseSpeed: 100,
	},
	{
		base: "White Waltham",
		title: "A109",
		workType: {
			aerialWorkHelicopter: true,
			trainingHelicopter: true,
			charterHelicopter: true,
		},
		engineType: "Twin",
		capacity: 7,
		ifrcapable: true,
		cruiseSpeed: 136,
	},
	{
		cruiseSpeed: 90,
		base: "White Waltham \t",
		title: "Cabri G2",
		workType: {
			charterHelicopter: false,
			aerialWorkHelicopter: false,
			trainingHelicopter: true,
		},
		engineType: "Single",
		capacity: 2,
		ifrcapable: null,
	},
];

const data: Payment[] = data2.map((item, index) => ({
	id: `generated_${index}`, // Assuming we generate an ID for each entry
	title: item.title,
	engineType: item.engineType,
	capacity: item.capacity,
	ifrcapable: item.ifrcapable,
	cruiseSpeed: item.cruiseSpeed,
	base: item.base,
}));

export type Payment = {
	id: string;
	title: string;
	engineType: string;
	capacity: number;
	ifrcapable: boolean | null;
	cruiseSpeed: number;
	base: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Type
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<Link
				// @ts-ignore
				href={`/fleet/${row.getValue("title").toLowerCase()}`}
				passHref
				className="lowercase text-brand-light-blue underline-offset-2 underline"
			>
				{row.getValue("title")}
			</Link>
		),
	},
	{
		accessorKey: "base",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Base
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue("base")}</div>,
	},
	{
		accessorKey: "engineType",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Engine
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue("engineType")}</div>,
	},
	{
		accessorKey: "capacity",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Capacity
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue("capacity")}</div>,
	},
	{
		accessorKey: "ifrcapable",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				IFR
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue("ifrcapable") ? "Yes" : "No"}</div>,
	},
	{
		accessorKey: "cruiseSpeed",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Cruise Speed
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue("cruiseSpeed")}</div>,
	},
];

export function ComparisonTable() {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<>
			<TextLink
				label="Comparison chart"
				className="mt-8 mb-0"
				onClick={() => {
					setModalOpen(!modalOpen);
				}}
			/>
			<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
				<div className="w-full">
					<div className="border-b-4 border-brand-light-blue relative">
						<h3 className="font-workSans text-2xl text-brand-dark-blue p-4 font-extrabold mt-0">
							Compare fleet helicopters
						</h3>
						<div className="absolute -bottom-[1px] right-0">
							<svg
								className="h-6 w-6 text-brand-light-blue"
								viewBox="0 0 17 17"
								fill="currentColor"
							>
								<polygon points="17 0 17 17 0 17" />
							</svg>
						</div>
					</div>
					<div className="">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center"
										>
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</Modal>
		</>
	);
}
