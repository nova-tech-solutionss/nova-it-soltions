'use client'
import {motion} from 'motion/react';
import { Zap, Shield, Target, Users } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export default function WhySection() {
    

    return (
        <section className="relative py-32 px-6 lg:px-20 ">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/** About Us pill */}
            <div className="inline-block px-4 py-1 border border-black rounded-full text-small text-black">
              <h4>Why Choose Nova IT Solutions</h4>
            </div>
            {/* Section Heading */}
            <p className="lg:text-6xl md:text-4xl text-3xl font-regular text-gray-900 max-w-3xl mx-auto">
          We combine software engineering, IT operations, staffing support, and compliance awareness for organizations that cannot afford unreliable technology.
            </p>
            
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Zap size={28} />}
              title="Responsive Delivery"
              description="We move quickly while respecting procurement, security, and operational realities."
              delay={0}
            />
            <FeatureCard
              icon={<Shield size={28} />}
              title="Compliance-Minded"
              description="We design with security, access control, documentation, and audit readiness in mind."
              delay={0.1}
            />
            <FeatureCard
              icon={<Target size={28} />}
              title="Mission-Focused"
              description="Focused on measurable outcomes that improve service delivery and operational control."
              delay={0.2}
            />
            <FeatureCard
              icon={<Users size={28} />}
              title="Technical Talent"
              description="Software, IT, and staffing expertise to support both projects and ongoing operations."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    )
}
