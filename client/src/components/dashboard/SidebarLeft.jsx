import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import SidebarToggleButton from "./SidebarToggleButton";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SidebarLeft({ isOpen, toggleSidebar }) {
    const getInitialSidebarState = () => {
        const savedSidebarState = localStorage.getItem('sidebarOpen');
        return savedSidebarState !== null ? JSON.parse(savedSidebarState) : isOpen;
    };

    const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (toggleSidebar) toggleSidebar(!sidebarOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/new-form');
    };

    return (
        <div className={`fixed left-0 h-screen bg-white text-gray-200 shadow-md ${sidebarOpen ? 'w-64' : 'w-24'}`}>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-center justify-between">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center space-x-2 w-full justify-center p-3 py-7 mb-2 text-base bg-blue-900 text-white">
                                {sidebarOpen ? "Nouveau" : <Plus size={26} className="text-white" />}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Créer le projet: Détails du formulaire</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-4">
                                        <Label htmlFor="project-title">Titre du projet (requis)</Label>
                                        <Input
                                            id="project-title"
                                            placeholder="ex: Formulaire de contact, Formulaire d'inscription, etc."
                                        />
                                    </div>
                                    <div className="grid gap-4">
                                        <Label htmlFor="project-description">Description</Label>
                                        <Input
                                            id="project-description"
                                            placeholder="Veuillez saisir une courte description ici"
                                        />
                                    </div>
                                    <div className="grid  gap-4">
                                        <div className="grid gap-4">
                                            <Label htmlFor="project-country">Nom de la table (requis)</Label>
                                            <Input
                                                id="table-name"
                                                placeholder="ex: users, posts, comments, etc."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline">Retour</Button>
                                    <Button type="submit">Créer le formulaire</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <SidebarToggleButton isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} />
                </div>
                <div className="mt-2">
                    {sidebarOpen ? (
                        <div className="mb-2">
                            <span className="text-base leading-7 text-slate-600 font-semibold font-mono">Contenu</span>
                        </div>
                    ) : (
                        <div className="mb-3 flex items-center justify-center">
                            <HiOutlineDotsHorizontal size={24} className="text-black" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
