import React from 'react';
import { Box, Flex, Link, Button, useDisclosure, IconButton, Image, Collapse } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { contactus, logo } from '../assests'; 

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w={"100%"} zIndex={1000} px={4} position={"fixed"} bg="#00000080" color="white">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        {/* Left Side - Logo */}
        <Image w={"171px"} h={"50px"} src={logo} alt="logo" />

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
            >
              {link}
            </Link>
          ))}
        </Flex>

        {/* Right Side - Contact Us Button */}
        <Flex alignItems={'center'}>
          <Button
            borderRadius={"full"}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'#FFFFFF'}
            bg={"transparent"}
            border={"1px solid #FFFFFF"}
            w={"190px"}
            h={"40px"}
            rightIcon={
              <Box display={"flex"} justifyContent={"center"} alignItems={"center"} bg={"white"} w={"40px"} h={"40px"} borderRadius={"full"}>
                <Image src={contactus} alt="contact us icon" boxSize={4} />
              </Box>
            }
            _hover={{
              bg: 'whiteAlpha.200',
            }}
          >
            Contact Us
          </Button>
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
          <Flex flexDirection={'column'}>
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
            <Button
              w="full"
              mt={2}
              fontSize={'sm'}
              fontWeight={600}
              color={'#FFFFFF'}
              bg={"transparent"}
              border={"1px solid #FFFFFF"}
              rightIcon={
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} bg={"white"} w={"40px"} h={"40px"} borderRadius={"full"}>
                  <Image src={contactus} alt="contact us icon" boxSize={4} />
                </Box>
              }
              _hover={{
                bg: 'whiteAlpha.200',
              }}
            >
              Contact Us
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
