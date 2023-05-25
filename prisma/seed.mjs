/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ingredients = [
  "Chicken Breast",
  2,
  "whole",
  "Bread Crumbs",
  1,
  "cup",
  "Salt",
  1,
  "tsp",
  "Pepper",
  1,
  "tsp",
  "Egg",
  1,
  "whole",
  "Flour",
  1,
  "cup",
  "Olive Oil",
  2,
  "tbsp",
  "Pasta Sauce",
  1,
  "cup",
  "Mozzarella Cheese",
  1,
  "cup",
  "Parmesan Cheese",
  1,
  "cup",
];

const ingredientsData = ingredients.reduce((acc, ingredient, index) => {
  if (index % 3 === 0) {
    const food = String(ingredient);
    const amount = Number(ingredients[index + 1]);
    const unitName = String(ingredients[index + 2]);

    acc.push({
      food: { create: { name: food } },
      amount,
      unit: {
        connectOrCreate: {
          where: { name: unitName },
          create: { name: unitName },
        },
      },
    });
  }
  return acc;
}, []);

async function seed() {
  try {
    await prisma.recipe.create({
      data: {
        name: "Chicken Parmesan",
        description: "A classic Italian dish",
        ingredients: {
          create: ingredientsData,
        },
        steps: {
          create: [
            {
              number: 1,
              description: "Preheat oven to 350 degrees F.",
            },
            {
              number: 2,
              description: "Combine bread crumbs, salt, and pepper in a bowl.",
            },
            {
              number: 3,
              description: "Beat egg in a separate bowl.",
            },
            {
              number: 4,
              description:
                "Dredge chicken in flour, then egg, then bread crumbs.",
            },
            {
              number: 5,
              description:
                "Pan fry chicken in a skillet with olive oil until golden brown on both sides.",
            },
            {
              number: 6,
              description:
                "Place chicken in a baking dish, cover with pasta sauce, and top with mozzarella and parmesan cheese.",
            },
            {
              number: 7,
              description: "Bake in oven for 30 minutes.",
            },
          ],
        },
        tags: {
          create: [
            {
              name: "Italian",
            },
            {
              name: "Chicken",
            },
            {
              name: "Pasta",
            },
          ],
        },
      },
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
