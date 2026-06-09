import { Box, Button, Heading, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { Seo } from "../Components/common";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box minH="80vh" display="grid" placeItems="center" px={6} textAlign="center">
      <Seo title="Page Not Found (404)" description="The page you're looking for doesn't exist or has been moved." noindex />
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
        <Heading mt={2} fontSize={{ base: "24px", md: "32px" }}>
          This page drifted into the future.
        </Heading>
        <Text mt={3} color="text.muted" maxW="480px" mx="auto">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center" mt={8}>
          <Button variant="gradient" leftIcon={<FiHome />} onClick={() => navigate("/")}>
            Back home
          </Button>
          <Button variant="outlineGlow" leftIcon={<FiArrowLeft />} onClick={() => navigate(-1)}>
            Go back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotFound;
