'use client'

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
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
        {/* D27: next/image with the static import passed directly. The original was a
            Chakra <Image> with a responsive HEIGHT and `w="auto"`, i.e. the logo keeps
            its own aspect ratio and only the height is controlled. next/image needs an
            intrinsic size, so the static import supplies it and CSS reproduces the
            original sizing: height fixed per breakpoint, width automatic.
            `loading="lazy"` and `decoding="async"` are next/image defaults. */}
        {[...partners, ...partners].map((item, i) => (
          <Box
            key={i}
            mx={{ base: 8, md: 12 }}
            h={{ base: "36px", md: "42px" }}
            sx={{
              "& img": {
                height: "100%",
                width: "auto",
                objectFit: "contain",
              },
            }}
          >
            <Image src={item.img} alt={item.name} />
          </Box>
        ))}
      </Marquee>
    </Box>
  </Box>
);

export default Partners;
