'use client'
import {motion} from 'motion/react';
import { Button } from './Button';
import { ParticleField } from './ParticleField';
import { GeometricShape } from './GeometricShape';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function HeroSection() {


    const router = useRouter();

    // Trust logos (placeholder)
    const trustLogos = ['Government', 'Healthcare', 'Legal', 'Finance', 'Operations'];

    return (
      <section className="relative h-screen flex flex-col">
        {/* Particle Field */}
        <ParticleField />

        {/* Geometric Shapes */}
        <GeometricShape variant="circle" size={400} className="absolute top-20 -left-40" delay={0} />
        <GeometricShape variant="square" size={250} className="absolute bottom-20 left-1/4" delay={4} />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(78, 123, 255, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(78, 123, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-[#4E7BFF]/10 border border-[#4E7BFF]/20 rounded-full text-[#4E7BFF] text-sm mb-8">
              ✨ Modern IT Consulting for Regulated Organizations
            </span>
          </motion.div>

          {/* Split text animation on h1 */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl mb-8 max-w-5xl mx-auto leading-tight"
          >
            {['Secure', 'IT,', 'Software,', 'and', 'Staffing', 'for', 'Mission-Critical', 'Operations'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="inline-block mr-3 md:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto"
          >
            We design, build, and support <strong className='italic bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>compliance-ready technology systems</strong> for government teams, public-sector partners, and regulated organizations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-lg italic md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            From custom software and managed IT services to technical staffing and compliance support, we help teams modernize without losing control.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/contact')}
              className="group"
            >
              Book a Free Strategy Call
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/how-we-work')}
            >
              See How We Work
            </Button>
          </motion.div>

          {/* Trust Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="relative"
          >
            <p className="text-sm text-[#A9B3C9] mb-6">Built for organizations where reliability matters</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {trustLogos.map((logo, i) => (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + i * 0.1 }}
                  className="text-[#A9B3C9] text-xl filter blur-[0.5px] hover:blur-none hover:text-white transition-all"
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="absolute bottom-3 right-3 z-20 max-w-[11rem] text-right text-[10px] leading-snug text-gray-500 sm:bottom-4 sm:right-4 sm:max-w-xs sm:text-xs sm:leading-relaxed md:bottom-6 md:right-8"
        >
          <span className="hidden sm:inline">
            For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.
          </span>
          <span className="block sm:mt-1">John 3:16</span>
        </motion.p>
        
      </section>
    )
}
