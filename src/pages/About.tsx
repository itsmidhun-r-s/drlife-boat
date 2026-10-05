import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import AboutSection from '../components/home/AboutSection';
import VisionMission from '../components/home/VisionMission';
import Features from '../components/home/Features';
import CTA from '../components/home/CTA';
import { HERO } from '../data/content';

const About = () => (
  <>
    <SEO
      title="About Us"
      description="Dr. Lifeboat is an internationally trained medical graduate with vast teaching experience in AMC, PLAB and FMGE pathways."
    />
    <PageHeader
      eyebrow="About us"
      title={
        <>
          Mentoring doctors to <span className="gradient-text">exam success</span>
        </>
      }
      description={HERO.text}
    />
    <AboutSection />
    <VisionMission />
    <Features />
    <CTA />
  </>
);

export default About;
