import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { WHAT_WE_OFFER, WHAT_WE_OFFER_CLOSING } from '../../data/home';

const WhatWeOffer = () => (
  <section className="section">
    <div className="container-custom">
      <SectionHeading eyebrow="What we offer" title={<>Everything you need to <span className="gradient-text">pass with confidence</span></>} />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {WHAT_WE_OFFER.map(({ image, title, description }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.06}>
            <article className="surface surface-hover h-full p-6">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover object-[center_35%] shadow-sm"
              />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-fg-soft md:text-lg">{WHAT_WE_OFFER_CLOSING}</p>
    </div>
  </section>
);

export default WhatWeOffer;
