import { Box, Button, FormControl, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type EntryItem = {
  name: string | null;
  email: string | null;
  id: number;
};

type EntryFormProps = {
  onSubmitt: (entry: EntryItem) => void;
}

export function EntryForm({onSubmitt}: EntryFormProps) {
  const [nameInput, setNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');


  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmitt({
      id: Math.floor(Math.random() * 10000),
      name: nameInput,
      email: emailInput
    });

    setNameInput('');
    setEmailInput('');
  };

  //<Heading mb="0.5rem" as="h2" size="xl" color="white">Add Friends</Heading>

  return (
    <>
      
      <FormControl onSubmit={handleSubmit} className='todo-form'>
        
        <Box>
          <Input
            mb="0.5rem"
            backgroundColor="white"
            placeholder='Name'
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            name='name-input'
            required

          />
          <Input
            mb="0.5rem"
            backgroundColor="white"
            placeholder='Email'
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            name='email-input'
            required

          />
          <Button onClick={handleSubmit}>
            Add Person
          </Button>
        </Box>
      </FormControl>
    </>
  );
}

