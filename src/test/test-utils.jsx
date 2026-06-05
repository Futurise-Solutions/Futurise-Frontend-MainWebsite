import React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import theme from "../theme";

/**
 * Renders a component inside the app's providers (Chakra theme + Router).
 * Pass `route` to set the initial router location.
 */
export function renderWithProviders(ui, { route = "/", ...options } = {}) {
  const Wrapper = ({ children }) => (
    <ChakraProvider theme={theme}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </ChakraProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
