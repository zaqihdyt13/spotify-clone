// import PropTypes from "prop-types"

// const ResultSection = (props) => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentSongId, setCurrentSongId] = useState("");
//     const [currentTrackUrl, setCurrentTrackUrl] = useState("");

//     const handlePlaySong = (id, previewUrl) => {
//         setCurrentSongId(id);
//         setCurrentTrackUrl(previewUrl);
//         setIsPlaying(true);
//       };
    
//       const handleStopSong = () => {
//         setIsPlaying(false);
//       };

//     return (
//         <table className="search-table">
//             <thead className="search-thead bg-neutral-800 text-sm">
//               <tr>
//                 <th className="p-2 text-center text-zinc-400 font-medium">#</th>
//                 <th className="p-2 text-start text-zinc-400 font-medium">
//                   Title
//                 </th>
//                 <th className="p-2 text-start text-zinc-400 font-medium">
//                   Album
//                 </th>
//                 <th className="p-2 text-start text-zinc-400 font-medium">
//                   <CiClock2 />
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {props.searchResults.length > 0 &&
//                 props.searchResults.map((search, index) => (
//                   <tr
//                     key={search.id}
//                     onClick={() =>
//                       isPlaying
//                         ? props.handleStopSong()
//                         : props.handlePlaySong(search.id, search.preview_url)
//                     }
//                     className="p-2 hover:bg-neutral-800 transition duration-300 cursor-pointer"
//                   >
//                     <td className="p-2 text-white text-center">{index + 1}</td>
//                     <td className="p-2">
//                       <div className="flex items-center">
//                         <img
//                           src={search.album.images[0].url}
//                           alt="Album Cover"
//                           className="w-12 h-12 rounded-lg mr-4"
//                         />
//                         <div>
//                           <h3 className="text-white text-md font-bold mt-1">
//                             {search.name}
//                           </h3>
//                           <h5 className="text-zinc-400 text-sm font-semibold">
//                             {search.artists
//                               .map((artist) => artist.name)
//                               .join(", ")}
//                           </h5>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-2">{search.album_type}</td>
//                     <td className="p-2 text-zinc-400">{search.duration_ms}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//     )
// }

// ResultSection.propTypes = {
//     searchResults: PropTypes.array,
//     handleStopSong: PropTypes.func, 
//     handlePlaySong: PropTypes.func 
// }

// export default ResultSection