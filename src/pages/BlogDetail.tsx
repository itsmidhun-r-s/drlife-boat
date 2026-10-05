import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileQuestion, PartyPopper } from 'lucide-react';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import ResultCard from '../components/blog/ResultCard';
import { buttonVariants } from '../components/common/buttonVariants';
import { RESULTS, findResult, resultMessage } from '../data/results';
import ResultImage from '../components/blog/ResultImage';

const BlogDetail = () => {
  const { slug } = useParams();
  const result = findResult(slug);

  if (!result) {
    return (
      <section className="container-custom py-20">
        <SEO title="Article not found" />
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
  }

  const more = RESULTS.filter((r) => r.slug !== result.slug).slice(0, 3);

  return (
    <>
      <SEO title={`Congratulations ${result.name}`} description={resultMessage(result)} />
      <section className="container-custom max-w-4xl py-14">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> All blogs
        </Link>

        <article className="surface relative mt-6 grid overflow-hidden md:grid-cols-[minmax(0,340px)_1fr] grid-cols-1">
          <div className="bg-surface">
            <ResultImage result={result} fit="contain" className="mx-auto h-full max-h-[560px] w-full" />
          </div>
          <div className="relative flex flex-col justify-center p-8 md:p-10">
            <div aria-hidden className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <p className="relative inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              <PartyPopper className="h-4 w-4" /> Congratulations!
            </p>
            <h1 className="relative mt-2 text-3xl font-bold md:text-4xl">{result.name}</h1>
            {result.place && <p className="relative mt-1 text-muted">{result.place}</p>}
            <div className="relative mt-5 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-accent">
                {result.exam} · {result.session}
              </span>
              <span className="rounded-full bg-fg/5 px-3 py-1 text-fg-soft">{result.mode} student</span>
            </div>
            <p className="relative mt-6 text-base leading-relaxed text-fg-soft">{resultMessage(result)}</p>
          </div>
        </article>

        <h2 className="mb-6 mt-14 text-xl font-bold">More success stories</h2>
        <div className="grid gap-5 sm:grid-cols-2 grid-cols-1">
          {more.slice(0, 2).map((r) => (
            <ResultCard key={r.slug} result={r} />
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
