import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Heading, Text, Link, Image } from "@chakra-ui/react";

// Flatten markdown children to plain text (for heading anchor ids).
const toText = (children) => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(toText).join("");
  if (children?.props?.children) return toText(children.props.children);
  return "";
};

// Must match parseHeadings() in utils/blog.js so the TOC anchors line up.
const slug = (children) =>
  toText(children).toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

const components = {
  h1: ({ children }) => (
    <Heading as="h1" id={slug(children)} fontSize="3xl" mt={10} mb={4} color="text.primary" scrollMarginTop="100px">{children}</Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" id={slug(children)} fontSize="2xl" mt={8} mb={3} color="text.primary" scrollMarginTop="100px">{children}</Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" id={slug(children)} fontSize="xl" mt={6} mb={2} color="text.primary" scrollMarginTop="100px">{children}</Heading>
  ),
  p: ({ children }) => <Text fontSize="lg" lineHeight={1.9} color="text.muted" mb={5}>{children}</Text>,
  a: ({ href, children }) => (
    <Link href={href} color="accent.solid" _hover={{ color: "text.primary" }} isExternal>{children}</Link>
  ),
  ul: ({ children }) => <Box as="ul" pl={6} mb={5} color="text.muted" fontSize="lg" sx={{ listStyleType: "disc" }}>{children}</Box>,
  ol: ({ children }) => <Box as="ol" pl={6} mb={5} color="text.muted" fontSize="lg" sx={{ listStyleType: "decimal" }}>{children}</Box>,
  li: ({ children }) => <Box as="li" mb={2} lineHeight={1.8}>{children}</Box>,
  blockquote: ({ children }) => (
    <Box borderLeft="3px solid" borderColor="brand.500" pl={5} py={2} my={6} bg="rgba(123,108,255,0.08)" borderRadius="0 12px 12px 0" color="text.muted" fontStyle="italic">
      {children}
    </Box>
  ),
  pre: ({ children }) => (
    <Box as="pre" p={5} borderRadius="14px" bg="navy.700" border="1px solid" borderColor="border.subtle" overflowX="auto" mb={6} fontSize="sm" sx={{ whiteSpace: "pre" }}>
      {children}
    </Box>
  ),
  code: ({ className, children }) => {
    const isBlock = /language-/.test(className || "") || toText(children).includes("\n");
    if (isBlock) {
      return <Box as="code" className={className} display="block" fontFamily="mono" color="text.primary">{children}</Box>;
    }
    return (
      <Box as="code" px={2} py={0.5} borderRadius="6px" bg="rgba(255,255,255,0.07)" color="accent.solid" fontSize="0.9em" fontFamily="mono">
        {children}
      </Box>
    );
  },
  // In-article images are always below the fold — the title and intro come first.
  img: ({ src, alt }) => <Image src={src} alt={alt} loading="lazy" decoding="async" borderRadius="14px" my={6} w="full" objectFit="cover" />,
  hr: () => <Box borderTop="1px solid" borderColor="border.subtle" my={8} />,
  table: ({ children }) => (
    <Box overflowX="auto" mb={6}>
      <Box as="table" w="full" sx={{ borderCollapse: "collapse", "& th, & td": { border: "1px solid", borderColor: "border.subtle", px: 3, py: 2, textAlign: "left", fontSize: "sm" }, "& th": { color: "text.primary", bg: "rgba(255,255,255,0.03)" }, "& td": { color: "text.muted" } }}>
        {children}
      </Box>
    </Box>
  ),
};

const BlogMarkdown = ({ content = "" }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
    {content}
  </ReactMarkdown>
);

export default BlogMarkdown;
