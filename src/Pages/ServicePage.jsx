import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { appdevelop } from "../assests";
import ProcessSection from "../Components/ServiceComponents/ProcessSection";
import { CustomText } from "../utils/Texts";
import { CustomButton } from "../utils/Buttons";
import ServiceStack from "../Components/ServiceComponents/ServiceStack";

const services = {
  "app-development": {
    image: appdevelop,
    title: "App Development",
    whatWeDo: "WHAT WE DO",
    description:
      "We mould Custom-Built Android and iOS Solutions for diverse industries.",
    details:
      "Equitysoft's Design team is a separate unit comprising a skilled team of UXDesigners, UI Designers, and Graphic Designers.",
  },
  "web-development": {
    image: appdevelop,
    title: "Web Development",
    whatWeDo: "WHAT WE DO",
    description: "We build responsive and robust web applications.",
    details:
      "Our team excels in creating high-performing websites and web applications.",
  },
  "blockchain-development": {
    image: appdevelop,
    title: "Blockchain Development",
    whatWeDo: "WHAT WE DO",
    description: "We develop secure and scalable blockchain solutions.",
    details:
      "Our expertise covers various blockchain technologies and platforms.",
  },
  "smart-contract": {
    image: appdevelop,
    title: "Smart Contract",
    whatWeDo: "WHAT WE DO",
    description: "We create reliable and efficient smart contracts.",
    details:
      "Our team ensures the highest standards of smart contract development.",
  },
  "ui-ux-design": {
    image: appdevelop,
    title: "UI/UX Design",
    whatWeDo: "WHAT WE DO",
    description: "We design user-centric and visually appealing interfaces.",
    details:
      "Our designers craft exceptional user experiences for all platforms.",
  },
  "digital-marketing": {
    image: appdevelop,
    title: "Digital Marketing",
    whatWeDo: "WHAT WE DO",
    description: "We provide comprehensive digital marketing solutions.",
    details:
      "Our strategies help businesses grow their online presence effectively.",
  },
};

const ServicePage = () => {
  const { serviceName } = useParams();
  const service = services["app-development"];

  if (!service) {
    return <Text>Service not found</Text>;
  }

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
  <ServiceStack service={"web-development"} />
      <ProcessSection />
    </Box>
  );
};

export default ServicePage;
