import config from "../config";

const { candyColors } = config;

const getRandomCandy = () =>
  candyColors[Math.floor(Math.random() * candyColors.length)];

export default getRandomCandy;
