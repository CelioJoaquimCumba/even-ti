'use client'
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
import { User, PaginationMeta } from '@/data/types'
import { Input } from '@/app/components/atoms/input'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { getMembersOfCommunity } from '@/app/actions/community'

export default function MemberPage() {
  const [members, setMembers] = useState<User[]>()
  const { space } = usePage()
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
    getMembers()
  }, [page])
  const getMembers = async () => {
    if (!space?.id) return
    try {
      setLoading(true)
      const response = await getMembersOfCommunity({
        communityId: space?.id,
        search,
        page,
        isCore: true,
      })
      if (!response) throw new Error('Members not found')
      setMeta(response.paginationMeta)
      setMembers(response.members)
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
    <div className="flex flex-col gap-4 p-2 md:p-4 bg-white rounded-md w-full">
      <h3 className="text-2xl text-gray-600 font-medium">Membros</h3>
      {loading ? (
        <div>
          <span className="w-full animate-pulse aspect-[3/4]">
            carregando...
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-end gap-4">
          <form className="flex items-center space-x-2" onSubmit={getMembers}>
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
              {members?.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>{member.name || '-'}</TableCell>
                  <TableCell>{member.email || '-'}</TableCell>
                  <TableCell>{member.gender || '-'}</TableCell>
                  <TableCell>{member.profession || '-'}</TableCell>
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
