'use client'
import { CommunityCard } from "@/app/components/molecules/community-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/atoms/pagination";
import { usePage } from "@/app/providers/TitleContext";
import { useState, useEffect } from "react";
import { PaginationMeta } from "@/data/types";
import { CommunityCardLoader } from "@/app/components/molecules/community-card-loader";


const communities = [
    {
        id: "1",
        community: "DataWave",
        location: "Maputo, Mozambique",
        logo: "https://firebasestorage.googleapis.com/v0/b/even-ti.appspot.com/o/communities%2Fmozdevz%2Fmozdevz.png?alt=media&token=98274d48-f24a-4859-a272-f85974f7ac35",
        description: "DataWave Community is a community of DataWave contributors. We are always looking for new contributors. Join us and get your questions answered!",
    }
]
export default function CommunityPage ()  {
    const {setTitle, search, page, setPage} = usePage()
  const [isLoading, setIsLoading] = useState(false)
    const [meta, setMeta] = useState<PaginationMeta>({
        totalCount: 0,
        page: 0,
        pageSize: 0,
        totalPages: 0
    })
    useEffect(() => {
        setTitle('Comunidades')
    })
    return (
        <main className="flex w-full h-full flex-col items-center gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
        {
            isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full gap-2 md:gap-6 overflow-y-auto">{[1,2,3].map((_event, index) => <CommunityCardLoader key={index} />) }</div>  : !communities || communities.length === 0 ?
            'Resultados não encontrados' :
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full gap-2 md:gap-6 overflow-y-auto ">
                {communities.map((community: any) => <CommunityCard key={community.id} community={community} />)}
            </div>
            <Pagination >
                <PaginationContent>
                { meta.page > 1 && <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(meta.page - 1)} />
                </PaginationItem>}
                {
                    [...Array(meta.totalPages)].map((_, index) => <PaginationItem key={index + 1}>
                    <PaginationLink isActive={index + 1 === meta.page} onClick={() => setPage(index + 1)}>{index + 1}</PaginationLink>
                    </PaginationItem>)
                }
                { meta.page < meta.totalPages && <PaginationItem>
                    <PaginationNext onClick={() => setPage(meta.page + 1)} />
                </PaginationItem>}
                </PaginationContent>
            </Pagination>
            </>
        }
        </main>
    );
}