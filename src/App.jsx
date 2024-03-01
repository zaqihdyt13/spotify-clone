import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tracklist from "./pages/Tracklist";
import CategoryDetail from "./pages/CategoryDetail";

const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;

const App = () => {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              accessToken={accessToken}
            />
          }
        />
        <Route path="/search" element={<Search accessToken={accessToken} />} />
        <Route
          path="/playlists/:id"
          element={<Tracklist accessToken={accessToken} />}
        />
        <Route
          path="/categories/:id"
          element={<CategoryDetail accessToken={accessToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
