export default function Profileinfo({ profileUser }) {
  const username = profileUser.username;
  const name = profileUser.name;

  return (
    <div className="flex-col w-full h-full">
      <div className="flex flex-col h-[100px] justify-center items-center text-xl">
        <div className="my-5">{username}</div>
        
      </div>
      <div className="flex justify-center my-2">
          <div>{name}</div>
        </div>
    </div>
  );
}
