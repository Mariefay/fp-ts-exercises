'use client';

import React from 'react';

interface EstimatedTimeProps {
  minutes: number;
}

export function EstimatedTime({ minutes }: EstimatedTimeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-800 border border-primary-200">
      <span>⏱️</span>
      ~{minutes}min
    </span>
  );
}
