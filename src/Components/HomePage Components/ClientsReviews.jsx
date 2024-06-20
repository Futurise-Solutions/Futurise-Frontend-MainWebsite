import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomText } from "../../utils/Texts";
import { noteIcon } from "../../assests";

const reviews = [
  {
    avatar:
      "https://i.pinimg.com/564x/b3/e5/db/b3e5db5a3bf1399f74500a6209462794.jpg",
    name: "Marcus Veltri",
    description:
      "The Futurise solution team exceeded our expectations with their exceptional service and innovative solutions. They were highly efficient and delivered outstanding results ahead of schedule.",
    rating: 5,
  },
  {
    avatar: "https://bit.ly/sage-adebayo",
    name: "Jane Smith",
    description:
      "Working with The Futurise solution was a fantastic experience. They were always available to answer our questions and provided valuable insights throughout the project. We couldn't be happier with the end result.",
    rating: 4,
  },
  {
    avatar:
      "https://i.pinimg.com/564x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
    name: "Dev Mishra",
    description:
      "The team at The Futurise solution is truly remarkable. Their dedication, expertise, and attention to detail ensured that our project was a great success. We highly recommend their services.",
    rating: 4,
  },
];

const ClientsReviews = () => {
  return (
    <Box position={"relative"} width={{ base: "95%", md: "90%" }} m={"auto"} textAlign={"center"}>
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
        borderRadius="50%"
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
        {reviews.map((review, index) => (
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
                top={"20%"}
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
              <Flex bg={"transparent"} mb={2}>
                {Array.from({ length: review.rating }, (_, i) => (
                  <Text key={i} bg={"transparent"}>
                    ⭐
                  </Text>
                ))}
              </Flex>
              <CustomText
                styles={{ background: "transparent" }}
                variant="callout"
                children={review?.name}
              />
              <CustomText
                variant="subheading"
                styles={{ background: "transparent" }}
              >
                {review.description}
              </CustomText>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default ClientsReviews;
