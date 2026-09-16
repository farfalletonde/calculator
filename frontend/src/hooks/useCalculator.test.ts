import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import type { CalculateRequest, CalculateResponse } from "../api/calculate";
import { useCalculator } from "./useCalculator";

type CalculateFn = (req: CalculateRequest) => Promise<CalculateResponse>;

let calculate: ReturnType<typeof vi.fn<CalculateFn>>;

beforeEach(() => {
  calculate = vi.fn<CalculateFn>();
});

test("adds two numbers", async () => {
  calculate.mockResolvedValueOnce({ result: 5 });

  const { result } = renderHook(() => useCalculator(calculate));

  act(() => {
    result.current.input("2");
    result.current.setOp("add");
    result.current.input("3");
  });

  await act(async () => {
    await result.current.equals();
  });

  await waitFor(() => {
    expect(result.current.display).toBe("5");
  });
  expect(calculate).toHaveBeenCalledWith({
    operation: "add",
    a: 2,
    b: 3,
  });
});

test("clear resets the calculator", () => {
  const { result } = renderHook(() => useCalculator(calculate));

  act(() => {
    result.current.input("2");
    result.current.setOp("add");
    result.current.input("3");
    result.current.clear();
  });

  expect(result.current.display).toBe("0");
  expect(calculate).not.toHaveBeenCalled();
});

test("chains operations", async () => {
  calculate
    .mockResolvedValueOnce({ result: 5 })
    .mockResolvedValueOnce({ result: 7 });

  const { result } = renderHook(() => useCalculator(calculate));

  act(() => {
    result.current.input("2");
    result.current.setOp("add");
    result.current.input("3");
  });

  await act(async () => {
    await result.current.equals();
  });

  act(() => {
    result.current.setOp("add");
    result.current.input("2");
  });

  await act(async () => {
    await result.current.equals();
  });

  await waitFor(() => {
    expect(result.current.display).toBe("7");
  });
  expect(calculate).toHaveBeenNthCalledWith(1, {
    operation: "add",
    a: 2,
    b: 3,
  });
  expect(calculate).toHaveBeenNthCalledWith(2, {
    operation: "add",
    a: 5,
    b: 2,
  });
});

test("shows backend errors", async () => {
  calculate.mockRejectedValueOnce(new Error("divide by zero"));

  const { result } = renderHook(() => useCalculator(calculate));

  act(() => {
    result.current.input("1");
    result.current.setOp("divide");
    result.current.input("0");
  });

  await act(async () => {
    await result.current.equals();
  });

  await waitFor(() => {
    expect(result.current.display).toBe("divide by zero");
  });
});
