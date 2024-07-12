import { MoreHorizontal } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { getProjects } from '@/services/projectService'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function Content() {

    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate();
    const [records, setRecords] = useState([])
    const [filter, setFilter] = useState('')

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Récupérer la liste des projets depuis l'api
                const projectsData = await getProjects()
                setRecords(projectsData) // Mettre à jour les données des projets

            } catch (error) {
                console.error('Erreur lors de la récupération des projets : ', error)
            }
        }
        fetchProjects() // Appeler la fonction fetchProjects    
    }, []) // [] pour exécuter le code une seule fois après le premier rendu

    // Colonnes du tableau
    const columns = [
        {
            name: 'Nom du projet',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Statut',
            selector: row => row.status,
            sortable: true,
        },
        // {
        //     name: 'Date de modification',
        //     selector: row => new Date(row.updated_at).toLocaleDateString(),
        //     sortable: true,
        // },
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
    ]

    // Styles personnalisés pour le tableau
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
    }

    // Filtrer les projets
    const handlerFilter = (e) => {
        setFilter(e.target.value);
    }

    // Filtrer les projets en fonction du texte de recherche
    const filteredRecords = records.filter((row) =>
        row.title.toLowerCase().includes(filter.toLowerCase())
    )

    // Rediriger vers le formulaire de création/modification d'un projet
    const handleRowClick = (row) => {
        navigate(`/new-form/${row.id}`)
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="p-5 shadow-sm">
            <div className="mb-4">
                <Input
                    type="search"
                    placeholder="Rechercher un projet ..."
                    value={filter}
                    onChange={handlerFilter}
                    className="mb-2"
                />
            </div>
            <DataTable
                title="Liste des projets"
                columns={columns}
                data={filteredRecords}
                pagination
                selectableRows
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
                onRowClicked={handleRowClick}
            />
        </div>
    )
}
