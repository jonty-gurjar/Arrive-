import React from 'react';

export const DestinationCard = ({
  imageUrl,
  location,
  flag,
  stats,
  href,
  themeColor
}) => {
  // Convert "150 50% 25%" to "150, 50%, 25%" for inline styles
  const hslColor = `hsl(${themeColor.split(' ').join(', ')})`;

  return (
    <a 
      href={href} 
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl bg-gray-900 shadow-lg shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        src={imageUrl}
        alt={location}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90"
      />

      {/* Colored Overlay based on themeColor */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: hslColor }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col p-6 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl leading-none">{flag}</span>
          <h3 className="text-2xl font-bold text-white tracking-wide">{location}</h3>
        </div>
        <p className="text-sm font-medium text-gray-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {stats}
        </p>
      </div>

      {/* Hover accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 w-full transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: hslColor }}
      />
    </a>
  );
};
