import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const TransferTimesTable = () => {
	return (
		<div className="lg:mr-24">
			<Table className="min-w-[400px]">
				<TableHeader className="text-white hover:opacity-100 pointer">
					<TableRow
						className="text-center font-bold text-white"
						disableHoverEffect
					>
						<TableHead className="text-center  font-bold text-white">
							Departure
						</TableHead>
						<TableHead className="text-center  font-bold text-white">
							Destination
						</TableHead>
						<TableHead className="text-center  font-bold text-white">
							Vehicle Transfer Time
						</TableHead>
						<TableHead className="text-center  bg-brand-dark-blue  font-bold text-white py-2 sm:py-0">
							Helicopter Transfer Time
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="text-center">
					<TableRow>
						<TableCell>Birmingham</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>2hr 20m</TableCell>
						<TableCell className="font-bold bg-muted/50">45m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Bournemouth</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>2hr 10m</TableCell>
						<TableCell className="font-bold bg-muted/50">45m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Biggin Hill</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr</TableCell>
						<TableCell className="font-bold bg-muted/50">15m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>East Midlands</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>2hr 30m</TableCell>
						<TableCell className="font-bold bg-muted/50">55m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Farnborough</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 15m</TableCell>
						<TableCell className="font-bold bg-muted/50">18m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Gatwick</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr</TableCell>
						<TableCell className="font-bold bg-muted/50">15m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Luton</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 10m</TableCell>
						<TableCell className="font-bold bg-muted/50">20m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Oxford</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1h 35m</TableCell>
						<TableCell className="font-bold bg-muted/50">30m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Southampton</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 40m</TableCell>
						<TableCell className="font-bold bg-muted/50">35m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Southend</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 30m</TableCell>
						<TableCell className="font-bold bg-muted/50">25m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Stansted</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 15m</TableCell>
						<TableCell className="font-bold bg-muted/50">25m</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default TransferTimesTable;
