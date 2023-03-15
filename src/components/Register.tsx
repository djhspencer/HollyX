import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { AxiosProvider, useAxios } from "../context/AxiosContext";
const { useState } = React;

type RegisterProps = {
  pathName: any;
  setLogin: Dispatch<SetStateAction<boolean>>;
}

export function Register({ pathName, setLogin }: RegisterProps) {
  const { publicAxios } = useAxios();
  const { updateAuthState, authState } = useAuth();

  const location = useLocation();
  console.log(location);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

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
        name: name,
        email: email,
        password: password,
      },
      url: "http://localhost:4000/users/register",
      withCredentials: true,
    };

    await publicAxios(options)
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
    <Box display="flex" justifyContent="center" alignItems="center" mb="2rem">
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        w="90%"
        maxW="400px"
        borderRadius="20px"
        backgroundColor="#4bd1cd"
        p="20px 20px"
        mt="1rem"
      >
        <FormControl onSubmit={handleSubmit}>
          <Heading mb="1rem" color="white">
            Register
          </Heading>

          <Input
            mb="0.5rem"
            backgroundColor="white"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={handleChangeName}
            name="nameText"
            id="name"
            //ref={inputRef}
            required
          />

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
          <Button mb="1rem" onClick={handleSubmit}>
            Register
          </Button>
        </FormControl>
        <Button
          variant="link"
          color="black"
          mb="0.5rem"
          onClick={() => setLogin(true)}
        >
          Already registered? Login here
        </Button>
      </Box>
    </Box>
  );
}
