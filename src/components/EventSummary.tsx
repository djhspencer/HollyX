import React from "react";
import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import { FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";

// type EventDetails = {

//   address: string;
//   name: string;
//   budget: string;
//   dateMade: string;
//   eventDate: string;

// }

export function EventSummary({ eventDetails }: any) {
  console.log(eventDetails);
  const evDate = new Date(eventDetails.eventDate).toLocaleDateString('en-us', { day:"numeric", month:"short", year:"numeric"}) // "Jul 2021 Friday"
  const evTime = new Date(eventDetails.eventDate).toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric"}) // "Jul 2021 Friday"
  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Box w="90%" maxW="400px" mb="1rem">
        <Box fontWeight="700" fontSize="24">
          {eventDetails.name}
        </Box>
        <Box fontWeight="200" color="gray" fontSize="16" mb="1.5rem">
          Hosted by: {eventDetails.owner}
        </Box>
        <Box display="flex" alignItems="center" mb="0.5rem">
          <FiCalendar color="teal" />
          <Box ml="0.5rem">{evDate}</Box>
        </Box>
        <Box display="flex" alignItems="center" mb="0.5rem">
          <BiTimeFive color="teal" />
          <Box ml="0.5rem">{evTime}</Box>
        </Box>
        <Box display="flex" alignItems="center" mb="0.5rem">
          <FiMapPin color="teal" />
          <Box ml="0.5rem">{eventDetails.address}</Box>
        </Box>
        <Box display="flex" alignItems="center" mb="0.5rem">
          <FiDollarSign color="teal" />
          <Box ml="0.5rem">{eventDetails.budget}</Box>
        </Box>
      </Box>

    </Box>
  );
}
