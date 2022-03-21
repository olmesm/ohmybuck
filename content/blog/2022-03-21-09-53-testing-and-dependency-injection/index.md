---
title: Testing and Dependency Injection
description: Testing and Dependency Injection
date: 2022-03-21 09:53
tags: [TODO]
draft: true
---

```tsx
const ONE_SECOND = 1000;

function sleep(sleepTimeMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, sleepTimeMs);
  });
}

export async function executeCallbackOrExponentiallyBackOff(
  callback: (...args: any[]) => void,
  timer = 0,
  di_runAllTimers = () => {}
): Promise<void> {
  try {
    const sleepTimer = sleep(timer);
    di_runAllTimers();
    await sleepTimer;
    await callback();
  } catch (err) {
    const newTimeout = timer ? timer * 2 : ONE_SECOND;
    return executeCallbackOrExponentiallyBackOff(
      callback,
      newTimeout,
      di_runAllTimers
    );
  }
}
```

```tsx
import * as exponentialBackoff from "../../src/helpers/exponential-backoff";

const mockFunction = jest.fn();
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

function setMockToThrowErrorNTimes(times: number) {
  for (let i = 0; i < times; i++) {
    mockFunction.mockRejectedValueOnce("");
  }
}

describe("executeCallbackOrExponentiallyBackOff", () => {
  let mockLogger: any;

  jest.spyOn(exponentialBackoff, "executeCallbackOrExponentiallyBackOff");

  beforeEach(() => {
    mockLogger = { error: jest.fn(), warn: jest.fn(), info: jest.fn() };
    jest.clearAllMocks();
  });

  it("Executes a successful call once and does not retry", async () => {
    const executeFunction =
      exponentialBackoff.executeCallbackOrExponentiallyBackOff(mockFunction);
    jest.runAllTimers();
    await executeFunction;

    expect(mockFunction).toBeCalledTimes(1);
  });

  it.each`
    retryTimes | numberOfSeconds
    ${1}       | ${1}
    ${2}       | ${2}
    ${3}       | ${4}
    ${4}       | ${8}
    ${10}      | ${512}
    ${40}      | ${549755813888}
  `(
    "Retries an unsuccessful call $retryTimes time(s) after $numberOfSeconds second(s)",
    async ({ retryTimes, numberOfSeconds }) => {
      setMockToThrowErrorNTimes(retryTimes);

      await exponentialBackoff.executeCallbackOrExponentiallyBackOff(
        mockFunction,
        0,
        jest.runAllTimers
      );

      expect(mockFunction).toBeCalledTimes(retryTimes + 1);
      expect(setTimeout).toHaveBeenCalledTimes(retryTimes + 1);
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        numberOfSeconds * 1000
      );
    }
  );
});
```
