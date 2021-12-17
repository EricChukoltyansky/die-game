import React from "react";
import "./Button.scss";

function Button(props) {
  return (
    <>
      <button onClick={props.onClickFunction}>{props.text}</button>
    </>
  );
}

export default Button;
