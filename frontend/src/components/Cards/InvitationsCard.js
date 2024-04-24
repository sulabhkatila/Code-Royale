import { useAuthContext } from "../../hooks/useAuthContext";

export default function InvitationsCard() {
    const { user } = useAuthContext();
    const { data: invitations, loading, error } = {
      data: null,
      loading: false,
      error: null,
    }; //useGet("/api/invitations");
    
  return (
    <div className="w-full h-full mx-6 font-mono text-white border shadow-xl mt-7 rounded-2xl bg-slate-800 border-slate-400 backdrop-filter backdrop-blur-md bg-opacity-70">
      <h3 className="justify-center font-blod h-[60px] flex items-center">
        Invitations
      </h3>
    </div>
  );
}
