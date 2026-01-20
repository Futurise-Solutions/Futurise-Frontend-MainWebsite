import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CustomText } from "../../utils/Texts";
import { CustomButton } from "../../utils/Buttons";
import { techStacks } from "../../utils/Constant";

const ServiceStack = ({ service }) => {
  const serviceData = techStacks[service];
  console.log("serviceData:", serviceData);
  useEffect(() => {
    AOS.init({ duration: 2000, easing: "ease-in-sine",  
      disable: window.innerWidth < 900
    });
  }, []);
  return (
    <Box py={5} textAlign="center" w="90%" m="auto">
      <CustomText variant="heading">{serviceData.title}</CustomText>
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
            direction={{ base: "column-reverse", md: 
              index % 2===1 ? "row-reverse" :"row"
             }}
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
