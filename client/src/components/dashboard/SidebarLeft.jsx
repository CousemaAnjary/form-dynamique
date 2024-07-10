import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import SidebarToggleButton from "../dashboard/SidebarToggleButton";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Plus } from 'lucide-react';

export default function SidebarLeft({ isOpen, toggleSidebar }) {
    const getInitialSidebarState = () => {
        const savedSidebarState = localStorage.getItem('sidebarOpen');
        return savedSidebarState !== null ? JSON.parse(savedSidebarState) : isOpen;
    };

    const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (toggleSidebar) toggleSidebar(!sidebarOpen);
    };

    return (
        <div className={`fixed left-0 h-screen bg-white text-gray-200 shadow-md   ${sidebarOpen ? 'w-64' : 'w-24'}`}>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-center justify-between">
                    {sidebarOpen ? (
                        <Button className="flex items-center space-x-2 w-full justify-center p-3 py-7 mb-2 text-base bg-blue-900">
                            Nouveau
                        </Button>) : (
                        <Button className="flex items-center space-x-2 w-full justify-center p-3 py-7 mb-2 text-base bg-blue-900">
                            < Plus size={26} className="text-white" />
                        </Button>
                    )}


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
                    {/* <Link to="/friendzy/invitation">
                        <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start p-3 py-6 ps-5">
                            <LiaUserFriendsSolid size={24} className="text-black mr-2" />
                            {sidebarOpen && <p className="text-base font-semibold leading-7 text-black">Invitations</p>}
                        </Button>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}
