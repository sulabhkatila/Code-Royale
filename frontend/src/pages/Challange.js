import React from "react";
import ChallangeBody from "../components/Challange/ChallangeBody";
import ChallangeFooter from "../components/Challange/ChallangeFooter";
import ChallangeHeader from "../components/Challange/ChallangeHeader";

export default function Challenge() {
  return (
    <div className="w-screen h-screen font-mono bg-dark-1 p-9">
      <div className="flex flex-col justify-between h-full p-1 px-5 text-white border-4 border-gray-300 rounded-2xl">
        <ChallangeHeader />
        <div className="overflow-hidden overflow-y-auto">
        <ChallangeBody />

        </div>
        <ChallangeFooter />
      </div>
    </div>
  );
}
