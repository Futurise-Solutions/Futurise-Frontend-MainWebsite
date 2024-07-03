import {
    Box, Flex, Image, Input,
    Textarea,
    Button,
    IconButton,
    VStack,
    HStack,
    useBreakpointValue,
    SlideFade,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Projects } from '../utils/Constant'
import { CustomText } from '../utils/Texts'
import { CustomButton } from '../utils/Buttons'
import { OurPortfolioBg } from '../assests'
import { Swiper, SwiperSlide } from 'swiper/react'
import { contactUsBanner } from "../assests";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const Portfolio = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <Box >
            {/* ***********Hero Section FOR PORTFOLIO **************** */}
            <Box backgroundImage={`url(${OurPortfolioBg})`} h={{ base: "27rem", md: "30rem", lg: "50rem" }} bgRepeat={"no-repeat"} backgroundSize={"cover"} opacity={1} overflow={"hidden"} display={"flex"} alignItems={"center"}>

                <Box pl={"2rem"} >
                    <CustomText variant='subheading6' styles={{ fontFamily: "Oxanium" }}>
                        Our Portfolio
                    </CustomText>
                    <CustomText
                        variant='subheading7'
                        styles={{
                            fontFamily: "Oxanium",
                            color: "#07ABE8",
                            marginTop: "1rem",
                            marginBottom: "1rem"
                        }}
                    >
                        Crafting Innovation with Every Project
                    </CustomText>
                    <CustomButton variant='primary' text={"Contact Us"} />
                </Box>
            </Box>


            {/* *****************SHOW CASING ALL THE PROJECTS**************** */}
            {
                Projects.map((el) => (
                    // console.log(el,'el')
                    <Flex w={{base:"96%",md:"90%"}} m={"auto"}
                        gap={"2%"} borderRadius={"2rem"} mb={"2rem"} boxShadow={"#8f9292 0px 3px 8px;"} mt={{base:"2rem",md:"3rem",lg:"5rem"}}
                        direction={{base:"column",sm:"column",md:"column",lg:"row"}}>
                        {/* Flex Box 1  */}
                        <Box w={{base:"100%",sm:"100%",md:"100%",lg:"49%"}} bg={"linear-gradient(90deg, #8f9292 0%, #e6eaeb 100%)"} borderRadius={"2rem"}>
                            <Swiper
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 1500, disableOnInteraction: false }}
                                modules={[Autoplay]}
                            >
                                {el.img?.map((item) => (
                                    // console.log(item,"item")
                                    <SwiperSlide>
                                        <Image src={item} w={"100%"} py={"1rem"} />
                                    </SwiperSlide>
                                ))
                                }
                            </Swiper>
                        </Box>
                        {/* Flex Box 2 */}
                        <Box w={{base:"100%",sm:"100%",md:"100%",lg:"49%"}} p={"1rem"} >
                            <Flex gap={"1rem"} justifyContent={"flex-end"} pr={'3rem'} >
                                {/* <CustomButton variant='primary' text={el.location}/>
                                <CustomButton variant='primary' text={el.projectType}/> */}
                                <CustomText variant='callout3'
                                    styles={{ background: "linear-gradient(90deg, #015371 0%, #8ADEFE 100%)", padding: "0.5rem", borderRadius: "0.5rem" }}>{el.location}</CustomText>

                                <CustomText variant='callout3'
                                    styles={{ background: "linear-gradient(90deg, #015371 0%, #8ADEFE 100%)", padding: "0.5rem", borderRadius: "0.5rem" }}>{el.projectType}</CustomText>

                            </Flex>
                            <CustomText variant='heading1'>{el.Heading}</CustomText>
                            <CustomText variant='subheading1'>{el.aboutProject}</CustomText>
                            <CustomText variant='subheading1' styles={{ color: "rgb(7, 171, 232)" }}>{el.clentName}</CustomText>


                        </Box>
                    </Flex>
                ))
            }

            {/* *************SHOWING THE CONATACT US FORM ************* */}
            <Box
                backgroundImage={`url(${contactUsBanner})`}
                bgRepeat={"no-repeat"}
                backgroundSize={"cover"}
                opacity={1}
                position={"relative"}
                overflow={"hidden"}
                // border={"1px solid red"}
                mt={"4rem"}
                mb={"4rem"}
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    h="1000px"
                    w="100%"
                    bg="black"
                    zIndex={0}
                    opacity={0.7}

                />
                <Flex
                    w={"90%"}
                    m={"auto"}
                    direction={{ base: "column-reverse", md: "row" }}
                    justifyContent="space-between"
                    alignItems="start"
                    zIndex={1000}
                >
                    <Box

                        textAlign={isMobile ? "center" : "left"}
                        mt={4}
                        mb={isMobile ? 8 : 0}
                        zIndex={1000}
                        w={isMobile ? "100%" : "40%"}
                    >
                        <SlideFade in offsetY={20}>
                            <CustomText variant="callout5">
                                Tell us about your Project
                            </CustomText>
                            <CustomText variant="subheading4" mt={4} color={"#59C6EE"}>
                                We’ll contact you within a couple of hours to schedule a meeting
                                to discuss your goals.
                            </CustomText>
                            <HStack
                                mt={8}
                                spacing={4}
                                justifyContent={isMobile ? "center" : "flex-start"}
                            >
                                <IconButton
                                    icon={<FaPhone />}
                                    aria-label="Phone"
                                    variant="outline"
                                    isRound
                                    size="lg"
                                    colorScheme="blue"
                                    _hover={{ bg: "blue.500", color: "white" }}
                                />
                                <IconButton
                                    icon={<FaEnvelope />}
                                    aria-label="Email"
                                    variant="outline"
                                    isRound
                                    size="lg"
                                    colorScheme="blue"
                                    _hover={{ bg: "blue.500", color: "white" }}
                                />
                                <IconButton
                                    icon={<FaMapMarkerAlt />}
                                    aria-label="Location"
                                    variant="outline"
                                    isRound
                                    size="lg"
                                    colorScheme="blue"
                                    _hover={{ bg: "blue.500", color: "white" }}
                                />
                            </HStack>
                        </SlideFade>
                    </Box>
                    <Box zIndex={1000} w={isMobile ? "100%" : "55%"} position={"relative"} overflow={"hidden"}>
                        <SlideFade in offsetY={20}>
                            <Box overflow={"hidden"} borderRadius="md" boxShadow="xl">
                                <Box
                                    position="absolute"
                                    top="0"
                                    left="50%"
                                    transform="translateX(-50%)"
                                    width="100%"
                                    height="100%"
                                    bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.40) 6.24%, rgba(38, 145, 223, 0) 100%)"
                                ></Box>
                                <form className="form">
                                    <VStack spacing={4} align="stretch">
                                        <Flex
                                            flexDir={{ base: "column", md: "row" }}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            gap={2}
                                        >
                                            <Input placeholder="Name" size="lg" variant="outline" />
                                            <Input
                                                placeholder="Company"
                                                size="lg"
                                                variant="outline"
                                            />
                                        </Flex>
                                        <Input placeholder="Email" size="lg" variant="outline" />
                                        <Input
                                            placeholder="Phone Number"
                                            size="lg"
                                            variant="outline"
                                        />
                                        <Textarea
                                            placeholder="About Your Project"
                                            size="lg"
                                            variant="outline"
                                        />
                                        <CustomButton
                                            px={"5rem"}
                                            text="Send Message"
                                            variant="primary"
                                            size="lg"
                                            m={isMobile ? "auto" : "none"}
                                        />
                                    </VStack>
                                </form>
                            </Box>
                        </SlideFade>
                    </Box>
                </Flex>
            </Box>


        </Box>
    )
}

export default Portfolio