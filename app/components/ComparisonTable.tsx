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
import StatusIcon from "./StatusIcon";
import TextLink from "./TextLink";

export type Payment = {
	id: string;
	title: string;
	engineType: string;
	capacity: number;
	ifrcapable: boolean | null;
	cruiseSpeed: number;
	base: string;
	workType: any;
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
				className="text-brand-light-blue underline-offset-2 underline uppercase"
			>
				{row.getValue("title")}
			</Link>
		),
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
		cell: ({ row }) => <div>{`${row.getValue("cruiseSpeed")}kts`}</div>,
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
		accessorFn: (row) =>
			// @ts-ignore TODO: fix this hack
			row.original?.workType?.charterHelicopter ? "Yes" : "No",
		id: "charterHelicopter",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Charter
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<>
				{/* // @ts-ignore */}
				<StatusIcon
					status={row.original?.workType?.charterHelicopter}
					className="mx-auto"
				/>
			</>
		),
	},
	{
		accessorFn: (row) => (row.workType.aerialWorkHelicopter ? "Yes" : "No"),
		id: "aerialWorkHelicopter",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Aerial
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div>
				<StatusIcon
					status={row.original?.workType?.aerialWorkHelicopter}
					className="mx-auto"
				/>
			</div>
		),
	},
	{
		accessorFn: (row) => (row.workType.trainingHelicopter ? "Yes" : "No"),
		id: "trainingHelicopter",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Training
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<StatusIcon
				status={row.original?.workType?.trainingHelicopter}
				className="mx-auto"
			/>
		),
	},
];

interface ComparisonTableProps {
	data: any;
}

export function ComparisonTable({ data }: ComparisonTableProps) {
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
					<div className="fixed bg-white w-full z-[2] shadow-md	sm:shadow-none">
						<div className="border-b-4 border-brand-light-blue relative bg-white">
							<h3 className="font-workSans text-xl sm:text-2xl text-brand-dark-blue p-4 font-bold mt-0">
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
					</div>
					<div className="relative z-[1] pt-[64px] md:pt-[70px]">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead
													key={header.id}
													className="text-brand-dark-grey"
												>
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
											className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell
													key={cell.id}
													className="p-0 text-center text-brand-dark-grey"
													style={{ height: 50 }}
												>
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
