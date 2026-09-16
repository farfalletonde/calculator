import { render } from "@testing-library/react";
import { test } from "vitest";
import App from "./App";

test("renders App without crashing", () => {
  render(<App />);
});
