import { useAuthContext } from "../../hooks/useAuthContext";

export default function ActiveRoomCard() {
  const { user } = useAuthContext();
  const {
    data: roomData,
    loading: roomLoading,
    error: roomError,
  } = { data: [{ name: "room1" }], error: false, loading: false }; //useGet("/api/rooms");

  return (
    <div className="w-full h-full mx-6 font-mono text-white border shadow-xl rounded-2xl bg-slate-800 border-slate-400 backdrop-filter backdrop-blur-md bg-opacity-70">
      <h3 className="justify-center font-blod h-[60px] flex items-center">
        Active Rooms
      </h3>
    </div>
  );
}
