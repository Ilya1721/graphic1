import React from "react";
import Dygraph from "dygraphs";
import { graphConfig } from "../resources/config";

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delta: 0.5,
      config: graphConfig,
    };
  }

  componentDidMount() {
    new Dygraph(this.refs.chart, this.getData(0, 1), this.state.config);
  }

  getData = (start, end) => {
    let string = "x, f(t), Q(t), P(t)\n";
    let x = start;

    while (x <= end) {
      const f1 = this.f(x);
      const f2 = this.Q(x);
      const f3 = this.P(x);

      string += `${x},${f1},${f2},${f3}\n`;

      x += 0.01;
      x = parseFloat(x.toPrecision(4));
    }

    console.log(string);

    return string;
  };

  f = (t) => {
    const delta = this.state.delta;

    return delta * Math.exp(-delta * t);
  };

  Q = (t) => {
    const delta = this.state.delta;

    return 1 - Math.exp(-delta * t);
  };

  P = (t) => {
    return 1 - this.Q(t);
  };

  onChange = (e) => {
    this.setState({
      delta: e.target.value,
    });
  };

  onClick = (e) => {
    e.preventDefault();

    new Dygraph(this.refs.chart, this.getData(0, 1), this.state.config);
  };

  render() {
    return (
      <div className="form">
        <div className="input">
          <label htmlFor="delta" className="deltaLabel">
            Delta
          </label>
          <input
            type="text"
            value={this.state.delta}
            onChange={this.onChange}
            id="delta"
            className="deltaInput"
          />
          <button type="button" onClick={this.onClick} className="calculate">
            Calculate
          </button>
        </div>
        <div ref="chart" className="chart"></div>
      </div>
    );
  }
}

export default Graph;
