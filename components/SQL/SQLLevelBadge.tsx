'use client';

import React from 'react';

export type SQLLevel = 0 | 1 | 2 | 3 | 4;

interface SQLLevelBadgeProps {
  level: SQLLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function SQLLevelBadge({
  level,
  size = 'md',
  showLabel = true,
  animated = false,
  className = '',
}: SQLLevelBadgeProps) {
  const levelNames = ['Free', 'Basic', 'Normal', 'High', 'VIP'];
  const levelColors = ['gray', 'blue', 'yellow', 'orange', 'green'];

  const name = levelNames[level];
  const color = levelColors[level];

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full bg-${color}-100 text-${color}-800 text-sm ${className}`}
    >
      {showLabel && <span className="font-medium">{name}</span>}
    </div>
  );
}

export default SQLLevelBadge;
