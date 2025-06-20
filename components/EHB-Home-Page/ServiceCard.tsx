import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Re-defining the Service type here to be self-contained
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

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group bg-gray-50 dark:bg-gray-800">
        <Link href={service.link}>
          <Image
            src={service.imageUrl}
            alt={service.title}
            width={256}
            height={144}
            className="w-full h-36 object-cover group-hover:opacity-90 transition-opacity"
          />
        </Link>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{service.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{service.category}</p>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href={service.link}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
