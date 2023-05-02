import React from "react";
import NavBar from "./NavBar/NavBar";
import "./Home.css";
function Home(props) {
  return (
    <div className="home">
      <NavBar />   
         <p  class="line-1 anim-typewriter">Welcome to Teamify register now ! </p>
    </div>
  );
}

export default Home;
