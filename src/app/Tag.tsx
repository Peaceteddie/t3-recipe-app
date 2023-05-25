import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { type Tag } from "@prisma/client";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin-ext"] });

export default function TagPill({
  tag,
  callback,
  ...props
}: {
  tag: Tag;
  callback?: (tag: Tag) => void;
} & Record<string, unknown>) {
  const hue = 30 + Math.floor(Math.random() * 300);

  return (
    <Flex
      alignItems={"center"}
      backgroundColor={`hsl(${hue}, 100%, 35%)`}
      borderRadius={"25px"}
      flexWrap={"nowrap"}
      key={tag.id}
      letterSpacing={"1px"}
      lineHeight={"25px"}
      padding={"8px 20px"}
      {...props}
    >
      <Flex
        background={`
          linear-gradient(
            to bottom right,
            hsl(100,  100%, 70%) 25%,
            hsl(200,  100%, 70%) 50%,
            hsl(300,  100%, 70%) 100%
          )
        `}
        backgroundClip={"text"}
        className={nunito.className}
        fontSize={"1.4rem"}
        fontWeight={"semibold"}
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#fffa",
        }}
      >
        {tag.name}
      </Flex>
      {callback && (
        <Button
          justifyContent={"flex-end"}
          backgroundColor={"transparent"}
          boxSize={"25px"}
          flex={"1 0 auto"}
          minWidth={0}
          padding={0}
          paddingTop={"2px"}
        >
          <CloseIcon
            boxSize={"75%"}
            color={"red"}
            margin={0}
            onClick={() => callback(tag)}
            padding={0}
            stroke={"black"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            strokeWidth={".5px"}
          />
        </Button>
      )}
    </Flex>
  );
}
