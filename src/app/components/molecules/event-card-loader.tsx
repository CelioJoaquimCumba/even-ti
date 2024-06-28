'use client'

import Image from "next/image";
import { Card, CardContent, CardFooter } from "../atoms/card";
import DataWaveEvent from "@/../assets/images/datawave-event.png"
import { Badge } from "../atoms/badge";
import { ClockIcon, SewingPinIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Button } from "../atoms/button";
import { ChevronDown, ChevronUp, Router } from "lucide-react";
import { useState } from "react";
import { SpeakerCard } from "../atoms/speaker-card";
import { EventLite } from "@/data/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function EventCardLoader() {
    return (
        <Card className="flex w-full bg-slate-100 animate-pulse items-center p-4 rounded-2xl gap-6">
            <CardContent className="flex space-y-2 p-0 items-center gap-6">
                <div className={`hidden md:flex md:flex-col w-40 aspect-square bg-slate-300  rounded-3xl`}></div>
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