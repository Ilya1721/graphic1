import React from "react";
import Dygraph from "dygraphs";
import { graphConfig } from "../resources/config";
import strings from "../resources/strings";

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lambda: 0.5,
      input: "0.5",
      config: graphConfig,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
    this.createGraph();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  getData = (start, end) => {
    let string = "x, f(t), Q(t), P(t)\n";
    let x = start;

    while (x <= end) {
      x = parseFloat(x.toPrecision(4));

      const f1 = this.f(x);
      const f2 = this.Q(x);
      const f3 = this.P(x);

      string += `${x},${f1},${f2},${f3}\n`;

      x += 0.01;
      x = parseFloat(x.toPrecision(4));
    }

    return string;
  };

  f = (t) => {
    const lambda = this.state.lambda;

    return lambda * Math.exp(-lambda * t);
  };

  Q = (t) => {
    const lambda = this.state.lambda;

    return 1 - Math.exp(-lambda * t);
  };

  P = (t) => {
    return 1 - this.Q(t);
  };

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  checkLambda = () => {
    return parseFloat(this.state.input.match(/^-?\d*(\.\d+)?$/)) > 0;
  };

  createGraph = () => {
    if (this.checkLambda()) {
      this.setState(
        {
          ...this.state.input,
          lambda: parseFloat(this.state.input),
        },
        () => {
          new Dygraph(this.refs.chart, this.getData(0, 1), this.state.config);
        }
      );
    } else {
      alert("Некоректні вхідні дані");
    }
  };

  onClick = (e) => {
    e.preventDefault();

    this.createGraph();
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      this.createGraph();
    }
  };

  render() {
    return (
      <div className="form">
        <div className="input">
          <label htmlFor="lambda" className="lambdaLabel">
            {strings.lambdaText}
          </label>
          <input
            type="text"
            value={this.state.input}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            id="lambda"
            className="lambdaInput"
          />
          <button type="button" onClick={this.onClick} className="calculate">
            {strings.calculateText}
          </button>
        </div>
        <div ref="chart" className="chart"></div>
      </div>
    );
  }
}

export default Graph;
