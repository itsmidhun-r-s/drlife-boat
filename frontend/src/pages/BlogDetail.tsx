import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import { buttonVariants } from '../components/common/buttonVariants';

const BlogDetail = () => (
  <section className="container-custom py-20">
    <SEO title="Article" />
    <EmptyState
      icon={FileQuestion}
      title="Article not available"
      description="This article could not be found. Browse the latest posts instead."
      action={
        <Link to="/blogs" className={buttonVariants()}>
          Back to blogs
        </Link>
      }
    />
  </section>
);

export default BlogDetail;
