import NodeCache from "node-cache";

export const weatherCache = new NodeCache({
  stdTTL: 60, // 1 min
  checkperiod: 60
});
