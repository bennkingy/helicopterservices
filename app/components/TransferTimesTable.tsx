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
		<div className="-mb-4">
			<Table className="min-w-[400px]">
				<TableHeader>
					<TableRow className="text-center font-bold text-brand-light-blue">
						<TableHead className="text-center  font-bold text-brand-light-blue">
							Departure
						</TableHead>
						<TableHead className="text-center  font-bold text-brand-light-blue">
							Destination
						</TableHead>
						<TableHead className="text-center  font-bold text-brand-light-blue">
							Vehicle Transfer Time
						</TableHead>
						<TableHead className="text-center  font-bold text-brand-light-blue pb-2 sm:pb-0">
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
