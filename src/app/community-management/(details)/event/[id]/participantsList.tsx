import { getParticipantsOfEvent } from '@/app/actions/event'
import { Button } from '@/app/components/atoms/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/atoms/pagination'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableCaption,
} from '@/app/components/atoms/table'
import { usePage } from '@/app/providers/PageContext'
import { User, PaginationMeta, Event } from '@/data/types'
import { Input } from '@/app/components/atoms/input'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

export default function ParticipantsList(props: { event: Event | undefined }) {
  const { event } = props
  const [participants, setParticipants] = useState<User[]>()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [meta, setMeta] = useState<PaginationMeta>({
    totalCount: 0,
    page: 0,
    pageSize: 0,
    totalPages: 0,
  })
  const { page, setPage } = usePage()
  useEffect(() => {
    getParticipants()
  }, [page, event])
  const getParticipants = async () => {
    if (!event?.id) return
    try {
      setLoading(true)
      const response = await getParticipantsOfEvent({
        eventId: event.id,
        search,
        page,
      })
      if (!response) throw new Error('Events not found')
      setMeta(response.paginationMeta)
      setParticipants(response.participants)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }
  return (
    <div className="flex flex-col gap-4 p-2 md:p-4 bg-white rounded-md">
      <h3 className="text-2xl text-gray-600 font-medium">Participantes</h3>
      {loading ? (
        <div>
          <span className="w-full animate-pulse aspect-[3/4]">
            carregando...
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-end gap-4">
          <form
            className="flex grow-[2] items-center space-x-2 max-w-lg"
            onSubmit={getParticipants}
          >
            <Input
              type="text"
              placeholder="Pesquise o evento"
              value={search}
              onChange={handleSearch}
            />
            <Button type="submit" variant={'outline'} className="rounded-full">
              <Search className="w-4 h-4" />
            </Button>
          </form>
          <Table>
            <TableCaption>
              {meta && `Resultados encontrados: ${meta.totalCount}`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Género</TableHead>
                <TableHead>Profissão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants?.map((participant) => (
                <TableRow key={participant.email}>
                  <TableCell>{participant.name || '-'}</TableCell>
                  <TableCell>{participant.email || '-'}</TableCell>
                  <TableCell>{participant.gender || '-'}</TableCell>
                  <TableCell>{participant.profession || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              {meta.page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(meta.page - 1)} />
                </PaginationItem>
              )}
              {[...Array(meta.totalPages)].map((_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    isActive={index + 1 === meta.page}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {meta.page < meta.totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(meta.page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
