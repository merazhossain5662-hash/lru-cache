# LRU Cache Implementation

An efficient $O(1)$ Least Recently Used (LRU) Cache implementation in JavaScript with optional Time-To-Live (TTL) support.

## Data Structures Used & Why

- **JavaScript `Map`**: A hash map in JS maintains elements in key-value insertion order. By deleting and re-inserting modified/accessed keys, we can reposition them to the end (Most Recently Used position) in $O(1)$ time. Evicting the Least Recently Used item takes $O(1)$ time by retrieving `map.keys().next().value`.

## Complexity Analysis

- **Time Complexity**:
  - `get(key)`: **$O(1)$ average** (Map hash lookup and repositioning).
  - `put(key, value)`: **$O(1)$ average** (Map write/eviction).
- **Space Complexity**: **$O(N)$**, where $N$ is the positive capacity of the cache.

## How LRU Ordering is Maintained

1. **Access (`get`)**: When a key is accessed, its value is retrieved, deleted from its current position in the Map, and re-set to the back (MRU position).
2. **Insertion (`put`)**: If capacity is reached, the iterator `cache.keys().next().value` yields the first key (LRU position) and deletes it prior to inserting the new entry.

## Bonus: TTL / Expiration Strategy

Each item stored in the cache holds a timestamp payload `{ value, expiry }`. On `get()`, if the current time exceeds `expiry`, the item is invalidated and removed immediately in $O(1)$ time.

## How to Run

```bash
node index.js
```
