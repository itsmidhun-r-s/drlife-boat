import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../data/faq';

const FaqAccordion = ({ items }: { items: FaqItem[] }) => (
  <Accordion.Root type="single" collapsible className="space-y-3">
    {items.map((item, i) => (
      <Accordion.Item
        key={item.q}
        value={`item-${i}`}
        className="surface overflow-hidden transition-colors data-[state=open]:border-primary/40"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold text-fg">
            {item.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
        </Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

export default FaqAccordion;
