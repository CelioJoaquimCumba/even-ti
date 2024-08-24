'use client'
import { space } from '@/data/types'
import React, { createContext, useState, useContext, ReactNode } from 'react'

interface PageContextType {
  title: string
  setTitle: (title: string) => void
  search: string
  setSearch: (search: string) => void
  page: number
  setPage: (page: number) => void
  space: space
  setSpace: (space: space) => void
}

const PageContext = createContext<PageContextType | undefined>(undefined)

interface PageProviderProps {
  children: ReactNode
}

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [title, setTitle] = useState('Title')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [space, setSpace] = useState<space>('personal')

  return (
    <PageContext.Provider
      value={{
        title,
        setTitle,
        search,
        setSearch,
        page,
        setPage,
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
