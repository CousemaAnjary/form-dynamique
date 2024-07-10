import Content from "@/components/dashboard/Content";
import Navbar from "@/components/dashboard/Navbar";
import SidebarLeft from "@/components/dashboard/SidebarLeft";
import { useState, useEffect } from "react";

export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */
    const getInitialSidebarState = () => {
        const savedSidebarState = localStorage.getItem('sidebarOpen');
        return savedSidebarState !== null ? JSON.parse(savedSidebarState) : true;
    };

    const getInitialContentPosition = () => {
        const savedContentPosition = localStorage.getItem('contentPosition');
        return savedContentPosition !== null ? JSON.parse(savedContentPosition) : 'ml-64';
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);
    const [contentPosition, setContentPosition] = useState(getInitialContentPosition);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
        localStorage.setItem('contentPosition', JSON.stringify(isSidebarOpen ? 'ml-64' : 'ml-20'));
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setContentPosition(isSidebarOpen ? 'ml-20' : 'ml-64');
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="h-full w-full">
                {/* Navbar */}
                <Navbar />

                <div className="flex h-full overflow-x-hidden">
                    {/* Left Sidebar */}
                    <div className={` ${isSidebarOpen ? 'mr-20' : 'mr-20'}`}>
                        <SidebarLeft isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    </div>

                    <main className={`flex-grow transition-all duration-300 ease-in-out mt-12 ${contentPosition}`}>
                        {/* Contenu principal */}
                        <Content />
                    </main>

                    <div className="flex-shrink-0 ml-28">
                        {/* Right Sidebar */}
                    </div>
                </div>
            </div>
        </>
    );
}
