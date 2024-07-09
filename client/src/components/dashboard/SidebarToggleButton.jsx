import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "../ui/button";




export default function SidebarToggleButton({ isOpen, toggleSidebar }) {
    return (
        <Button
            variant="outline"
            size="sm"
            className={`absolute transition-all duration-300 ${isOpen ? 'left-60' : 'left-16'} top-20 p-2 py-0 shadow-md bg-white z-10`}
            onClick={toggleSidebar}
        >
            {isOpen ? (
                <ChevronLeft size={15} className='text-slate-800' />
            ) : (
                <ChevronRight size={15} className='text-slate-800' />
            )}
        </Button>
    );
};