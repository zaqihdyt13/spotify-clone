import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PlaylistDetail from "./pages/PlaylistDetail";
import Login from "./pages/Login";
import CategoryDetail from "./pages/CategoryDetail";

const client_id = "437a4a8e594d4e84baee87e3bfb2bb03";
const client_secret = "daa84a3fdc20411bb3b7cb84aea0abd3";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  const handleAuthRedirect = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth-url");
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Error getting auth URL:", error.message);
    }
  };

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

  // const handleTokenExchange = async (code) => {
  //   try {
  //     const response = await axios.post('http://localhost:3001/get-token', { code });
  //     setAccessToken(response.data.access_token);
  //   } catch (error) {
  //     console.error('Error getting access token:', error.message);
  //   }
  // };

  // useEffect(() => {
  //   handleTokenExchange()
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              accessToken={accessToken}
              handleAuthRedirect={handleAuthRedirect}
              // handleTokenExchange={handleTokenExchange}
            />
          }
        />
        <Route path="/search" element={<Search accessToken={accessToken} />} />
        <Route
          path="/playlists/:id"
          element={<PlaylistDetail accessToken={accessToken} />}
        />
        <Route
          path="/categories/:id"
          element={<CategoryDetail accessToken={accessToken} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthRedirect={handleAuthRedirect} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
