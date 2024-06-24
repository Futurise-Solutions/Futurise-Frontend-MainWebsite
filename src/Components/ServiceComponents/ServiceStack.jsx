import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CustomText } from "../../utils/Texts";
import { CustomButton } from "../../utils/Buttons";

import { mobiledevelop } from "../../assests";

const techStacks = {
  "web-development": {
    title: "Web Development",
    stacks: [
      {
        title: "Web Development",
        subtitle: "Frontend Development",
        description:
          "We use modern frontend technologies to build responsive and interactive web applications.",
        techStack: "React, HTML, CSS, JavaScript",
        image: mobiledevelop,
      },
      {
        title: "Web Development",
        subtitle: "Backend Development",
        description:
          "Our backend solutions are robust, scalable, and secure, built with the latest technologies.",
        techStack: "Node.js, Express, MongoDB",
        image: mobiledevelop,
      },
      {
        title: "Web Development",
        subtitle: "WordPress Development",
        description:
          "We create custom WordPress themes and plugins tailored to your business needs.",
        techStack: "WordPress",
        image: mobiledevelop,
      },
    ],
  },
  // Add other services and their tech stacks here
  "app-development": {
    title: "App Development",
    stacks: [
      {
        title: "iOS Development",
        subtitle: "Swift, Objective-C",
        description:
          "We build high-performance iOS applications using Swift and Objective-C.",
        techStack: "Swift, Objective-C",
        image: mobiledevelop, // Replace with appropriate image
      },
      {
        title: "Android Development",
        subtitle: "Kotlin, Java",
        description:
          "Our Android applications are developed using Kotlin and Java for optimal performance.",
        techStack: "Kotlin, Java",
        image: mobiledevelop, // Replace with appropriate image
      },
    ],
  },
};

const ServiceStack = ({ service }) => {
  const serviceData = techStacks[service];
  useEffect(() => {
    AOS.init({ duration: 2000, easing: "ease-in-sine",  

      disable: window.innerWidth < 900
    });
  }, []);
  return (
    <Box py={5} textAlign="center" w="90%" m="auto">
      {/* <CustomText variant="heading">{serviceData.title}</CustomText> */}
      <Flex
        direction={{ base: "column", md: "column" }}
        mt={8}
        justifyContent="space-between"
      
      >
        {serviceData.stacks.map((stack, index) => (
          <Flex
            key={index}
            p={{ base: 1, md: 4 }}
            m={{ base: 0, md: 2 }}
            direction={{ base: "column-reverse", md: "row" }}
            borderRadius="lg"
            boxShadow="md"
            alignItems={{ base: "center", md: "flex-start" }}
            gap={10}
          >
            <Flex
              textAlign={{ base: "center", md: "start" }}
              direction="column"
              alignItems={{ base: "center", md: "flex-start" }}
            >
              <Flex direction="column" data-aos="fade-down">
                <CustomText variant="callout4">{stack.title}</CustomText>
                <CustomText variant="subheading7" styles={{ color: "#59C6EE" }}>
                  {stack.subtitle}
                </CustomText>
              </Flex>
              <Flex
                alignItems={{ base: "center", md: "flex-start" }}
                direction={"column"}
                data-aos="fade-up"
                justifyContent={"center"}
                
              >
                <CustomText variant="callout3" mt={2} mb={4}>
                  {`
                Google has introduced Flutter, a cross-platform software development kit for creating mobile apps on Android, iOS, Windows, Mac, Linux, and the web. Flutter is intended for fast development, is open source, and is available at no cost.
                 Flutter offers several advantages, such as the ability to use a single codebase for multiple platforms, access to high-quality graphics libraries, faster development resulting in quicker app launch times, the ability to customize any on-screen user interface, and a cross-platform rendering engine that delivers excellent performance.

                `}
                </CustomText>
                <Flex flexWrap="wrap" justifyContent={"center"}>
                  {stack.techStack.split(",").map((tech, idx) => (
                    <Tag
                      key={idx}
                      size="sm"
                      variant="solid"
                      colorScheme="blue"
                      mr={2}
                      mb={2}
                    >
                      <TagLabel>{tech}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
                <CustomButton text={"Contact Us"} variant="primary" mt={4} />
              </Flex>
            </Flex>
            <Image
             data-aos="flip-left"
              w={"500px"}
              h={"400px"}
              src={stack.image}
              alt={stack.title}
              borderRadius="md"
              ml={{ base: 0, md: 4 }}
              mt={{ base: 4, md: 0 }}
              maxW={{ base: "100%", md: "40%" }}
            />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default ServiceStack;
