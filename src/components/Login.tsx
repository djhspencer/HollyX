import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { AxiosProvider, useAxios } from "../context/AxiosContext";
const { useState } = React;

type LoginProps = {
  pathName: any;
  setLogin: Dispatch<SetStateAction<boolean>>;
}

export function Login({pathName, setLogin}: LoginProps) {
  const { authAxios } = useAxios();
  const { updateAuthState, authState } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangePwd = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      url: "http://localhost:4000/users/login",
      withCredentials: true,
    };

    await authAxios(options)
      .then(({ data }) => {
        console.log(data);
        updateAuthState({
          accessToken: data.accessToken,
          authenticated: true,
        });
        if (pathName != "none") {
          navigate(pathName);
        } else {
          navigate("/dash");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(authState);

  return (
    <>
      <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" w="90%" maxW="400px" borderRadius="20px" backgroundColor="#4bd1cd" p="20px 20px" mt="1rem">
        <FormControl onSubmit={handleSubmit}>
          <Heading mb="1rem" color="white">Log In</Heading>
          <Input
            mb="0.5rem"
            backgroundColor="white"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChangeEmail}
            name="emailText"
            id="email"
            //ref={inputRef}
            required
          />

          <Input
            mb="0.5rem"
            backgroundColor="white"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChangePwd}
            name="passwordtext"
            id="password"
            //ref={inputRef}
            required
          />
          <Button mb="1rem" onClick={handleSubmit}>Log In</Button>
        </FormControl>
        <Button variant="link" color="black" mb="0.5rem" onClick={() => setLogin(false)}>No account? Register here</Button>
      </Box>
      
    </>
  );
}
