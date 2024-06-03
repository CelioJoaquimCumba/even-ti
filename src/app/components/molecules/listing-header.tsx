import { useState } from "react";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../atoms/select";

const filters = [
    {
        id: '1',
        label: 'comunidade',
        options: [
            {
                label: 'comunidade 1',
                value: '1'
            },
            {
                label: 'comunidade 2',
                value: '2'
            },
            {
                label: 'comunidade 3',
                value: '3'
            }
        ]
    },
    {
        label: 'Data',
        id: '2',
        options: [
            {
                label: 'Jan-Feb',
                value: '1'
            },
            {
                label: 'Mar-Abr',
                value: '2'
            },
            {
                label: 'Mai-Jun',
                value: '3'
            },
            {
                label: 'Jul-Ago',
                value: '4'
            },
            {
                label: 'Set-Out',
                value: '5'
            },
            {
                label: 'Nov-Dec',
                value: '6'
            }
        ]
    },
    {
        label: 'Local',
        id: '3',
        options: [
            {
                label: 'Incubadora',
                value: '1'
            },
            {
                label: 'ISUTC',
                value: '2'
            },
            {
                label: 'Online',
                value: '3'
            },
            {
                label: 'FENG',
                value: '4'
            }
        ]
    },
]

export function ListingHeader () {
    const [searchInput, setSearchInput] = useState('')
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className="flex flex-row p-4 bg-white rounded-md space-x-8">
            <form className="flex w-full items-center space-x-2" onSubmit={handleSearch}>
                <Input type="text" placeholder="Pesquise o evento" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <Button type="submit">Pesquisar</Button>
            </form>
            <div className="flex space-x-2">
                {filters.map((filter) => (
                    <Select key={filter.id}>
                        <SelectTrigger className="flex space-x-2">
                            <SelectValue placeholder={filter.label}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{filter.label}</SelectLabel>
                                {filter.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                ))}
            </div>
        </div>
    )
}