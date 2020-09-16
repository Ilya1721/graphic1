import { ylabel } from "../resources/strings";

export const graphConfig = {
  axes: {
    x: {
      axisLabelFormatter: function (x) {
        return x.toPrecision(2);
      },
    },
  },
  ylabel: ylabel,
};

export default { graphConfig };
