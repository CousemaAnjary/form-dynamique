import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';


export default function Navbar() {
    return (
        <nav className="bg-white p-4 shadow sticky top-0 z-50">
            <div className="container-fluid mx-20 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="#" className="text-2xl font-bold font-mono text-black">FormFlow</Link>
                </div>

                <div className="flex items-center space-x-4">
                    {/* <Link to="/friendzy/chat">
                        <Button variant="outline" className="p-2 shadow-sm">
                            <MessageSquareMore size={18} />
                        </Button>
                    </Link>
                    <Link to="#">
                        <Button variant="outline" className="p-2 shadow-sm relative">
                            <Bell size={18} />
                        </Button>
                    </Link> */}
                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="relative h-9 w-9 rounded-full">
                                <Avatar >
                                    <AvatarImage src="" alt="avatar" />
                                    <AvatarFallback className="bg-transparent">CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="center" forceMount>
                            <DropdownMenuLabel>Salut👋 Utilisateur</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link to="#">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link to="#">
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Paramètres</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Déconnexion</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
