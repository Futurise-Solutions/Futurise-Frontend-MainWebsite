import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomText } from "../../utils/Texts";
import { noteIcon } from "../../assests";
import { CustomButton } from "../../utils/Buttons";

const projects = [
  {
    avatar:
      "https://i.pinimg.com/564x/a5/7c/e5/a57ce5c64863317503915174fa700cfa.jpg",
    name: "Fitness Fuel",
    description:
      "Fitness Fuel is a comprehensive health and wellness app that helps users track their workouts, monitor nutrition, and stay motivated with personalized fitness plans.",
  },
  {
    avatar: "https://i.pinimg.com/564x/25/75/f9/2575f95220c4fdb4a15e55c1cac2e3e7.jpg",
    name: "Souled Store",
    description:
      "Souled Store is an e-commerce platform offering a wide range of pop culture merchandise. The platform provides a seamless shopping experience with secure payment options.",
  },
  {
    avatar:
      "https://i.pinimg.com/564x/c3/89/6d/c3896df1cf6271c1b27f614e0e630bd4.jpg",
    name: "Blockchain Exchange",
    description:
      "Blockchain Exchange is a secure and user-friendly platform for trading cryptocurrencies. It offers advanced trading tools and real-time market data to help users make informed decisions.",
  },
];

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
