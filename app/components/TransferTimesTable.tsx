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
		<div>
			<Table className="min-w-[400px]>
				<TableHeader>
					<TableRow className="text-center">
						<TableHead className="text-center">Departure</TableHead>
						<TableHead className="text-center">Destination</TableHead>
						<TableHead className="text-center">Vehicle Transfer Time</TableHead>
						<TableHead className="text-center">
							Helicopter Transfer Time
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="text-center">
					<TableRow>
						<TableCell>Birmingham</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>2hr 20m</TableCell>
						<TableCell>45m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Bournemouth</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>2hr 10m</TableCell>
						<TableCell>45m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Biggin Hill</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr</TableCell>
						<TableCell>15m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>East Midlands</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>2hr 30m</TableCell>
						<TableCell>55m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Farnborough</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 15m</TableCell>
						<TableCell>18m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Gatwick</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr</TableCell>
						<TableCell>15m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Luton</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 10m</TableCell>
						<TableCell>20m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Oxford</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1h 35m</TableCell>
						<TableCell>30m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Southampton</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 40m</TableCell>
						<TableCell>35m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Southend</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 30m</TableCell>
						<TableCell>25m</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Stansted</TableCell>
						<TableCell>Battersea</TableCell>
						<TableCell>1hr 15m</TableCell>
						<TableCell>25m</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default TransferTimesTable;
