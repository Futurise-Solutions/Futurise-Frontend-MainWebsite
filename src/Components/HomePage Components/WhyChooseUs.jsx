import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import { CustomText } from '../../utils/Texts';
import { Pagination, EffectCoverflow } from "swiper/modules";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from "swiper/react";
import { cards } from '../../utils/Constant';



const WhyChooseUs = () => {
  return (
    <Box w={"90%"} m={"auto"} textAlign="center" mb="5rem" >
      <CustomText
        variant="heading"
        children="Why Choose Us"
        styles={{ zIndex: 1000 }}
      />
      <Swiper
        loop
        effect="coverflow"
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}

        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {cards.map((el, index) => (
          <SwiperSlide key={index} style={{position:"relative"}}>
            <Flex
              gap="14px"
              m={"auto"}
              mt={4}
              justifyContent="center"
              alignItems="center"
              // bg="#FFFFFF30"
              border="1px solid #FFFFFF6E"
              borderRadius="10px"
              boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
              flexDir="column"
              width={{ base: '300px', md: '250px', lg: '300px' }}
              height={{ base: '400px', md: '300px', lg: '400px' }}
              position="relative"
              bg={"linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)"}
              pb={"1rem"}
              overflow="hidden"
              _hover={{
                '& .overlay': {
                  opacity: 1,
                  visibility: 'visible',
                  
                }
              }}
            >

              {/* **********OVERLAY********** */}
              <Flex
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bg="rgba(0, 0, 0, 0.7)"
                alignItems="center"
                justifyContent="center"
                opacity={0}
                visibility="hidden"
                transition="all 0.3s ease-in-out"
                flexDir={"column"}
              >
                <Image color="white" src={el.icon} alt='icon' />
                <CustomText variant='subheading2' styles={{ marginTop: "1rem" }}>Know More</CustomText>
              </Flex>

              <Image
                src={el.image}
                alt={el.title}
                borderRadius="10px"
                w={"280px"}
                h={"310px"}
                mb={"10px"}
              />
              <CustomText
                variant="callout3"
                children={el.title}
                fontWeight="bold"
                textAlign="center"
              />
            </Flex>

          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default WhyChooseUs;
