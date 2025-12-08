import About from "../../components/Home/About/About";
import Banner from "../../components/Home/Banner/Banner";
import Contact from "../../components/Home/Contact/Contact";
import Features from "../../components/Home/Features/Features";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import Package from "../../components/Home/Package/Package";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import HRRoute from "../../routes/HRRoute";

const Home = () => {
  return (
    <div>
      <Banner />
      <About />
      <HRRoute>
        <Package />
      </HRRoute>
      <Features />
      <Testimonials />
      <HowItWorks />
      <Contact />
    </div>
  );
};

export default Home;
