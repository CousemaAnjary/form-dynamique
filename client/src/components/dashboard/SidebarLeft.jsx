import { useState, useEffect } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import SidebarToggleButton from "./SidebarToggleButton"
import ProjectDialog from '../ProjectDialog'

export default function SidebarLeft({ isOpen, toggleSidebar }) {
    const getInitialSidebarState = () => {
        const savedSidebarState = localStorage.getItem('sidebarOpen');
        return savedSidebarState !== null ? JSON.parse(savedSidebarState) : isOpen
    };

    const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState)

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen))
    }, [sidebarOpen])

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
        if (toggleSidebar) toggleSidebar(!sidebarOpen)
    };

    return (
        <div className={`fixed left-0 h-screen bg-white text-gray-200 shadow-md ${sidebarOpen ? 'w-64' : 'w-24'}`}>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-center justify-between">
                    <ProjectDialog sidebarOpen={sidebarOpen} />
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
