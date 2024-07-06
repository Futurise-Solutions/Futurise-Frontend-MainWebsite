import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { CustomText } from "../../utils/Texts";

const MissionVision = () => {
  return (
    <Box mt={"5rem"} p={{ base: "2rem", md: "5rem" }}>
      <Flex
        flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
        alignItems={{
          base: "center",
          sm: "center",
          md: "center",
          lg: "flex-start",
        }}
        justifyContent={"space-between"}
      >
        <Box
          w={{
            base: "fit-content",
            sm: "fit-content",
            md: "fit-content",
            lg: "40%",
          }}
          textAlign={{
            base: "center",
            sm: "center",
            md: "center",
            lg: "start",
          }}
        >
          <CustomText
            display={{
              base: "inline",
              sm: "inline",
              md: "inline",
              lg: "block",
            }}
            variant="callout7"
          >
            Our Mission
          </CustomText>
          <CustomText
            display={{
              base: "inline",
              sm: "inline",
              md: "inline",
              lg: "block",
            }}
            variant="callout7"
          >
            & Vision
          </CustomText>
          <Box
            m={{ base: "auto", sm: "auto", sm: "auto", md: "auto", lg: "0" }}
            h={1}
            w={{ base: "100%", sm: "100%", md: "100%", lg: "200px" }}
            bg={"#07ABE8"}
          ></Box>
          <Box
            m={{ base: "auto", sm: "auto", sm: "auto", md: "auto", lg: "0" }}
            h={1}
            w={{ base: "100%", sm: "100%", md: "100%", lg: "200px" }}
            bg={"black"}
          ></Box>
          <Box
            m={{ base: "auto", sm: "auto", sm: "auto", md: "auto", lg: "0px" }}
            h={1}
            w={{ base: "100%", sm: "100%", md: "100%", lg: "200px" }}
            bg={"linear-gradient(90deg, #015371 0%, #8ADEFE 100%)"}
          ></Box>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          mt={{ base: "2rem", sm: "2rem", md: "2rem", lg: "0px" }}
          mb={{ base: "2rem", md: "4rem" }}
          bg="rgba(255, 255, 255, 0.19)"
          border={"1px solid #FFFFFF6E"}
          borderRadius={{ base: "15px", sm: "15px", md: "0px", lg: "0px" }}
          borderLeftRadius={{
            base: "0px",
            sm: "0px",
            md: "100px",
            lg: "100px",
          }}
          w={{ base: "80%", sm: "80%", md: "100%", lg: "70%" }}
          p={{ base: "1rem", sm: "1rem", md: "0rem", lg: "0rem" }}
          pr={{ base: "1rem", sm: "1rem", md: "2rem", lg: "2rem" }}
        >
          <Image
            src={
              "https://i.pinimg.com/736x/0c/e0/2e/0ce02ec86da2e3c031bea90008f0f527.jpg"
            }
            borderRadius={{ base: "none", sm: "none", md: "full", lg: "full" }}
            boxSize={{ base: "200px", sm: "400px", md: "200px" }}
            alt="Mission"
            mr={{ base: 0, sm: 0, md: "2rem" }}
            mb={{ base: "1rem", md: 0 }}
          />
          <Box flex="1">
            <CustomText
              textAlign={{
                base: "center",
                sm: "center",
                md: "start",
                lg: "start",
              }}
              variant="heading1"
            >
              Mission
            </CustomText>
            <CustomText
              textAlign={{
                base: "center",
                sm: "center",
                md: "start",
                lg: "start",
              }}
              variant="subheading"
            >
              Our mission is to help enterprises accelerate adoption of new
              technologies, untangle complex issues that always emerge during
              digital evolution, and orchestrate ongoing innovation
            </CustomText>
          </Box>
        </Flex>
      </Flex>
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        alignItems="center"
        m={{ base: "auto", sm: "auto", md: "0", lg: "0px" }}
        mt={{ base: "2rem", sm: "2rem", md: "2rem", lg: "0px" }}
        mb={{ base: "2rem", md: "4rem" }}
        bg="rgba(255, 255, 255, 0.19)"
        border={"1px solid #FFFFFF6E"}
        borderRadius={{ base: "15px", sm: "15px", md: "0px", lg: "0px" }}
        borderRightRadius={{
          base: "0px",
          sm: "0px",
          md: "100px",
          lg: "100px",
        }}
        w={{ base: "80%", sm: "80%", md: "100%", lg: "70%" }}
        p={{ base: "1rem", sm: "1rem", md: "0rem", lg: "0rem" }}
        pl={{ base: "1rem", sm: "1rem", md: "2rem", lg: "2rem" }}
      >
        <Box textAlign={"end"} flex="1">
          <CustomText
            textAlign={{
              base: "center",
              sm: "center",
              md: "end",
              lg: "end",
            }}
            variant="heading1"
          >
            Vision
          </CustomText>
          <CustomText
            textAlign={{
              base: "center",
              sm: "center",
              md: "end",
              lg: "end",
            }}
            variant="subheading"
          >
            Our vision is to revolutionize the tech industry by providing
            innovative solutions that empower businesses to achieve digital
            excellence and drive sustainable growth, positioning ourselves as a
            trusted partner for enterprises worldwide.
          </CustomText>
        </Box>
        <Image
          src={
            "https://i.pinimg.com/564x/88/31/32/883132146a377308813d3dcf5e81c3ac.jpg"
          }
          borderRadius={{ base: "none", sm: "none", md: "full", lg: "full" }}
          boxSize={{ base: "200px", sm: "400px", md: "200px" }}
          alt="Mission"
          ml={{ base: 0, sm: 0, md: "2rem" }}
          mb={{ base: "1rem", md: 0 }}
        />
      </Flex>
    </Box>
  );
};

export default MissionVision;
