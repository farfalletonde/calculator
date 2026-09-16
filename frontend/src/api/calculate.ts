export type CalculateRequest = {
  operation: string;
  a: number;
  b: number;
};

export type CalculateResponse = {
  result: number;
};

export const calculate = async (
  req: CalculateRequest,
): Promise<CalculateResponse> => {
  const res = await fetch("/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};
