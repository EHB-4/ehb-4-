'use client';

import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaChartLine, FaCode } from 'react-icons/fa';

export function Stats() {
  const stats = [
    { label: 'Projects Completed', value: '150+', icon: FaRocket },
    { label: 'Happy Clients', value: '50+', icon: FaUsers },
    { label: 'Success Rate', value: '98%', icon: FaChartLine },
    { label: 'Team Members', value: '25+', icon: FaCode },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
