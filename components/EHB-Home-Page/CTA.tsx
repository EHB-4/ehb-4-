'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaRocket } from 'react-icons/fa';

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <FaRocket className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build the Future?</h2>
          <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto mb-10">
            Join the EHB ecosystem today and unlock the full potential of your digital ventures. Our
            platform is ready to power your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Contact Sales
                <FaArrowRight />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
