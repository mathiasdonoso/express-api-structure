const padLeft = (str, len) => (len > str.length ? new Array(len - str.length + 1).join(' ') + str : str);

const padRight = (str, len) => (len > str.length ? str + new Array(len - str.length + 1).join(' ') : str);

module.exports = {
  padLeft, padRight,
};
