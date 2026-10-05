import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { buttonVariants } from '../components/common/buttonVariants';
import { Input, Textarea } from '../components/common/Input';
import { COUNTRIES, INDIAN_STATES } from '../data/countries';
import { findCourse } from '../data/courses';
import { contactService, type ContactPayload } from '../services/contact.service';
import { SITE } from '../utils/site';

const EXAMS = ['AMC', 'PLAB', 'FMGE'] as const;
const MODES = ['Online', 'Offline'] as const;

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .regex(/^[+\d][\d\s-]{6,}$/, 'Enter a valid phone number'),
  country: z.string().min(1, 'Select your country'),
  state: z.string().optional(),
  primaryMedicalQualification: z.string().trim().min(2, 'Tell us where you obtained it'),
  courses: z.array(z.string()).optional(),
  message: z.string().trim().optional()
});
type FormValues = z.infer<typeof schema>;

const selectClass =
  'h-11 w-full rounded-xl border border-fg/25 bg-surface px-4 text-sm text-fg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

const InfoCard = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) => (
  <div className="surface flex items-start gap-4 p-5">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-accent">
      <Icon className="h-5 w-5" />
    </span>
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
      <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  const [params] = useSearchParams();
  const [sent, setSent] = useState(false);

  // Arriving from a course page (?course=slug) or a pathway card (?course=FMGE)
  const interest = useMemo(() => {
    const c = params.get('course');
    if (!c) return '';
    const course = findCourse(c);
    return course ? course.title : c;
  }, [params]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      courses: [],
      message:
        params.get('topic') === 'demo'
          ? 'I would like to try the free AI adaptive demo test.'
          : interest
            ? `I am interested in: ${interest}.`
            : ''
    }
  });

  const country = useWatch({ control, name: 'country' });

  const onSubmit = async (values: FormValues) => {
    const payload: ContactPayload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      country: values.country,
      state: values.state || undefined,
      primaryMedicalQualification: values.primaryMedicalQualification,
      courses: values.courses ?? [],
      message: values.message || undefined
    };

    try {
      await contactService.send(payload);
      setSent(true);
      reset();
    } catch {
      // No server (or it rejected the request): fall back to the visitor's email app
      // so the enquiry is never lost.
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Country: ${payload.country}${payload.state ? `, ${payload.state}` : ''}`,
        `Primary medical qualification: ${payload.primaryMedicalQualification}`,
        `Courses: ${payload.courses.join(', ') || '-'}`,
        '',
        payload.message ?? ''
      ].join('\n');
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `Enquiry from ${payload.name}`
      )}&body=${encodeURIComponent(body)}`;
      toast.info('We could not reach our server, so we opened your email app instead.');
    }
  };

  return (
    <>
      <SEO title="Contact" description="Talk to a DrLifeBoat expert about AMC, PLAB and FMGE preparation." />
      <PageHeader
        eyebrow="Contact"
        title={<>Let&apos;s level up your future, <span className="gradient-text">together</span></>}
        description={`You can reach us anytime via ${SITE.email}`}
      />

      <section className="py-14">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr] grid-cols-1">
          <div className="space-y-4">
            <InfoCard icon={Mail} title="Email">
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-accent">{SITE.email}</a>
              <br />
              <a href={`mailto:${SITE.supportEmail}`} className="break-all hover:text-accent">{SITE.supportEmail}</a>
            </InfoCard>
            <InfoCard icon={Phone} title="Call us">
              <a href={SITE.phoneHref} className="hover:text-accent">{SITE.phone}</a>
            </InfoCard>
            <InfoCard icon={MapPin} title="Visit our Trivandrum centre">{SITE.address}</InfoCard>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'secondary', size: 'lg', fullWidth: true })}>
              <MessageCircle className="h-5 w-5 text-success" /> Chat on WhatsApp
            </a>
          </div>

          {sent ? (
            <div className="surface flex flex-col items-center justify-center p-10 text-center" role="status">
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-success/10 text-success">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h2 className="text-2xl font-bold">Thank you!</h2>
              <p className="mt-2 max-w-sm text-muted">We have received your details and our team will get back to you shortly.</p>
              <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                Send another enquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="surface space-y-5 p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2 grid-cols-1">
                <Input label="Name" autoComplete="name" error={errors.name?.message} {...register('name')} />
                <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
              </div>
              <Input label="Phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" error={errors.phone?.message} {...register('phone')} />

              <div className="grid gap-5 sm:grid-cols-2 grid-cols-1">
                <div>
                  <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-fg-soft">Country</label>
                  <select id="country" className={selectClass} defaultValue="" aria-invalid={!!errors.country} {...register('country')}>
                    <option value="" disabled>Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.country && <p role="alert" className="mt-1.5 text-xs text-danger">{errors.country.message}</p>}
                </div>

                <div>
                  {country === 'India' ? (
                    <>
                      <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-fg-soft">State</label>
                      <select id="state" className={selectClass} defaultValue="" {...register('state')}>
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <Input label="State / Region" placeholder="Optional" {...register('state')} />
                  )}
                </div>
              </div>

              <Input
                label="Where did you obtain Primary Medical Qualification?"
                placeholder="College / University, Country"
                error={errors.primaryMedicalQualification?.message}
                {...register('primaryMedicalQualification')}
              />

              <fieldset>
                <legend className="mb-2 block text-sm font-medium text-fg-soft">Course Name</legend>
                <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                  {MODES.map((mode) => (
                    <div key={mode} className="rounded-xl border border-line bg-surface p-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">{mode}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {EXAMS.map((exam) => (
                          <label key={exam} className="flex cursor-pointer items-center gap-2 text-sm text-fg-soft">
                            <input type="checkbox" value={`${mode} ${exam}`} className="h-4 w-4 rounded border-fg/30 bg-surface accent-primary" {...register('courses')} />
                            {exam}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <Textarea label="Message" placeholder="What's on your mind..." error={errors.message?.message} {...register('message')} />

              <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
                Get started
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
