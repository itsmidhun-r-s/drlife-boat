import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { buttonVariants } from '../components/common/buttonVariants';

const NotFound = () => (
  <section className="container-custom grid min-h-[60vh] place-items-center py-20 text-center">
    <SEO title="Page not found" />
    <div>
      <p className="font-display text-8xl font-extrabold gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-slate-400">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonVariants()}>
          Back to home
        </Link>
        <Link to="/courses" className={buttonVariants({ variant: 'secondary' })}>
          Browse courses
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
