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
  date: string;
  time: string;
};

export function Event({ _id, name, date, time }: EventProps) {
  const navigate = useNavigate();
  return (
    <Card h="100%" objectFit="cover" bg="#4bd1cd" color="white">
      <Image src="/imgs/gifts.jpg" objectFit="cover" h="120px" />
      <CardHeader display="flex" justifyContent="center" fontWeight="700" textAlign="center">
        <Button variant="link" color="white" onClick={() => navigate(`/event/${_id}`)}>{name}</Button>
      </CardHeader>
      <CardBody display="flex" justifyContent="space-between">
        <Box>{date}</Box>
        <Box>{time}</Box>
      </CardBody>
    </Card>
  );
}
