import React, { useContext } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { blogContext } from "../../context/BlogContextProvider";
import Team1 from "../../assets/Images/Aboutus/Team/team1.png";
import Team2 from "../../assets/Images/Aboutus/Team/team2.png";
import Team3 from "../../assets/Images/Aboutus/Team/team3.png";
import Team4 from "../../assets/Images/Aboutus/Team/team4.png";
import Team5 from "../../assets/Images/Aboutus/Team/team5.png";
import Team6 from "../../assets/Images/Aboutus/Team/team6.png";
import Team7 from "../../assets/Images/Aboutus/Team/team7.png";
import Team8 from "../../assets/Images/Aboutus/Team/team8.png";
import store from "../../store/store";
import { useStore } from "eoion";

const AuthorList = () => {
  const [dark] = useStore(store.subscribe("dark"));

  const authorList = [
    { image: Team1, name: "Floyd Miles", email: "floyd@gmail.com" },
    { image: Team2, name: "Dianne Russell", email: "dianne@gmail.com" },
    { image: Team3, name: "Jenny Wilson", email: "jenny@gmail.com" },
    { image: Team4, name: "Leslie Alexander", email: "leslie@gmail.com" },
    { image: Team5, name: "Guy Hawkins", email: "gandy@gmail.com" },
    { image: Team6, name: "Eleanor Pena", email: "eleanor@gmail.com" },
    { image: Team7, name: "Robert Fox", email: "robert@gmail.com" },
    { image: Team8, name: "Jacob Jones", email: "jones@gmail.com" },
  ];
  return (
    <div
      className={`transition duration-500 ${
        dark ? "bg-[#242535] text-white" : "bg-white text-black"
      } flex flex-col lg:items-center gap-10 pb-20`}
    >
      <h1 className="text-[20px] text-center font-semibold">List of Authors</h1>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:w-[80%] gap-4">
        {authorList.map(({ name, email, image }, i) => (
          <div
            key={i}
            className={`${
              dark ? "bg-[#0b0b0b6b] text-white" : "bg-[#F4F4F4] text-black"
            } flex py-10 gap-2 flex-col items-center`}
          >
            <img
              src={image}
              alt=""
              className="mb-2 h-[130px] w-[130px] object-cover rounded-[50%]"
            />
            {/* <div className="mb-2 h-[130px] w-[130px] bg-yellow-300 rounded-[50%]" /> */}
            <h2 className="text-[20px] font-semibold">{name}</h2>
            <p>{email}</p>
            <div className="flex gap-3">
              <FaFacebook className="text-[20px]" />
              <BsTwitterX className="text-[20px]" />
              <AiFillInstagram className="text-[20px]" />
              <FaLinkedin className="text-[20px]" />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center flex flex-col gap-2 pt-10">
        <h1 className="text-[22px] font-semibold">
          Join our team to be a part <br /> of our story
        </h1>
        <p className="text-[14px] opacity-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do
          eiusmod tempor incididunt.
        </p>
        <div className="w-full">
          <button className="py-2 px-6 bg-[#FFD050] w-fit">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default AuthorList;
