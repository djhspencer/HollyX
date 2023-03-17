import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type EventProps = {
  _id: number;
  name: string;
  eventDate: string;
};

export function Event({ _id, name, eventDate }: EventProps) {
  const navigate = useNavigate();

  const evDate = new Date(eventDate).toLocaleDateString('en-us', { day:"numeric", month:"short"}) // "Jul 2021 Friday"
  const evTime = new Date(eventDate).toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric"}) // "Jul 2021 Friday"

  return (
    <Card h="100%" objectFit="cover" bg="#4bd1cd" color="white">
      <Image src="/imgs/gifts.jpg" objectFit="cover" h="120px" />
      <CardHeader display="flex" justifyContent="center" fontWeight="700" textAlign="center">
        <Button variant="link" color="white" onClick={() => navigate(`/event/${_id}`)}>{name}</Button>
      </CardHeader>
      <CardBody display="flex" justifyContent="space-between">
        <Box>{evDate}</Box>
        <Box>{evTime}</Box>

      </CardBody>
    </Card>
  );
}
