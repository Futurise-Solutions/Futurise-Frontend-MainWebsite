import React from "react";
import { Box, Image, Text, HStack, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { mediaUrl } from "../../config";
import { formatDate } from "../../utils/blog";

/** Reusable glass blog card (LatestBlogs + BlogsPage grid). */
const BlogCard = ({ blog }) => (
  <Box
    as={Link}
    to={`/blog/${blog.slug}`}
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
    <Box position="relative" h="180px" overflow="hidden" bgGradient="linear(135deg, rgba(123,108,255,0.25), rgba(181,123,255,0.15))" flexShrink={0}>
      {blog.featuredImage && (
        <Image
          src={mediaUrl(blog.featuredImage)}
          alt={blog.title}
          w="full"
          h="full"
          objectFit="cover"
          loading="lazy"
          transition="transform .5s cubic-bezier(0.22,1,0.36,1)"
          _groupHover={{ transform: "scale(1.05)" }}
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
      <Text fontSize="md" fontWeight={700} color="text.primary" noOfLines={2} lineHeight={1.3}>
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
