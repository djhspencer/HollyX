import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../context/AxiosContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateEvent.css"

export function CreateEvent() {
  const { authAxios } = useAxios();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventBudget, setEventBudget] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState<any>();

  //console.log(eventDate)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      data: {
        name: eventName,
        address: eventAddress,
        budget: eventBudget,
        eventDate: eventDate,
        owner: "me",
      },
      url: "http://localhost:4000/events/create",
      withCredentials: true,
    };

    await authAxios(options)
      .then(({ data }) => {
        console.log(data);
        navigate("/dash");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" w="100%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        maxW="400px"
        borderRadius="20px"
        backgroundColor="#4bd1cd"
        p="20px 20px"
        mt="1rem"
      >
        <FormControl onSubmit={handleSubmit}>
          <Heading mb="1rem" color="white">
            Make New Event
          </Heading>
          <Input
            mb="0.5rem"
            backgroundColor="white"
            type="text"
            placeholder="Event Name ... Christmas Party"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            name="nameText"
            id="eventName"
            //ref={inputRef}
            required
          />

          <Input
            mb="0.5rem"
            backgroundColor="white"
            type="text"
            placeholder="Address ... 1225 N Pole Ave"
            value={eventAddress}
            onChange={(e) => setEventAddress(e.target.value)}
            name="adressText"
            id="eventAddress"
            //ref={inputRef}
            required
          />

          <Input
            mb="0.5rem"
            backgroundColor="white"
            type="text"
            placeholder="Budget ... $40"
            value={eventBudget}
            onChange={(e) => setEventBudget(e.target.value)}
            name="budgetText"
            id="eventBudget"
            //ref={inputRef}
            required
          />

          {/* <Input
            mb="0.5rem"
            backgroundColor="white"
            type="date"
            placeholder="Date ... 12/25/2022"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            name="dateText"
            id="eventDate"
            //ref={inputRef}
            required
          /> */}

          <DatePicker dateFormat="MMMM d, yyyy h:mmaa" showTimeSelect placeholderText="Select a Date" selected={eventDate} onChange={(eventDate) => setEventDate(eventDate)} />

          {/* <Input
            mb="0.5rem"
            backgroundColor="white"
            type="time"
            placeholder="Time ... 7:00PM"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            name="timeText"
            id="eventTime"
            //ref={inputRef}
            required
          /> */}
          <Button onClick={handleSubmit}>Create Event</Button>
        </FormControl>
      </Box>
    </Box>
  );
}
