import Navbar from "@/components/dashboard/Navbar";
import SidebarLeft from "@/components/dashboard/SidebarLeft";
import { useState } from "react";

export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="min-h-screen w-full">
                {/* Navbar */}
                <Navbar />

                <div className="flex flex-1 h-full overflow-x-hidden">
                    <div className="flex-shrink-0 w-64">
                        {/* Left Sidebar */}
                        <div className={`transition-all duration-1000 ease-in-out ${isSidebarOpen ? 'mr-20' : 'mr-20'}`}>
                            <SidebarLeft isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                        </div>
                    </div>

                    <main className={`flex-grow transition-all duration-1000 ease-in-out`}>
                        {/* Contenu principal */}
                    </main>

                    <div className="flex-shrink-0 w-64 ml-20">
                        {/* Right Sidebar */}
                    </div>
                </div>
            </div>
        </>
    );
}
