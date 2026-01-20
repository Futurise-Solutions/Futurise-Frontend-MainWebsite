import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  IconButton,
  Image,
  Collapse,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  Icon,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { contactus, logo } from "../assests";
import { Link, useNavigate } from "react-router-dom";
import { navbarOptions, NavbarservicesOptions } from "../utils/Constant";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box
      w={"100%"}
      zIndex={10000}
      px={4}
      position={"fixed"}
      bg="black"
      color="white"
      boxShadow="0px 2px 10px #07ABE8"
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"99%"}
        m={"auto"}
      >
        {/* Left Side - Logo ********************************************/}
        <Image
          onClick={() => navigate("/")}
          w={"171px"}
          h={"50px"}
          src={logo}
          alt="logo"
        />

        {/* Middle - Navbar Links **********************************/}
        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems={"center"}
          gap={4}
        >
          {navbarOptions.map((link, index) => (
            <React.Fragment key={index}>
              {link.option === "Services" ? (
                <Popover trigger="hover">
                  <PopoverTrigger
                    border={"none"}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    _hover={{ bg: "transparent" }}
                    bg="transparent"
                    position={"relative"}
                    color={"#fff"}
                    _active={{
                      bg: "transparent",
                    }}

                  >
                    <Text
                      px={2}
                      py={1}
                      rounded={"md"}
                      color="white"
                      position="relative"
                      _hover={{
                        _after: {
                          transform: "scaleX(1)",
                          transformOrigin: "bottom left",
                        },
                      }}
                      _after={{
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        transform: "scaleX(0)",
                        height: "2px",
                        bottom: "0",
                        left: "0",
                        backgroundColor: "#07ABE8",
                        transformOrigin: "bottom right",
                        transition: "transform 0.40s ease-out",
                      }}
                      cursor={"pointer"}
                      fontFamily={"Roboto"}
                      fontWeight={500}
                      fontSize={["1rem", "1rem", "1.25rem"]}
                    >
                      {"Services"}
                    </Text>
                  </PopoverTrigger>

                  <PopoverContent
                    bg={"#000"}
                    boxShadow="0px 2px 10px #07ABE8"
                    mt={2}
                    w={"fit-content"}
                    pr={"3rem"}
                    ml={"3rem"}
                  >
                    {NavbarservicesOptions.map((service, serviceIndex) => (
                      <PopoverBody
                        cursor={"pointer"}
                        bg={"#00000090"}
                        key={serviceIndex}
                        onClick={() => navigate(service.path)}
                        _hover={{ bg: "transparent" }}
                      >
                        <Box display="flex" alignItems={"center"}>
                          <Image src={service.icon} alt="service options" h={"2rem"} w={"2rem"} />
                          <Text ml="0.5rem">{service.option}</Text>
                        </Box>
                      </PopoverBody>
                    ))}
                  </PopoverContent>
                </Popover>
              ) : link.option === "Blog" ? (
                <Tooltip
                  // pos={"absolute"}
                  // zIndex={100000}
                  color={"white"}
                  bg={"#07ABE8"}
                  label="Coming Soon"
                  hasArrow
                  placement="top"
                >
                  <Text
                    px={2}
                    py={1}
                    rounded={"md"}
                    color="white"
                    position="relative"
                    _hover={{
                      _after: {
                        transform: "scaleX(1)",
                        transformOrigin: "bottom left",
                      },
                    }}
                    _after={{
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      transform: "scaleX(0)",
                      height: "2px",
                      bottom: "0",
                      left: "0",
                      backgroundColor: "#07ABE8",
                      transformOrigin: "bottom right",
                      transition: "transform 0.40s ease-out",
                    }}
                    cursor={"pointer"}
                    fontFamily={"Roboto"}
                    fontWeight={500}
                    fontSize={["1rem", "1rem", "1.25rem"]}
                  >
                    {link.option}
                  </Text>
                </Tooltip>
              ) : (
                <Link to={link.path}>
                  <Text
                    px={2}
                    py={1}
                    rounded={"md"}
                    color="white"
                    position="relative"
                    _hover={{
                      _after: {
                        transform: "scaleX(1)",
                        transformOrigin: "bottom left",
                      },
                    }}
                    _after={{
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      transform: "scaleX(0)",
                      height: "2px",
                      bottom: "0",
                      left: "0",
                      backgroundColor: "#07ABE8",
                      transformOrigin: "bottom right",
                      transition: "transform 0.40s ease-out",
                    }}
                    cursor={"pointer"}
                    fontFamily={"Roboto"}
                    fontWeight={500}
                    fontSize={["1rem", "1rem", "1.25rem"]}
                  >
                    {link.option}
                  </Text>
                </Link>
              )}
            </React.Fragment>
          ))}
        </Flex>

        {/* Right Side - Contact Us Button */}
        <Flex alignItems={"center"}>
          <LearnMoreButton display={{ base: "none", md: "inline-block" }} />
          {/* Hamburger Menu for Mobile */}
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
          <Flex flexDirection={"column"} alignItems={"start"} gap={2}>
            {navbarOptions.map((link, index) => (
              <React.Fragment key={index}>
                {link.option === "Services" ? (
                  <Popover trigger="hover">
                    <PopoverTrigger
                      border={"none"}
                      as={Button}
                      _hover={{ bg: "transparent" }}
                      bg="transparent"
                      position={"relative"}
                      color={"white"}
                      _active={{
                        bg: "transparent",
                      }}
                    >
                      <Text
                        px={2}
                        py={1}
                        rounded={"md"}
                        color="white"
                        position="relative"
                        _hover={{
                          _after: {
                            transform: "scaleX(1)",
                            transformOrigin: "bottom left",
                          },
                        }}
                        _after={{
                          content: '""',
                          position: "absolute",
                          width: "100%",
                          transform: "scaleX(0)",
                          height: "2px",
                          bottom: "0",
                          left: "0",
                          backgroundColor: "#07ABE8",
                          transformOrigin: "bottom right",
                          transition: "transform 0.40s ease-out",
                        }}
                        cursor={"pointer"}
                        fontFamily={"Roboto"}
                        fontWeight={500}
                        fontSize={["1rem", "1rem", "1.25rem"]}
                      >
                        {"Services"}
                      </Text>
                    </PopoverTrigger>

                    <PopoverContent
                      bg={"#00000090"}
                      boxShadow="0px 2px 10px #07ABE8"
                      border={"none"}
                      mt={2}
                      w={"fit-content"}
                      pr={"3rem"}
                      ml={"3rem"}
                    >
                      {NavbarservicesOptions.map((service, serviceIndex) => (
                        <PopoverBody
                          cursor={"pointer"}
                          bg={"#00000090"}
                          key={serviceIndex}
                          onClick={() => navigate(service.path)}
                          _hover={{ bg: "transparent" }}
                        >
                          {service.option}
                        </PopoverBody>
                      ))}
                    </PopoverContent>
                  </Popover>
                ) : link.option === "Blog" ? (
                  <Tooltip
                    color={"white"}
                    bg={"#07ABE8"}
                    placement="auto-end"
                    label="Coming Soon"
                    aria-label="Coming Soon"
                  >
                    <Text
                      px={2}
                      py={1}
                      rounded={"md"}
                      color="white"
                      position="relative"
                      _hover={{
                        _after: {
                          transform: "scaleX(1)",
                          transformOrigin: "bottom left",
                        },
                      }}
                      _after={{
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        transform: "scaleX(0)",
                        height: "2px",
                        bottom: "0",
                        left: "0",
                        backgroundColor: "#07ABE8",
                        transformOrigin: "bottom right",
                        transition: "transform 0.40s ease-out",
                      }}
                      cursor={"pointer"}
                      fontFamily={"Roboto"}
                      fontWeight={500}
                      fontSize={["1rem", "1rem", "1.25rem"]}
                    >
                      {link.option}
                    </Text>
                  </Tooltip>
                ) : (
                  <Link to={link.path}>
                    <Text
                      px={2}
                      py={1}
                      rounded={"md"}
                      color="white"
                      position="relative"
                      _hover={{
                        _after: {
                          transform: "scaleX(1)",
                          transformOrigin: "bottom left",
                        },
                      }}
                      _after={{
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        transform: "scaleX(0)",
                        height: "2px",
                        bottom: "0",
                        left: "0",
                        backgroundColor: "#07ABE8",
                        transformOrigin: "bottom right",
                        transition: "transform 0.40s ease-out",
                      }}
                      cursor={"pointer"}
                      fontFamily={"Roboto"}
                      fontWeight={500}
                      fontSize={["1rem", "1rem", "1.25rem"]}
                    >
                      {link.option}
                    </Text>
                  </Link>
                )}
              </React.Fragment>
            ))}
            <LearnMoreButton onClose={onClose} text={"white"} bg={"#07ABE8"} />
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;

const LearnMoreButton = ({ display, text, bg, onClose }) => {
  const navigate = useNavigate();
  const handleRoute = (route) => {
    navigate(route);
  };
  return (
    <Button
      onClick={() => {
        handleRoute("/contact");
        onClose();
      }}
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
        ".button-text": { color: "#FFFFFF" },
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
