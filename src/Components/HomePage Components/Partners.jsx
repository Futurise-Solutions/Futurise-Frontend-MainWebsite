import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { partners } from "../../utils/Constant";

const Partners = () => {
  return (
    <Box py={{ base: 10, md: 12 }} borderY="1px solid" borderColor="border.subtle" position="relative">
      <Text textAlign="center" fontSize="sm" letterSpacing="0.16em" textTransform="uppercase" color="text.faint" mb={8}>
        Trusted by ambitious teams worldwide
      </Text>
      <Box
        position="relative"
        _before={{ content: '""', position: "absolute", left: 0, top: 0, bottom: 0, w: { base: "40px", md: "120px" }, zIndex: 2, bgGradient: "linear(to-r, bg.canvas, transparent)" }}
        _after={{ content: '""', position: "absolute", right: 0, top: 0, bottom: 0, w: { base: "40px", md: "120px" }, zIndex: 2, bgGradient: "linear(to-l, bg.canvas, transparent)" }}
      >
        <Marquee speed={45} gradient={false} pauseOnHover>
          {partners.map((item, index) => (
            <Box key={index} mx={{ base: 8, md: 12 }} opacity={0.55} transition="opacity .3s" _hover={{ opacity: 1 }}>
              <Image src={item.img} alt="Client logo" h={{ base: "26px", md: "30px" }} objectFit="contain" filter="grayscale(1) brightness(1.6)" />
            </Box>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default Partners;
