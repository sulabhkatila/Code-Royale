import React from "react";
import ActiveRoomCard from "../components/Cards/ActiveRoomCard";
import InvitationsCard from "../components/Cards/InvitationsCard";
import ChallangeBody from "../components/Challange/ChallangeBody";
import ChallangeFooter from "../components/Challange/ChallangeFooter";
import ChallangeHeader from "../components/Challange/ChallangeHeader";
import NavBar from "../components/NavBar";

export default function Challenge() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NavBar />
      <div className="flex flex-grow overflow-auto font-mono text-sm bg-dark-1 p-9">
        <div className="flex flex-col justify-between flex-1 h-full p-1 px-5 text-white border-4 border-gray-300 rounded-2xl">
          <ChallangeHeader />
          <div className="overflow-hidden overflow-y-auto">
            <ChallangeBody />
          </div>
          <ChallangeFooter />
        </div>
        <div className="flex flex-col justify-between flex-1 flex-grow w-full h-full pb-7">
          <div className="flex-1">
            <ActiveRoomCard />
          </div>
          <div className="flex-[.8]">
            <InvitationsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
