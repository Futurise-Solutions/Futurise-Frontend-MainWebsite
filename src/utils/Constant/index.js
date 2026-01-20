import {mobiledevelop  , appdevelop, AppDevHover, AppDevNavbarIcon, AppDevelopment, BlockchainDevNavbarIcon, BlockchainDevelopment, BlockchainHover, ClientLogo, DigiMarketingNavbarIcon, DigitalMarketing, DigitalMarketingHover, SmartContract, SmartContractHover, SmartContractNavbarIcon, UIUXDevelopment, UIUXHover, UIUXNavbarIcon, WebDevNavbarIcon, WebDevelopment, clientIconHover,  clienticon,  expertiseicon,  expertiseiconHover,  postIconHover, posticon, quailtyicon,qualityIconHover,timeIconHover,timeicon,webDevHover } from "../../assests";
import {
  FaClipboardList,
  FaPencilRuler,
  FaBullseye,
  FaHammer,
  FaCheckCircle,
  FaRocket,
  FaTools,
} from "react-icons/fa";
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

// ************************Our PARTNERS****************************
export const partners=[
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  },
  {
    img:ClientLogo
  }
]

// *********************NAVBAR OPTIONS***********************
export const navbarOptions=[
  { option: "Home", path: "/" },
  { option: "About", path: "/about" },
  { option: "Services", path: "/" },
  { option: "Portfolio", path: "/portfolio" },
  { option: "Blog", path: "/" },
]
// *********************NAVBAR SERVICE OPTIONS***********************
export const NavbarservicesOptions = [
  { option: "Web Development",icon:WebDevNavbarIcon, path: "/service/web-development" },
  { option: "App Development",icon:AppDevNavbarIcon, path: "/service/app-development" },
  { option: "UI-UX Development",icon:UIUXNavbarIcon, path: "/service/ui-ux-design" },
  { option: "Blockchain Development",icon:BlockchainDevNavbarIcon, path: "/service/blockchain-development" },
  { option: "Smart Contract",icon:SmartContractNavbarIcon, path: "/service/smart-contract" },
  { option: "Digital Marketing",icon:DigiMarketingNavbarIcon, path: "/service/digital-marketing" },
];



// ******************* Location Pin from Contact us Page************88

export const locations = [
  { name: 'USA', coordinates: [37.0902, -95.7129] },
  { name: 'Australia', coordinates: [-25.2744, 133.7751] },
  { name: 'Denmark', coordinates: [56.2639, 10.4515] },
  { name: 'South Africa', coordinates: [-30.5595, 22.9375] },
  { name: 'UAE', coordinates: [25.2048, 55.1713] },
  { name: 'India', coordinates: [20.5937, 78.9629] },
  { name: 'UK', coordinates: [55.378051, -3.435973] },
];




// --------- Strengeth from About Us Section Technology excellence---------------
export  const strengths = [
  {
    name: "App Development",
    description: [
      "Developing high-quality mobile applications with robust functionality and seamless performance.",
      "Ensuring cross-platform compatibility for iOS and Android to reach a wider audience.",
      "Designing user-friendly interfaces that provide an intuitive and engaging user experience."
    ],
    icon: AppDevHover,
    bg: AppDevelopment,
  },
  {
    name: "Web Development",
    description: [
      "Creating responsive web designs that adapt seamlessly to different screen sizes and devices.",
      "Building dynamic websites with interactive features and optimized performance.",
      "Implementing SEO best practices to enhance visibility and search engine rankings."
    ],
    icon: webDevHover,
    bg: WebDevelopment,
  },
  {
    name: "Blockchain Development",
    description: [
      "Providing secure blockchain solutions to ensure data integrity and transparency.",
      "Developing decentralized applications (dApps) that leverage the power of blockchain technology.",
      "Creating and managing smart contracts to automate processes and enforce agreements."
    ],
    icon: BlockchainHover,
    bg: BlockchainDevelopment,
  },
  {
    name: "Smart Contract",
    description: [
      "Designing efficient smart contracts that facilitate trustless transactions and operations.",
      "Automating complex workflows and reducing the need for intermediaries.",
      "Integrating blockchain technology to enhance security and transparency."
    ],
    icon: SmartContractHover,
    bg: SmartContract,
  },
  {
    name: "UI/UX Development",
    description: [
      "Crafting user-centric designs that focus on the needs and preferences of the target audience.",
      "Developing intuitive interfaces that enhance usability and accessibility.",
      "Providing an enhanced user experience through thoughtful design and functionality."
    ],
    icon: UIUXHover,
    bg: UIUXDevelopment,
  },
  {
    name: "Digital Marketing",
    description: [
      "Boosting online presence with targeted digital marketing strategies.",
      "Developing engagement strategies to interact with and retain customers.",
      "Utilizing social media marketing to increase brand awareness and drive traffic."
    ],
    icon: DigitalMarketingHover,
    bg: DigitalMarketing,
  },
];



// ***********************Service Page services*****************************************
export const services = {
  "app-development": {
    image: appdevelop,
    title: "App Development",
    whatWeDo: "WHAT WE DO",
    description:
      "We mould Custom-Built Android and iOS Solutions for diverse industries.",
    details:
      "Equitysoft's Design team is a separate unit comprising a skilled team of UXDesigners, UI Designers, and Graphic Designers.",
  },
  "web-development": {
    image: appdevelop,
    title: "Web Development",
    whatWeDo: "WHAT WE DO",
    description: "We build responsive and robust web applications.",
    details:
      "Our team excels in creating high-performing websites and web applications.",
  },
  "blockchain-development": {
    image: appdevelop,
    title: "Blockchain Development",
    whatWeDo: "WHAT WE DO",
    description: "We develop secure and scalable blockchain solutions.",
    details:
      "Our expertise covers various blockchain technologies and platforms.",
  },
  "smart-contract": {
    image: appdevelop,
    title: "Smart Contract",
    whatWeDo: "WHAT WE DO",
    description: "We create reliable and efficient smart contracts.",
    details:
      "Our team ensures the highest standards of smart contract development.",
  },
  "ui-ux-design": {
    image: appdevelop,
    title: "UI/UX Design",
    whatWeDo: "WHAT WE DO",
    description: "We design user-centric and visually appealing interfaces.",
    details:
      "Our designers craft exceptional user experiences for all platforms.",
  },
  "digital-marketing": {
    image: appdevelop,
    title: "Digital Marketing",
    whatWeDo: "WHAT WE DO",
    description: "We provide comprehensive digital marketing solutions.",
    details:
      "Our strategies help businesses grow their online presence effectively.",
  },
};


// *************************Service Page teck stack***************************************
export const techStacks = {
  "web-development": {
    title: "Web Development",
    stacks: [
      {
        title: "Web Development",
        subtitle: "Frontend Development",
        description:
          "We use modern frontend technologies to build responsive and interactive web applications.",
        techStack: "React, HTML, CSS, JavaScript",
        image: mobiledevelop,
      },
      {
        title: "Web Development",
        subtitle: "Backend Development",
        description:
          "Our backend solutions are robust, scalable, and secure, built with the latest technologies.",
        techStack: "Node.js, Express, MongoDB",
        image: mobiledevelop,
      },
      {
        title: "Web Development",
        subtitle: "WordPress Development",
        description:
          "We create custom WordPress themes and plugins tailored to your business needs.",
        techStack: "WordPress",
        image: mobiledevelop,
      },
    ],
  },
  // Add other services and their tech stacks here
  "app-development": {
    title: "App Development",
    stacks: [
      {
        title: "iOS Development",
        subtitle: "Swift, Objective-C",
        description:
          "We build high-performance iOS applications using Swift and Objective-C.",
        techStack: "Swift, Objective-C",
        image: mobiledevelop, 
      },
      {
        title: "Android Development",
        subtitle: "Kotlin, Java",
        description:
          "Our Android applications are developed using Kotlin and Java for optimal performance.",
        techStack: "Kotlin, Java",
        image: mobiledevelop, 
      },
    ],
  },
  "blockchain-development": {
    title: "Blockchain Development",
    stacks: [
      {
        title: "Blockchain Development",
        subtitle: "Solidity, Ethers.js",
        description:
          "We develop secure and scalable blockchain solutions using Solidity and Ethers.js.",
        techStack: "Solidity, Ethers.js",
        image: mobiledevelop, 
      },
    ],
  },
  "smart-contract": {
    title: "Smart Contract",
    stacks: [
      {
        title: "Smart Contract Development",
        subtitle: "Solidity, Truffle",
        description:
          "We create reliable and efficient smart contracts using Solidity and Truffle.",
        techStack: "Solidity, Truffle",
        image: mobiledevelop, 
      },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    stacks: [
      {
        title: "UI/UX Design",
        subtitle: "Figma, Adobe XD",
        description:
          "We design user-centric and visually appealing interfaces using Figma and Adobe XD.",
        techStack: "Figma, Adobe XD",
        image: mobiledevelop, 
      },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    stacks: [
      {
        title: "Digital Marketing",
        subtitle: "Social Media Marketing",
        description:
          "We provide comprehensive digital marketing solutions, including social media marketing.",
        techStack: "Social Media Marketing",
        image: mobiledevelop, 
      },
    ],
    }
};


export const processSteps = [
  {
    icon: FaClipboardList,
    title: "Planning",
    content: "Details about planning phase",
  },
  {
    icon: FaPencilRuler,
    title: "Designing",
    content: "Details about designing phase",
  },
  {
    icon: FaBullseye,
    title: "Defining",
    content: "Details about defining phase",
  },
  {
    icon: FaHammer,
    title: "Building",
    content: "Details about building phase",
  },
  {
    icon: FaCheckCircle,
    title: "Testing",
    content: "Details about testing phase",
  },
  {
    icon: FaRocket,
    title: "Deployment",
    content: "Details about deployment phase",
  },
  {
    icon: FaTools,
    title: "Maintenance",
    content: "Details about maintenance phase",
  },
];