import { type Recipe, type Ingredient } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        if (!req.query.id || Array.isArray(req.query.id)) {
          res.status(400).json({ error: "Wrong recipe ID provided." });
          return;
        }

        const recipe: Recipe | null = await prisma.recipe.findUnique({
          where: { id: req.query.id },
          include: {
            ingredients: {
              include: {
                food: true,
                unit: true,
              },
            },
            steps: true,
            tags: true,
          },
        });

        res.status(200).json(recipe);
      } catch (error) {
        res.status(500).json({ error: "Error fetching ingredients." });
      }
      break;
    case "POST":
      try {
        const data = req.body as Ingredient;
        const ingredient = await prisma.ingredient.create({ data });
        res.status(200).json(ingredient);
      } catch (error) {
        res.status(500).json({ error: "Error posting ingredient." });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method as string} Not Allowed`);
  }
}
