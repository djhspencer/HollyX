import { Box, Button, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventSummary } from "../components/EventSummary";
import { EntryList } from "../components/Invites/EntryList";
import { RSVPForm } from "../components/RSVPForm";
import { useAxios } from "../context/AxiosContext";

type EntryItem = {
  name: string | null;
  id: number;
};

export function EventPage() {
  const { id } = useParams();
  const [inviteList, setInviteList] = useState<EntryItem[]>([]);
  const { authAxios } = useAxios();
  const [eventDetails, setEventDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [participationSettings, setParticipationSettings] =
    useState<string>("not invited");
  const [owner, setOwner] = useState<boolean>(false);
  const [ShowRSVP, setShowRSVP] = useState<boolean>(false);
  const [showInvites, setShowInvites] = useState<boolean>(false);
  const [errorLoading, setErrorLoading] = useState<boolean>(false);

  const updateInviteList = (invites: EntryItem[]) => {
    setInviteList(invites);
  };

  const sendInvites = () => {
    if (inviteList.length > 0) {
      const options = {
        method: "POST",
        data: { _id: id, invites: inviteList },
        url: "http://localhost:4000/events/sendInvites",
        withCredentials: true,
      };

      return authAxios(options)
        .then(({ data }) => {
          console.log(data);
          window.location.reload();
        })
        .catch((e) => {
          console.error(e);
        });
      
    }
  };

  const loadEvent = useCallback(() => {
    console.log("here");
    const options = {
      method: "POST",
      data: { _id: id },
      url: "http://localhost:4000/events/getOne",
      withCredentials: true,
    };

    return authAxios(options)
      .then(({ data }) => {
        console.log(data[1]);
        const eDetails = data[0][0];
        const userEmail = data[1];

        setEventDetails({
          name: eDetails.name,
          address: eDetails.address,
          budget: eDetails.budget,
          owner: eDetails.owner,
          eventDate: eDetails.eventDate,
          participants: eDetails.participants,
          invitedList: eDetails.invitedList,
          declined: eDetails.declined,
        });

        console.log(userEmail);
        if (eDetails.owner == userEmail) {
          setOwner(true);
        }

        if (eDetails.participants.includes(userEmail)) {
          setParticipationSettings("participant");
        } else if (eDetails.declined.includes(userEmail)) {
          setParticipationSettings("declined");
        } else if (eDetails.invitedList.includes(userEmail)) {
          setParticipationSettings("invited");
        }
        console.log("nothing matched");
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setErrorLoading(true);
      });
  }, []);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  console.log(participationSettings);
  console.log(owner);
  console.log(loading);

  if (!loading && participationSettings != "not invited") {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Image
          src="/imgs/gift2.JPG"
          objectFit="cover"
          w="100%"
          h="200px"
          alt="holiday gifts"
          mb="1rem"
        />
        <EventSummary eventDetails={eventDetails} />
        <Box
          backgroundColor="#C0FFF1"
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          borderRadius="40px 40px 0 0"
          shadow="md"
        >
          {participationSettings == "invited" || ShowRSVP ? (
            <RSVPForm id={id} onUpdate={setParticipationSettings} />
          ) : (
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              borderRadius="20px"
              backgroundColor="white"
              p="1rem"
              mt="1rem"
            >
              <Box mb="1rem">
                {participationSettings == "declined"
                  ? "You have declined the invitation"
                  : "You are attending this exchange!"}
              </Box>
              <Button onClick={() => setShowRSVP(true)}>Change RSVP</Button>
            </Box>
          )}

          {owner && showInvites ? (
            <EntryList
              sendInvites={sendInvites}
              setShowInvites={setShowInvites}
              updateInvites={updateInviteList}
            />
          ) : (
            owner && (
              <Button
                mt="1rem"
                colorScheme="teal"
                onClick={() => setShowInvites(true)}
              >
                Invite Friends
              </Button>
            )
          )}
          <Box h="30vh"></Box>
        </Box>
      </Box>
    );
  } else if (participationSettings == "not invited") {
    return <div>You don't have access to this event</div>
  }
  else {
    return (errorLoading) ? <div>Event Doesn't Exist</div> : <h1>Loading...</h1>
  }
}
