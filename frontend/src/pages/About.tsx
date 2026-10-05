import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import AboutSection from '../components/home/AboutSection';
import Features from '../components/home/Features';
import CTA from '../components/home/CTA';

const About = () => (
  <>
    <SEO title="About Us" description="Meet the team behind DrLifeBoat — expert AMC, PLAB & FMGE coaching for international medical graduates." />
    <PageHeader
      eyebrow="About us"
      title={
        <>
          Mentoring doctors to <span className="gradient-text">exam success</span>
        </>
      }
      description="Exam-focused preparation, interactive quizzes, performance analytics and expert mentorship — all in one place."
    />
    <AboutSection />
    <Features />
    <CTA />
  </>
);

export default About;
