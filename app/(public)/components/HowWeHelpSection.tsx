'use client';

import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  Workflow,
  Gauge,
  Sparkles,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export default function HowWeHelpSection() {
  return (
    <section className="relative py-40 bg-white overflow-hidden">
      {/* soft system background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(60%_60%_at_30%_30%,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(50%_50%_at_60%_60%,rgba(236,72,153,0.08),transparent_70%)]" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
      >
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          {/* LEFT: TEXT */}
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl text-neutral-900 mb-16 max-w-md items-centered"
            >
              What Changes After We're Involved
            </motion.h2>

            <div className="space-y-12">
              {[
                {
                  icon: Workflow,
                  text: 'Work moves through one clear system instead of five tools',
                },
                {
                  icon: Layers,
                  text:
                    'Manual steps disappear without disrupting existing processes',
                },
                {
                  icon: ArrowRight,
                  text:
                    'Information reaches the right people without follow-ups or guesswork',
                },
                {
                  icon: Gauge,
                  text:
                    'Repetitive tasks stop consuming high-value time',
                },
                {
                  icon: Sparkles,
                  text:
                    'Technology supports decisions instead of creating noise — because the right decisions were made early',
                },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={fadeUp}
                  className="flex gap-6 items-start"
                >
                  <Icon className="w-6 h-6 text-blue-400 mt-1" />
                  <p className="text-lg md:text-xl text-neutral-800 max-w-xl">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: ABSTRACT SYSTEM */}
          <motion.div
            variants={fadeUp}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* vertical flow */}
              <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-400/60 to-transparent" />

              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative mx-auto mb-12 w-20 h-20 rounded-full bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] flex items-center justify-center"
                >
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* INFRASTRUCTURE BAND */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-xl bg-neutral-100 backdrop-blur-sm py-20 px-12 mb-32"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-12">
            Behind the scenes, this often means:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <p className="text-base md:text-lg text-neutral-700">
              internal systems replacing spreadsheets and patchwork tools
            </p>
            <p className="text-base md:text-lg text-neutral-700">
              automation handling routine decisions and document flow
            </p>
            <p className="text-base md:text-lg text-neutral-700">
              digital entry points that connect directly into operations
            </p>
          </div>
        </motion.div>

        {/* FINAL LINE */}
        <motion.div variants={fadeUp} className="max-w-3xl">
          <p className="text-base text-neutral-500 mb-4">
            But to your team, it simply feels like:
          </p>
          <p className="text-2xl md:text-3xl text-neutral-900">
            things finally work the way they should.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
