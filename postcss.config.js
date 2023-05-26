// postcss.config.js
module.exports = {
  plugins: {
    "postcss-convert-units": {
      convertConfig: [
        {
          declMatcher: {
            sourceUnit: "px",
            targetUnit: "rem",
          },
          declConvertRules: [
            {
              value: (value) => value,
            },
          ],
        },
      ],
    },
  },
};
