import {
  HStack,
  Heading,
  List,
  Text,
  VStack,
  forwardRef,
  type StackProps,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import {
  type Food,
  type Ingredient,
  type Recipe,
  type Step,
  type Tag,
  type Unit,
} from "@prisma/client";
import useSWR from "swr";
import TagPill from "./Tag";

type RecipePageProps = {
  recipeId: string;
} & StackProps;

const RecipePage = forwardRef<RecipePageProps, "div">((props) => (
  <RecipePageInner {...props} />
));

function RecipePageInner({ recipeId, ...props }: RecipePageProps) {
  type CustomRecipe = Recipe & {
    ingredients: (Ingredient & { food: Food; unit: Unit })[];
    steps: Step[];
    tags: Tag[];
  };

  const url = `api/recipes/${recipeId}`;

  const { data, error, isLoading } = useSWR<CustomRecipe, boolean>(
    url,
    (url: string) => fetch(url).then((res) => res.json())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return (
    <VStack {...props}>
      <Heading>{data.name}</Heading>
      <Text fontSize={{ base: "1.5rem", lg: "2rem" }}>{data.description}</Text>
      <Flex gap={"10px"}>
        {data.tags.map((tag) => {
          return TagPill(tag);
        })}
      </Flex>
      <List width={{ lg: "100%", xl: "80%", xxl: "60%" }}>
        {data.ingredients.map((ingredient) => (
          <SimpleGrid
            key={ingredient.id}
            columns={{ md: 1, lg: 2 }}
            paddingY={{ md: "0.2rem", lg: "0" }}
          >
            <HStack>
              <div>{ingredient.amount}</div>
              <div>{ingredient.unit.name}</div>
            </HStack>
            <div>{ingredient.food.name}</div>
          </SimpleGrid>
        ))}
      </List>
    </VStack>
  );
}
export default RecipePage;
