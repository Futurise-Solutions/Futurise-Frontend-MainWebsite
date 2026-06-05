import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { logo } from "../../assests";

/** Actual Futurise wordmark, used in navbar + footer + loader. */
const Logo = ({ size = "md", to = "/", ...rest }) => {
  const h = size === "lg" ? { base: "34px", md: "40px" } : { base: "30px", md: "34px" };
  return (
    <Box
      as={to ? Link : "div"}
      to={to}
      display="inline-flex"
      alignItems="center"
      transition="transform .25s ease, filter .25s ease"
      _hover={{ transform: "scale(1.04)", filter: "drop-shadow(0 4px 14px rgba(111,147,255,0.45))" }}
      {...rest}
    >
      <Image src={logo} alt="Futurise Solutions" h={h} w="auto" objectFit="contain" draggable={false} />
    </Box>
  );
};

export default Logo;
