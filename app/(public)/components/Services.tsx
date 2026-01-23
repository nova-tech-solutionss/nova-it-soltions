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
            Most Software Adds Complexity. We Remove It
            </h2>

            <p className='text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto'>
              Inside growing organizations, work rarely breaks in obvious ways. It slows. It duplicates. It gets passed between people, tools, and spreadsheets — until no one has a clear picture anymore.
            </p>
            
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Brain size={32} />}
              title="AI & Automation"
              description="Transform operations with intelligent automation, machine learning, and AI-powered insights."
              features={[
                'Process automation',
                'Predictive analytics',
                'Natural language processing',
                'Computer vision solutions',
              ]}
              delay={0}
              onClick={() => router.push('/services')}
            />
            <ServiceCard
              icon={<Code2 size={32} />}
              title="Custom Software & IT Systems"
              description="Enterprise-grade software tailored to your unique business requirements and workflows."
              features={[
                'Custom web applications',
                'API development & integration',
                'Database architecture',
                'Cloud infrastructure',
              ]}
              delay={0.1}
              onClick={() => router.push('/services')}
            />
            <ServiceCard
              icon={<Palette size={32} />}
              title="Web Development"
              description="High-performance, scalable websites and web apps built with cutting-edge technologies."
              features={[
                'Modern responsive design',
                'E-commerce platforms',
                'Progressive web apps',
                'Performance optimization',
              ]}
              delay={0.2}
              onClick={() => router.push('/services')}
            />
          </div>
        </div>
      </section>
    )
}