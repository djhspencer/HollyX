import React from "react";
import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import { FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";

// type EventDetails = {

//   address: string;
//   name: string;
//   budget: string;
//   dateMade: string;
//   eventDate: string;

// }

export function EventSummary({ eventDetails }: any) {
  console.log(eventDetails);
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
          <Box ml="0.5rem">{eventDetails.eventDate}</Box>
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
