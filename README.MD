# TTL Cache — JavaScript

## Overview

A simple implementation of a **Time-To-Live (TTL) Cache** using JavaScript.

The cache stores key-value pairs with a configurable time-to-live (TTL). Each entry automatically becomes invalid after its expiration time, preventing expired values from being returned.

This project focuses on data structures, expiration management, algorithm efficiency, unit testing, Git, and Docker.

## Features

- Store key-value pairs with a configurable TTL.
- Retrieve values using keys.
- Automatically treat expired entries as unavailable.
- Periodically clean up expired entries using a background expiration worker.
- Delete individual entries.
- Clear the cache.
- Track the current number of valid entries.
- Update existing keys with new values and expiration times.
- Automated unit tests using Jest.
- Docker support for running the application and tests.

## Data Structures

The implementation uses:

- **Hash Map (`Map`)** to store and retrieve cache entries efficiently by key.
- **Min Heap** to track entries by expiration time, allowing the cache to process the earliest expiration first.
- **Cache Node** to represent each cached entry, including its key, value, and expiration timestamp.

The Min Heap keeps the entry with the earliest expiration time at its root. The cache uses this to efficiently identify expired entries during cleanup.

When an entry is updated, an older heap entry may remain temporarily. The cache checks the entry's identity before deleting it, preventing an outdated heap entry from deleting the newer value.

## Technologies

- JavaScript (ES Modules)
- Node.js
- Jest
- Docker

## Getting Started

### Prerequisites

- Node.js and npm
- Docker (optional, for containerized execution)

### Installation

Clone the repository or download the project, then navigate to its directory.

Install dependencies:

```bash
npm ci
```

### Run the application

```bash
npm start
```

This runs the demonstration in `src/app.js`.

### Run tests

```bash
npm test
```

## Docker

### Build the image

```bash
docker build -t ttl-cache .
```

### Run the application

```bash
docker run --rm ttl-cache
```

### Run tests inside the container

```bash
docker run --rm ttl-cache npm test
```

## Project Structure

```text
TTL-Cache/
├── src/
│   │── CacheNode.js
│   │── TTLCache.js
│   │── MinHeap.js
│   │── TTLExpirationWorker.js
│   └── app.js
├── tests/
│   ├── MinHeap.test.js
│   └── TTLCache.test.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## Testing

The project uses Jest for automated unit testing.

The test suites cover Min Heap operations, cache behavior, expiration handling, deletion, clearing, and the background expiration worker.

Tests also verify that expired entries are not returned and that outdated heap entries cannot accidentally delete updated cache values.

## Learning Objectives

- Understand the Time-To-Live (TTL) expiration policy.
- Practice combining a hash map with a Min Heap.
- Understand how a priority queue helps process expiration times efficiently.
- Implement background cleanup with Node.js timers.
- Handle stale heap entries safely when cache keys are updated.
- Write automated unit tests using Jest.
- Use Git to track changes.
- Package and run a Node.js application with Docker.
