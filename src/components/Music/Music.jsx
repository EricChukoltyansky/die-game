import React from "react";

class Music extends React.Component {
  state = {
    play: false,
  };

  audio = new Audio(this.props.url);

  componentDidMount() {
    this.audio.addEventListener("ended", () => this.setState({ play: false }));
  }

  componentWillUnmount() {
    this.audio.removeEventListener("ended", () => this.setState({ play: false }));
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.togglePlay}>
          {this.state.play ? "Pause" : "Play Music"}
        </button>
      </div>
    );
  }
}

export default Music;
