import {Hero} from "../components/Home/Hero";
import { FeatureGrid } from "../components/Home/FeatureGrid";
import { TestimonialSlider } from "../components/Home/TestimonialSlider";
import { CallToAction } from "../components/Home/CallToAction";
import { Footer } from "../components/Home/Footer";
import "../components/Home/HomePageStyle.css";
export default function Home() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <TestimonialSlider />
      <CallToAction />
      <Footer />
    </>
  );
}

