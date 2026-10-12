'use client'

import { Box, Button, Heading, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiHome } from "react-icons/fi";

/**
 * 404 body — ported VERBATIM from src/Pages/NotFound.jsx.
 *
 * Every style prop, every string and the gradient 404 numeral are byte-for-byte unchanged.
 * Three things differ, all forced by the router change:
 *
 *   1. <Seo …> is gone. Metadata moves to app/not-found.tsx (the Metadata API), which is
 *      also where `noindex` now lives.
 *   2. "Back home" is a <Link>, not `navigate("/")`. A real anchor is correct here: it is
 *      a plain navigation, and on a 404 it must work even if hydration never completes.
 *   3. "Go back" keeps an onClick because `router.back()` has no href equivalent — it is
 *      history traversal, not a destination.
 *
 * ── WHY THIS IS A SEPARATE CLIENT COMPONENT ─────────────────────────────────
 * `router.back()` needs a client component, but app/not-found.tsx must stay a server
 * component to export `metadata`. Splitting body from route is the same pattern every
 * other page in this port uses (see components/pages/*Body.jsx).
 */
export default function NotFoundBody() {
  const router = useRouter();

  return (
    <Box minH="80vh" display="grid" placeItems="center" px={6} textAlign="center">
      <Box>
        <Text
          fontFamily="heading"
          fontWeight={700}
          fontSize={{ base: "96px", md: "160px" }}
          lineHeight={1}
          className="gradient-text"
        >
          404
        </Text>
        <Heading as="h1" mt={2} fontSize={{ base: "24px", md: "32px" }}>
          This page drifted into the future.
        </Heading>
        <Text mt={3} color="text.muted" maxW="480px" mx="auto">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center" mt={8}>
          <Button as={Link} href="/" variant="gradient" leftIcon={<FiHome />}>
            Back home
          </Button>
          <Button variant="outlineGlow" leftIcon={<FiArrowLeft />} onClick={() => router.back()}>
            Go back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
