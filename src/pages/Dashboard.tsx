import React, { useEffect, useState } from "react";
import eventsLocal from "../data/items.json";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Event } from "../components/Event";
import { useAxios } from "../context/AxiosContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

export function Dashboard() {
  const { authAxios } = useAxios();
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:4000/events/userEvents",
      withCredentials: true,
    };

    authAxios(options)
      .then(({ data }) => {
        console.log(data);
        setEvents(data);
        //setAuthed(true);
        //setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        //setAuthed(false);
        //setLoading(false);
      });
  }, []);

  return (
    <Box m="1rem" mb="50vh">
      <Heading mb="1rem">Dashboard</Heading>

      <SimpleGrid columns={[2, null, 4]} spacing="8px" mb="1rem">
        {events.map((event) => (
          <Box key={event._id}>
            <Event {...event} />
          </Box>
        ))}
        <Box>
          <Card
            h="100%"
            objectFit="cover"
            bg="red.500"
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <CardHeader
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontWeight="700"
              textAlign="center"
              flexDir="column"
              height="245px"
            >
              <FiPlusCircle
                onClick={() => navigate("/createEvent")}
                style={{ width: "80px", height: "80px", paddingBottom: "1rem", cursor: "pointer" }}
              />
              <Button
                variant="link"
                color="white"
                onClick={() => navigate("/createEvent")}
              >
                Create New Event
              </Button>
            </CardHeader>
          </Card>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
