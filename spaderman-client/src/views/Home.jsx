import React from "react";
import "../styles/Home.css";
import ButtonLink from "../components/ButtonLink";
import Logout from "../components/Logout";
import HomeButton from "../components/HomeButton";
import { useAuth } from "../auth/UserContext";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="home-wrapper">
      <header className="header-home">
        <HomeButton />
        <h2>Welcome {currentUser?.username}</h2>
      </header>
      <div className="logout-home">
        <Logout />
      </div>

      <img
        className="left-avatar-home"
        src="/img/blue-shovel4.png"
        alt="avatar"
      />

      <div className="center-grid-home-content">
        <ButtonLink className="button-link-home" name="play">
          Play
        </ButtonLink>
      </div>

      <img
        className="right-avatar-home"
        src="/img/red-shovel4.png"
        alt="avatar"
      />

      {/* <ButtonLink className="grid-2" name="leaderBoard">LeaderBoard</ButtonLink>
            <ButtonLink  className="grid-3" name="howtoplay">How To Play</ButtonLink> */}
    </div>
  );
}
