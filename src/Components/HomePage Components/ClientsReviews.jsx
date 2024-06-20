import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaStar } from "react-icons/fa";
import { Box, Flex, Image, Text, Icon, Button } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomText } from "../../utils/Texts";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
const reviews = [
  {
    avatar: "https://i.pinimg.com/564x/b3/e5/db/b3e5db5a3bf1399f74500a6209462794.jpg",
    name: "Marcus Veltri",
    description: "I recently worked with The Futurise solution on a software project and was thoroughly impressed. They delivered a high-quality product that met all our requirements on time and within budget. Their team was professional, communicative, and responsive. ",
    rating: 5,
  },
  {
    avatar: "https://bit.ly/sage-adebayo",
    name: "Jane Smith",
    description: "I recently worked with The Futurise solution on a software project and was thoroughly impressed. They delivered a high-quality product that met all our requirements on time and within budget. Their team was professional, communicative, and responsive. ",

    rating: 4,
  },
  
];

const ClientsReviews = () => {
  return (
    <Box position={"relative"} width="90%" m={"auto"} textAlign={"center"}>
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
        width="800px"
        height={{ base: "320px", md: "350px", lg: "400px" }}
        borderRadius="50%"
        zIndex={1000}
        bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.4) 6.24%, rgba(38, 145, 223, 0) 100%)"
      ></Box>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <Flex
              direction="column"
              alignItems="center"
              textAlign="center"
              bg="rgba(255, 255, 255, 0.19)"
              p={6}
              border={"1px solid #FFFFFF6E"}
              borderRadius="md"
              shadow="md"
              m={4}
            >
              <Image
                borderRadius="full"
                width={"60px"}
                height={"60px"}
                src={review.avatar}
                alt={review.name}
                mb={4}
              />
              <Flex bg={"transparent"} mb={2}>
                {Array.from({ length: review.rating }, (_, i) => (
                 <Text bg={"transparent"}>⭐</Text>
                ))}
              </Flex>
              <CustomText styles={{background:"transparent"}} variant="callout" children={review?.name} />
               
              <CustomText variant="subheading" styles={{background:"transparent"}} >{review.description}</CustomText>
            </Flex>
          </SwiperSlide>
        ))}
    
      </Swiper>
    </Box>
  );
};
export default ClientsReviews;
