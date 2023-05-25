import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Flex,
  Input,
  Select,
  Wrap,
} from "@chakra-ui/react";
import { type Food, type Tag } from "@prisma/client";
import { createHash } from "crypto";
import { useMemo, useState } from "react";
import useSWR from "swr";
import TagPill from "~/app/Tag";

const unitFetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Editor() {
  type CustomIngredient = {
    id: string;
    food: Food;
    amount: number;
    unit: string;
    createdAt: Date;
    updatedAt: Date;
  };

  const { data } = useSWR<string[]>("/api/units", unitFetcher);

  const Units = data ?? [];

  const [tags, setTags] = useState<Tag[]>([]);
  const [ingredients, setIngredients] = useState<CustomIngredient[]>([]);

  const [recipeName, setRecipeName] = useState<string>("");
  const [recipeDescription, setRecipeDescription] = useState<string>("");
  const [tagName, setTagName] = useState<string>("");
  const [ingredientAmount, setIngredientAmount] = useState<number>(1);
  const [ingredientUnit, setIngredientUnit] = useState<string>("");
  const [ingredientName, setIngredientName] = useState<string>("");

  const memoTags = useMemo(() => {
    return tags.map((tag) => (
      <TagPill
        callback={(tag) => {
          setTags(tags.filter((t) => t.id !== tag.id));
        }}
        key={tag.id}
        tag={tag}
      />
    ));
  }, [tags]);

  function AddNewTag() {
    {
      setTags([
        ...tags,
        {
          id: createHash("sha256").update(tagName).digest("base64"),
          name: tagName,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      setTagName("");
    }
  }

  return (
    <Center boxSize={"100%"}>
      <Container
        display={"flex"}
        flexDirection={"column"}
        maxW={"container.md"}
        rowGap={4}
      >
        <Input
          onChange={(event) => setRecipeName(event.target.value)}
          placeholder="Recipe Name"
          value={recipeName}
        />
        <Input
          onChange={(event) => setRecipeDescription(event.target.value)}
          placeholder="Recipe Description"
          value={recipeDescription}
        />
        <Flex
          margin={0}
          justifyContent={"space-between"}
          placeItems={"center"}
          minWidth={"fit-content"}
        >
          <Wrap margin={0}>{memoTags}</Wrap>
          <Flex placeSelf={"flex-start"}>
            <Input
              maxWidth={"3xs"}
              onKeyUp={(event) => {
                if (event.key === "Enter") AddNewTag();
              }}
              onChange={(event) => setTagName(event.target.value)}
              placeholder="Add Tag"
              value={tagName}
            />
            <Button onClick={() => AddNewTag()}>
              <AddIcon />
            </Button>
          </Flex>
        </Flex>
        <Flex dir={"column"}>
          <Input
            onChange={(event) =>
              setIngredientAmount(Number(event.target.value))
            }
            placeholder={"Add Amount"}
            type={"number"}
            value={ingredientAmount}
          />
          <Select
            defaultValue={Units[0]}
            onChange={(event) => setIngredientUnit(event.target.value)}
            value={ingredientUnit}
          >
            {Units &&
              Units.map((unit) => (
                <option
                  key={unit}
                  value={unit}
                >
                  {unit}
                </option>
              ))}
          </Select>
          <Input
            onChange={(event) => setIngredientName(event.target.value)}
            placeholder={"Add Ingredient"}
            value={ingredientName}
          />
          <Button
            onClick={() => {
              setIngredients([
                ...ingredients,
                {
                  id: createHash("sha256")
                    .update(ingredientName)
                    .digest("base64"),
                  food: {
                    id: createHash("sha256")
                      .update(ingredientName)
                      .digest("base64"),
                    name: ingredientName,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                  amount: ingredientAmount,
                  unit: ingredientUnit,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ]);
            }}
          >
            <AddIcon />
          </Button>
        </Flex>
      </Container>
    </Center>
  );
}
