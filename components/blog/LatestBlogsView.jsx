'use client'

import { motion } from "framer-motion";
import { Box, SimpleGrid, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Section, SectionHeading } from "@/components/common";
import BlogCard from "./BlogCard";

/**
 * Presentation half of LatestBlogs, ported VERBATIM from the old component.
 *
 * Split from the data fetch so the fetch can be a server component: the markup here is
 * unchanged, but `blogs`/`loading` from useBlogs() become a `latest` prop, and the
 * `if (loading || latest.length === 0) return null` guard moves to the server half —
 * where it runs before anything paints.
 */
const MotionBox = motion(Box);

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function LatestBlogsView({ latest }) {
  return (
    <Section>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "end" }} gap={6} mb={{ base: 10, md: 14 }}>
        <SectionHeading
          align="left"
          eyebrow="Insights"
          title="Latest from the"
          highlight="Blog"
          subtitle="Ideas, deep-dives, and engineering notes on AI, product, and modern web development."
          mx={0}
        />
        <Button as={Link} href="/blog" variant="outlineGlow" rightIcon={<FiArrowUpRight />} display={{ base: "none", md: "inline-flex" }} flexShrink={0}>
          View all articles
        </Button>
      </Flex>

      {/* No loading skeleton: the section does not mount until `latest` is populated,
          so there is no intermediate state to fill. See the guard in LatestBlogs.jsx. */}
      <MotionBox variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {latest.map((b) => (
            <MotionBox key={b._id || b.slug} variants={cardVariant} h="full">
              <BlogCard blog={b} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </MotionBox>

      <Flex justify="center" mt={10} display={{ base: "flex", md: "none" }}>
        <Button as={Link} href="/blog" variant="outlineGlow" rightIcon={<FiArrowUpRight />}>
          View all articles
        </Button>
      </Flex>
    </Section>
  );
}
