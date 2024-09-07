'use client'

import { Card, CardContent, CardFooter } from '../../atoms/card'

export function ProfileCardLoader() {
  return (
    <Card className="flex flex-col justify-start items-start w-full bg-slate-100 animate-pulse p-8 rounded-2xl gap-6">
      <CardContent className="flex space-y-2 p-0 items-center gap-6">
        <div className="w-48 aspect-square bg-slate-300  rounded-full"></div>
        <div className="flex flex-col md:flex-row gap-2 items-start">
          <div className="flex flex-col gap-2">
            <div className="flex w-24 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
            <div className="flex w-28 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
            <div className="flex w-40 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
            <div className="flex w-64 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-24 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
            <div className="flex w-28 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
            <div className="flex w-40 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
            <div className="flex w-64 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start p-0">
        <div className="flex w-80 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
        <div className="flex w-96 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
        <div className="flex w-64 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
      </CardFooter>
    </Card>
  )
}
