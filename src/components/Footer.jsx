import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer ps-8 py-10 mt-8">
      <div className="flex justify-between">
        <div className="flex gap-28">
          <ul>
            <li className="text-white font-bold">Company</li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                About
              </a>
            </li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                Jobs
              </a>
            </li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                For the Record
              </a>
            </li>
          </ul>
          <ul>
            <li className="text-white font-bold">Communities</li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                For Artists
              </a>
            </li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                Developers
              </a>
            </li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                Advertising
              </a>
            </li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                Investors
              </a>
            </li>
            <li>
              <a href="" className="text-zinc-400 hover:text-white font-semibold">
                Vendors
              </a>
            </li>
          </ul>
        </div>

        <ul className="flex gap-4">
          <li>
            <button className="bg-neutral-800 p-3 text-white text-lg rounded-full">
              <FaInstagram />
            </button>
          </li>
          <li>
            <button className="bg-neutral-800 p-3 text-white text-lg rounded-full">
              <FaTwitter />
            </button>
          </li>
          <li>
            <button className="bg-neutral-800 p-3 text-white text-lg rounded-full">
              <FaFacebook />
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <ul>
          <li className="text-white font-bold">Useful links</li>
          <li>
            <a href="" className="text-zinc-400 font-semibold">
              Support
            </a>
          </li>
          <li>
            <a href="" className="text-zinc-400 font-semibold">
              Free Mobile App
            </a>
          </li>
        </ul>
      </div>

      <hr className="my-10" />
      
      <div className="flex">
        <div className="flex gap-4">
          <a href="" className="text-zinc-400 hover:text-white text-sm">Legal</a>
          <a href="" className="text-zinc-400 hover:text-white text-sm">Privacy Center</a>
          <a href="" className="text-zinc-400 hover:text-white text-sm">Privacy Policy</a>
          <a href="" className="text-zinc-400 hover:text-white text-sm">Cookies</a>
          <a href="" className="text-zinc-400 hover:text-white text-sm">About Ads</a>
          <a href="" className="text-zinc-400 hover:text-white text-sm">Accessibility</a>
        </div>
        <p className="ms-auto text-zinc-400 text-sm">© 2024 Spotify AB</p>
      </div>
    </div>
  );
};

export default Footer;
