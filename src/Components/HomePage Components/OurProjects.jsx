import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomText } from "../../utils/Texts";
import { noteIcon } from "../../assests";
import { CustomButton } from "../../utils/Buttons";
import { projects } from "../../utils/Constant";



const OurProjects = () => {
  return (
    <Box position={"relative"} width={{ base: "95%", md: "90%" }} m={"auto"} textAlign={"center"} py={{ base: 4, md: 8 }}>
      <CustomText
        variant="heading"
        children={"Our Projects"}
        styles={{ zIndex: 1000 }}
      />
      <Box
        position="absolute"
        bottom={{ base: "-2rem", md: "-4rem" }}
        left="50%"
        transform="translateX(-50%)"
        width={{ base: "100%", md: "800px" }}
        height={{ base: "320px", md: "350px", lg: "400px" }}
        // borderRadius="50%"
        bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.4) 6.24%, rgba(38, 145, 223, 0) 100%)"
      ></Box>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <Flex
              direction={{ base: "column-reverse", md: "row" }}
              justifyContent={"space-around"}
              alignItems="center"
              textAlign="center"
              bg="rgba(255, 255, 255, 0.19)"
              p={{ base: 4, md: 6 }}
              border={"1px solid #FFFFFF6E"}
              borderRadius="md"
              shadow="md"
              m={4}
            >
              <Flex
                gap={"1rem"}
                w={{ base: "100%", md: "40%" }}
                align={{ base: "center", md: "flex-start" }}
                flexDir={"column"}
              >
                <CustomText
                  styles={{ color: "#07ABE8" }}
                  variant="callout"
                  children={project?.name}
                />
                <CustomText
                  variant="subheading"
                  styles={{ textAlign: "start" }}
                >
                  {project.description}
                </CustomText>
                <CustomButton text="Know More" variant="primary" />
              </Flex>
              <Image
                borderRadius="10px"
                width={{ base: "70%", sm:"50%", md: "400px" }}
                height={{ base: "auto", md: "275px" }}
                src={project.avatar}
                alt={project.name}
                mb={4}
                zIndex={100000}
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default OurProjects;
