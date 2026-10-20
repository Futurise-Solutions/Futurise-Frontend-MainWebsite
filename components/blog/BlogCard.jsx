'use client'

import React from "react";
import { Box, Text, HStack, Badge } from "@chakra-ui/react";
import BlogImage from "./BlogImage";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { mediaUrl, formatDate } from "@/lib/blog";


/** Reusable glass blog card (LatestBlogs + BlogsPage grid). */
/**
 * `eager` opts a card out of lazy loading — used for the first six cards on the first
 * page of /blog, which are above or near the fold. It is NOT `priority`: the LCP element
 * on that page is the hero backdrop, and competing preloads would slow it down.
 */
const BlogCard = ({ blog, eager = false }) => (
  <Box
    as={Link}
    href={`/blog/${blog.slug}`}
    role="group"
    display="flex"
    flexDirection="column"
    h="full"
    borderRadius="20px"
    border="1px solid"
    borderColor="border.subtle"
    bg="bg.surface"
    overflow="hidden"
    backdropFilter="blur(12px)"
    transition="all .3s cubic-bezier(0.22,1,0.36,1)"
    _hover={{
      transform: "translateY(-6px)",
      borderColor: "rgba(180,160,255,0.4)",
      boxShadow: "0 24px 60px -20px rgba(123,108,255,0.35)",
      textDecoration: "none",
    }}
  >
    {/* Image */}
    <Box
      position="relative"
      h="180px"
      overflow="hidden"
      bgGradient="linear(135deg, rgba(123,108,255,0.25), rgba(181,123,255,0.15))"
      flexShrink={0}
      sx={{
        "& img": { transition: "transform .5s cubic-bezier(0.22,1,0.36,1)" },
      }}
      _groupHover={{ "& img": { transform: "scale(1.05)" } }}
    >
      {/* D27: next/image. featuredImage is a remote Cloudinary URL (res.cloudinary.com
          is in images.remotePatterns), so there is no static import to supply intrinsic
          dimensions — `fill` against the already-positioned 180px-tall parent is the
          correct form. The hover scale moves to the wrapper's `sx` so it still targets
          the rendered img. `loading="lazy"` and `decoding="async"` are defaults. */}
      {blog.featuredImage && (
        <BlogImage
          src={mediaUrl(blog.featuredImage)}
          alt={blog.title}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          style={{ objectFit: "cover" }}
        />
      )}
      <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(8,8,13,0.7), transparent 60%)" pointerEvents="none" />
      {blog.category && (
        <Badge position="absolute" top={3} left={3} bg="brand.500" color="white" borderRadius="full" px={3} py={1} fontSize="xs" textTransform="none" fontWeight={600}>
          {blog.category}
        </Badge>
      )}
    </Box>

    {/* Body */}
    <Box p={5} display="flex" flexDirection="column" flex="1">
      {/* Rendered as h3 so each card title sits under the archive's h2 in the document
          outline. Chakra keeps Text's styling, so this is a semantic change only. */}
      <Text as="h3" fontSize="md" fontWeight={700} color="text.primary" noOfLines={2} lineHeight={1.3}>
        {blog.title}
      </Text>
      <Text fontSize="sm" color="text.muted" noOfLines={2} mt={2} lineHeight={1.6}>
        {blog.shortDescription}
      </Text>
      <HStack justify="space-between" align="center" mt={4} pt={1}>
        <Text fontSize="xs" color="text.faint">{formatDate(blog.createdAt)}</Text>
        <HStack spacing={1} color="accent.solid" fontSize="sm" fontWeight={600} transition="gap .2s" _groupHover={{ gap: "6px" }}>
          <Text>Read more</Text>
          <FiArrowUpRight />
        </HStack>
      </HStack>
    </Box>
  </Box>
);

export default BlogCard;
