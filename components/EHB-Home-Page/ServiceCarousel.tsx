import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// --- ServiceCard Component ---
interface Service {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  link: string;
}

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group bg-gray-50 dark:bg-gray-800 h-full flex flex-col">
        <Link href={service.link} className="block">
          <Image
            src={service.imageUrl}
            alt={service.title}
            width={256}
            height={144}
            className="w-full h-36 object-cover group-hover:opacity-90 transition-opacity"
          />
        </Link>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-lg truncate">{service.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow">
            {service.category}
          </p>
          <Button asChild className="w-full mt-auto bg-blue-600 hover:bg-blue-700">
            <Link href={service.link}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- ServiceCarousel Component ---
interface ServiceCarouselProps {
  title: string;
  services: Service[];
  viewAllLink?: string;
}

export function ServiceCarousel({ title, services, viewAllLink }: ServiceCarouselProps) {
  // If there are no services, don't render the carousel
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <Button
            asChild
            variant="ghost"
            className="text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Link href={viewAllLink} className="flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
      <div className="relative">
        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
