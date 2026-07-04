import { LogoOptions, PatternOptions, AppIconOptions, AvatarOptions, WhitestoneOptions } from '../types';

// Standard Premium Presets
export const COLOR_PRESETS = [
  { name: 'Cyberpunk', start: '#ff007f', end: '#00f0ff', bg: '#0d0e15' },
  { name: 'Emerald Wave', start: '#059669', end: '#34d399', bg: '#064e3b' },
  { name: 'Sunset Glow', start: '#f59e0b', end: '#ef4444', bg: '#451a03' },
  { name: 'Royal Amethyst', start: '#8b5cf6', end: '#ec4899', bg: '#1e1b4b' },
  { name: 'Oceanic Breeze', start: '#3b82f6', end: '#10b981', bg: '#0f172a' },
  { name: 'Carbon Slate', start: '#64748b', end: '#cbd5e1', bg: '#0f172a' },
];

export function generateLogoSVG(options: LogoOptions): string {
  const { type, colorStart, colorEnd, strokeWidth, glow, animate, rotationSpeed } = options;
  const gradientId = `logo-grad-${type}`;
  const glowFilterId = `logo-glow-${type}`;
  
  let pathContent = '';
  let viewbox = '0 0 200 200';
  
  switch (type) {
    case 'infinity':
      // Highly polished infinity curve in 200x200 space
      pathContent = `
        <path 
          d="M 50,100 C 50,60 90,60 100,100 C 110,140 150,140 150,100 C 150,60 110,60 100,100 C 90,140 50,140 50,100 Z" 
          fill="none" 
          stroke="url(#${gradientId})" 
          stroke-width="${strokeWidth}" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      `;
      break;
    case 'hexagon':
      // Interlocking nested futuristic hexagons
      pathContent = `
        <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="url(#${gradientId})" stroke-width="${strokeWidth}" stroke-linejoin="round" />
        <polygon points="100,50 143,75 143,125 100,150 57,125 57,75" fill="none" stroke="url(#${gradientId})" stroke-width="${Math.max(2, strokeWidth * 0.6)}" opacity="0.8" stroke-linejoin="round" />
        <polygon points="100,80 117,90 117,110 100,120 83,110 83,90" fill="none" stroke="url(#${gradientId})" stroke-width="${Math.max(1, strokeWidth * 0.3)}" opacity="0.5" stroke-linejoin="round" />
      `;
      break;
    case 'vortex':
      // Dynamic geometric logarithmic shell/spiral
      pathContent = Array.from({ length: 8 }).map((_, i) => {
        const radius = 20 + i * 18;
        const startAngle = i * 25;
        const endAngle = startAngle + 210;
        const radStart = (startAngle * Math.PI) / 180;
        const radEnd = (endAngle * Math.PI) / 180;
        const x1 = 100 + radius * Math.cos(radStart);
        const y1 = 100 + radius * Math.sin(radStart);
        const x2 = 100 + radius * Math.cos(radEnd);
        const y2 = 100 + radius * Math.sin(radEnd);
        return `
          <path 
            d="M ${x1},${y1} A ${radius},${radius} 0 1,1 ${x2},${y2}" 
            fill="none" 
            stroke="url(#${gradientId})" 
            stroke-width="${strokeWidth}" 
            stroke-linecap="round"
            opacity="${1 - i * 0.08}"
          />
        `;
      }).join('');
      break;
    case 'waveform':
      // Layered sine wave soundwaves/telemetry
      pathContent = Array.from({ length: 4 }).map((_, waveIdx) => {
        const amp = 15 + waveIdx * 10;
        const freq = 0.03 + waveIdx * 0.01;
        const phase = waveIdx * 1.5;
        const points = Array.from({ length: 41 }).map((_, pointIdx) => {
          const x = (pointIdx / 40) * 160 + 20;
          const y = 100 + amp * Math.sin(x * freq + phase);
          return `${pointIdx === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');
        
        return `
          <path 
            d="${points}" 
            fill="none" 
            stroke="url(#${gradientId})" 
            stroke-width="${strokeWidth * (1 - waveIdx * 0.15)}" 
            stroke-linecap="round"
            opacity="${1 - waveIdx * 0.2}"
          />
        `;
      }).join('');
      break;
    case 'triquetra':
      // Elegant interlocking three-loop knot
      pathContent = `
        <g transform="translate(100, 107)">
          <!-- Node 1 -->
          <path d="M 0,-45 A 35,35 0 0,0 -30,7 A 35,35 0 0,0 30,7 A 35,35 0 0,0 0,-45 Z" fill="none" stroke="url(#${gradientId})" stroke-width="${strokeWidth}" stroke-linejoin="round" />
          <!-- Node 2 (rotated 120) -->
          <path d="M 0,-45 A 35,35 0 0,0 -30,7 A 35,35 0 0,0 30,7 A 35,35 0 0,0 0,-45 Z" fill="none" stroke="url(#${gradientId})" stroke-width="${strokeWidth}" transform="rotate(120)" stroke-linejoin="round" />
          <!-- Node 3 (rotated 240) -->
          <path d="M 0,-45 A 35,35 0 0,0 -30,7 A 35,35 0 0,0 30,7 A 35,35 0 0,0 0,-45 Z" fill="none" stroke="url(#${gradientId})" stroke-width="${strokeWidth}" transform="rotate(240)" stroke-linejoin="round" />
          <!-- Center ring -->
          <circle cx="0" cy="0" r="28" fill="none" stroke="url(#${gradientId})" stroke-width="${strokeWidth * 0.7}" opacity="0.6" />
        </g>
      `;
      break;
    case 'chevron':
      // Futuristic interlocking double chevron node
      pathContent = `
        <g stroke="url(#${gradientId})" fill="none" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 50,55 L 100,105 L 150,55" />
          <path d="M 50,95 L 100,145 L 150,95" />
          <path d="M 50,135 L 100,185 L 150,135" opacity="0.4" />
          <line x1="100" y1="25" x2="100" y2="105" stroke-dasharray="4 6" opacity="0.8" />
        </g>
      `;
      break;
  }

  const animationTag = animate
    ? `<style>
        @keyframes rotate-logo {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animated-logo {
          transform-origin: 100px 100px;
          animation: rotate-logo ${rotationSpeed}s linear infinite;
        }
       </style>`
    : '';

  const filterTag = glow
    ? `<filter id="${glowFilterId}" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
       </filter>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewbox}" width="100%" height="100%" class="${animate ? 'animated-logo' : ''}">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorStart}" />
      <stop offset="100%" stop-color="${colorEnd}" />
    </linearGradient>
    ${filterTag}
  </defs>
  ${animationTag}
  <g ${glow ? `filter="url(#${glowFilterId})"` : ''}>
    ${pathContent}
  </g>
</svg>`;
}

export function generatePatternCSS(options: PatternOptions): {
  backgroundImage: string;
  backgroundColor: string;
  backgroundSize: string;
} {
  const { type, bgColor, patternColor, size, opacity, thickness } = options;
  const sizePx = `${size}px`;
  
  // Custom escape for SVG colors in inline CSS url data
  const esc = (color: string) => encodeURIComponent(color);
  
  let svg = '';
  
  switch (type) {
    case 'grid':
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
        <rect width='100%' height='100%' fill='none'/>
        <path d='M ${size} 0 L 0 0 0 ${size}' fill='none' stroke='${patternColor}' stroke-width='${thickness}' opacity='${opacity}'/>
      </svg>`;
      break;
    case 'blueprint':
      // Engineering ledger grid + subdivs
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
        <path d='M ${size} 0 L 0 0 0 ${size}' fill='none' stroke='${patternColor}' stroke-width='${thickness * 1.5}' opacity='${opacity}'/>
        <path d='M ${size/2} 0 L ${size/2} ${size} M 0 ${size/2} L ${size} ${size/2}' fill='none' stroke='${patternColor}' stroke-width='${thickness * 0.5}' opacity='${opacity * 0.5}' stroke-dasharray='2 2'/>
      </svg>`;
      break;
    case 'dots':
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
        <circle cx='${size/2}' cy='${size/2}' r='${thickness * 1.5}' fill='${patternColor}' opacity='${opacity}'/>
      </svg>`;
      break;
    case 'waves':
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
        <path d='M 0 ${size/2} Q ${size/4} ${size/2 - thickness * 2} ${size/2} ${size/2} T ${size} ${size/2}' fill='none' stroke='${patternColor}' stroke-width='${thickness}' opacity='${opacity}' stroke-linecap='round'/>
        <path d='M 0 ${size} Q ${size/4} ${size - thickness * 2} ${size/2} ${size} T ${size} ${size}' fill='none' stroke='${patternColor}' stroke-width='${thickness}' opacity='${opacity}' stroke-linecap='round'/>
      </svg>`;
      break;
    case 'isometric':
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size * 1.732}'>
        <path d='M ${size/2} 0 L ${size} ${size * 0.866} L 0 ${size * 0.866} Z M 0 ${size * 0.866} L ${size/2} ${size * 1.732} L ${size} ${size * 0.866} Z' fill='none' stroke='${patternColor}' stroke-width='${thickness}' opacity='${opacity}'/>
      </svg>`;
      break;
    case 'lines':
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
        <line x1='0' y1='${size}' x2='${size}' y2='0' stroke='${patternColor}' stroke-width='${thickness}' opacity='${opacity}' stroke-linecap='round'/>
      </svg>`;
      break;
  }
  
  const base64Svg = typeof btoa !== 'undefined' ? btoa(svg) : Buffer.from(svg).toString('base64');
  const backgroundImage = `url("data:image/svg+xml;base64,${base64Svg}")`;
  
  return {
    backgroundImage,
    backgroundColor: bgColor,
    backgroundSize: sizePx,
  };
}

export function generatePatternCSSStyleString(options: PatternOptions): string {
  const { type, bgColor, patternColor, size, opacity, thickness } = options;
  return `/* Copy this CSS to your stylesheet */
.custom-pattern-bg {
  background-color: ${bgColor};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Cpath d='M ${size} 0 L 0 0 0 ${size}' fill='none' stroke='${encodeURIComponent(patternColor)}' stroke-width='${thickness}' opacity='${opacity}'/%3E%3C/svg%3E");
  background-size: ${size}px ${size}px;
}`;
}

export function generateAppIconSVG(options: AppIconOptions): string {
  const { shape, bgType, bgColorStart, bgColorEnd, iconColor, iconSize, glow, border, borderColor } = options;
  
  // Custom High-Quality Vector Icons suited for branding and apps
  // Since we can't easily query lucide from code to render full path directly, we define 10 clean custom developer vector shapes
  let iconPath = '';
  
  switch (options.iconName) {
    case 'terminal':
      iconPath = `<path d="M40 65l25-20-25-20M70 65h25" stroke="${iconColor}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
      break;
    case 'rocket':
      iconPath = `<path d="M85 30s-10-10-25-5c-15 5-25 25-25 25s20-10 25-5 5 20 10 25c0 0 20-10 25-25 5-15-5-25-5-25z M35 70l-10 15 5-5 M65 35l15-10-5 5" stroke="${iconColor}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <path d="M35 70s-8-2-12-12c-10-10 2-23 2-23l10 35z" stroke="${iconColor}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
      break;
    case 'cpu':
      iconPath = `<rect x="35" y="35" width="50" height="50" rx="6" stroke="${iconColor}" stroke-width="8" fill="none"/>
                  <path d="M45 20v15M60 20v15M75 20v15M45 85v15M60 85v15M75 85v15M20 45h15M20 60h15M20 75h15M85 45h15M85 60h15M85 75h15" stroke="${iconColor}" stroke-width="7" stroke-linecap="round"/>`;
      break;
    case 'database':
      iconPath = `<ellipse cx="60" cy="35" rx="25" ry="10" stroke="${iconColor}" stroke-width="8" fill="none"/>
                  <path d="M35 35v20c0 5.5 11 10 25 10s25-4.5 25-10V35M35 55v20c0 5.5 11 10 25 10s25-4.5 25-10V55" stroke="${iconColor}" stroke-width="8" stroke-linecap="round" fill="none"/>`;
      break;
    case 'globe':
      iconPath = `<circle cx="60" cy="60" r="30" stroke="${iconColor}" stroke-width="8" fill="none"/>
                  <path d="M30 60h60M60 30c6 8 9 18 9 30s-3 22-9 30M60 30c-6 8-9 18-9 30s3 22 9 30" stroke="${iconColor}" stroke-width="6" fill="none"/>`;
      break;
    case 'brain':
      iconPath = `<path d="M48 40a15 15 0 0 0-13 22 15 15 0 0 0 13 23h24a15 15 0 0 0 13-23 15 15 0 0 0-13-22z" stroke="${iconColor}" stroke-width="7" fill="none"/>
                  <path d="M60 35v50M45 55h30" stroke="${iconColor}" stroke-width="5" stroke-dasharray="3 3"/>`;
      break;
    case 'zap':
      iconPath = `<polygon points="65,25 35,60 55,60 45,95 85,45 60,45" stroke="${iconColor}" stroke-width="8" stroke-linejoin="round" fill="none"/>`;
      break;
    case 'sparkles':
      iconPath = `<path d="M60 25l5 15 15 5-15 5-5 15-5-15-15-5 15-5z M35 65l3 7 7 3-7 3-3 7-3-7-7-3 7-3z M85 75l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="${iconColor}"/>`;
      break;
    default: // code/terminal-square
      iconPath = `<rect x="30" y="30" width="60" height="60" rx="10" stroke="${iconColor}" stroke-width="8" fill="none"/>
                  <path d="M45 53l-8 7 8 7M75 53l8 7-8 7" stroke="${iconColor}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
      break;
  }

  // Base bounding shape definitions
  let shapePath = '';
  switch (shape) {
    case 'squircle':
      // Mathematical superellipse approximation
      shapePath = 'M 20,2 A 18,18 0 0,0 2,20 L 2,100 A 18,18 0 0,0 20,118 L 100,118 A 18,18 0 0,0 118,100 L 118,20 A 18,18 0 0,0 100,2 Z';
      break;
    case 'smooth-square':
      shapePath = 'M 10,2 L 110,2 A 8,8 0 0,1 118,10 L 118,110 A 8,8 0 0,1 110,118 L 10,118 A 8,8 0 0,1 2,110 L 2,10 A 8,8 0 0,1 10,2 Z';
      break;
    case 'round':
      shapePath = 'M 60,2 A 58,58 0 1,0 60,118 A 58,58 0 1,0 60,2 Z';
      break;
    case 'hexagon':
      shapePath = 'M 60,2 L 110,31 L 110,89 L 60,118 L 10,89 L 10,31 Z';
      break;
    case 'shield':
      shapePath = 'M 60,2 C 90,2 115,10 115,10 C 115,10 115,60 115,80 C 115,105 85,116 60,118 C 35,116 5,105 5,80 C 5,60 5,10 5,10 C 5,10 30,2 60,2 Z';
      break;
  }

  const bgFill = bgType === 'gradient' 
    ? 'url(#app-icon-bg-grad)' 
    : bgColorStart;

  const glowFilter = glow
    ? `<filter id="app-icon-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0"/>
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
       </filter>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <defs>
    <linearGradient id="app-icon-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColorStart}" />
      <stop offset="100%" stop-color="${bgColorEnd}" />
    </linearGradient>
    ${glowFilter}
  </defs>
  <g ${glow ? 'filter="url(#app-icon-glow)"' : ''}>
    <!-- Background shape -->
    <path d="${shapePath}" fill="${bgFill}" ${border ? `stroke="${borderColor}" stroke-width="4"` : ''} />
    
    <!-- Central Icon Glyph (Centered in 120x120 container, scaling by offset) -->
    <g transform="translate(${(120 - iconSize) / 2}, ${(120 - iconSize) / 2}) scale(${iconSize / 120})">
      ${iconPath}
    </g>
  </g>
</svg>`;
}

export function generateAvatarSVG(options: AvatarOptions): string {
  const { style, bgColor, primaryColor, secondaryColor, seed, text, borderType } = options;
  let graphicContent = '';
  const avatarText = text.trim() ? text.trim().substring(0, 2).toUpperCase() : 'JD';
  
  // Custom hash from seed string to create variety
  const getHashValue = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };
  
  const hash = getHashValue(seed || 'hello');
  
  switch (style) {
    case 'pixel':
      // Procedural Symmetric 8x8 Pixel Avatar based on seed hash
      const rows = 8;
      const cols = 8;
      let pixelGrid = '';
      
      for (let r = 0; r < rows; r++) {
        // Only generate for half, mirror the other half
        for (let c = 0; c < cols / 2; c++) {
          const bitIndex = r * 4 + c;
          const isActive = ((hash >> bitIndex) & 1) === 1;
          
          if (isActive) {
            const fill = ((hash + r + c) % 3 === 0) ? secondaryColor : primaryColor;
            const x1 = 20 + c * 10;
            const y1 = 20 + r * 10;
            // Mirror x
            const x2 = 100 - (c + 1) * 10;
            
            pixelGrid += `<rect x="${x1}" y="${y1}" width="10" height="10" fill="${fill}" />`;
            if (x1 !== x2) {
              pixelGrid += `<rect x="${x2}" y="${y1}" width="10" height="10" fill="${fill}" />`;
            }
          }
        }
      }
      
      graphicContent = `<g transform="translate(10, 10)">${pixelGrid}</g>`;
      break;
      
    case 'monogram':
      // Clean modern monogram type identity
      graphicContent = `
        <circle cx="60" cy="60" r="35" fill="none" stroke="${secondaryColor}" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
        <text 
          x="60" 
          y="68" 
          font-family="'Inter', -apple-system, sans-serif" 
          font-weight="700" 
          font-size="28" 
          fill="${primaryColor}" 
          text-anchor="middle"
          letter-spacing="-1"
        >
          ${avatarText}
        </text>
      `;
      break;
      
    case 'geometric':
      // Procedural modern constructivist layout
      const shapeId = hash % 4;
      let geomShapes = '';
      
      if (shapeId === 0) {
        geomShapes = `
          <rect x="35" y="35" width="50" height="50" fill="none" stroke="${primaryColor}" stroke-width="6" transform="rotate(45, 60, 60)" />
          <circle cx="60" cy="60" r="15" fill="${secondaryColor}" />
        `;
      } else if (shapeId === 1) {
        geomShapes = `
          <polygon points="60,25 95,85 25,85" fill="none" stroke="${primaryColor}" stroke-width="6" />
          <polygon points="60,45 80,80 40,80" fill="${secondaryColor}" opacity="0.8" />
        `;
      } else if (shapeId === 2) {
        geomShapes = `
          <circle cx="60" cy="60" r="30" fill="none" stroke="${primaryColor}" stroke-width="6" />
          <path d="M 40,60 L 80,60 M 60,40 L 60,80" stroke="${secondaryColor}" stroke-width="4" stroke-linecap="round" />
        `;
      } else {
        geomShapes = `
          <rect x="30" y="30" width="60" height="60" rx="12" fill="none" stroke="${primaryColor}" stroke-width="6" />
          <circle cx="48" cy="48" r="6" fill="${secondaryColor}" />
          <circle cx="72" cy="48" r="6" fill="${secondaryColor}" />
          <path d="M 45,70 Q 60,82 75,70" fill="none" stroke="${secondaryColor}" stroke-width="4" stroke-linecap="round" />
        `;
      }
      
      graphicContent = geomShapes;
      break;
      
    case 'silhouette':
      // Ultra-clean vector user avatar silhouette
      graphicContent = `
        <g stroke="${primaryColor}" fill="none" stroke-linecap="round">
          <!-- Head/Hair -->
          <circle cx="60" cy="48" r="16" stroke-width="6" />
          <!-- Shoulders -->
          <path d="M 28,92 C 28,78 40,70 60,70 C 80,70 92,78 92,92" stroke-width="6" />
          <!-- Custom Tech Details -->
          ${hash % 2 === 0 ? `<path d="M 44,48 h 32" stroke="${secondaryColor}" stroke-width="4" />` : ''}
        </g>
      `;
      break;
  }

  let borderHtml = '';
  if (borderType === 'thin') {
    borderHtml = `<circle cx="60" cy="60" r="56" fill="none" stroke="${primaryColor}" stroke-width="2" opacity="0.4" />`;
  } else if (borderType === 'double') {
    borderHtml = `
      <circle cx="60" cy="60" r="56" fill="none" stroke="${primaryColor}" stroke-width="2" opacity="0.4" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="${secondaryColor}" stroke-width="1" opacity="0.2" />
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <!-- Backdrop background -->
  <rect width="100%" height="100%" fill="${bgColor}" rx="24" />
  
  <!-- Outer border layout -->
  ${borderHtml}
  
  <!-- Central Graphics -->
  ${graphicContent}
</svg>`;
}

export function generateWhitestoneSVG(options: WhitestoneOptions): string {
  const {
    assetType,
    primaryColorStart,
    primaryColorEnd,
    secondaryColorStart,
    secondaryColorEnd,
    sharedColorStart,
    sharedColorEnd,
    blueprintColor,
    blueprintBgColor,
    blueprintGridSize,
    badgeScale = 1
  } = options;

  if (assetType === 'blueprint-grid') {
    // Generate a high-tech engineering draft blueprint with coordinate markers and crosshairs
    const size = blueprintGridSize || 40;
    const half = size / 2;
    const sub = size / 10;
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="100%" height="100%" fill="${blueprintBgColor}" />
      
      <!-- Grid Defs -->
      <defs>
        <pattern id="blue-subgrid" width="${sub}" height="${sub}" patternUnits="userSpaceOnUse">
          <path d="M ${sub} 0 L 0 0 0 ${sub}" fill="none" stroke="${blueprintColor}" stroke-width="0.3" opacity="0.15" />
        </pattern>
        <pattern id="blue-grid" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
          <rect width="${size}" height="${size}" fill="url(#blue-subgrid)" />
          <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${blueprintColor}" stroke-width="0.8" opacity="0.35" />
          <circle cx="0" cy="0" r="1.5" fill="${blueprintColor}" opacity="0.6" />
        </pattern>
      </defs>
      
      <!-- Apply Grid -->
      <rect width="100%" height="100%" fill="url(#blue-grid)" />
      
      <!-- Fine blueprint draft circles and markers -->
      <g stroke="${blueprintColor}" fill="none" opacity="0.4">
        <!-- Concentric engineering layout rings -->
        <circle cx="400" cy="250" r="180" stroke-width="0.8" stroke-dasharray="4 4" />
        <circle cx="400" cy="250" r="120" stroke-width="0.6" />
        <circle cx="400" cy="250" r="60" stroke-width="0.5" stroke-dasharray="2 2" />
        <circle cx="400" cy="250" r="240" stroke-width="0.4" opacity="0.3" />
        
        <!-- Crosshair lines -->
        <line x1="50" y1="250" x2="750" y2="250" stroke-width="0.8" stroke-dasharray="8 4 2 4" />
        <line x1="400" y1="30" x2="400" y2="470" stroke-width="0.8" stroke-dasharray="8 4 2 4" />
        
        <!-- Diagonal alignment vectors -->
        <line x1="150" y1="100" x2="650" y2="400" stroke-width="0.4" stroke-dasharray="2 4" />
        <line x1="150" y1="400" x2="650" y2="100" stroke-width="0.4" stroke-dasharray="2 4" />
        
        <!-- Dimension text / technical annotations -->
        <text x="410" y="80" font-family="monospace" font-size="9" fill="${blueprintColor}" opacity="0.7">R_180.00</text>
        <text x="410" y="140" font-family="monospace" font-size="9" fill="${blueprintColor}" opacity="0.7">R_120.00</text>
        <text x="410" y="200" font-family="monospace" font-size="9" fill="${blueprintColor}" opacity="0.7">R_60.00</text>
        
        <!-- Blueprint specs box in bottom-right -->
        <rect x="580" y="380" width="200" height="100" stroke-width="1" />
        <line x1="580" y1="410" x2="780" y2="410" stroke-width="0.8" />
        <line x1="580" y1="440" x2="780" y2="440" stroke-width="0.8" />
        <line x1="680" y1="440" x2="680" y2="480" stroke-width="0.8" />
        
        <text x="590" y="400" font-family="monospace" font-size="10" font-weight="bold" fill="${blueprintColor}">WHITESTONE ARCHITECTS</text>
        <text x="590" y="428" font-family="monospace" font-size="8" fill="${blueprintColor}">PROJECT: DIVISION BLUEPRINT GRID</text>
        <text x="590" y="455" font-family="monospace" font-size="7" fill="${blueprintColor}">SCALE: 1:10</text>
        <text x="590" y="470" font-family="monospace" font-size="7" fill="${blueprintColor}">CODE: WS-GRID-02</text>
        <text x="690" y="455" font-family="monospace" font-size="7" fill="${blueprintColor}">REV: A</text>
        <text x="690" y="470" font-family="monospace" font-size="7" fill="${blueprintColor}">SHEET: 1 OF 1</text>
        
        <!-- Corner alignment frames -->
        <path d="M 30,50 L 30,30 L 50,30" stroke-width="1.2" />
        <path d="M 770,50 L 770,30 L 750,30" stroke-width="1.2" />
        <path d="M 30,450 L 30,470 L 50,470" stroke-width="1.2" />
        <path d="M 770,450 L 770,470 L 750,470" stroke-width="1.2" />
      </g>
    </svg>`;
  }

  // Define gradients
  const primaryGrad = 'url(#ws-primary-grad)';
  const secondaryGrad = 'url(#ws-secondary-grad)';
  const sharedGrad = 'url(#ws-shared-grad)';

  let badgeContent = '';
  let subText = '';
  let activeGrad = '';
  let colorStart = '';
  let colorEnd = '';

  if (assetType === 'primary-logo') {
    activeGrad = primaryGrad;
    colorStart = primaryColorStart;
    colorEnd = primaryColorEnd;
    subText = 'PRIMARY SCHOOL';
    badgeContent = `
      <!-- Elegant Shield Shape for Primary -->
      <path d="M 100,30 C 140,30 160,40 160,40 C 160,40 165,110 135,145 C 115,168 100,175 100,175 C 100,175 85,168 65,145 C 35,110 40,40 40,40 C 40,40 60,30 100,30 Z" 
            fill="none" stroke="${primaryGrad}" stroke-width="6" stroke-linejoin="round" />
      <path d="M 100,38 C 134,38 151,46 151,46 C 151,46 155,105 129,135 C 112,154 100,160 100,160 C 100,160 88,154 71,135 C 45,105 49,46 49,46 C 49,46 66,38 100,38 Z" 
            fill="${primaryGrad}" opacity="0.08" />
            
      <!-- Knowledge Tree / Leaf Growth Emblem -->
      <g transform="translate(100, 105) scale(${badgeScale})">
        <!-- Main stem -->
        <path d="M 0,40 L 0,-25" stroke="${primaryGrad}" stroke-width="5" stroke-linecap="round" fill="none" />
        <!-- Elegant leaf curves representing organic learning -->
        <path d="M 0,15 C 20,15 30,-5 0,-20 C -30,-5 -20,15 0,15 Z" fill="${primaryGrad}" opacity="0.85" />
        <path d="M 0,30 C 25,25 35,5 5,-5" stroke="${primaryGrad}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M 0,30 C -25,25 -35,5 -5,-5" stroke="${primaryGrad}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M 0,-10 C 18,-15 22,-30 2,-38" stroke="${primaryGrad}" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 0,-10 C -18,-15 -22,-30 -2,-38" stroke="${primaryGrad}" stroke-width="3" stroke-linecap="round" fill="none" />
        
        <!-- Stars of excellence -->
        <circle cx="0" cy="-48" r="4.5" fill="${primaryGrad}" />
        <circle cx="-35" cy="-20" r="3" fill="${primaryGrad}" opacity="0.7" />
        <circle cx="35" cy="-20" r="3" fill="${primaryGrad}" opacity="0.7" />
      </g>
    `;
  } else if (assetType === 'secondary-logo') {
    activeGrad = secondaryGrad;
    colorStart = secondaryColorStart;
    colorEnd = secondaryColorEnd;
    subText = 'SECONDARY SCHOOL';
    badgeContent = `
      <!-- Stately Classic Academic Shield with nested double borders -->
      <path d="M 100,25 C 150,25 165,35 165,35 L 165,110 C 165,145 135,168 100,180 C 65,168 35,145 35,110 L 35,35 C 35,35 50,25 100,25 Z" 
            fill="none" stroke="${secondaryGrad}" stroke-width="7" stroke-linejoin="round" />
      <path d="M 100,34 C 141,34 153,42 153,42 L 153,107 C 153,135 128,154 100,165 C 72,154 47,135 47,107 L 47,42 C 47,42 59,34 100,34 Z" 
            fill="none" stroke="${secondaryGrad}" stroke-width="2" stroke-dasharray="4 3" opacity="0.7" />
            
      <!-- Classic Open Book of Wisdom & Rising Torch/Star -->
      <g transform="translate(100, 100) scale(${badgeScale})">
        <!-- Open Book paths -->
        <path d="M -35,18 C -15,10 0,18 0,18 C 0,18 15,10 35,18 L 35,-15 C 15,-23 0,-15 0,-15 C 0,-15 -15,-23 -35,-15 Z" 
              fill="none" stroke="${secondaryGrad}" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M 0,-12 L 0,18" stroke="${secondaryGrad}" stroke-width="3" />
        
        <!-- Book Pages lines -->
        <path d="M -28,-4 C -15,-10 -5,-5 -5,-5" stroke="${secondaryGrad}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7" />
        <path d="M -28,4 C -15,-2 -5,3 -5,3" stroke="${secondaryGrad}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7" />
        <path d="M 28,-4 C 15,-10 5,-5 5,-5" stroke="${secondaryGrad}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7" />
        <path d="M 28,4 C 15,-2 5,3 5,3" stroke="${secondaryGrad}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7" />
        
        <!-- Torch/Astra Beacon above the book -->
        <path d="M 0,-25 L 0,-45" stroke="${secondaryGrad}" stroke-width="4" stroke-linecap="round" />
        <!-- Rising fire / star motif -->
        <polygon points="0,-62 6,-48 20,-48 10,-38 14,-24 0,-32 -14,-24 -10,-38 -20,-48 -6,-48" fill="${secondaryGrad}" />
        
        <circle cx="-25" cy="-35" r="3.5" fill="${secondaryGrad}" />
        <circle cx="25" cy="-35" r="3.5" fill="${secondaryGrad}" />
      </g>
    `;
  } else {
    // Shared / Educational Trust Logo
    activeGrad = sharedGrad;
    colorStart = sharedColorStart;
    colorEnd = sharedColorEnd;
    subText = 'EDUCATIONAL TRUST';
    badgeContent = `
      <!-- Symmetric Twin Shield Crest enclosing a magnificent central Star of Integrity -->
      <!-- Left shield wing -->
      <path d="M 100,30 C 75,30 55,40 55,40 C 55,40 45,95 72,130 C 88,150 100,165 100,165" 
            fill="none" stroke="${sharedGrad}" stroke-width="6" stroke-linecap="round" />
      <!-- Right shield wing -->
      <path d="M 100,30 C 125,30 145,40 145,40 C 145,40 155,95 128,130 C 112,150 100,165 100,165" 
            fill="none" stroke="${sharedGrad}" stroke-width="6" stroke-linecap="round" />
            
      <!-- Nested delicate rings of unity -->
      <circle cx="100" cy="100" r="55" fill="none" stroke="${sharedGrad}" stroke-width="2.5" stroke-dasharray="3 3" opacity="0.7" />
      <circle cx="100" cy="100" r="48" fill="none" stroke="${sharedGrad}" stroke-width="1" opacity="0.4" />
      
      <!-- Central Monogram & Geometric Unity Badge -->
      <g transform="translate(100, 100) scale(${badgeScale})">
        <!-- Interlocking dynamic double ribbon rings -->
        <path d="M -25,-12 C -15,-25 15,-25 25,-12 C 35,1 15,20 0,30 C -15,20 -35,1 -25,-12 Z" 
              fill="none" stroke="${sharedGrad}" stroke-width="4.5" stroke-linejoin="round" />
        
        <!-- Elegant Capital Letter 'W' combined with key of truth -->
        <path d="M -16,-12 L -8,12 L 0,-6 L 8,12 L 16,-12" stroke="${sharedGrad}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        
        <!-- Radiant Crown / Apex of stars -->
        <polygon points="0,-36 4,-26 14,-26 6,-20 9,-10 0,-16 -9,-10 -6,-20 -14,-26 -4,-26" fill="${sharedGrad}" />
        <circle cx="-24" cy="-24" r="3" fill="${sharedGrad}" opacity="0.8" />
        <circle cx="24" cy="-24" r="3" fill="${sharedGrad}" opacity="0.8" />
      </g>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="100%" height="100%">
    <defs>
      <linearGradient id="ws-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryColorStart}" />
        <stop offset="100%" stop-color="${primaryColorEnd}" />
      </linearGradient>
      <linearGradient id="ws-secondary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${secondaryColorStart}" />
        <stop offset="100%" stop-color="${secondaryColorEnd}" />
      </linearGradient>
      <linearGradient id="ws-shared-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${sharedColorStart}" />
        <stop offset="100%" stop-color="${sharedColorEnd}" />
      </linearGradient>
      
      <filter id="ws-emblem-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <!-- Shield/emblem vector -->
    <g filter="url(#ws-emblem-glow)">
      ${badgeContent}
    </g>
    
    <!-- Typography section -->
    <g transform="translate(100, 195)" text-anchor="middle">
      <text font-family="'Cinzel', 'Playfair Display', 'Georgia', serif" 
            font-size="14" 
            font-weight="700" 
            letter-spacing="3" 
            fill="url(#ws-shared-grad)">WHITESTONE</text>
      
      <text font-family="'Inter', sans-serif" 
            font-size="8" 
            font-weight="600" 
            letter-spacing="2" 
            fill="#94a3b8" 
            y="15">${subText}</text>
            
      <!-- Subtle visual base divider line -->
      <line x1="-30" y1="24" x2="30" y2="24" stroke="${activeGrad}" stroke-width="1.5" opacity="0.6" stroke-linecap="round" />
    </g>
  </svg>`;
}

