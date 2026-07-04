import React from 'react';
import { AvatarOptions } from '../types';
import { Sparkles, Dices, RefreshCw } from 'lucide-react';

interface AvatarGeneratorProps {
  options: AvatarOptions;
  setOptions: React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

const AVATAR_PRESETS = [
  { name: 'Symmetric Matrix', style: 'pixel', bg: '#030712', pri: '#10b981', sec: '#06b6d4', seed: 'matrix-core', text: 'MX', border: 'thin' },
  { name: 'Bauhaus Tri', style: 'geometric', bg: '#fafaf9', pri: '#ea580c', sec: '#0284c7', seed: 'bauhaus-arts', text: 'BH', border: 'double' },
  { name: 'Executive Mono', style: 'monogram', bg: '#090d16', pri: '#e2e8f0', sec: '#6366f1', seed: 'corp-auth', text: 'LK', border: 'thin' },
  { name: 'Cyber Silhouette', style: 'silhouette', bg: '#0d0d12', pri: '#f43f5e', sec: '#f59e0b', seed: 'cyber-hunter', text: 'CH', border: 'none' },
];

export default function AvatarGenerator({ options, setOptions }: AvatarGeneratorProps) {
  const updateOption = <K extends keyof AvatarOptions>(key: K, value: AvatarOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: typeof AVATAR_PRESETS[0]) => {
    setOptions({
      style: preset.style as AvatarOptions['style'],
      bgColor: preset.bg,
      primaryColor: preset.pri,
      secondaryColor: preset.sec,
      seed: preset.seed,
      text: preset.text,
      borderType: preset.border as AvatarOptions['borderType'],
    });
  };

  const randomizeSeed = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    updateOption('seed', randomString);
  };

  return (
    <div className="space-y-6">
      {/* Selector Grid for Avatar Styles */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Avatar Framework Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['pixel', 'monogram', 'geometric', 'silhouette'] as AvatarOptions['style'][]).map((style) => (
            <button
              key={style}
              id={`avatar-style-${style}`}
              onClick={() => updateOption('style', style)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold font-mono tracking-wide capitalize transition-all ${
                options.style === style
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-[#121520] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {style === 'pixel' ? 'Symmetric Pixel' : style === 'geometric' ? 'Geometric Bauhaus' : style === 'silhouette' ? 'Vector Outline' : 'Custom Monogram'}
            </button>
          ))}
        </div>
      </div>

      {/* Randomize Seed Button */}
      <div className="bg-[#121520] border border-slate-800/80 p-3.5 rounded-xl">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[11px] font-semibold text-slate-400 font-mono uppercase tracking-wider">Hashed Entropy Seed</span>
          <button
            id="avatar-randomize-btn"
            onClick={randomizeSeed}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold font-mono text-white rounded-lg shadow-sm transition-all"
          >
            <Dices className="w-3.5 h-3.5" />
            Randomize Layout
          </button>
        </div>
        <input
          type="text"
          id="avatar-seed-input"
          value={options.seed}
          onChange={(e) => updateOption('seed', e.target.value)}
          placeholder="Type seed to morph SVG..."
          className="w-full bg-[#090b11] border border-slate-800/80 rounded-lg py-2 px-3 text-xs text-slate-300 font-mono outline-none focus:border-slate-700 transition-all placeholder:text-slate-600"
        />
        <span className="text-[10px] text-slate-500 mt-1.5 block leading-normal font-mono">
          Each alphanumeric character shifts coordinates of symmetrical blocks.
        </span>
      </div>

      {/* Style Presets */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Style & Color Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {AVATAR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              id={`avatar-preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => applyPreset(preset)}
              className="flex items-center gap-2.5 p-2 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all"
            >
              <div 
                className="w-5.5 h-5.5 rounded-md shrink-0 border border-black/10 flex items-center justify-center text-[9px] font-bold"
                style={{ backgroundColor: preset.bg, color: preset.pri }}
              >
                {preset.text}
              </div>
              <span className="text-[11px] font-semibold text-slate-300 truncate font-mono">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Avatar Details */}
      <div className="grid grid-cols-2 gap-3">
        {/* Monogram Text (Only active on monogram) */}
        <div className="col-span-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Initials
          </label>
          <input
            type="text"
            id="avatar-text-input"
            maxLength={2}
            value={options.text}
            disabled={options.style !== 'monogram'}
            onChange={(e) => updateOption('text', e.target.value.substring(0, 2))}
            placeholder="JD"
            className="w-full bg-[#121520] border border-slate-800/80 rounded-xl py-2 px-3 text-xs text-slate-300 font-mono outline-none focus:border-slate-700 transition-all placeholder:text-slate-600 disabled:opacity-45 disabled:cursor-not-allowed"
          />
        </div>

        {/* Border Style */}
        <div className="col-span-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Framing Border
          </label>
          <select
            id="avatar-border-type-select"
            value={options.borderType}
            onChange={(e) => updateOption('borderType', e.target.value as AvatarOptions['borderType'])}
            className="w-full bg-[#121520] border border-slate-800/80 rounded-xl py-2 px-2 text-xs text-slate-300 font-mono outline-none focus:border-slate-700 transition-all cursor-pointer"
          >
            <option value="none">None</option>
            <option value="thin">Thin Single</option>
            <option value="double">Classic Double</option>
          </select>
        </div>
      </div>

      {/* Color Customizations */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono block mb-1.5">
            Backdrop
          </label>
          <div className="flex bg-[#121520] border border-slate-800/80 rounded-xl p-1.5 items-center justify-center">
            <input
              type="color"
              id="avatar-color-bg"
              value={options.bgColor}
              onChange={(e) => updateOption('bgColor', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono block mb-1.5">
            Primary block
          </label>
          <div className="flex bg-[#121520] border border-slate-800/80 rounded-xl p-1.5 items-center justify-center">
            <input
              type="color"
              id="avatar-color-pri"
              value={options.primaryColor}
              onChange={(e) => updateOption('primaryColor', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono block mb-1.5">
            Secondary
          </label>
          <div className="flex bg-[#121520] border border-slate-800/80 rounded-xl p-1.5 items-center justify-center">
            <input
              type="color"
              id="avatar-color-sec"
              value={options.secondaryColor}
              onChange={(e) => updateOption('secondaryColor', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
