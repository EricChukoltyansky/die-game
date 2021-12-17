import "./Dice.scss";

import React, { Component } from "react";

export default class Dice extends Component {
  render() {
    return (
      <div className="dice">
        <img src={this.props.imgSrc} alt="" />
      </div>
    );
  }
}
