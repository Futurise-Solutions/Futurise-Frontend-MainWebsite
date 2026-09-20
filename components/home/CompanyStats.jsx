'use client'

import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { companyStats } from "../../utils/Constant";
import { Section, Reveal } from "../common";

/**
 * Counts up once when scrolled into view, then stays at its final value.
 *
 * ⚠️ `react-visibility-sensor` WAS REMOVED HERE — do not reinstate it.
 * It calls `ReactDOM.findDOMNode()`, which React 19 DELETED. That threw
 * "findDOMNode is not a function" during hydration and took down the entire tree, so
 * the production build rendered a blank page. The package's latest version (5.1.1) was
 * published in 2022 and there is no React 19 compatible release, so it is replaced
 * rather than upgraded. IntersectionObserver is what the sensor was emulating anyway,
 * and it needs no node lookup — the ref points at the element directly.
 *
 * BOTH original invariants are preserved, and both exist because of bugs that shipped:
 *
 *   - The observer DISCONNECTS after the first sighting, which is what `active={!counted}`
 *     did. Without it the number drops back whenever the section scrolls out of view.
 *   - `rootMargin: "0px 0px 40px 0px"` reproduces `partialVisibility` + `offset={{bottom:40}}`.
 *
 * ⚠️ AND THE SSR TEXT IS NOW STABLE, which fixes React error #418.
 * The old code rendered the bare `value` on the server and swapped in <CountUp> on the
 * client for the SAME element — a genuine hydration mismatch. Now the server and the
 * first client render both emit `value`, and CountUp only mounts after the observer
 * fires, which is necessarily after hydration. Nothing is suppressed.
 *
 * The no-JS/crawler behaviour is unchanged and still deliberate: the markup contains the
 * REAL figure, never 0. A 0 fallback once meant every crawler read "0+ Projects
 * delivered" off the home page. There is no visual cost — an element that has not been
 * scrolled into view has not been read yet, so the count still animates from 0 the
 * moment it appears.
 */
const StatValue = ({ value, suffix }) => {
  const [counted, setCounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (counted) return;
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browser): show the real figure, never 0.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCounted(true);
          observer.disconnect(); // latch off — see the note above
        }
      },
      { rootMargin: "0px 0px 40px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [counted]);

  return (
    <span ref={ref}>
      {counted ? <CountUp end={value} duration={2.2} /> : value}
      {suffix}
    </span>
  );
};

const CompanyStats = () => {
  return (
    <Section py={{ base: "40px", md: "56px" }}>
      <Reveal>
        <Box
          borderRadius="24px"
          border="1px solid"
          borderColor="border.subtle"
          bg="bg.surface"
          backdropFilter="blur(12px)"
          py={{ base: 8, md: 10 }}
          px={{ base: 4, md: 8 }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 4 }}>
            {companyStats.map((stat) => (
              <Box key={stat.label} textAlign="center" position="relative">
                <Text
                  fontFamily="heading"
                  fontWeight={700}
                  fontSize={{ base: "34px", md: "44px" }}
                  className="gradient-text"
                  lineHeight={1}
                >
                  <StatValue value={stat.value} suffix={stat.suffix} />
                </Text>
                <Text mt={2} fontSize={{ base: "sm", md: "md" }} color="text.muted">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Reveal>
    </Section>
  );
};

export default CompanyStats;
