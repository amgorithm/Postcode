import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-top">
        <h2>The ultimate coding journal</h2>
        <img
          src={require("../../images/typing.png")}
          alt="person typing code"
          className="typing"
        />
        <h3>
          A minimal space to post about what you've coded that day. Minus the
          distraction and metrics of social media.{" "}
        </h3>
      </div>

      <div className="homepage-bottom">
        <h2>Why a coding journal?</h2>
        <h3>
          By keeping a coding journal, you can make your life as a Software
          Developer easier and achieve personal and professional growth{" "}
        </h3>
        <div className="benefits">
          <div>
            <h4>Problem-solving</h4>
            <p>
              Strengthen your problem-solving skills by writing about the steps
              taken to tackle challenges{" "}
            </p>
          </div>

          <div>
            <h4>Enhance learning</h4>
            <p>
              Deepen your learning by writing about your learning journey and
              reinforce your understanding
            </p>
          </div>
          <div>
            <h4>Reflect</h4>
            <p>Look back on your successes and troubles</p>
          </div>
          <div>
            <h4>Organise</h4>
            <p>Document your ideas and progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
