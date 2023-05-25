import { type NextApiRequest, type NextApiResponse } from "next";

const Units = [
  "whole",
  "half",
  "quarter",
  "eighth",
  "clove",
  "bulb",
  "head",
  "slice",
  "smidgen",
  "pinch",
  "dash",
  "teaspoon",
  "tablespoon",
  "drop",
  "milliliter",
  "deciliter",
  "liter",
  "milligram",
  "gram",
  "kilogram",
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        res.status(200).json(Units);
      } catch (error) {
        res.status(500).json({ error: "Error fetching units." });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method as string} Not Allowed`);
  }
}
