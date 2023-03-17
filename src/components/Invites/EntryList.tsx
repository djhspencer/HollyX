import React, { Dispatch, SetStateAction, useState } from "react";
import { EntryForm } from "./EntryForm";
import { Entry } from "./Entry";
import { Box, Button, Heading } from "@chakra-ui/react";

type EntryItem = {
  name: string | null;
  email: string | null;
  id: number;
};

type EntryListProps = {
  updateInvites: (invites: EntryItem[]) => void;
  setShowInvites: Dispatch<SetStateAction<boolean>>;
  sendInvites: () => void;
};

export function EntryList({ updateInvites, setShowInvites, sendInvites }: EntryListProps) {
  const [entries, setEntries] = useState<EntryItem[]>([]);

  const addEntry = (entry: EntryItem) => {
    if (!entry.name || /^\s*$/.test(entry.name)) return;
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    updateInvites(newEntries);
    //console.log(entry, ...Entries);
  };

  const removeEntry = (id: number) => {
    const newEntries = [...entries].filter((entry) => entry.id !== id);
    setEntries(newEntries);
    updateInvites(newEntries);
  };

  const sendInvite = () => {
    sendInvites();
  }

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        w="90%"
        borderRadius="20px"
        backgroundColor="#4bd1cd"
        p="20px 20px"
        mt="1rem"
        shadow="base"
      >
        <Box w="100%" display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
          <Heading mb="0.5rem" as="h2" size="xl" color="white">
            Add Friends
          </Heading>
          <Button onClick={() => setShowInvites(false)}>Cancel</Button>
        </Box>

        <EntryForm onSubmitt={addEntry} />
      </Box>
      {entries.length > 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          w="90%"
          borderRadius="20px"
          backgroundColor="#4bd1cd"
          p="20px 20px"
          mt="1rem"
        >
          <Entry entries={entries} removeEntry={removeEntry} />
          <Button onClick={() => sendInvite()} mt="0.5rem">Send Invites</Button>
        </Box>
      )}
    </Box>
  );
}
