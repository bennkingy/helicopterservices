import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

const TransferTimesTable = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Departure</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Standard Transfer Time</TableHead>
            <TableHead className='bg-green-300 text-green-950 font-bold'>Helicopter Transfer Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Birmingham</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>2 hours 20 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 45 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bournemouth</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>2 hours 10 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 45 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Biggin Hill</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 0 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 15 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>East Midlands</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>2 hours 30 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 55 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Farnborough</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 15 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 18 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gatwick</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 0 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 15 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Luton</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 10 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 20 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Oxford</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 35 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 30 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Southampton</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 40 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 35 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Southend</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 30 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 25 mins</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stansted</TableCell>
            <TableCell>Battersea</TableCell>
            <TableCell>1 hour 15 mins</TableCell>
            <TableCell className='bg-green-300 text-green-950'>0 hours 25 mins</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default TransferTimesTable
