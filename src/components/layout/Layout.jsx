import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import PropTypes from "prop-types";
import axios from "axios";
import "../../App.css";

const client_id = "437a4a8e594d4e84baee87e3bfb2bb03";
const client_secret = "daa84a3fdc20411bb3b7cb84aea0abd3";

const Layout = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const authOptions = async () => {
      try {
        const credentials = `${client_id}:${client_secret}`;
        const base64Credentials = btoa(credentials);
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",

          {
            headers: {
              Authorization: `Basic ${base64Credentials}`,
              // Authorization: `Bearer ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        );
        setAccessToken(response.data?.access_token);
      } catch (err) {
        console.log("Error to get token:", err);
      }
    };

    authOptions();
  }, []);

  // useEffect(() => {
  //   const authParameters = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://accounts.spotify.com/api/token",
  //         "grant_type=client_credentials&client_id=" +
  //           CLIENT_ID +
  //           "&client_secret=" +
  //           CLIENT_SECRET,
  //         {
  //           headers: {
  //             "content-type": "application/x-www-form-urlencoded",
  //           },
  //         }
  //       );
  //       setAccessToken(response.data.access_token);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   authParameters();
  // }, []);

  return (
    <div className="bg-black h-screen w-full flex gap-2 py-2 px-2">
      {/* <Sidebar accessToken={accessToken} /> */}
      <Sidebar accessToken={accessToken} />
      <div className="children w-full bg-neutral-900 rounded-lg overflow-hidden hover:overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.array,
};

export default Layout;
