import default_profile_pic from "../../assets/default_profile_pic.jpeg";

export default function Profilepic() {
  return (
    <div className="">
      <img
        src={default_profile_pic}
        alt="profile pic"
        className="block mb-2 bg-blue-800 rounded-full w-96 h-96"
        style={{
          objectFit: "cover",
          filter: "drop-shadow(0px 10px 20px gray)",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        }}
      />
    </div>
  );
}
