'use client'
import { CommunityCard } from '@/app/components/molecules/community-card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/atoms/pagination'
import { usePage } from '@/app/providers/PageContext'
import { useState, useEffect } from 'react'
import { PaginationMeta, CommunityLite } from '@/data/types'
import { CommunityCardLoader } from '@/app/components/molecules/community-card-loader'

export default function CommunityPage() {
  const { setTitle, search, page, setPage } = usePage()
  const [isLoading, setIsLoading] = useState(false)
  const [communities, setCommunities] = useState<CommunityLite[]>()
  const [meta, setMeta] = useState<PaginationMeta>({
    totalCount: 0,
    page: 0,
    pageSize: 0,
    totalPages: 0,
  })
  useEffect(() => {
    setTitle('Comunidades')
  })
  useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/community?${search && new URLSearchParams({ search }) + '&'}${new URLSearchParams({ page: page.toString() })}`,
          {
            method: 'GET',
          },
        )
        const data = await response.json()
        setMeta({
          totalCount: data.totalCount,
          page: data.page,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
        })
        const responseCommunities: CommunityLite[] = data.communities.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (community: any) => ({
            ...community,
          }),
        )
        setCommunities(responseCommunities)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [search, page])
  return (
    <main className="flex w-full h-full flex-col items-center gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
      {isLoading ? (
        <div className="flex flex-col h-full w-full gap-2 md:gap-6 overflow-y-auto">
          {[1, 2, 3].map((_community, index) => (
            <CommunityCardLoader key={index} />
          ))}
        </div>
      ) : !communities || communities.length === 0 ? (
        'Resultados não encontrados'
      ) : (
        <>
          <div className="flex flex-col h-full w-full gap-2 md:gap-6 overflow-y-auto ">
            {communities.map((community: CommunityLite) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
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
        </>
      )}
    </main>
  )
}
