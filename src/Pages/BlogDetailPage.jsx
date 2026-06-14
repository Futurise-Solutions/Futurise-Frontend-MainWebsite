import React, { useEffect, useState } from "react";
import {
  Box, Container, Heading, Text, Image, Badge, HStack, VStack, Tag, Flex, Button, Icon, Spinner, useToast, SimpleGrid,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiLink, FiClock, FiCalendar } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Seo } from "../Components/common";
import BlogMarkdown from "../Components/blog/BlogMarkdown";
import BlogCard from "../Components/blog/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { getBlogBySlug, toBlogArray } from "../api/blogs";
import { mediaUrl } from "../config";
import { formatDate, readTime, parseHeadings } from "../utils/blog";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { blogs } = useBlogs();
  const toast = useToast();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    setBlog(null);
    getBlogBySlug(slug)
      .then((d) => {
        if (!active) return;
        const b = d?.blog || (Array.isArray(d) ? d[0] : d);
        setBlog(b || null);
        setLoading(false);
      })
      .catch(() => active && (setError(true), setLoading(false)));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <Box minH="60vh" display="grid" placeItems="center">
        <Spinner thickness="3px" speed="0.7s" size="xl" color="brand.400" emptyColor="rgba(255,255,255,0.08)" />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Container maxW="800px" px={{ base: 5, md: 8 }} py={24} textAlign="center">
        <Heading fontSize="3xl" mb={3}>Article not found</Heading>
        <Text color="text.muted" mb={6}>The article you’re looking for doesn’t exist or was moved.</Text>
        <Button as={Link} to="/blog" variant="gradient" leftIcon={<FiArrowLeft />}>Back to Blog</Button>
      </Container>
    );
  }

  const headings = parseHeadings(blog.content);
  const allBlogs = toBlogArray(blogs);
  const isLatest = allBlogs[0]?.slug === blog.slug;
  const related = allBlogs.filter((b) => b.category === blog.category && b.slug !== blog.slug).slice(0, 3);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://futurisesolutions.com/blog/${blog.slug}`;

  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl).then(
      () => toast({ title: "Link copied!", status: "success", duration: 2000, position: "top" }),
      () => toast({ title: "Couldn’t copy link", status: "error", duration: 2000, position: "top" })
    );
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box>
      <Seo
        title={blog.meta?.metaTitle || blog.title}
        description={blog.meta?.metaDescription || blog.shortDescription}
        path={`/blog/${blog.slug}`}
        image={mediaUrl(blog.featuredImage)}
        type={blog.meta?.ogType || "article"}
        keywords={(blog.meta?.metaKeywords || blog.tags || []).join(", ")}
        noindex={blog.meta?.robots ? /noindex/i.test(blog.meta.robots) : false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.shortDescription,
          image: mediaUrl(blog.featuredImage),
          datePublished: blog.createdAt,
          dateModified: blog.updatedAt || blog.createdAt,
          author: { "@type": "Organization", name: "Futurise Solutions" },
          publisher: { "@type": "Organization", name: "Futurise Solutions" },
          mainEntityOfPage: `https://futurisesolutions.com/blog/${blog.slug}`,
        }}
      />

      <Container maxW="1200px" px={{ base: 5, md: 8 }} pt={{ base: 6, md: 10 }}>
        <Button as={Link} to="/blog" variant="ghostLink" size="sm" leftIcon={<FiArrowLeft />} mb={6}>
          Back to Blog
        </Button>

        {/* Hero image */}
        {blog.featuredImage && (
          <Box position="relative" borderRadius="22px" overflow="hidden" maxH="480px" mb={8} border="1px solid" borderColor="border.subtle">
            <Image src={mediaUrl(blog.featuredImage)} alt={blog.title} w="full" maxH="480px" objectFit="cover" />
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
          <HStack spacing={2}><Icon as={FiClock} /><Text>{readTime(blog.content)} min read</Text></HStack>
          <Text>By Futurise Solutions</Text>
        </HStack>
        {blog.tags?.length > 0 && (
          <HStack spacing={2} flexWrap="wrap" mb={2}>
            {blog.tags.map((t) => (
              <Tag key={t} size="sm" bg="rgba(180,160,255,0.12)" color="accent.solid" borderRadius="full" px={3}>#{t}</Tag>
            ))}
          </HStack>
        )}

        {/* Content + sidebar */}
        <Flex gap={{ base: 8, lg: 14 }} align="start" mt={8}>
          <Box flex="1" maxW="800px" minW={0}>
            <BlogMarkdown content={blog.content || ""} />
          </Box>

          <Box as="aside" w="260px" flexShrink={0} display={{ base: "none", lg: "block" }} position="sticky" top="100px">
            {headings.length > 0 && (
              <Box mb={8}>
                <Text fontSize="xs" fontWeight={700} letterSpacing="0.12em" textTransform="uppercase" color="text.faint" mb={3}>
                  On this page
                </Text>
                <VStack align="stretch" spacing={1.5}>
                  {headings.map((h) => (
                    <Text
                      key={h.id}
                      as="button"
                      textAlign="left"
                      fontSize="sm"
                      color="text.muted"
                      pl={h.level === 3 ? 4 : 0}
                      _hover={{ color: "accent.solid" }}
                      transition="color .2s"
                      onClick={() => scrollTo(h.id)}
                    >
                      {h.text}
                    </Text>
                  ))}
                </VStack>
              </Box>
            )}

            <Box>
              <Text fontSize="xs" fontWeight={700} letterSpacing="0.12em" textTransform="uppercase" color="text.faint" mb={3}>
                Share this article
              </Text>
              <HStack spacing={2}>
                <ShareBtn label="Copy link" icon={FiLink} onClick={copyLink} />
                <ShareBtn label="Share on LinkedIn" icon={FaLinkedinIn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} />
                <ShareBtn label="Share on X" icon={FaXTwitter} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`} />
              </HStack>
            </Box>
          </Box>
        </Flex>
      </Container>

      {/* Related posts */}
      {related.length > 0 && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 16, md: 20 }}>
          <Flex justify="space-between" align="end" mb={8}>
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              Related <Box as="span" className="gradient-text">articles</Box>
            </Heading>
            <Button as={Link} to="/blog" variant="ghostLink" size="sm" rightIcon={<FiArrowRight />} display={{ base: "none", sm: "inline-flex" }}>
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
};

const ShareBtn = ({ label, icon, href, onClick }) => (
  <Box
    as={href ? "a" : "button"}
    href={href}
    target={href ? "_blank" : undefined}
    rel={href ? "noopener noreferrer" : undefined}
    onClick={onClick}
    aria-label={label}
    w="38px"
    h="38px"
    display="grid"
    placeItems="center"
    borderRadius="full"
    border="1px solid"
    borderColor="border.subtle"
    color="text.muted"
    transition="all .25s"
    _hover={{ color: "white", borderColor: "brand.400", bg: "rgba(180,160,255,0.12)", transform: "translateY(-2px)" }}
  >
    <Icon as={icon} />
  </Box>
);

export default BlogDetailPage;
