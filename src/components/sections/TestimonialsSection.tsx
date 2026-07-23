"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquareHeart, Quote, Star } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="cv-auto py-28 sm:py-36">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container-content">
          <motion.div variants={fadeUp} className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              What people say
            </p>
            <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Trusted by the people I&apos;ve built for.
            </h2>
          </motion.div>
        </div>

        {testimonials.length === 0 ? (
          <motion.div variants={fadeUp} className="container-content mt-12">
            <GlassPanel
              variant="card"
              spotlight={false}
              className="flex flex-col items-center gap-3 px-8 py-16 text-center"
            >
              <MessageSquareHeart className="text-accent" size={32} strokeWidth={1.5} />
              <p className="text-lg font-medium text-text-primary">Testimonials Coming Soon</p>
              <p className="max-w-sm text-sm text-text-secondary">
                Client and collaborator reviews will appear here as projects wrap up.
              </p>
            </GlassPanel>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:px-8 lg:px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial) => (
              <GlassPanel
                key={testimonial.id}
                variant="card"
                className="flex w-[85vw] shrink-0 snap-start flex-col gap-6 p-8 sm:w-[440px]"
              >
                <div className="flex items-center justify-between">
                  <Quote className="text-accent" size={28} strokeWidth={1.5} />
                  <div
                    className="flex items-center gap-0.5"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < testimonial.rating ? "fill-accent text-accent" : "text-text-tertiary/40"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-balance flex-1 text-lg leading-relaxed text-text-primary">
                  &ldquo;{testimonial.review}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-pill ring-1 ring-glass-border/[0.14]">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{testimonial.name}</p>
                    <p className="text-sm text-text-tertiary">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
