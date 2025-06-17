'use client';

import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-3" />
          <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto" />
        </div>

        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-4 rounded-lg border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
