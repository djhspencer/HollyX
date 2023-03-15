import {
  Box,
  Button,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AxiosProvider, useAxios } from "../context/AxiosContext";


export function RSVPForm({id, onUpdate}: any) {
  const { authAxios } = useAxios()
  const [value, setValue] = useState<string>();

  const handleSubmit = async (e: any) => {
    //e.preventDefault();

    const options = {
      method: "POST",
      data: {
        value: value,
        eventId: id
      },
      url: "http://localhost:4000/events/rsvp",
      withCredentials: true,
    };

    await authAxios(options)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (value == "1") {
      onUpdate("participant")
    }

    else if (value == "0") {
      onUpdate("declined")
    }

    window.location.reload();
  };

  return (
    <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" borderRadius="20px" backgroundColor="white" p="1rem" mt="1rem">
      <Box mb="1rem">Will you be attending this exchange?</Box>
      <RadioGroup onChange={setValue} value={value} mb="1rem">
        <Stack direction="row">
          <Radio value="1">Yes</Radio>
          <Radio value="0">No</Radio>
        </Stack>
      </RadioGroup>
      <Button colorScheme="teal" onClick={handleSubmit}>RSVP</Button>
    </Box>
  );
}

{
  /* <FormControl>
<Input type="radio" id="html" name="fav_language" value="HTML">
<label htmlFor="html">HTML</label>
<Input type="radio" id="css" name="fav_language" value="CSS">
<label htmlFor="css">CSS</label>
</FormControl> */
}
