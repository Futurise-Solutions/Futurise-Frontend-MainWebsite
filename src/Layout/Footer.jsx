import { Box, Button, Image, Input, keyframes } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from '../utils/Texts'
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, TwitterIcon } from '../assests'
import { useNavigate } from 'react-router-dom';

const circulate = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const hoverEffect = {
    transform: "scale(1.2)",
    transition: "transform 0.3s",
    animation: `${circulate} 1.5s infinite`,
}
const Footer = () => {
 const navigate = useNavigate()
  return (
    <Box bg={"rgba(0, 14, 27, 0.6);"} >

      <Box w={{base:"95%",sm:"95%",md:"94%",lg:"80%"}} m={"auto"} display={"grid"} gap={"2rem"} py={"5rem"} gridTemplateColumns={{base:"repeat(2,1fr)",md:"repeat(4,1fr)"}}>
        {/* BOX 1** */}
        <Box>
          <CustomText variant='subheading4'>Learn</CustomText>

          <CustomText variant='subheading5' styles={{ marginTop: "1.5rem"}}>Home</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>About Us</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Our Services</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Projects</CustomText>

        </Box>

        {/* BOX 2** */}
        <Box>
          <CustomText  variant='subheading4'>Customer Support</CustomText>

          <CustomText cursor={"pointer"} onClick={()=> navigate("/contact")}  variant='subheading5' styles={{ marginTop: "1.5rem" }}>Contact Us</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Project FAQ</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>FAQs</CustomText>

          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Client Reviews</CustomText>

          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Privacy Policy</CustomText>
        </Box>

        {/* BOX 3** */}
        <Box>
          <CustomText variant='subheading4'>Bussiness</CustomText>

          <CustomText variant='subheading5' styles={{ marginTop: "1.5rem" }}>Collaboration</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Sourcing</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Careers</CustomText>
          <CustomText variant='subheading5' styles={{ marginTop: "0.5rem" }}>Media</CustomText>

        </Box>


        {/* BOX 3** */}
        <Box>
          <CustomText variant='subheading4'>Subscribe Our NewsLetter</CustomText>


          <Input
            h={"4rem"}
            type={'email'}
            placeholder='Enter Email Address'
            border={"1px solid rgba(132, 132, 132, 1)"}
            borderRadius={"1rem"}
            variant={"unstyled"}
            _placeholder={{
              color: "rgba(177, 177, 177, 1)",
              fontFamily: "Roboto",
              fontWeight: 400,
              size: "1rem",
              pl: "1rem"
            }}
            my={"1.5rem"}
          />

          {/* ******Follow US ****** */}
          <CustomText variant='subheading4' styles={{ marginBottom: "1rem" }}>Follow Us</CustomText>
          {/* ****Box For Showing Social Media Icons ***** */}
          <Box display={"flex"} gap={"1rem"}>
            <a href=""><Image src={LinkedInIcon} alt='LinkedInIcon' _hover={hoverEffect} w={"35px"} h={"37px"}/> </a>
            <a href=""> <Image src={MailIcon} alt='MailIcon' _hover={hoverEffect} /> </a>
            <a href=""> <Image src={FacebookIcon} alt='FacebookIcon' _hover={hoverEffect}/> </a>
            <a href=""> <Image src={InstagramIcon} alt='InstagramIcon' _hover={hoverEffect}/> </a>
            <a href=""> <Image src={TwitterIcon} alt='TwitterIcon' _hover={hoverEffect} w={"35px"} h={"37px"}/> </a>

          </Box>


        </Box>

      </Box>


    </Box>
  )
}

export default Footer