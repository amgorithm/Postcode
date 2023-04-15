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
          Keeping a coding journal will not only make your life easier as a
          software developer, but it will help you grow on a personal and
          professional level{" "}
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
            <h4>Stay organised</h4>
            <p>Document your ideas and progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
