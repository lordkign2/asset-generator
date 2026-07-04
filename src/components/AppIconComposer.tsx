import React from 'react';
import { AppIconOptions } from '../types';
import { Terminal, Rocket, Cpu, Database, Globe, Brain, Zap, Sparkles, Code, Eye, ShieldAlert } from 'lucide-react';

interface AppIconComposerProps {
  options: AppIconOptions;
  setOptions: React.Dispatch<React.SetStateAction<AppIconOptions>>;
}

const ICON_PRESETS = [
  { name: 'Neo Terminal', bgStart: '#000000', bgEnd: '#1e293b', icon: 'terminal', iconColor: '#10b981', shape: 'squircle', border: true, borderColor: '#10b981' },
  { name: 'Launch Spark', bgStart: '#7c3aed', bgEnd: '#ec4899', icon: 'rocket', iconColor: '#ffffff', shape: 'smooth-square', border: false, borderColor: '#ffffff' },
  { name: 'Cyber Core', bgStart: '#0f172a', bgEnd: '#312e81', icon: 'cpu', iconColor: '#00f0ff', shape: 'hexagon', border: true, borderColor: '#38bdf8' },
  { name: 'Luminous Zap', bgStart: '#f59e0b', bgEnd: '#ef4444', icon: 'zap', iconColor: '#ffffff', shape: 'shield', border: false, borderColor: '#ffffff' },
];

export default function AppIconComposer({ options, setOptions }: AppIconComposerProps) {
  const updateOption = <K extends keyof AppIconOptions>(key: K, value: AppIconOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: typeof ICON_PRESETS[0]) => {
    setOptions({
      shape: preset.shape as AppIconOptions['shape'],
      bgType: 'gradient',
      bgColorStart: preset.bgStart,
      bgColorEnd: preset.bgEnd,
      iconName: preset.icon,
      iconColor: preset.iconColor,
      iconSize: 56,
      glow: true,
      border: preset.border,
      borderColor: preset.borderColor,
    });
  };

  const glyphList = [
    { name: 'terminal', icon: <Terminal className="w-4 h-4" /> },
    { name: 'rocket', icon: <Rocket className="w-4 h-4" /> },
    { name: 'cpu', icon: <Cpu className="w-4 h-4" /> },
    { name: 'database', icon: <Database className="w-4 h-4" /> },
    { name: 'globe', icon: <Globe className="w-4 h-4" /> },
    { name: 'brain', icon: <Brain className="w-4 h-4" /> },
    { name: 'zap', icon: <Zap className="w-4 h-4" /> },
    { name: 'sparkles', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Backing Silhouette */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Launcher Shield Shape
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {(['squircle', 'round', 'hexagon', 'shield', 'smooth-square'] as AppIconOptions['shape'][]).map((shape) => (
            <button
              key={shape}
              id={`appicon-shape-${shape}`}
              onClick={() => updateOption('shape', shape)}
              className={`py-2 rounded-lg border text-[10px] font-bold font-mono tracking-wide text-center truncate capitalize transition-all ${
                options.shape === shape
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-[#121520] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={shape}
            >
              {shape === 'smooth-square' ? 'square' : shape}
            </button>
          ))}
        </div>
      </div>

      {/* Glyphs selection */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Central Brand Glyph
        </label>
        <div className="grid grid-cols-4 gap-2">
          {glyphList.map((glyph) => (
            <button
              key={glyph.name}
              id={`appicon-glyph-${glyph.name}`}
              onClick={() => updateOption('iconName', glyph.name)}
              className={`flex flex-col items-center gap-2 py-3 rounded-xl border transition-all ${
                options.iconName === glyph.name
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                  : 'bg-[#121520] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {glyph.icon}
              <span className="text-[9px] font-semibold font-mono tracking-wide capitalize">{glyph.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Launcher Presets */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Icon Theme Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ICON_PRESETS.map((preset) => (
            <button
              key={preset.name}
              id={`appicon-preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => applyPreset(preset)}
              className="flex items-center gap-2.5 p-2 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all"
            >
              <div 
                className="w-5.5 h-5.5 rounded-md shrink-0 flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, ${preset.bgStart}, ${preset.bgEnd})` }}
              >
                <Code className="w-3.5 h-3.5" style={{ color: preset.iconColor }} />
              </div>
              <span className="text-[11px] font-semibold text-slate-300 truncate font-mono">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Gradient Options */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Backing Start
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="appicon-bg-start-input"
              value={options.bgColorStart}
              onChange={(e) => updateOption('bgColorStart', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              id="appicon-bg-start-hex"
              value={options.bgColorStart}
              onChange={(e) => updateOption('bgColorStart', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Backing End
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="appicon-bg-end-input"
              value={options.bgColorEnd}
              onChange={(e) => updateOption('bgColorEnd', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              id="appicon-bg-end-hex"
              value={options.bgColorEnd}
              onChange={(e) => updateOption('bgColorEnd', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
            />
          </div>
        </div>
      </div>

      {/* Glyphs details */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Glyph Fill
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="appicon-glyph-color-input"
              value={options.iconColor}
              onChange={(e) => updateOption('iconColor', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              id="appicon-glyph-color-hex"
              value={options.iconColor}
              onChange={(e) => updateOption('iconColor', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
            Stroke Frame
          </label>
          <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
            <input
              type="color"
              id="appicon-border-color-input"
              value={options.borderColor}
              disabled={!options.border}
              onChange={(e) => updateOption('borderColor', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
            />
            <input
              type="text"
              id="appicon-border-color-hex"
              value={options.borderColor}
              disabled={!options.border}
              onChange={(e) => updateOption('borderColor', e.target.value)}
              className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Glyphs Scale Slider */}
      <div>
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="font-semibold text-slate-400 uppercase tracking-wider">Glyph Size / Scale</span>
          <span className="text-indigo-400 font-bold">{options.iconSize}px</span>
        </div>
        <input
          type="range"
          id="appicon-size-slider"
          min="32"
          max="80"
          step="2"
          value={options.iconSize}
          onChange={(e) => updateOption('iconSize', parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          id="appicon-toggle-border"
          onClick={() => updateOption('border', !options.border)}
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all ${
            options.border
              ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300'
              : 'bg-[#121520] border-slate-800/80 text-slate-400 hover:text-slate-300'
          }`}
        >
          <span className="font-semibold tracking-wide">Outer Border</span>
          <div className={`w-7 h-4 rounded-full p-0.5 transition-colors ${options.border ? 'bg-indigo-500' : 'bg-slate-800'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${options.border ? 'translate-x-3' : 'translate-x-0'}`} />
          </div>
        </button>

        <button
          id="appicon-toggle-glow"
          onClick={() => updateOption('glow', !options.glow)}
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all ${
            options.glow
              ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300'
              : 'bg-[#121520] border-slate-800/80 text-slate-400 hover:text-slate-300'
          }`}
        >
          <span className="font-semibold tracking-wide">Backing Glow</span>
          <div className={`w-7 h-4 rounded-full p-0.5 transition-colors ${options.glow ? 'bg-indigo-500' : 'bg-slate-800'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${options.glow ? 'translate-x-3' : 'translate-x-0'}`} />
          </div>
        </button>
      </div>
    </div>
  );
}
