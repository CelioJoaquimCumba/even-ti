'use client'
import { space, spaceType } from '@/data/types'
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
