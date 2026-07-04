import React from 'react';
import { LogoOptions } from '../types';
import { Sparkles, Activity, RotateCw, Eye } from 'lucide-react';
import { COLOR_PRESETS } from '../utils/generators';

interface LogoGeneratorProps {
  options: LogoOptions;
  setOptions: React.Dispatch<React.SetStateAction<LogoOptions>>;
}

export default function LogoGenerator({ options, setOptions }: LogoGeneratorProps) {
  const updateOption = <K extends keyof LogoOptions>(key: K, value: LogoOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const selectPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setOptions((prev) => ({
      ...prev,
      colorStart: preset.start,
      colorEnd: preset.end,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Selector Grid for Logo Types */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Geometry Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['infinity', 'hexagon', 'vortex', 'waveform', 'triquetra', 'chevron'] as LogoOptions['type'][]).map((type) => (
            <button
              key={type}
              id={`logo-type-${type}`}
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

      {/* Preset Color Schemes */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Gradient Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              id={`logo-preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => selectPreset(preset)}
              className="flex items-center gap-2.5 p-2 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all"
            >
              <div 
                className="w-5 h-5 rounded-md shrink-0 border border-black/10"
                style={{ background: `linear-gradient(135deg, ${preset.start}, ${preset.end})` }}
              />
              <span className="text-[11px] font-medium text-slate-300 truncate font-mono">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Color Start
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="logo-color-start-input"
              value={options.colorStart}
              onChange={(e) => updateOption('colorStart', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              id="logo-color-start-hex"
              value={options.colorStart}
              onChange={(e) => updateOption('colorStart', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Color End
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="logo-color-end-input"
              value={options.colorEnd}
              onChange={(e) => updateOption('colorEnd', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              id="logo-color-end-hex"
              value={options.colorEnd}
              onChange={(e) => updateOption('colorEnd', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
            />
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {/* Stroke Width Slider */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Stroke Width</span>
            <span className="text-indigo-400 font-bold">{options.strokeWidth}px</span>
          </div>
          <input
            type="range"
            id="logo-stroke-width-slider"
            min="1"
            max="16"
            step="0.5"
            value={options.strokeWidth}
            onChange={(e) => updateOption('strokeWidth', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Rotation Speed Slider (Conditionally Rendered) */}
        {options.animate && (
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider">Rotation Loop Duration</span>
              <span className="text-indigo-400 font-bold">{options.rotationSpeed}s</span>
            </div>
            <input
              type="range"
              id="logo-rotation-speed-slider"
              min="2"
              max="30"
              step="1"
              value={options.rotationSpeed}
              onChange={(e) => updateOption('rotationSpeed', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Toggle Swatches */}
      <div className="space-y-2.5 pt-2">
        <button
          id="logo-toggle-glow"
          onClick={() => updateOption('glow', !options.glow)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all ${
            options.glow
              ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300'
              : 'bg-[#121520] border-slate-800/80 text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 shrink-0" />
            <span className="font-semibold tracking-wide">Neon Aura Glow</span>
          </div>
          <div className={`w-7 h-4 rounded-full p-0.5 transition-colors ${options.glow ? 'bg-indigo-500' : 'bg-slate-800'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${options.glow ? 'translate-x-3' : 'translate-x-0'}`} />
          </div>
        </button>

        <button
          id="logo-toggle-animate"
          onClick={() => updateOption('animate', !options.animate)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all ${
            options.animate
              ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300'
              : 'bg-[#121520] border-slate-800/80 text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 shrink-0" />
            <span className="font-semibold tracking-wide">Infinite CSS Rotation</span>
          </div>
          <div className={`w-7 h-4 rounded-full p-0.5 transition-colors ${options.animate ? 'bg-indigo-500' : 'bg-slate-800'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${options.animate ? 'translate-x-3' : 'translate-x-0'}`} />
          </div>
        </button>
      </div>
    </div>
  );
}
