import { Box, Button, Container, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAxios } from "../context/AxiosContext";

export function Footer() {
  const { publicAxios } = useAxios();
  const { updateAuthState } = useAuth();
  const navigate = useNavigate();


  return (
    <Box
      py="1rem"
      shadow="base"
      display="flex"
      color="white"
      bg="red.800"
      alignItems="center"
      justifyContent="center"
    >
      <Heading my="32">HollyX</Heading>
    </Box>
  );
}
