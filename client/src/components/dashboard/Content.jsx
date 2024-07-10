import React from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input"

export default function Content() {
    const columns = [
        {
            name: 'Nom du projet',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Statut',
            selector: row => row.statut,
            sortable: true,
        },
        {
            name: 'Date de modification',
            selector: row => row.dateUpdate,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const data = [
        {
            id: 1,
            name: 'Projet 1',
            statut: 'En cours',
            dateUpdate: '12/12/2021',
        },
        {
            id: 2,
            name: 'Projet 2',
            statut: 'Terminé',
            dateUpdate: '12/12/2021',
        },
        // Ajoutez plus de données ici
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // hauteur de ligne
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // marge interne gauche
                paddingRight: '8px', // marge interne droite
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // marge interne gauche
                paddingRight: '8px', // marge interne droite
            },
        },
    };

    const [records, setRecords] = useState(data);

    const handlerFilter = (e) => {
        const newData = data.filter((row) => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setRecords(newData);
    }

    return (
        <div className=" p-5 shadow-sm">
            <div className="mb-4">
                <Input
                    type="search"
                    placeholder="Rechercher un projet ..."
                    onChange={handlerFilter}
                    className="mb-2"
                />
            </div>
            <DataTable
                title="Liste des projets"
                columns={columns}
                data={records}
                pagination
                selectableRows
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
            />
        </div>
    );
}
