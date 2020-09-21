import strings from "../resources/strings";

export const graphConfig = {
  axes: {
    x: {
      axisLabelFormatter: function (x) {
        return x.toPrecision(2);
      },
    },
  },
  ylabel: strings.ylabel,
};

export default { graphConfig };
