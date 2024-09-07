'use client'
import {
  CommunityLite,
  EventLite,
  PaginationMeta,
  Reservation,
  space,
  spaceType,
} from '@/data/types'
import React, { createContext, useState, useContext, ReactNode } from 'react'

interface PageContextType {
  title: string
  setTitle: (title: string) => void
  search: string
  setSearch: (search: string) => void
  page: number
  setPage: (page: number) => void
  space: space | null | undefined
  setSpace: (space: space) => void
  spaceType: spaceType
  setSpaceType: (space: spaceType) => void
  events: {
    events: EventLite[]
    paginationMeta: PaginationMeta
  } | null
  setEvents: (
    value: {
      events: EventLite[]
      paginationMeta: PaginationMeta
    } | null,
  ) => void
  communities: {
    communities: CommunityLite[]
    paginationMeta: PaginationMeta
  } | null
  setCommunities: (
    value: {
      communities: CommunityLite[]
      paginationMeta: PaginationMeta
    } | null,
  ) => void
  reservations: {
    reservations: Reservation[]
    paginationMeta: PaginationMeta
  } | null
  setReservations: (
    value: {
      reservations: Reservation[]
      paginationMeta: PaginationMeta
    } | null,
  ) => void
}

const PageContext = createContext<PageContextType | undefined>(undefined)

interface PageProviderProps {
  children: ReactNode
}

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [title, setTitle] = useState('Title')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [spaceType, setSpaceType] = useState<spaceType>('personal')
  const [space, setSpace] = useState<space | null | undefined>(null)

  const [events, setEvents] = useState<EventLite[] | null>(null)
  const [communities, setCommunities] = useState<{
    communities: CommunityLite[]
    paginationMeta: PaginationMeta
  } | null>(null)
  const [reservations, setReservations] = useState<Reservation[] | null>(null)

  return (
    <PageContext.Provider
      value={{
        title,
        setTitle,
        search,
        setSearch,
        page,
        setPage,
        spaceType,
        setSpaceType,
        space,
        setSpace,
        events,
        setEvents,
        communities,
        setCommunities,
        reservations,
        setReservations,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const usePage = (): PageContextType => {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error('usePage must be used within a PageProvider')
  }
  return context
}
