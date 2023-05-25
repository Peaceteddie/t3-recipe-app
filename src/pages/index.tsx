import {
  Center,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Heading,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import type { Recipe } from "@prisma/client";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import RecipePage from "~/app/RecipePage";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const backgroundColor = useColorModeValue("gray.100", "gray.700");
  const [recipeId, setRecipeId] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR<Recipe[], boolean>(
    "api/recipes",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return (
    <>
      <Head>
        <title>Massive Meals</title>
        <meta
          name="description"
          content="A super awesome recipe app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Center
        boxSize={"100%"}
        backgroundColor={backgroundColor}
      >
        <Flex
          boxSize={"100%"}
          padding={{ md: 0, lg: "5rem 10rem 0" }}
        >
          <SimpleGrid
            boxSize={"100%"}
            columns={{ md: 1, lg: 2 }}
          >
            <VStack
              placeSelf={"flex-start"}
              width={"100%"}
            >
              <Heading paddingY={"2rem"}>Recipes:</Heading>
              {data.map((recipe) => (
                <Button
                  key={recipe.name}
                  onClick={() => setRecipeId(recipe.id)}
                >
                  {recipe.name}
                </Button>
              ))}
            </VStack>
            <Center
              backgroundColor={"gray.600"}
              boxSize={"100%"}
            >
              {recipeId && (
                <RecipePage
                  boxSize={"100%"}
                  gap={"2rem"}
                  padding={"2rem"}
                  recipeId={recipeId}
                />
              )}
            </Center>
          </SimpleGrid>
        </Flex>
      </Center>
    </>
  );
}
