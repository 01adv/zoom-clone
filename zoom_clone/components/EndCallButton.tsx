"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();


  // check whether the current user is the owner of the meeting room 
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <Button
    // a func to end call and return to homepage.
      onClick={async () => {
        await call.endCall();
        router.push('/')
      }}

      className="bg-red-500"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
