import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { partners } from "../../utils/Constant";

const Partners = () => (
  <Box py={{ base: 10, md: 12 }} borderY="1px solid" borderColor="border.subtle" position="relative">
    <Text
      textAlign="center"
      fontSize="sm"
      letterSpacing="0.16em"
      textTransform="uppercase"
      color="text.faint"
      mb={8}
    >
      Trusted by ambitious teams worldwide
    </Text>
    <Box
      position="relative"
      _before={{ content: '""', position: "absolute", left: 0, top: 0, bottom: 0, w: { base: "40px", md: "120px" }, zIndex: 2, bgGradient: "linear(to-r, bg.canvas, transparent)" }}
      _after={{  content: '""', position: "absolute", right: 0, top: 0, bottom: 0, w: { base: "40px", md: "120px" }, zIndex: 2, bgGradient: "linear(to-l, bg.canvas, transparent)" }}
    >
      {/* Logos render in their own brand colours at full opacity. They were previously
          held at 0.5 opacity and lifted only on hover, which meant a visitor had to
          hover a moving target to see whose logo it was — and on touch, where there is
          no hover, never saw it at all. The marquee's speed, direction and
          pause-on-hover are unchanged. */}
      <Marquee speed={40} gradient={false} pauseOnHover>
        {[...partners, ...partners].map((item, i) => (
          <Box key={i} mx={{ base: 8, md: 12 }}>
            <Image
              src={item.img}
              alt={item.name}
              h={{ base: "36px", md: "42px" }}
              w="auto"
              loading="lazy"
              decoding="async"
              objectFit="contain"
            />
          </Box>
        ))}
      </Marquee>
    </Box>
  </Box>
);

export default Partners;
