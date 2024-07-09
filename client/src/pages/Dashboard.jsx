import Navbar from "@/components/dashboard/Navbar";

export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="min-h-screen w-full">
                {/* Navbar */}
                <Navbar />

                <div className="flex flex-1 mt-10 h-full overflow-x-hidden">
                    {/* Left Sidebar */}

                    <main className={`flex-grow  transition-all duration-300 `}>
                        {/* Contenu principal */}
                    </main>

                    <div className="flex-shrink-0 w-64 ml-20">
                        {/* Right Sidebar */}
                    </div>

                </div>
            </div>
        </>
    )
}