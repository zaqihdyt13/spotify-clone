import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";

const HeaderSidebar = () => {
    return (
        <div className="bg-neutral-900 w-full py-4 px-3 rounded-lg">
            <Link to={"/"} className="w-full flex items-center text-zinc-400 hover:text-white transition-all gap-4">
                <span><GoHome className="text-3xl"/></span>
                <h3 className="text-md font-bold">Home</h3>
            </Link>
            <Link to={"/search"} className="w-full flex items-center text-zinc-400 hover:text-white transition-all gap-4 mt-4">
                <span><FiSearch className="text-3xl"/></span>
                <h3 className="text-md font-bold">Search</h3>
            </Link>
        </div>
    )
}

export default HeaderSidebar