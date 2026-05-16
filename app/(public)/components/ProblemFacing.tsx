'use client';

import { motion, Variants } from 'framer-motion';
import { ParticleField } from './ParticleField';
import { GeometricShape } from './GeometricShape';

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // easeOut cubic-bezier
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      delay: .5
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


export default function SystemReframeSection() {
  return (
    <section className="relative w-full py-32 lg:py-40 overflow-hidden">

        {/* Particle Field */}
        <ParticleField />

        {/* Geometric Shapes */}
        <GeometricShape variant="circle" size={400} className="absolute top-20 -left-60" delay={0} />
        <GeometricShape variant="square" size={250} className="absolute bottom-20 left-1/4" delay={4} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative grid grid-cols-[auto_1fr] gap-x-10">
          
          {/* Vertical Spine */}
          <div
            className="relative w-px bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent origin-top"
            data-aos='zoom-in'
          />

          {/* Content Column */}
          <div>
            {/* BLOCK A — Problem Recognition */}
            <motion.div
              className="max-w-3xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p
                className="text-sm uppercase tracking-widest text-neutral-500 mb-8"
                variants={listItemVariants}
              >
                If your organization:
              </motion.p>

              <div className="space-y-6">
                {[
                  'Relies on legacy systems, workarounds, or disconnected tools.',
                  'Needs better visibility across programs, vendors, and teams.',
                  'Spends senior time on tasks that should be automated or staffed differently.',
                  'Worries about compliance, security, continuity, or scale.',
                ].map((item) => (
                  <motion.p
                    key={item}
                    className="text-lg md:text-xl text-neutral-800 leading-snug"
                    variants={listItemVariants}
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Spacer */}
            <div className="h-28" />

            {/* BLOCK B — Reframe */}
            <motion.div
              className="max-w-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-120px' }}
              variants={fadeUpVariants}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
                You don’t need another disconnected IT project.
                <br />
                You need a technology partner built around your mission.
              </h2>
            </motion.div>

            {/* Spacer */}
            <div className="h-20" />

            {/* BLOCK C — Authority Close */}
            <motion.div
              className="max-w-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-140px' }}
              variants={fadeUpVariants}
            >
              <p className="text-xl md:text-2xl text-neutral-900 mb-6">
                That’s where we help.
              </p>

              <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                As an IT consulting partner, we design software, support infrastructure,
                provide technical staffing, and strengthen compliance alongside your team.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
