import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { buttonVariants } from '../components/common/buttonVariants';

const Blogs = () => (
  <>
    <SEO title="Blogs" description="Exam tips, study strategies and updates for AMC, PLAB and FMGE candidates." />
    <PageHeader
      eyebrow="Blogs"
      title="Exam tips & study strategies"
      description="Practical advice for AMC, PLAB and FMGE candidates."
    />
    <section className="py-16">
      <div className="container-custom">
        <EmptyState
          icon={Newspaper}
          title="Articles are on their way"
          description="We are preparing helpful guides and exam strategies. In the meantime, explore our courses."
          action={
            <Link to="/courses" className={buttonVariants()}>
              Explore courses
            </Link>
          }
        />
      </div>
    </section>
  </>
);

export default Blogs;
