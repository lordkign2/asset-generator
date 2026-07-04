import React from 'react';
import { PatternOptions } from '../types';
import { Grid, Eye } from 'lucide-react';

interface PatternGeneratorProps {
  options: PatternOptions;
  setOptions: React.Dispatch<React.SetStateAction<PatternOptions>>;
}

const PATTERN_PRESETS = [
  { name: 'Blueprint Desk', bg: '#0b162b', pattern: '#02e1f2', size: 40, opacity: 0.2, thickness: 1, type: 'blueprint' },
  { name: 'Dark Techno Grid', bg: '#080a10', pattern: '#818cf8', size: 24, opacity: 0.12, thickness: 1, type: 'grid' },
  { name: 'Minimalist Cream Dot', bg: '#faf9f6', pattern: '#1e293b', size: 30, opacity: 0.15, thickness: 1, type: 'dots' },
  { name: 'Cyber Indigo Waves', bg: '#0f101d', pattern: '#ec4899', size: 50, opacity: 0.25, thickness: 1.5, type: 'waves' },
  { name: 'Graph Isometric', bg: '#0d0f1a', pattern: '#10b981', size: 36, opacity: 0.1, thickness: 1, type: 'isometric' },
  { name: 'Retro Carbon Lines', bg: '#111111', pattern: '#ffffff', size: 16, opacity: 0.08, thickness: 1.2, type: 'lines' },
];

export default function PatternGenerator({ options, setOptions }: PatternGeneratorProps) {
  const updateOption = <K extends keyof PatternOptions>(key: K, value: PatternOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: typeof PATTERN_PRESETS[0]) => {
    setOptions({
      type: preset.type as PatternOptions['type'],
      bgColor: preset.bg,
      patternColor: preset.pattern,
      size: preset.size,
      opacity: preset.opacity,
      thickness: preset.thickness,
    });
  };

  return (
    <div className="space-y-6">
      {/* Pattern Type Grid */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Pattern Grid Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['grid', 'blueprint', 'dots', 'waves', 'isometric', 'lines'] as PatternOptions['type'][]).map((type) => (
            <button
              key={type}
              id={`pattern-type-${type}`}
              onClick={() => updateOption('type', type)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold font-mono tracking-wide capitalize transition-all ${
                options.type === type
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-[#121520] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Pattern Presets */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Style Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PATTERN_PRESETS.map((preset) => (
            <button
              key={preset.name}
              id={`pattern-preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => applyPreset(preset)}
              className="flex flex-col p-2.5 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all relative overflow-hidden"
            >
              <span className="text-[11px] font-semibold text-slate-200 truncate z-10 font-mono mb-1">{preset.name}</span>
              <span className="text-[9px] text-slate-500 font-mono shrink-0 truncate z-10">
                {preset.type} • {preset.size}px
              </span>
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundColor: preset.bg,
                  backgroundImage: `radial-gradient(${preset.pattern} 1px, transparent 1px)`,
                  backgroundSize: '8px 8px'
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Base Canvas
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="pattern-color-bg-input"
              value={options.bgColor}
              onChange={(e) => updateOption('bgColor', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              id="pattern-color-bg-hex"
              value={options.bgColor}
              onChange={(e) => updateOption('bgColor', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Stroke color
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="pattern-color-stroke-input"
              value={options.patternColor}
              onChange={(e) => updateOption('patternColor', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              id="pattern-color-stroke-hex"
              value={options.patternColor}
              onChange={(e) => updateOption('patternColor', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
            />
          </div>
        </div>
      </div>

      {/* Adjustments */}
      <div className="space-y-4">
        {/* Pattern Size Slider */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Pattern Size / Scale</span>
            <span className="text-indigo-400 font-bold">{options.size}px</span>
          </div>
          <input
            type="range"
            id="pattern-size-slider"
            min="8"
            max="120"
            step="2"
            value={options.size}
            onChange={(e) => updateOption('size', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Thickness Slider */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Line stroke / Weight</span>
            <span className="text-indigo-400 font-bold">{options.thickness}px</span>
          </div>
          <input
            type="range"
            id="pattern-thickness-slider"
            min="0.5"
            max="8"
            step="0.5"
            value={options.thickness}
            onChange={(e) => updateOption('thickness', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Opacity Slider */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Pattern Opacity</span>
            <span className="text-indigo-400 font-bold">{Math.round(options.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            id="pattern-opacity-slider"
            min="0.05"
            max="1"
            step="0.05"
            value={options.opacity}
            onChange={(e) => updateOption('opacity', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
