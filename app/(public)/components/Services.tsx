'use client';
import {motion} from 'motion/react';
import { ServiceCard } from './ServiceCard';
import { Brain, Palette, Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ServiceSection() {

    const router = useRouter();

    return (
        <section className="relative py-32 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            
            {/* Section Heading */}
            <h2 className="md:text-4xl text-3xl font-regular text-gray-900 max-w-5xl mx-auto mb-8">
            IT Services Built for Regulated Work
            </h2>

            <p className='text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto'>
              We help government teams, contractors, and regulated organizations modernize systems, strengthen compliance, and fill technical gaps without adding unnecessary complexity.
            </p>
            
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Brain size={32} />}
              title="IT Services & Automation"
              description="Improve operations with secure automation, managed IT support, and practical process modernization."
              features={[
                'Workflow automation',
                'Managed IT support',
                'Reporting and visibility',
                'Secure process improvement',
              ]}
              delay={0}
              onClick={() => router.push('/services')}
            />
            <ServiceCard
              icon={<Code2 size={32} />}
              title="Custom Software & IT Systems"
              description="Compliance-aware applications and internal systems tailored to your policies, teams, and workflows."
              features={[
                'Custom web applications',
                'API development & integration',
                'Database architecture',
                'Cloud and infrastructure support',
              ]}
              delay={0.1}
              onClick={() => router.push('/services')}
            />
            <ServiceCard
              icon={<Palette size={32} />}
              title="IT Staffing & Compliance"
              description="Technical talent and advisory support for organizations that need secure delivery and audit-ready operations."
              features={[
                'Technical staffing support',
                'Compliance documentation',
                'Security process alignment',
                'Operational continuity',
              ]}
              delay={0.2}
              onClick={() => router.push('/services')}
            />
          </div>
        </div>
      </section>
    )
}
