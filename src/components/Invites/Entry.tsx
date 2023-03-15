import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

type EntryItem = {
  name: string | null;
  email: string | null;
  id: number;
};

type EntryProps = {
  entries: EntryItem[];
  removeEntry: (id: number) => void;
};

export function Entry({ entries, removeEntry }: EntryProps) {
  console.log(entries);

  return (
    <>
      {entries?.map((entry, index) => (
        <Box key={index} backgroundColor="white" borderRadius="20px" p="10px 10px" display="flex" alignItems="center" justifyContent="space-between" w="80%" mb="0.5rem">
          <Box key={entry.id} mr="2px">{entry.email}</Box>
          <Box>
            <RiCloseCircleLine onClick={() => removeEntry(entry.id)} />
          </Box>
        </Box>
      ))}
    </>
  );
}
