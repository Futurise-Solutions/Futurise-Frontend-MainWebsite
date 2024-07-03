import { AppDevHover, AppDevelopment, BlockchainDevelopment, BlockchainHover, DigitalMarketing, DigitalMarketingHover, SmartContract, SmartContractHover, UIUXDevelopment, UIUXHover, WebDevelopment, clientIconHover,  clienticon,  expertiseicon,  expertiseiconHover,  postIconHover, posticon, quailtyicon,qualityIconHover,timeIconHover,timeicon,webDevHover } from "../../assests";

// ****************OUR SERVICES DATA ****************
export const OurServiceData = [
  {
    image: AppDevelopment,
    serviceName: "App Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo.",
    icon:AppDevHover,
    route:"app-development"
  },
  {
    image: DigitalMarketing,
    serviceName: "Digital Marketing",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo.",
    icon:DigitalMarketingHover,
    route:"digital-marketing"
  },
  {
    image: WebDevelopment,
    serviceName: "Web Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo.",
    icon:webDevHover,
    route:"web-development"
   

  },
  {
    image: BlockchainDevelopment,
    serviceName: "Blockchain Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo.",
    icon:BlockchainHover,
    route:"blockchain-development"
  },
  {
    image: UIUXDevelopment,
    serviceName: "Ui-Ux Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo.",
    icon:UIUXHover,
     route:"ui-ux-design"
  },
  {
    image: SmartContract,
    serviceName: "Smart Contract",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo.",
    icon:SmartContractHover,
   
    route:"smart-contract"
  },
];
  
// *****************Testimonials DATA****************
  export  const testimonials = [
    {
      name: 'John Doe',
      title: 'CEO, Company ABC',
      avatar:
      "https://i.pinimg.com/564x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
      review:
        'The meeting was incredibly productive. The team was professional and attentive, and they addressed all our concerns with great expertise.',
    },
    {
      name: 'Jane Smith',
      title: 'CTO, Company XYZ',
      avatar: "https://bit.ly/sage-adebayo",
      review:
        'I was very impressed with their knowledge and dedication. The solutions they proposed were innovative and well-thought-out.',
    },
    {
      name: 'Alice Johnson',
      title: 'Product Manager, Company 123',
      avatar:
      "https://i.pinimg.com/564x/b3/e5/db/b3e5db5a3bf1399f74500a6209462794.jpg",
      review:
        'Their approach to the project was refreshing. The meeting was well-organized, and they were very receptive to our ideas and feedback.',
    },
    // Add more testimonials as needed
  ];

// ******************Portfolio Projects DATA******************
export const Projects=[
  {
    img:["https://www.cleveroad.com/images/portfolio/6b550ac284ccdf6a8d5242fd1cf6f87d62ef805a1b983adbf4fb060b86fbf413-2x.webp","https://www.cleveroad.com/images/portfolio/0c7fd31b0bbe5f0e3736693f4a6fff62758509f7bd7d4f3f0b90eb920ae31654-2x.webp","https://www.cleveroad.com/images/portfolio/ac9d3b16080195cf06da35f4bf0384c500362956a7e09186c3f3f5c717bf083a-2x.webp" ],
    location:"Denmark",
    projectType:"Media",
    Heading:"Cross-device Video on Demand Platform",
    aboutProject:"Video streaming platform for movie renting and purchasing with multi-platform access. Blockbuster is a leading service in the Nordic countries and has 500,000+ subscibers.",
    clentName:"John Doe"

  },
  {
    img:["https://www.cleveroad.com/images/portfolio/6b550ac284ccdf6a8d5242fd1cf6f87d62ef805a1b983adbf4fb060b86fbf413-2x.webp","https://www.cleveroad.com/images/portfolio/0c7fd31b0bbe5f0e3736693f4a6fff62758509f7bd7d4f3f0b90eb920ae31654-2x.webp","https://www.cleveroad.com/images/portfolio/ac9d3b16080195cf06da35f4bf0384c500362956a7e09186c3f3f5c717bf083a-2x.webp" ],
    location:"Denmark",
    projectType:"Media",
    Heading:"Cross-device Video on Demand Platform",
    aboutProject:"Video streaming platform for movie renting and purchasing with multi-platform access. Blockbuster is a leading service in the Nordic countries and has 500,000+ subscibers.",
    clentName:"John Doe"

  },
  {
    img:["https://www.cleveroad.com/images/portfolio/6b550ac284ccdf6a8d5242fd1cf6f87d62ef805a1b983adbf4fb060b86fbf413-2x.webp","https://www.cleveroad.com/images/portfolio/0c7fd31b0bbe5f0e3736693f4a6fff62758509f7bd7d4f3f0b90eb920ae31654-2x.webp","https://www.cleveroad.com/images/portfolio/ac9d3b16080195cf06da35f4bf0384c500362956a7e09186c3f3f5c717bf083a-2x.webp" ],
    location:"Denmark",
    projectType:"Media",
    Heading:"Cross-device Video on Demand Platform",
    aboutProject:"Video streaming platform for movie renting and purchasing with multi-platform access. Blockbuster is a leading service in the Nordic countries and has 500,000+ subscibers.",
    clentName:"John Doe"

  }
]

// ******************WHY CHOOSE US  DATA*****************
export const cards = [
  { image: expertiseicon, title: 'Expertise and Innovation',icon:expertiseiconHover },
  { image: clienticon, title: 'Client-Centric Approach',icon:clientIconHover },
  { image: quailtyicon, title: 'Quality and Reliability',icon:qualityIconHover },
  { image: timeicon, title: 'Timely Delivery',icon:timeIconHover},
  { image: expertiseicon, title: 'Expertise and Innovation',icon:expertiseiconHover },
  { image: posticon, title: 'Post-Launch Support',icon:postIconHover },
];

// ********************FREQUENTLY ASKED QUESTIONS DATA*****************
export const faqs = [
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

// ********************OUR PROJECTS HOME PAGE DATA**************
export const projects = [
  {
    avatar:
      "https://i.pinimg.com/564x/a5/7c/e5/a57ce5c64863317503915174fa700cfa.jpg",
    name: "Fitness Fuel",
    description:
      "Fitness Fuel is a comprehensive health and wellness app that helps users track their workouts, monitor nutrition, and stay motivated with personalized fitness plans.",
  },
  {
    avatar: "https://i.pinimg.com/564x/25/75/f9/2575f95220c4fdb4a15e55c1cac2e3e7.jpg",
    name: "Souled Store",
    description:
      "Souled Store is an e-commerce platform offering a wide range of pop culture merchandise. The platform provides a seamless shopping experience with secure payment options.",
  },
  {
    avatar:
      "https://i.pinimg.com/564x/c3/89/6d/c3896df1cf6271c1b27f614e0e630bd4.jpg",
    name: "Blockchain Exchange",
    description:
      "Blockchain Exchange is a secure and user-friendly platform for trading cryptocurrencies. It offers advanced trading tools and real-time market data to help users make informed decisions.",
  },
];

// *********************CLIENT REVIEWS DATA*******************
export const reviews = [
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