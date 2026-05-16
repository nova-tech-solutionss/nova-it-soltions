'use client';
import {motion} from 'motion/react';
import { CaseStudyCard } from './CaseStudyCard';
import { useRouter } from 'next/navigation';
import { Button } from './Button';

export default function CaseSection() {

    const router = useRouter();

    return (
        <section className="relative py-5 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/** About Us pill */}
            <div className="inline-block px-4 py-1 border border-black rounded-full text-small text-black">
              <h4>Success Stories</h4>
            </div>
            {/* Section Heading */}
            <p className="lg:text-6xl md:text-4xl text-3xl font-regular text-gray-900 max-w-3xl mx-auto">
            See how modern IT, software, and staffing support can improve service delivery, compliance, and operational control.
            </p>
            
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CaseStudyCard
              company="Public Finance Program"
              industry="Government & Finance"
              problem="Manual reviews, scattered records, and inconsistent reporting slowed approvals and increased audit risk."
              solution="Designed a secure workflow system with role-based access, automated status tracking, and compliance-ready reporting."
              results={[
                { label: 'Faster Reviews', value: '85%' },
                { label: 'Fewer Errors', value: '95%' },
                { label: 'Audit Clarity', value: '100%' },
              ]}
              delay={0}
            />
            <CaseStudyCard
              company="Regional Health Operations"
              industry="Healthcare"
              problem="Fragmented systems and staffing gaps made it difficult to coordinate secure work across departments."
              solution="Built a unified operations portal with HIPAA-aware data handling, request tracking, and technical support workflows."
              results={[
                { label: 'System Visibility', value: '100%' },
                { label: 'Service Speed', value: '+42%' },
                { label: 'Time Saved', value: '15hrs/wk' },
              ]}
              delay={0.2}
            />
          </div>

          
        </div>
      </section>
    )
}
