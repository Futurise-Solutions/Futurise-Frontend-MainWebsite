import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomText } from "../../utils/Texts";
import { noteIcon } from "../../assests";
import { testimonials } from "../../utils/Constant";

const ClientTestimonials  = () => {
  return (
    <Box  position={"relative"} width={{ base: "95%", md: "90%" }} m={"auto"} textAlign={"center"} mt={"3rem"}>
    <CustomText
      variant="heading"
      children={"Get To Know Our Clients"}
      styles={{ zIndex: 1000 }}
    />
    <Box
      position="absolute"
      top="-4rem"
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
      {testimonials.map((review, index) => (
        <SwiperSlide key={index}>
          <Flex
            direction="column"
            alignItems="center"
            textAlign="center"
            bg="rgba(255, 255, 255, 0.19)"
            p={{ base: 4, md: 6 }}
            border={"1px solid #FFFFFF6E"}
            borderRadius="md"
            shadow="md"
            m={4}
          >
            <Image
              w={"40px"}
              h={"40px"}
              top={"15%"}
              left={"20%"}
              position={"absolute"}
              alt="note"
              src={noteIcon}
            />
            <Image
              borderRadius="full"
              width={"60px"}
              height={"60px"}
              src={review.avatar}
              alt={review.name}
              mb={4}
              zIndex={100000}
            />
           
            <CustomText
              styles={{ background: "transparent" }}
              variant="callout"
              children={review?.name}
            />
            <CustomText
              variant="subheading"
              styles={{ background: "transparent" }}
            >
              {review.review}
            </CustomText>
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
  )
}

export default ClientTestimonials 