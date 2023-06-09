import { ChakraProvider } from "@chakra-ui/react";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
