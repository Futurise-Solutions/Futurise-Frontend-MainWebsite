import React, { useState } from "react";
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaClipboardList,
  FaPencilRuler,
  FaBullseye,
  FaHammer,
  FaCheckCircle,
  FaRocket,
  FaTools,
} from "react-icons/fa";
import { CustomText } from "../../utils/Texts";

const processSteps = [
  {
    icon: FaClipboardList,
    title: "Planning",
    content: "Details about planning phase",
  },
  {
    icon: FaPencilRuler,
    title: "Designing",
    content: "Details about designing phase",
  },
  {
    icon: FaBullseye,
    title: "Defining",
    content: "Details about defining phase",
  },
  {
    icon: FaHammer,
    title: "Building",
    content: "Details about building phase",
  },
  {
    icon: FaCheckCircle,
    title: "Testing",
    content: "Details about testing phase",
  },
  {
    icon: FaRocket,
    title: "Deployment",
    content: "Details about deployment phase",
  },
  {
    icon: FaTools,
    title: "Maintenance",
    content: "Details about maintenance phase",
  },
];

const ProcessSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const translateValues = useBreakpointValue({
    base: { translateX: 120, translateY: 90 },  // for mobile screens
    sm: { translateX: 130, translateY: 100 },    // for small screens
    md: { translateX: 130, translateY: 100 },    // for medium screens
    lg: { translateX: 150, translateY: 130 },    // for large screens
    xl: { translateX: 150, translateY: 130 }     // for extra-large screens
  });

  return (
    <Box py={5} textAlign="center" w="90%" m="auto" mb={10} className="process">
      <CustomText variant="heading">{"Our Process"}</CustomText>
      <CustomText variant="subheading4">
        {"The process we work by to craft stunning visuals"}
      </CustomText>
      <Flex
        position={"relative"}
        direction={{ base: "column-reverse", md: "row" }}
        mt={"3rem"}
        justifyContent="space-around"
      >
        <Box
          overflow={"hidden"}
          position={"relative"}
          w={{ base: "100%", md: "30%" }}
          mr={{ md: 8 }}
        >
          <Box
            position="absolute"
            top="1%"
            left="50%"
            transform="translateX(-50%)"
            width="100%"
            height="100%"
            zIndex={1}
            bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.30) 6.24%, rgba(38, 145, 223, 0) 100%)"
          ></Box>
          <Accordion position={"relative"} zIndex={100} allowToggle>
            {processSteps.map((step, index) => (
              <AccordionItem
                key={index}
                _hover={{ color: "#07ABE8" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Flex alignItems="center">
                      <Icon as={step.icon} mr={4} />
                      <Text>{step.title}</Text>
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel color={"white"} pb={4}>
                  {step.content}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        <Box
          w={{ base: "100%", md: "60%" }}
          mb={{ base: "10rem", md: 0 }}
          position="relative"
          display="flex"
          justifyContent="center"
          height="300px"
        >
          <Box position="relative" width="100%" height="100%">
            <Flex
              position="absolute"
              top="65%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="80%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              {processSteps.map((step, index) => (
                <Flex
                  key={index}
                  direction="column"
                  alignItems="center"
                  position="absolute"
                  style={{
                    transform: `rotate(${(index / processSteps.length) * 360}deg) translate(${translateValues.translateX}px, ${translateValues.translateY}px) rotate(${-(index / processSteps.length) * 360}deg)`
                  }}
                >
                  <Box
                    width="70px"
                    height="70px"
                    borderRadius="50%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bg={
                      hoveredIndex === index
                        ? "radial-gradient(60% 60% at 50% 50%, rgba(38, 145, 223, 0.80) 6.24%, rgba(38, 145, 223, 0) 100%)"
                        : "transparent"
                    }
                  >
                    <Icon as={step.icon} boxSize={6} color="#07ABE8" />
                  </Box>
                  <Text fontSize="sm" fontWeight="bold" color="white" mt={2}>
                    {step.title}
                  </Text>
                </Flex>
              ))}
              {/* Dotted lines connecting the steps */}
              <Box
                position="absolute"
                width={{ base: '60px', md: '80px', lg: '100px' }}
                height={{ base: '60px', md: '80px', lg: '100px' }}
                borderRadius="50%"
                bg="transparent"
               border="1px solid #07ABE8"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#07ABE8"
                fontWeight="bold"
              >
                SDLC
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProcessSection;
