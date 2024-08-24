'use client'

import { Card, CardContent, CardFooter } from '../../atoms/card'

export function EventCardLoader() {
  return (
    <Card className="flex flex-col justify-start items-start md:flex-row w-full bg-slate-100 animate-pulse md:items-center p-4 rounded-2xl gap-6">
      <CardContent className="flex space-y-2 p-0 items-center gap-6">
        <div
          className={`hidden md:flex md:flex-col w-40 aspect-square bg-slate-300  rounded-3xl`}
        ></div>
        <div className="w-40 aspect-square bg-slate-300  rounded-3xl"></div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start p-0">
        <div className="flex w-24 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
        <div className="flex w-28 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
        <div className="flex w-40 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
        <div className="flex w-64 h-4 justify-between bg-slate-300 animate-pulse rounded-full"></div>
      </CardFooter>
    </Card>
  )
}
