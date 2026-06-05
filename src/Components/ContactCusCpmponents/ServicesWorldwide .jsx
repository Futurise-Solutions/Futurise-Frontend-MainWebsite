import React from "react";
import { Box, Wrap, WrapItem, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { locations } from "../../utils/Constant";
import { Section, SectionHeading, Reveal } from "../common";

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
              <Tag size="lg" borderRadius="full" px={4} py={2} bg="rgba(111,147,255,0.12)" color="text.primary" border="1px solid" borderColor="rgba(111,147,255,0.25)">
                <TagLeftIcon as={FiMapPin} color="accent.solid" />
                <TagLabel>{loc.name}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Reveal>

      <Reveal delay={0.1}>
        <Box
          height={{ base: "340px", md: "480px" }}
          borderRadius="20px"
          overflow="hidden"
          border="1px solid"
          borderColor="border.subtle"
        >
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={false}
            className="map-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
              <Marker key={index} position={location.coordinates}>
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Reveal>
    </Section>
  );
};

export default ServicesWorldwide;
