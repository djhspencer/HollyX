import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { AxiosProvider, useAxios } from "../context/AxiosContext";
const { useState } = React;

export function LoginReg() {
  const [login, setLogin] = useState<boolean>(true);
  const { authAxios } = useAxios();
  const { updateAuthState, authState } = useAuth();
  let pathName = "none";

  const location = useLocation();
  if (location?.state?.from?.pathname != null) {
    pathName = location?.state?.from?.pathname
    console.log("updated the path")
  }
  console.log(location);
  console.log(authState);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb="50vh" mt="8">

      {(login) ? <Login setLogin={setLogin} pathName={pathName}/> : <Register setLogin={setLogin} pathName={pathName}/>}
    </Box>
  );
}
