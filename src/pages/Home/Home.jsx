import About from "../../components/Home/About/About";
import Banner from "../../components/Home/Banner/Banner";
import Contact from "../../components/Home/Contact/Contact";
import FAQ from "../../components/Home/FAQ/FAQ";
import Features from "../../components/Home/Features/Features";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import HRRoute from "../../routes/HRRoute";
import UpgradePackage from "../Dashboard/HR/UpgradePackage";

const Home = () => {
  return (
    <div>
      <Banner />
      <About />
      <HRRoute>
        <UpgradePackage />
      </HRRoute>
      <Features />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Home;
