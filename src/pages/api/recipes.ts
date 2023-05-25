import { type NextApiRequest, type NextApiResponse } from "next";
import type { Recipe } from "@prisma/client";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const recipes = await prisma.recipe.findMany();
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({ error: "Error fetching recipes." });
      }
      break;
    case "POST":
      try {
        const data = req.body as Recipe;
        const recipe = await prisma.recipe.create({ data });
        res.status(200).json(recipe);
      } catch (error) {
        res.status(500).json({ error: "Error posting recipe." });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method as string} Not Allowed`);
  }
}
