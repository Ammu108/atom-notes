import { Button } from "@repo/ui";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative mb-16 w-full overflow-hidden">
      {/* ── BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 w-full animate-scaleIn">
        <Image
          alt="hero banner"
          className="object-cover object-center"
          fill
          src="/hero-bg.webp"
        />
      </div>

      {/* ── OVERLAY (multi-layer for depth) ── */}
      {/* Teal gradient from bottom-left */}
      <div className="absolute inset-0 bg-linear-to-tr from-teal-950/80 via-slate-950/40 to-transparent" />
      {/* Top vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/70" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-center px-4 py-24">
        <div className="">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fadeUp-1 items-center gap-2 rounded-full border border-accent bg-accent/90 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-medium text-[10px] text-white uppercase tracking-widest md:text-xs">
              Trusted by 50,000+ patients
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 animate-fadeUp-2 font-bold font-playfair text-4xl text-white leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your Health,{" "}
            <span className="text-[#D9EAFD] italic">Our Priority</span>
            <br className="hidden sm:block" />
            <span className="mt-1 block">Book a Doctor</span>
            <span className="block">in Seconds.</span>
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-xl animate-fadeUp-3 text-base text-white/80 leading-relaxed sm:text-lg">
            Connect with certified specialists, schedule same-day appointments,
            and receive expert care — all from the comfort of your home or our
            state-of-the-art clinics.
          </p>

          {/* Action Buttons */}
          <div className="flex animate-fadeUp-4 flex-col gap-4 sm:flex-row">
            {/* Primary CTA */}
            <Button size="lg" variant="primary">
              Book Appointment
            </Button>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex animate-fadeUp-4 flex-wrap gap-x-10 gap-y-4">
            {[
              { value: "200+", label: "Specialists" },
              { value: "24/7", label: "Availability" },
              { value: "4.9★", label: "Patient Rating" },
            ].map(({ value, label }) => (
              <div className="flex flex-col" key={label}>
                <span className="font-bold font-playfair text-2xl text-white">
                  {value}
                </span>
                <span className="mt-0.5 text-white/80 text-xs uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
