import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        
    }

    return (
        <nav className="bg-dark-2 flex h-[65px] w-full shrink-0 items-center px-9 text-dark-gray">
            <div className="flex justify-between w-full min-w-[500px]">
                <div>
                    <Link to="/"> Coderoyale </Link>
                    <Link to="/"> SomeLink </Link>
                    <Link to="/"> SomeLink </Link>
                    <Link to="/"> SomeLink </Link>
                </div>
                <div>
                    <Link to="/"> SomeLink </Link>
                    Sign In
                </div>
            </div>
        </nav>
    )
}