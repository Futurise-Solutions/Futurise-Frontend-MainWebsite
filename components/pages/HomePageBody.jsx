import HeroSection from "@/components/home/HeroSection";
import Aboutus from "@/components/home/AboutUs";
import OurServices from "@/components/home/OurServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Partners from "@/components/home/Partners";
import CompanyStats from "@/components/home/CompanyStats";
import Process from "@/components/home/Process";
import BuildArchitecture from "@/components/home/BuildArchitecture";
import styles from "@/components/home/SculptedHome.module.css";
import OurProjects from "@/components/home/OurProjects";
import SpecialistBuilds from "@/components/home/SpecialistBuilds";
import ClientsReviews from "@/components/home/ClientsReviews";
import Faqs from "@/components/home/Faqs";
import CTASection from "@/components/common/CTASection";
export default function HomePageBody({ latestBlogs }) {
 return <div className={styles.home}>
 <HeroSection /><Aboutus /><OurServices /><Partners /><CompanyStats /><OurProjects /><SpecialistBuilds /><ClientsReviews />
 <BuildArchitecture />
 <WhyChooseUs /><Process /><Faqs /><CTASection />{latestBlogs}
 </div>;
}
