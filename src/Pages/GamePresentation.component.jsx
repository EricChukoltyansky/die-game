import React, { Component } from "react";
import Button from "../components/Button/Button";
import Dice from "../components/Dices/Dice";
import Player from "../components/Player/Player";
import "./GamePresentation.styles.scss";
import img1 from "../components/images/dice-1.png";
import img2 from "../components/images/dice-2.png";
import img3 from "../components/images/dice-3.png";
import img4 from "../components/images/dice-4.png";
import img5 from "../components/images/dice-5.png";
import img6 from "../components/images/dice-6.png";

let maxPoints = 30;

export default class GamePresentation extends Component {
  state = {
    player1: {
      count: 0,
      total: 0,
      isCurrent: true,
    },
    player2: {
      count: 0,
      total: 0,
      isCurrent: false,
    },
    dice: ["", ""],
    winningPoint: 0,
    banner: "",
    double6: "",
  };

  updatePlayerSelection(firstDice, secondDice) {
    this.state.player1.isCurrent &&
      this.setState({
        player1: {
          count: this.state.player1.count + firstDice + secondDice,
          total: this.state.player1.total,
          isCurrent: true,
        },
      });

    this.state.player2.isCurrent &&
      this.setState({
        player2: {
          count: this.state.player2.count + firstDice + secondDice,
          total: this.state.player2.total,
          isCurrent: true,
        },
      });
  }

  throwDice() {
    let firstDice = Math.ceil(Math.random() * 6);
    let secondDice = Math.ceil(Math.random() * 6);
    if (firstDice === 6 && secondDice === 6) {
      this.setState({
        dice: [firstDice, secondDice],
      });
    }
    this.setState({
      dice: [firstDice, secondDice],
    });
    this.updatePlayerSelection(firstDice, secondDice);

    this.whoIsWinner(maxPoints);
  }

  winnerCheck() {
    if (this.state.player1.total >= this.state.winningPoint) {
      this.setState({
        banner: "Player 1 Wins!",
      });
    } else {
      this.setState({
        banner: "Player 2 Wins!",
      });
    }
  }

  startNewGame() {
    this.setState({
      player1: {
        count: 0,
        total: 0,
        isCurrent: true,
      },
    });

    this.setState({
      player2: {
        count: 0,
        total: 0,
        isCurrent: false,
      },
    });
  }

  playerHold() {
    let currentPlayer = this.state.player1.isCurrent ? "player1" : "player2";
    console.log("playerHold", [currentPlayer]);
    this.setState({
      [currentPlayer]: {
        count: "",
        total:
          this.state[currentPlayer].total + this.state[currentPlayer].count,
        isCurrent: true,
      },
    });
    this.switchPlayers();
  }

  switchPlayers() {
    if (this.state.player1.isCurrent) {
      this.setState({
        player1: {
          count: 0,
          total: this.state.player1.total + this.state.player1.count,
          isCurrent: false,
        },
        player2: {
          count: 0,
          total: this.state.player2.total + this.state.player2.count,
          isCurrent: true,
        },
      });
    } else {
      this.setState({
        player1: {
          count: 0,
          total: this.state.player1.total + this.state.player1.count,
          isCurrent: true,
        },
        player2: {
          count: 0,
          total: this.state.player2.total + this.state.player2.count,
          isCurrent: false,
        },
      });
    }
  }

  // TODO check if it is possible to win by gap from the winning score

  render() {
    const die = [img1, img2, img3, img4, img5, img6];
    return (
      <div className="game-board">
        <div className="player-container">
          <Player
            playerName="player 1"
            count={this.state.player1.count}
            total={this.state.player1.total}
            stroke={this.state.player1.isCurrent && "active-background"}
          />
        </div>
        <div className="game-control">
          <div className="top">
            <Button
              onClickFunction={() => this.startNewGame()}
              text="Start Again"
            />
          </div>
          <div className="bottom">
            <Dice imgSrc={die[this.state.dice[0] - 1]} />
            <Dice imgSrc={die[this.state.dice[1] - 1]} />
            <Button onClickFunction={() => this.throwDice()} text="Roll Dice" />
            <Button onClickFunction={() => this.playerHold()} text="Hold" />
            <div className="winning-score">
              <input
                type="text"
                onChange={(e) =>
                  this.setState({ winningPoint: e.target.value })
                }
                placeholder="Winning Score"
              ></input>
            </div>
          </div>
        </div>
        <div className="player-container">
          <Player
            playerName="player 2"
            count={this.state.player2.count}
            total={this.state.player2.total}
            stroke={this.state.player2.isCurrent && "active-background"}
          />
        </div>
      </div>
    );
  }
}
