'use client'

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box, Container, Heading, Text, Button, HStack, VStack, Badge, SimpleGrid, Icon,
} from "@chakra-ui/react";
import NextImage from "next/image";
import Link from "next/link";
import { FiArrowRight, FiInbox } from "react-icons/fi";
import BlogCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";
import { mediaUrl, formatDate, readTime } from "@/lib/blog";

/**
 * /blog presentation, ported VERBATIM from BlogsPage.jsx.
 *
 * Two structural changes, both consequences of fetching on the server:
 *   1. `useBlogs()` and every `loading` branch are gone — the Skeletons existed only to
 *      fill the gap before a client fetch resolved. There is no gap now; the markup is
 *      correct in the first byte.
 *   2. PAGINATION is added (PAGE_SIZE below). 83 posts in one grid is 83 cards and 83
 *      images on one response.
 * Category filtering stays client-side, exactly as before.
 */
const MotionBox = motion.create(Box);

/** Cards per page. The first six load eagerly; everything after is lazy. */
const PAGE_SIZE = 12;

const HeroBlog = ({ blog }) => (
  <Box position="relative" minH={{ base: "440px", md: "520px" }} overflow="hidden" display="flex" alignItems="center">
    <Box position="absolute" inset={0}>
      {/* Featured-post backdrop at the top of /blog — the LCP element on this page.
          D27: next/image with `priority` (it was loading="eager" + fetchpriority="high").
          Remote Cloudinary URL, so `fill` rather than a static import's intrinsic size. */}
      {blog.featuredImage && (
        <NextImage
          src={mediaUrl(blog.featuredImage)}
          alt={blog.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      )}
      <Box position="absolute" inset={0} bgGradient="linear(to-r, rgba(8,8,13,0.95) 0%, rgba(8,8,13,0.7) 55%, rgba(8,8,13,0.25) 100%)" />
      <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(8,8,13,0.9), transparent 50%)" />
    </Box>
    <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
      <MotionBox maxW="640px" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <HStack spacing={3} mb={4}>
          {blog.category && (
            <Badge bg="brand.500" color="white" borderRadius="full" px={3} py={1} fontSize="xs" textTransform="none" fontWeight={600}>
              {blog.category}
            </Badge>
          )}
        </HStack>
        {/* h2, not h1: this is the newest post, so an h1 here made the page's top-level
            heading change with every publish. The stable page h1 lives above the hero. */}
        <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight={800} color="text.primary" lineHeight={1.1} noOfLines={3}>
          {blog.title}
        </Heading>
        <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} noOfLines={3} mt={4} maxW="600px" lineHeight={1.7}>
          {blog.shortDescription}
        </Text>
        <HStack spacing={3} mt={5} color="text.faint" fontSize="sm">
          <Text>{formatDate(blog.createdAt)}</Text>
          <Box w="4px" h="4px" rounded="full" bg="text.faint" />
          <Text>{blog.readingMinutes ?? readTime(blog.content || blog.shortDescription)} min read</Text>
        </HStack>
        <Button as={Link} href={`/blog/${blog.slug}`} mt={7} variant="gradient" size="lg" rightIcon={<FiArrowRight />}>
          Read Article
        </Button>
      </MotionBox>
    </Container>
  </Box>
);

export default function BlogsPageView({ blogs }) {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  const hero = blogs[0];
  const rest = useMemo(() => blogs.slice(1), [blogs]);
  const categories = useMemo(() => [...new Set(blogs.map((b) => b.category).filter(Boolean))], [blogs]);
  const filtered = useMemo(
    () => (active === "All" ? rest : rest.filter((b) => b.category === active)),
    [rest, active]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const onCategory = (c) => {
    setActive(c);
    setPage(1); // A new filter starts at its own first page, not wherever the last one was.
  };

  return (
    <Box>
      {/* Stable page header. The h1 has to describe the archive rather than its newest
          article, otherwise the page's primary heading — and the topic Google reads from
          it — changes every time a post is published. */}
      <Box as="header" pt={{ base: 10, md: 16 }} pb={{ base: 6, md: 8 }}>
        <Container maxW="1200px" px={{ base: 5, md: 8 }}>
          <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight={800} lineHeight={1.1} letterSpacing="-0.02em">
            Insights on AI, SaaS &amp; <Box as="span" className="gradient-text">Product Engineering</Box>
          </Heading>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} mt={4} maxW="720px" lineHeight={1.7}>
            Engineering notes, architecture deep-dives and field lessons from building AI
            agents, SaaS platforms and production apps.
          </Text>
        </Container>
      </Box>

      {/* Hero */}
      {hero ? (
        <HeroBlog blog={hero} />
      ) : (
        <Box minH="200px" display="flex" alignItems="center">
          <Container maxW="1200px" px={{ base: 5, md: 8 }}>
            <Text color="text.muted">No articles published yet. Check back soon.</Text>
          </Container>
        </Box>
      )}

      {/* Sticky category filter */}
      {categories.length > 0 && (
        <Box position="sticky" top="62px" zIndex={10} bg="rgba(8,8,13,0.85)" backdropFilter="blur(16px)" borderBottom="1px solid" borderColor="border.subtle">
          <Container maxW="1200px" px={{ base: 5, md: 8 }} py={3}>
            <CategoryFilter categories={categories} active={active} onChange={onCategory} />
          </Container>
        </Box>
      )}

      {/* Grid */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={16}>
        {/* Section heading for the archive. Gives the card list a labelled parent in the
            outline instead of orphaned links under the featured post. */}
        {filtered.length > 0 && (
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight={700} color="text.primary" mb={8}>
            {active === "All" ? "All articles" : `${active} articles`}
          </Heading>
        )}
        {filtered.length === 0 ? (
          <VStack spacing={4} py={20} color="text.faint">
            <Icon as={FiInbox} boxSize={12} />
            <Text fontSize="lg">No articles in this category yet.</Text>
          </VStack>
        ) : (
          <AnimatePresence mode="wait">
            <MotionBox
              key={`${active}-${current}`}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {visible.map((b, i) => (
                  <MotionBox
                    key={b._id || b.slug}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                    h="full"
                  >
                    {/* First six eager, everything after lazy — `priority` is on NONE of
                        these; the page's LCP is the hero backdrop above. */}
                    <BlogCard blog={b} eager={current === 1 && i < 6} />
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionBox>
          </AnimatePresence>
        )}

        {pageCount > 1 && (
          <HStack justify="center" spacing={3} mt={12}>
            <Button
              variant="outlineGlow"
              size="sm"
              isDisabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              Previous
            </Button>
            <Text fontSize="sm" color="text.muted">
              Page {current} of {pageCount}
            </Text>
            <Button
              variant="outlineGlow"
              size="sm"
              isDisabled={current === pageCount}
              onClick={() => setPage(current + 1)}
            >
              Next
            </Button>
          </HStack>
        )}

        {/* ── CRAWLABLE ARCHIVE ────────────────────────────────────────────────
            The grid above paginates in React state, so only the first PAGE_SIZE
            cards exist in the server-rendered HTML. MEASURED before this block was
            added: /blog linked to 13 of 86 posts, and 42 posts had ZERO inbound
            internal links from anywhere on the site — reachable only via the
            sitemap, which is a discovery hint rather than a ranking path.

            This renders every post as a plain <a> in one flat list. It is not a
            second navigation surface for readers — it sits below the pager, reads
            as an index, and duplicates no card styling. Its job is to give every
            post one guaranteed inbound link from a page that is itself linked
            site-wide.

            ⚠️ It must render from `blogs`, NOT from `filtered` or `visible`. Those
            are narrowed by the category filter and the pager, which are exactly
            the client-state mechanisms this block exists to bypass. */}
        {/* Heading reads "Complete archive", not "All articles": the filtered grid above
            already renders an h2 reading "All articles" whenever no category is selected,
            and two identical h2s on one page describe the same section twice. */}
        {blogs.length > 0 && (
          <Box as="nav" aria-label="Complete article archive" mt={{ base: 16, md: 20 }} pt={10} borderTop="1px solid" borderColor="border.subtle">
            <Heading as="h2" fontSize={{ base: "20px", md: "24px" }} mb={2}>
              Complete archive
            </Heading>
            <Text color="text.muted" fontSize="sm" mb={6}>
              Every post, oldest to newest: {blogs.length} in total.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX={8} spacingY={3}>
              {blogs.map((b) => (
                <Text
                  key={b._id || b.slug}
                  as={Link}
                  href={`/blog/${b.slug}`}
                  fontSize="14px"
                  color="text.muted"
                  lineHeight={1.6}
                  _hover={{ color: "accent.solid" }}
                  transition="color .2s"
                >
                  {b.title}
                </Text>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
