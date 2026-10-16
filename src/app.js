import TTLCache from "./TTLCache.js";
import TTLExpirationWorker from "./TTLExpirationWorker.js";

const cache = new TTLCache();

const stopWorker = TTLExpirationWorker(cache, 1000);

cache.set("user:1", { name: "john" }, 3000);

console.log(cache.get("user:1"));
console.log(cache.has("user:1"));
console.log(cache.size());

cache.set("user:1", { name: "robert" }, 10000);

console.log(cache.get("user:1"));

cache.delete("user:1");

stopWorker();
