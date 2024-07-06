import React from 'react';
import { Box, Flex, Link, Button, useDisclosure, IconButton, Image, Collapse, Text, Icon } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { contactus, logo } from '../assests';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()

  return (
    <Box w={"100%"} zIndex={10000} px={4} position={"fixed"} bg="#00000090" color="white" boxShadow="0px 2px 10px #07ABE8">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} w={"99%"} m={"auto"}>
        {/* Left Side - Logo */}
        <Image onClick={() => navigate("/")} w={"171px"} h={"50px"} src={logo} alt="logo" />

        {/* Middle - Navbar Links */}
        <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'} gap={4}>
          {['Home', 'About', 'Services', 'Portfolio', 'Blog'].map((link, index) => (
            <Link
              key={index}
              px={2}
              py={1}
              rounded={'md'}
              href="#"
              position="relative"
              _hover={{
                _after: {
                  transform: 'scaleX(1)',
                  transformOrigin: 'bottom left',
                }
              }}
              _after={{
                content: '""',
                position: 'absolute',
                width: '100%',
                transform: 'scaleX(0)',
                height: '2px',
                bottom: '0',
                left: '0',
                backgroundColor: '#07ABE8',
                transformOrigin: 'bottom right',
                transition: 'transform 0.40s ease-out',
              }}
              fontFamily={"Roboto"}
              fontWeight={500}
              fontSize={["1rem","1rem","1.25rem"]}
            >
              {link}
            </Link>
          ))}
        </Flex>

        {/* Right Side - Contact Us Button */}
        <Flex alignItems={'center'}>
          <LearnMoreButton  display={{ base: "none", md: "inline-block" }} />
          {/* Hamburger Menu for Mobile */}
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <Flex flexDirection={'column'} alignItems={'start'} gap={2}>
            {['Home', 'About', 'Services', 'Portfolio', 'Blog'].map((link, index) => (
              <Link
                key={index}
                px={2}
                py={1}
                rounded={'md'}
                _hover={{ bg: 'blue.700' }}
                href="#"
              >
                {link}
              </Link>
            ))}
            <LearnMoreButton text={"white"} bg={"#07ABE8"} />
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;

const LearnMoreButton = ({ display, text, bg }) => {
  const navigate = useNavigate()
  const handleRoute = (route)=> {
     navigate(route)
  }
  return (
    <Button
    onClick={()=> handleRoute("/contact")}
      position="relative"
      display={display}
      cursor="pointer"
      justifyContent="center"
      alignItems="center"
      outline="none"
      border="1px solid #07ABE8"
      verticalAlign="middle"
      textDecoration="none"
      background={bg || "transparent"}
      padding="0"
      borderRadius="full"
      fontSize="inherit"
      fontFamily="inherit"
      width="190px"
      height="40px"
      color="white"
      className="contact"
      _hover={{
        ".circle": { width: "100%" },
        ".circle .icon": { transform: "translate(3.2rem, 0)" },
        ".button-text": { color: "#FFFFFF" }
      }}
    >
      <Flex
        transition="all 0.45s cubic-bezier(0.65, 0, 0.076, 1)"
        position="absolute"
        left="0"
        width="40px"
        height="40px"
        top={0}
        background=""
        borderRadius="1.625rem"
        alignItems="center"
        justifyContent="center"
        textAlign={"center"}
        bg={"linear-gradient(90deg, #015371 0%, #8ADEFE 100%)"}
        className="circle"
        _hover={{ bg: "linear-gradient(90deg, #015371 0%, #8ADEFE 100%)" }}
      >
        <Icon
          as={ArrowForwardIcon}
          transition="all 0.45s cubic-bezier(0.65, 0, 0.076, 1)"
          color="#fff"
          boxSize={4}
          className="icon"
          mt={-1}
        />
      </Flex>
      <Text
        transition="all 0.45s cubic-bezier(0.65, 0, 0.076, 1)"
        position="relative"
        left="5px"
        color={text || "#07ABE8"}
        fontWeight="500"
        lineHeight="1.6"
        textAlign="center"
        textTransform="uppercase"
        className="button-text"
        fontSize="18px"
        _hover={{ left: "-8px" }}
      >
        Contact Us
      </Text>
    </Button>
  );
};
