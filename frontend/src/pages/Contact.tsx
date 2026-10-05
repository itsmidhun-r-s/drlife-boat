import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { buttonVariants } from '../components/common/buttonVariants';
import { Input, Textarea } from '../components/common/Input';
import { SITE } from '../utils/site';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  message: z.string().trim().min(10, 'Please write at least 10 characters')
});
type FormValues = z.infer<typeof schema>;

const InfoCard = ({
  icon: Icon,
  title,
  children
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="surface flex items-start gap-4 p-5">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </span>
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <div className="mt-1 text-sm leading-relaxed text-slate-400">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // There is no contact endpoint on the backend yet, so the form opens the visitor's
  // email app with the message pre-filled. Swap this for an API call when one exists.
  const onSubmit = ({ name, email, message }: FormValues) => {
    const subject = encodeURIComponent(`Enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    toast.success('Opening your email app…');
    reset();
  };

  return (
    <>
      <SEO title="Contact" description="Talk to a DrLifeBoat expert about AMC, PLAB and FMGE preparation." />
      <PageHeader
        eyebrow="Contact"
        title="Talk to an expert"
        description="Questions about courses, plans or which exam to start with? We are happy to help."
      />

      <section className="py-14">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <InfoCard icon={Phone} title="Call us">
              <a href={SITE.phoneHref} className="hover:text-primary">
                {SITE.phone}
              </a>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-primary">
                {SITE.email}
              </a>
            </InfoCard>
            <InfoCard icon={MapPin} title="Visit">
              {SITE.address}
            </InfoCard>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'secondary', size: 'lg', fullWidth: true })}
            >
              <MessageCircle className="h-5 w-5 text-green-400" />
              Chat on WhatsApp
            </a>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="surface space-y-5 p-6 md:p-8">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <Input label="Name" autoComplete="name" error={errors.name?.message} {...register('name')} />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Textarea
              label="Message"
              placeholder="How can we help?"
              error={errors.message?.message}
              {...register('message')}
            />
            <Button type="submit" size="lg" fullWidth>
              Send message
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
