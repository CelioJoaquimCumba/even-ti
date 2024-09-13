import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/app/components/atoms/table'

export default function ParticipantsList() {
  return (
    <div className="flex flex-col gap-4 p-2 md:p-4 bg-white rounded-md">
      <h3 className="text-2xl text-gray-600 font-medium">Participantes</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Género</TableHead>
            <TableHead>Profissão</TableHead>
            <TableHead>Data do RSVP</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>celio</TableCell>
            <TableCell>celio.joaquim.cumba@gmail.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
