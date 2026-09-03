import React from "react";
import { Wrap, WrapItem, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { locations } from "../../utils/Constant";
import { Section, SectionHeading, Reveal, WorldReachMap } from "../common";

/**
 * The map here used to be a react-leaflet OpenStreetMap embed. See
 * common/WorldReachMap.jsx for why it is now drawn rather than fetched — in short, the
 * default OSM raster tiles are a bright beige road atlas that fought every other
 * surface on the site, its markers were rendering broken, and dropping it takes
 * leaflet + react-leaflet out of this route's bundle entirely.
 *
 * The market names above the map are unchanged and still the accessible source of
 * truth: the visualisation itself is decorative and hidden from assistive tech.
 */
const ServicesWorldwide = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Global reach"
        title="We serve clients"
        highlight="worldwide"
        subtitle="From startups to enterprises, we partner with teams across the globe — wherever you are, we’re ready to build."
        mb={{ base: 8, md: 12 }}
      />

      <Reveal>
        <Wrap justify="center" spacing={3} mb={8}>
          {locations.map((loc) => (
            <WrapItem key={loc.name}>
              <Tag size="lg" borderRadius="full" px={4} py={2} bg="rgba(180,160,255,0.12)" color="text.primary" border="1px solid" borderColor="rgba(180,160,255,0.25)">
                <TagLeftIcon as={FiMapPin} color="accent.solid" />
                <TagLabel>{loc.name}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Reveal>

      <Reveal delay={0.1}>
        <WorldReachMap height={{ base: "230px", md: "400px", lg: "470px" }} />
      </Reveal>
    </Section>
  );
};

export default ServicesWorldwide;
