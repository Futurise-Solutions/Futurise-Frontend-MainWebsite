import { Box, Flex, IconButton, Collapse } from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { CustomText } from "../../utils/Texts";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a wide range of digital transformation and software solutions, including web development, mobile app development, and cloud services.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team via email at support@futurisetechnologies.com or call us at (123) 456-7890.",
  },
  {
    question: "What are your business hours?",
    answer:
      "Our business hours are Monday to Friday, 9 AM to 6 PM. We are closed on weekends and public holidays.",
  },
  {
    question: "Do you offer customized solutions?",
    answer:
      "Yes, we provide customized solutions tailored to meet your specific business needs and requirements.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Our pricing model varies depending on the project scope and requirements. Please contact us for a detailed quote.",
  },
];

const Faqs = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <Box textAlign={"center"} py={8} px={4}>
      <CustomText
        variant="heading"
        children={"Frequently Asked Questions"}
        styles={{ zIndex: 1000 }}
      />
      <Box
        border={"1px solid #FFFFFF57"}
        w={{ base: "100%", md: "90%", lg: "80%" }}
        m={"auto"}
        bg={"rgba(255, 255, 255, 0.1)"}
        textAlign={"center"}
        borderRadius={"10px"}
        p={5}
        position={"relative"}
        overflow={"hidden"}
      >
        <Box
          position="absolute"
          top="1%"
          left="50%"
          transform="translateX(-50%)"
          width="100%"
          height="100%"
          bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.30) 6.24%, rgba(38, 145, 223, 0) 100%)"
        ></Box>
        <Box w={"90%"} m={"auto"} zIndex={10} position={"relative"}>
          {faqs.map((faq, index) => (
            <Box key={index} borderBottom="1px solid gray">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                p={4}
                cursor="pointer"
                onClick={() => toggleFaq(index)}
              >
                <CustomText
                  variant="subheading2"
                  children={faq.question}
                  styles={{ textAlign: "start", color: "white", zIndex: 1000 }}
                />
                <IconButton
                  icon={openFaqIndex === index ? <MinusIcon /> : <AddIcon />}
                  variant="ghost"
                  aria-label="Toggle FAQ"
                  w={"24px"}
                  h={"24px"}
                  color="white"
                  zIndex={1000}
                />
              </Flex>
              <Collapse in={openFaqIndex === index}>
                <Box textAlign={"start"} p={4}>
                  <CustomText
                    styles={{ color: "#FFFFFF", zIndex: 1000 }}
                    variant="callout2"
                    children={faq.answer}
                  />
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Faqs;
