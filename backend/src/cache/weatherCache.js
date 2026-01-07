import NodeCache from "node-cache";

export const weatherCache = new NodeCache({
  stdTTL: 300, // 5 min
  checkperiod: 60
});
