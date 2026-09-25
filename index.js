const LRUCache = require("./LRUCache");

console.log("=========================================");
console.log("   TASK 2: LRU CACHE TEST EXECUTION     ");
console.log("=========================================\n");

// Initialize cache with capacity 2
console.log("1. Initializing LRUCache with capacity = 2");
const cache = new LRUCache(2);

console.log("\n--- EXPLICIT ASSESSMENT SPECIFICATION TEST ---");

console.log('cache.put("A", 10)');
cache.put("A", 10);
cache.printState();

console.log('cache.put("B", 20)');
cache.put("B", 20);
cache.printState();

console.log('cache.get("A") ->', cache.get("A"));
cache.printState();

console.log('cache.put("C", 30)');
cache.put("C", 30); // Evicts "B"
cache.printState();

console.log('cache.get("B") ->', cache.get("B"));

console.log('cache.get("C") ->', cache.get("C"));

console.log('cache.get("A") ->', cache.get("A"));

console.log("\n--- BONUS: TTL / EXPIRATION TEST ---");
console.log('Adding "TTL_KEY" with 1000ms expiration...');
cache.put("TTL_KEY", "ExpiresSoon", 1000);
console.log('cache.get("TTL_KEY") immediately ->', cache.get("TTL_KEY"));

setTimeout(() => {
  console.log(
    'cache.get("TTL_KEY") after 1200ms ->',
    cache.get("TTL_KEY"),
    "(Expired & Removed)",
  );
  console.log("\nExecution completed successfully.");
}, 1200);
