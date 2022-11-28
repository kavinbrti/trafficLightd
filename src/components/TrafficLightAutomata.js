import * as React from "react";
import { withStateMachine } from "react-automata";
import Green from "./Green";
import Yellow from "./Yellow";
import Red from "./Red";

class TrafficLight extends React.PureComponent {
  transition = () => {
    this.props.transition("NEXT");
  };

  waitLongInterval() {
    setTimeout(this.transition, 2000);
  }

  waitShortInterval() {
    setTimeout(this.transition, 800);
  }

  render() {
    const { machineState } = this.props;

    return (
      <div>
        <Red isOn={machineState.value === "RED"} />
        <Yellow isOn={machineState.value === "YELLOW"} />
        <Green isOn={machineState.value === "GREEN"} />
      </div>
    );
  }
}

// https://musing-rosalind-2ce8e7.netlify.com/?machine=%7B%22initial%22%3A%22GREEN%22%2C%22states%22%3A%7B%22GREEN%22%3A%7B%22on%22%3A%7B%22NEXT%22%3A%22YELLOW%22%7D%2C%22onEntry%22%3A%22waitLongInterval%22%7D%2C%22YELLOW%22%3A%7B%22on%22%3A%7B%22NEXT%22%3A%22RED%22%7D%2C%22onEntry%22%3A%22waitShortInterval%22%7D%2C%22RED%22%3A%7B%22on%22%3A%7B%22NEXT%22%3A%22GREEN%22%7D%2C%22onEntry%22%3A%22waitLongInterval%22%7D%7D%7D
const stateChart = {
  initial: "GREEN",
  states: {
    GREEN: {
      on: {
        NEXT: "YELLOW"
      },
      onEntry: "waitLongInterval"
    },
    YELLOW: {
      on: {
        NEXT: "RED"
      },
      onEntry: "waitShortInterval"
    },
    RED: {
      on: {
        NEXT: "GREEN"
      },
      onEntry: "waitLongInterval"
    }
  }
};

export default withStateMachine(stateChart)(TrafficLight);
