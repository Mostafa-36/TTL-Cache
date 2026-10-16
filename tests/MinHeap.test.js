import { describe, test, expect, beforeEach } from "@jest/globals";
import MinHeap from "../src/MinHeap.js";

describe("MinHeap", () => {
  let heap;

  beforeEach(() => {
    heap = new MinHeap();
  });

  test("should start empty", () => {
    expect(heap.isEmpty()).toBe(true);
    expect(heap.size()).toBe(0);
    expect(heap.peek()).toBeNull();
  });

  test("should insert entries in expiration order", () => {
    heap.insert({ key: "a", expiresAt: 3000 });
    heap.insert({ key: "b", expiresAt: 1000 });
    heap.insert({ key: "c", expiresAt: 2000 });

    expect(heap.peek().key).toBe("b");
    expect(heap.size()).toBe(3);
  });

  test("should extract entries in ascending expiration order", () => {
    heap.insert({ key: "a", expiresAt: 3000 });
    heap.insert({ key: "b", expiresAt: 1000 });
    heap.insert({ key: "c", expiresAt: 2000 });

    expect(heap.extractMin().key).toBe("b");
    expect(heap.extractMin().key).toBe("c");
    expect(heap.extractMin().key).toBe("a");
  });

  test("should return null when extracting from an empty heap", () => {
    expect(heap.extractMin()).toBeNull();
  });

  test("should update its size after extraction", () => {
    heap.insert({ key: "a", expiresAt: 1000 });
    heap.insert({ key: "b", expiresAt: 2000 });

    heap.extractMin();

    expect(heap.size()).toBe(1);
  });

  test("should check whether a key exists", () => {
    heap.insert({ key: "user:1", expiresAt: 1000 });

    expect(heap.has("user:1")).toBe(true);
    expect(heap.has("user:2")).toBe(false);
  });

  test("should clear all entries", () => {
    heap.insert({ key: "a", expiresAt: 1000 });
    heap.insert({ key: "b", expiresAt: 2000 });

    heap.clear();

    expect(heap.isEmpty()).toBe(true);
    expect(heap.size()).toBe(0);
    expect(heap.peek()).toBeNull();
  });
});
