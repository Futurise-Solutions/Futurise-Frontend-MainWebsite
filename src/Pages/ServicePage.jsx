import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProcessSection from "../Components/ServiceComponents/ProcessSection";
import { CustomText } from "../utils/Texts";
import { CustomButton } from "../utils/Buttons";
import ServiceStack from "../Components/ServiceComponents/ServiceStack";
import { services } from "../utils/Constant";

const ServicePage = () => {
  const { serviceName } = useParams();
  const service = services[serviceName];

  if (!service) {
    return <Text>Service not found</Text>;
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Box>
      <Box pt={{ base: "3rem", md: "5rem" }} w="90%" m="auto">
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            boxShadow={"xl"}
            w={{ base: "70%", md: "400px" }}
            h={{ base: "auto", md: "300px" }}
            src={service.image}
            alt={service.title}
            mb={{ base: "1.5rem", md: "0" }}
            _hover={{ transform: "scale(1.2)" }}
          />
          <Flex
            w={{ base: "100%", md: "50%" }}
            flexDir="column"
            alignItems={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
            px={{ base: "1rem", md: "0" }}
          >
            <CustomText variant="heading">{service.title}</CustomText>
            <CustomText color="#59C6EE" variant="callout1" mt="0.5rem">
              {service.whatWeDo}
            </CustomText>
            <CustomText color="#07ABE8" variant="callout1" mt="0.5rem">
              {service.description}
            </CustomText>
            <CustomText variant="callout3" mt="1rem">
              {service.details}
            </CustomText>
            <CustomButton
              mt="1.5rem"
              colorScheme="teal"
              text={"Portfolio"}
              mb="1.5rem"
              // onClick={() => window.location.href='/portfolio'}
            ></CustomButton>
          </Flex>
        </Flex>
      </Box>
      <Box py={12} bg={"#2C3A4780"} textAlign={"center"} className="contact">
        <CustomText variant="callout4">{"LET’S DISCUSS YOUR IDEA"}</CustomText>
        <CustomText variant="callout3">
          {
            "Get a free consultation and let us know your vision to pivot it into a unique digital creation."
          }
        </CustomText>
        <CustomButton text={"Connect With Us"} px={20}></CustomButton>
      </Box>
      <ServiceStack service={serviceName} />
      <ProcessSection />
    </Box>
  );
};

export default ServicePage;
