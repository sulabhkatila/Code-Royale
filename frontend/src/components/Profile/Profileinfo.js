export default function Profileinfo({ profileUser }) {
  const username = profileUser.username;
  const name = profileUser.name;

  return (
    <div className="flex-col w-full h-full">
        <div className="text-center">
            {username}
        </div>
      <div className="flex items-center justify-center h-full text-white">
        <div className="flex-col">
          <div>{name}</div>
        </div>
      </div>
    </div>
  );
}
