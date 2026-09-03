import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box, Container, Heading, Text, Button, HStack, VStack, Image, Badge, SimpleGrid, Skeleton, Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInbox } from "react-icons/fi";
import { Seo } from "../Components/common";
import BlogCard from "../Components/blog/BlogCard";
import CategoryFilter from "../Components/blog/CategoryFilter";
import { useBlogs } from "../hooks/useBlogs";
import { mediaUrl } from "../config";
import { formatDate, readTime } from "../utils/blog";

const MotionBox = motion(Box);

const HeroBlog = ({ blog }) => (
  <Box position="relative" minH={{ base: "440px", md: "520px" }} overflow="hidden" display="flex" alignItems="center">
    <Box position="absolute" inset={0}>
      {/* Featured-post backdrop at the top of /blog — the LCP element on this page. */}
      {blog.featuredImage && (
        <Image src={mediaUrl(blog.featuredImage)} alt={blog.title} w="full" h="full" loading="eager" fetchpriority="high" decoding="async" objectFit="cover" />
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
          <Text fontSize="xs" letterSpacing="0.15em" textTransform="uppercase" color="accent.solid" fontWeight={600}>
            Latest Post
          </Text>
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
          <Text>{readTime(blog.content || blog.shortDescription)} min read</Text>
        </HStack>
        <Button as={Link} to={`/blog/${blog.slug}`} mt={7} variant="gradient" size="lg" rightIcon={<FiArrowRight />}>
          Read Article
        </Button>
      </MotionBox>
    </Container>
  </Box>
);

const BlogsPage = () => {
  const { blogs, loading } = useBlogs();
  const [active, setActive] = useState("All");

  const hero = blogs[0];
  const rest = useMemo(() => blogs.slice(1), [blogs]);
  const categories = useMemo(() => [...new Set(blogs.map((b) => b.category).filter(Boolean))], [blogs]);
  const filtered = useMemo(
    () => (active === "All" ? rest : rest.filter((b) => b.category === active)),
    [rest, active]
  );

  const jsonLd = useMemo(() => {
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Blog | Futurise Solutions",
        url: "https://www.futurisesolutions.com/blog",
        description:
          "Insights, deep-dives and engineering notes from Futurise Solutions on AI, SaaS, web and mobile development.",
        isPartOf: { "@type": "WebSite", name: "Futurise Solutions", url: "https://www.futurisesolutions.com" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurisesolutions.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.futurisesolutions.com/blog" },
        ],
      },
    ];
    if (blogs.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: blogs.slice(0, 20).map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://www.futurisesolutions.com/blog/${b.slug}`,
          name: b.title,
        })),
      });
    }
    return schemas;
  }, [blogs]);

  return (
    <Box>
      <Seo
        title="AI, SaaS & Web Development Insights"
        description="Engineering notes and deep-dives on AI agents, SaaS architecture, web and mobile development from the Futurise Solutions team."
        path="/blog"
        keywords="software development blog, AI development insights, web development, SaaS, app development, futurise solutions"
        jsonLd={jsonLd}
      />

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
      {loading ? (
        <Skeleton h={{ base: "440px", md: "520px" }} startColor="rgba(255,255,255,0.04)" endColor="rgba(255,255,255,0.08)" />
      ) : hero ? (
        <HeroBlog blog={hero} />
      ) : (
        <Box minH="200px" display="flex" alignItems="center">
          <Container maxW="1200px" px={{ base: 5, md: 8 }}>
            <Text color="text.muted">No articles published yet — check back soon.</Text>
          </Container>
        </Box>
      )}

      {/* Sticky category filter */}
      {!loading && categories.length > 0 && (
        <Box position="sticky" top="62px" zIndex={10} bg="rgba(8,8,13,0.85)" backdropFilter="blur(16px)" borderBottom="1px solid" borderColor="border.subtle">
          <Container maxW="1200px" px={{ base: 5, md: 8 }} py={3}>
            <CategoryFilter categories={categories} active={active} onChange={setActive} />
          </Container>
        </Box>
      )}

      {/* Grid */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={16}>
        {/* Section heading for the archive. Gives the card list a labelled parent in the
            outline instead of 52 orphaned links under the featured post. */}
        {!loading && filtered.length > 0 && (
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight={700} color="text.primary" mb={8}>
            {active === "All" ? "All articles" : `${active} articles`}
          </Heading>
        )}
        {loading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} h="340px" borderRadius="20px" startColor="rgba(255,255,255,0.04)" endColor="rgba(255,255,255,0.09)" />
            ))}
          </SimpleGrid>
        ) : filtered.length === 0 ? (
          <VStack spacing={4} py={20} color="text.faint">
            <Icon as={FiInbox} boxSize={12} />
            <Text fontSize="lg">No articles in this category yet.</Text>
          </VStack>
        ) : (
          <AnimatePresence mode="wait">
            <MotionBox
              key={active}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filtered.map((b) => (
                  <MotionBox
                    key={b._id || b.slug}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                    h="full"
                  >
                    <BlogCard blog={b} />
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionBox>
          </AnimatePresence>
        )}
      </Container>
    </Box>
  );
};

export default BlogsPage;
