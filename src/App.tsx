import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import { useAxios } from "./context/AxiosContext";
import { useEffect, useCallback, useState } from "react";
import { LoginReg } from "./pages/LoginReg";
import ReqAuth from "./components/ReqAuth";
import { Wishlist } from "./pages/Wishlist";
import { Dashboard } from "./pages/Dashboard";
import { EventPage } from "./pages/EventPage";
import { CreateEvent } from "./pages/CreateEvent";
import { Footer } from "./components/Footer";

function App() {
  const { updateAuthState, authState } = useAuth();
  const { authAxios } = useAxios();
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(() => {
    const options = {
      method: "GET",
      url: "http://localhost:4000/users/refresh",
      withCredentials: true,
    };

    return authAxios(options)
      .then((response) => {
        const accessToken = response.data.accessToken;
        console.log(accessToken);

        updateAuthState({
          accessToken: accessToken,
          authenticated: true,
        });

        setStatus("success");
      })
      .catch((e) => {
        console.error(e);
        updateAuthState({
          accessToken: null,
          authenticated: false,
        });

        setStatus("error");
      });
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status !== "loading") {
    return (
      <>
        <Navbar />
        <Box>
          <Routes>
            <Route path="/login" element={<LoginReg />} />
            <Route element={<ReqAuth />}>
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/createEvent" element={<CreateEvent />} />
              <Route path="/event/:id" element={<EventPage />} />
            </Route>
          </Routes>
        </Box>
        <Footer />
      </>
    );
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default App;

