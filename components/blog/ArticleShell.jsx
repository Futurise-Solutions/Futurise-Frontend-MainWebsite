'use client'

import { Box, Container, Flex, Heading, Text, Button, HStack, SimpleGrid, Icon, Badge, Tag } from "@chakra-ui/react";
import NextImage from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import BlogCard from "./BlogCard";
import ArticleSidebar from "./ArticleSidebar";
import BlogCTA from "./BlogCTA";
import { mediaUrl, formatDate, readTime } from "@/lib/blog";
import { CONTACT } from "@/utils/Constant/navigation";

/**
 * Article page chrome — ported verbatim from BlogDetailPage.jsx.
 *
 * ⚠️ The ARTICLE BODY IS NOT HERE. It is a server component (ArticleBody.jsx) and is
 * passed in as `children`, so the article text never crosses the client boundary. This
 * component is Chakra chrome around it: hero, title, meta, related posts.
 */
export default function ArticleShell({
  blog,
  headings,
  parsedTags,
  isLatest,
  related,
  authorName,
  children,
}) {
  return (
    <Box>
      <Container maxW="1200px" px={{ base: 5, md: 8 }} pt={{ base: 6, md: 10 }}>
        <Button as={Link} href="/blog" variant="ghostLink" size="sm" leftIcon={<FiArrowLeft />} mb={6}>
          Back to Blog
        </Button>

        {/* Hero image */}
        {blog.featuredImage && (
          <Box position="relative" borderRadius="22px" overflow="hidden" h="480px" maxH="480px" mb={8} border="1px solid" borderColor="border.subtle">
            {/* Article hero — the LCP element on every blog post, so `priority`
                (it was loading="eager" + fetchpriority="high"). Remote Cloudinary URL,
                so `fill` rather than a static import's intrinsic size. */}
            <NextImage
              src={mediaUrl(blog.featuredImage)}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
            <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(8,8,13,0.6), transparent 50%)" pointerEvents="none" />
            <HStack position="absolute" top={4} left={4} spacing={3}>
              {blog.category && (
                <Badge bg="brand.500" color="white" borderRadius="full" px={3} py={1} fontSize="xs" textTransform="none" fontWeight={600}>
                  {blog.category}
                </Badge>
              )}
              {isLatest && (
                <Text fontSize="xs" letterSpacing="0.15em" textTransform="uppercase" color="accent.solid" fontWeight={600}>
                  Latest Post
                </Text>
              )}
            </HStack>
          </Box>
        )}

        {/* Title + meta */}
        <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight={800} lineHeight={1.12} mb={4}>
          {blog.title}
        </Heading>
        <HStack spacing={5} color="text.faint" fontSize="sm" flexWrap="wrap" mb={3}>
          <HStack spacing={2}><Icon as={FiCalendar} /><Text>{formatDate(blog.createdAt)}</Text></HStack>
          {/* Shown only for a real revision (more than a day after publishing), so readers
              can see the content was reviewed recently, not just re-saved. */}
          {blog.updatedAt && new Date(blog.updatedAt) - new Date(blog.createdAt) > 864e5 && (
            <Text>Updated {formatDate(blog.updatedAt)}</Text>
          )}
          <HStack spacing={2}><Icon as={FiClock} /><Text>{readTime(blog.content)} min read</Text></HStack>
          {/* Byline links to /about so the claim of expertise is one click from the
              evidence for it — and so the article passes a link to that page. */}
          <HStack spacing={2}>
            <Icon as={FiUser} />
            <Text as={Link} href="/about" _hover={{ color: "accent.solid" }} transition="color .2s">
              By {authorName}
            </Text>
          </HStack>
        </HStack>
        {parsedTags.length > 0 && (
          <HStack spacing={2} flexWrap="wrap" mb={2}>
            {parsedTags.map((t) => (
              <Tag key={t} size="sm" bg="rgba(180,160,255,0.12)" color="accent.solid" borderRadius="full" px={3}>#{t}</Tag>
            ))}
          </HStack>
        )}

        {/* Content + sidebar */}
        <Flex gap={{ base: 8, lg: 14 }} align="start" mt={8}>
          <Box flex="1" maxW="800px" minW={0}>
            {/* Server-rendered article body. */}
            {children}
            {/* "Who and how" disclosure, per Google's people-first content guidance: who wrote
                it, how AI was used, and how to report an error. Keep it true: if the editorial
                process changes, change this text. */}
            <Box mt={12} pt={6} borderTop="1px solid" borderColor="border.subtle" color="text.faint" fontSize="sm" lineHeight={1.7}>
              <Text fontWeight={600} color="text.muted" mb={1}>About this article</Text>
              <Text>
                Written by the Futurise Solutions team. We use AI tools to help with research and drafting;
                our team edits each article and checks figures and regulatory details against the
                sources linked in it. Spotted something wrong?{" "}
                <Text as="a" href={`mailto:${CONTACT.email}`} color="accent.solid">Email us</Text>.
              </Text>
            </Box>
          </Box>

          <ArticleSidebar headings={headings} title={blog.title} slug={blog.slug} />
        </Flex>
      </Container>

      {/* Offer before related posts: the reader is at peak intent having just finished
          the article, and "Related articles" alone gave them no way to act on it. */}
      <BlogCTA category={blog.category} />

      {/* Related posts */}
      {related.length > 0 && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 16, md: 20 }}>
          <Flex justify="space-between" align="end" mb={8}>
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              Related <Box as="span" className="gradient-text">articles</Box>
            </Heading>
            <Button as={Link} href="/blog" variant="ghostLink" size="sm" rightIcon={<FiArrowRight />} display={{ base: "none", sm: "inline-flex" }}>
              View all
            </Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {related.map((b) => (
              <BlogCard key={b._id || b.slug} blog={b} />
            ))}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}
