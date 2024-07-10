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

                <div className="flex h-full overflow-x-hidden">
                    {/* Left Sidebar */}
                    <div className={`transition-all duration-700 ${isSidebarOpen ? 'mr-20' : 'mr-20'}`}>
                        <SidebarLeft isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    </div>

                    <main className={`flex-grow transition-all duration-300 ease-in-out mt-12 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                        {/* Contenu principal */}
                        <div className=" bg-black text-white ">
                            dd
                        </div>
                    </main>

                    <div className="flex-shrink-0 ml-28 ">
                        {/* Right Sidebar */}
                    </div>
                </div>
            </div>
        </>
    );
}
