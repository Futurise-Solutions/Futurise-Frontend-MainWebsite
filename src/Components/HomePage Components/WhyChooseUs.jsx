import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import { CustomText } from '../../utils/Texts';
import { clienticon, expertiseicon, posticon, quailtyicon, timeicon } from '../../assests';
import { Pagination, EffectCoverflow } from "swiper/modules";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from "swiper/react";

const cards = [
  { image: expertiseicon, title: 'Expertise and Innovation' },
  { image: clienticon, title: 'Client-Centric Approach' },
  { image: quailtyicon, title: 'Quality and Reliability' },
  { image: timeicon, title: 'Timely Delivery' },
  { image: expertiseicon, title: 'Expertise and Innovation' },
  { image: posticon, title: 'Post-Launch Support' },
];

const WhyChooseUs = () => {
  return (
    <Box w={"90%"} m={"auto"} textAlign="center" mb="5rem">
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
          <SwiperSlide key={index}>
            <Flex
           
              gap="14px"
              m={"auto"}
              mt={4}
              justifyContent="center"
              alignItems="center"
              bg="#FFFFFF30"
              border="1px solid #FFFFFF6E"
              borderRadius="10px"
              boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
              flexDir="column"
              width={{ base: '300px', md: '250px', lg: '300px' }}
              height={{ base: '400px',  md: '300px', lg: '400px' }}
            
            >
              <Image
                src={el.image}
                alt={el.title}
                borderRadius="10px"
               w={"280px"}
                h={"310px"}
                mb={"10px"}
              />
              <CustomText
              
                variant="subheading2"
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
