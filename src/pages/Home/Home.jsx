import About from "../../components/Home/About/About";
import Banner from "../../components/Home/Banner/Banner";
import Contact from "../../components/Home/Contact/Contact";
import FAQ from "../../components/Home/FAQ/FAQ";
import Features from "../../components/Home/Features/Features";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import HRRoute from "../../routes/HRRoute";
import UpgradePackage from "../Dashboard/HR/UpgradePackage";
import Stats from "../../components/Home/Stats/Stats";
import Partners from "../../components/Home/Partners/Partners";
import RecentBlogs from "../../components/Home/RecentBlogs/RecentBlogs";
import Newsletter from "../../components/Home/Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <Banner />
      <Partners />
      <About />
      <HRRoute>
        <UpgradePackage />
      </HRRoute>
      <Stats />
      <Features />
      <Testimonials />
      <HowItWorks />
      <RecentBlogs />
      <FAQ />
      <Newsletter />
      <Contact />
    </div>
  );
};

export default Home;
