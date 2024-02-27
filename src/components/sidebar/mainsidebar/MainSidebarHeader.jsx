import { BiLibrary } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi2";

const MainSidebarHeader = () => {
  return (
    <div className="w-full px-3">
      <div className="w-full flex justify-between items-center">
        <button className="text-zinc-400 hover:text-white transition-all flex items-center gap-2">
          <span>
            <BiLibrary className="text-3xl" />
          </span>
          <h3 className="text-md font-bold">Your Library</h3>
        </button>
        <div className="flex items-center gap-2">
          <button className="text-zinc-400 hover:text-white hover:bg-neutral-800 rounded-full p-2 transition-all">
            <BsPlusLg className="text-xl" />
          </button>
          <button className="text-zinc-400 hover:text-white hover:bg-neutral-800 rounded-full p-2 transition-all">
            <HiArrowRight className="text-xl" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <button className="bg-neutral-800 hover:bg-neutral-700 transition-all text-white py-1 px-3 rounded-full text-sm">
          Playlist
        </button>
      </div>
    </div>
  );
};

export default MainSidebarHeader
