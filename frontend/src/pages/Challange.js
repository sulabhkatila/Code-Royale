import React from "react";
import ChallangeBody from "../components/Challange/ChallangeBody";
import ChallangeFooter from "../components/Challange/ChallangeFooter";
import ChallangeHeader from "../components/Challange/ChallangeHeader";
import NavBar from "../components/NavBar";

export default function Challenge() {
  return (
    <div className="flex flex-col w-screen h-screen">
  <NavBar />
  <div className="flex-grow overflow-auto font-mono bg-dark-1 p-9">
    <div className="flex flex-col justify-between h-full p-1 px-5 text-white border-4 border-gray-300 rounded-2xl">
      <ChallangeHeader />
      <div className="overflow-hidden overflow-y-auto">
        <ChallangeBody />
      </div>
      <ChallangeFooter />
    </div>
  </div>
</div>
  );
}
