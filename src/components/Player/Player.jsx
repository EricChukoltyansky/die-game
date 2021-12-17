import React, { Component } from "react";
import './Player.css'

export default class Player extends Component {
  render() {
    return (
      <>
        <div className="player-container">
          <div className="player">
            <h1 className={this.props.stroke}>{this.props.playerName}</h1>
          </div>
          <div className="player score">
            <div className="player count">
              <p className={this.props.stroke}>Current Score</p>
              <h2 className={this.props.stroke}>{this.props.count}</h2>
            </div>
            <div className="total">
              <p className={this.props.stroke}>Total:</p>
              <h2 className={this.props.stroke}>{this.props.total}</h2>
            </div>
          </div>
        </div>
      </>
    );
  }
}
