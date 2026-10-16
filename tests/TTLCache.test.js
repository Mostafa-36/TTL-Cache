import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";

import TTLCache from "../src/TTLCache.js";

describe("TTLCache", () => {
  let cache;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    cache = new TTLCache();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should store and retrieve a value", () => {
    cache.set("user:1", "Ali", 5000);

    expect(cache.get("user:1")).toBe("Ali");
  });

  test("should return null for a missing key", () => {
    expect(cache.get("missing")).toBeNull();
  });

  test("should return null after expiration", () => {
    cache.set("user:1", "Ali", 1000);

    jest.advanceTimersByTime(1000);

    expect(cache.get("user:1")).toBeNull();
  });

  test("should return false for an expired key", () => {
    cache.set("user:1", "Ali", 1000);

    jest.advanceTimersByTime(1000);

    expect(cache.has("user:1")).toBe(false);
  });

  test("should return true for a valid key", () => {
    cache.set("user:1", "Ali", 5000);

    expect(cache.has("user:1")).toBe(true);
  });

  test("should update an existing key and its TTL", () => {
    cache.set("user:1", "Ali", 1000);

    jest.advanceTimersByTime(500);

    cache.set("user:1", "Ahmed", 5000);

    expect(cache.get("user:1")).toBe("Ahmed");

    jest.advanceTimersByTime(500);

    expect(cache.get("user:1")).toBe("Ahmed");
  });

  test("should not delete an updated value when an old heap entry expires", () => {
    cache.set("user:1", "Old value", 1000);

    jest.advanceTimersByTime(500);

    cache.set("user:1", "New value", 5000);

    jest.advanceTimersByTime(500);

    cache.cleanupExpired();

    expect(cache.get("user:1")).toBe("New value");
  });

  test("should delete a key", () => {
    cache.set("user:1", "Ali", 5000);

    expect(cache.delete("user:1")).toBe(true);
    expect(cache.has("user:1")).toBe(false);
    expect(cache.delete("user:1")).toBe(false);
  });

  test("should delete a key when TTL is zero or negative", () => {
    cache.set("user:1", "Ali", 5000);

    cache.set("user:1", "Ahmed", 0);

    expect(cache.has("user:1")).toBe(false);

    cache.set("user:2", "Sara", -100);

    expect(cache.has("user:2")).toBe(false);
  });

  test("should clear the cache and heap", () => {
    cache.set("user:1", "Ali", 5000);
    cache.set("user:2", "Sara", 5000);

    cache.clear();

    expect(cache.size()).toBe(0);
    expect(cache.has("user:1")).toBe(false);
    expect(cache.minHeap.isEmpty()).toBe(true);
  });

  test("should return the number of valid entries", () => {
    cache.set("user:1", "Ali", 1000);
    cache.set("user:2", "Sara", 5000);

    jest.advanceTimersByTime(1000);

    expect(cache.size()).toBe(1);
  });

  test("should clean all expired entries in heap order", () => {
    cache.set("a", 1, 1000);
    cache.set("b", 2, 2000);
    cache.set("c", 3, 5000);

    jest.advanceTimersByTime(2000);

    cache.cleanupExpired();

    expect(cache.has("a")).toBe(false);
    expect(cache.has("b")).toBe(false);
    expect(cache.get("c")).toBe(3);
    expect(cache.size()).toBe(1);
  });

  test("should remove an expired key from the map when get is called", () => {
    cache.set("user:1", "Ali", 1000);

    jest.advanceTimersByTime(1000);

    expect(cache.get("user:1")).toBeNull();
    expect(cache.map.has("user:1")).toBe(false);
  });
});
