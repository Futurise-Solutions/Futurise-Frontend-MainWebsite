import React from "react";
import { motion } from "framer-motion";
import { Box, SimpleGrid, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { Section, SectionHeading } from "../common";
import { useBlogs } from "../../hooks/useBlogs";
import BlogCard from "./BlogCard";

const MotionBox = motion(Box);

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const LatestBlogs = () => {
  const { blogs, loading } = useBlogs();
  const latest = blogs.slice(0, 4);

  // Hide the section entirely if there are no published blogs (or the API is unreachable).
  //
  // Returning null *after* a full-height loading skeleton has painted collapses roughly
  // 740px of layout and drags the footer up with it — a ~0.18 CLS hit on the home page,
  // which is most of the way to failing Core Web Vitals on its own. Rendering nothing
  // from the very first paint, and only revealing the section once there is something
  // real to show, removes the shift entirely: nothing that was on screen ever moves.
  if (loading || latest.length === 0) return null;

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
        <Button as={Link} to="/blog" variant="outlineGlow" rightIcon={<FiArrowUpRight />} display={{ base: "none", md: "inline-flex" }} flexShrink={0}>
          View all articles
        </Button>
      </Flex>

      {/* No loading skeleton: the section does not mount until `latest` is populated,
          so there is no intermediate state to fill. See the guard above. */}
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
        <Button as={Link} to="/blog" variant="outlineGlow" rightIcon={<FiArrowUpRight />}>
          View all articles
        </Button>
      </Flex>
    </Section>
  );
};

export default LatestBlogs;
