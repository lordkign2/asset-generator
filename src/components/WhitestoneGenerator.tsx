import React from 'react';
import { WhitestoneOptions } from '../types';
import { Shield, Sparkles, Sliders, Layers, Paintbrush } from 'lucide-react';

interface WhitestoneGeneratorProps {
  options: WhitestoneOptions;
  setOptions: React.Dispatch<React.SetStateAction<WhitestoneOptions>>;
}

export default function WhitestoneGenerator({ options, setOptions }: WhitestoneGeneratorProps) {
  const updateOption = <K extends keyof WhitestoneOptions>(key: K, value: WhitestoneOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const selectColorPreset = (type: 'primary' | 'secondary' | 'shared' | 'blueprint') => {
    if (type === 'primary') {
      setOptions((prev) => ({
        ...prev,
        primaryColorStart: '#059669',
        primaryColorEnd: '#34d399',
      }));
    } else if (type === 'secondary') {
      setOptions((prev) => ({
        ...prev,
        secondaryColorStart: '#7c3aed',
        secondaryColorEnd: '#a78bfa',
      }));
    } else if (type === 'shared') {
      setOptions((prev) => ({
        ...prev,
        sharedColorStart: '#d97706',
        sharedColorEnd: '#fbbf24',
      }));
    } else if (type === 'blueprint') {
      setOptions((prev) => ({
        ...prev,
        blueprintColor: '#00f0ff',
        blueprintBgColor: '#0a0e1a',
        blueprintGridSize: 40,
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector Grid for Whitestone Asset Types */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Select Whitestone Asset
        </label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: 'primary-logo', label: 'Primary School Logo' },
            { id: 'secondary-logo', label: 'Secondary School Logo' },
            { id: 'shared-logo', label: 'Shared Trust Logo' },
            { id: 'blueprint-grid', label: 'Blueprint Grid Canvas' }
          ] as const).map((item) => (
            <button
              key={item.id}
              id={`ws-asset-${item.id}`}
              onClick={() => updateOption('assetType', item.id)}
              className={`py-3 px-3 rounded-xl border text-left flex flex-col justify-between h-[80px] transition-all ${
                options.assetType === item.id
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/5'
                  : 'bg-[#121520] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Shield className={`w-4 h-4 ${options.assetType === item.id ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-[10px] font-mono opacity-60">
                  {item.id === 'blueprint-grid' ? 'SVG PATTERN' : 'LOGO'}
                </span>
              </div>
              <span className="text-xs font-semibold font-sans tracking-wide leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Division Presets */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-3">
          Quick Brand Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => selectColorPreset('primary')}
            className="flex items-center gap-2.5 p-2 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all"
          >
            <div className="w-5 h-5 rounded-md shrink-0 border border-black/10 bg-gradient-to-br from-emerald-600 to-emerald-400" />
            <span className="text-[11px] font-medium text-slate-300 truncate font-mono">Primary Green</span>
          </button>
          
          <button
            onClick={() => selectColorPreset('secondary')}
            className="flex items-center gap-2.5 p-2 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all"
          >
            <div className="w-5 h-5 rounded-md shrink-0 border border-black/10 bg-gradient-to-br from-violet-600 to-violet-400" />
            <span className="text-[11px] font-medium text-slate-300 truncate font-mono">Secondary Violet</span>
          </button>

          <button
            onClick={() => selectColorPreset('shared')}
            className="flex items-center gap-2.5 p-2 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all"
          >
            <div className="w-5 h-5 rounded-md shrink-0 border border-black/10 bg-gradient-to-br from-amber-600 to-amber-400" />
            <span className="text-[11px] font-medium text-slate-300 truncate font-mono">Shared Trust Gold</span>
          </button>

          <button
            onClick={() => selectColorPreset('blueprint')}
            className="flex items-center gap-2.5 p-2 bg-[#121520] border border-slate-800/80 rounded-xl hover:border-slate-700 hover:bg-[#151926] text-left transition-all"
          >
            <div className="w-5 h-5 rounded-md shrink-0 border border-black/10 bg-cyan-950 flex items-center justify-center text-cyan-400 font-mono text-[9px]">G</div>
            <span className="text-[11px] font-medium text-slate-300 truncate font-mono">Blueprint Tech</span>
          </button>
        </div>
      </div>

      {/* Dynamic Editing Fields based on Asset Type */}
      <div className="border-t border-slate-800/60 pt-4 space-y-4">
        {options.assetType === 'primary-logo' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                Emerald Start
              </label>
              <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                <input
                  type="color"
                  value={options.primaryColorStart}
                  onChange={(e) => updateOption('primaryColorStart', e.target.value)}
                  className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                />
                <input
                  type="text"
                  value={options.primaryColorStart}
                  onChange={(e) => updateOption('primaryColorStart', e.target.value)}
                  className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                Emerald End
              </label>
              <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                <input
                  type="color"
                  value={options.primaryColorEnd}
                  onChange={(e) => updateOption('primaryColorEnd', e.target.value)}
                  className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                />
                <input
                  type="text"
                  value={options.primaryColorEnd}
                  onChange={(e) => updateOption('primaryColorEnd', e.target.value)}
                  className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {options.assetType === 'secondary-logo' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                Violet Start
              </label>
              <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                <input
                  type="color"
                  value={options.secondaryColorStart}
                  onChange={(e) => updateOption('secondaryColorStart', e.target.value)}
                  className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                />
                <input
                  type="text"
                  value={options.secondaryColorStart}
                  onChange={(e) => updateOption('secondaryColorStart', e.target.value)}
                  className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                Violet End
              </label>
              <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                <input
                  type="color"
                  value={options.secondaryColorEnd}
                  onChange={(e) => updateOption('secondaryColorEnd', e.target.value)}
                  className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                />
                <input
                  type="text"
                  value={options.secondaryColorEnd}
                  onChange={(e) => updateOption('secondaryColorEnd', e.target.value)}
                  className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {options.assetType === 'shared-logo' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                Amber Start
              </label>
              <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                <input
                  type="color"
                  value={options.sharedColorStart}
                  onChange={(e) => updateOption('sharedColorStart', e.target.value)}
                  className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                />
                <input
                  type="text"
                  value={options.sharedColorStart}
                  onChange={(e) => updateOption('sharedColorStart', e.target.value)}
                  className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                Amber End
              </label>
              <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                <input
                  type="color"
                  value={options.sharedColorEnd}
                  onChange={(e) => updateOption('sharedColorEnd', e.target.value)}
                  className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                />
                <input
                  type="text"
                  value={options.sharedColorEnd}
                  onChange={(e) => updateOption('sharedColorEnd', e.target.value)}
                  className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {options.assetType === 'blueprint-grid' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                  Line Color
                </label>
                <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                  <input
                    type="color"
                    value={options.blueprintColor}
                    onChange={(e) => updateOption('blueprintColor', e.target.value)}
                    className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={options.blueprintColor}
                    onChange={(e) => updateOption('blueprintColor', e.target.value)}
                    className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                  Background
                </label>
                <div className="flex gap-2 bg-[#121520] border border-slate-800/80 rounded-xl p-2.5 items-center">
                  <input
                    type="color"
                    value={options.blueprintBgColor}
                    onChange={(e) => updateOption('blueprintBgColor', e.target.value)}
                    className="w-6 h-6 rounded-md cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={options.blueprintBgColor}
                    onChange={(e) => updateOption('blueprintBgColor', e.target.value)}
                    className="bg-transparent text-xs text-slate-300 w-full outline-none font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="font-semibold text-slate-400 uppercase tracking-wider">Blueprint Grid Size</span>
                <span className="text-emerald-400 font-bold">{options.blueprintGridSize}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={options.blueprintGridSize}
                onChange={(e) => updateOption('blueprintGridSize', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </>
        )}

        {options.assetType !== 'blueprint-grid' && (
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider">Badge Scale</span>
              <span className="text-emerald-400 font-bold">{Math.round(options.badgeScale * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={options.badgeScale}
              onChange={(e) => updateOption('badgeScale', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
          Cloudinary Targets
        </span>
        <p className="text-[11px] font-sans text-slate-300 leading-relaxed font-mono">
          {options.assetType === 'primary-logo' && 'Whitestone/logo/primary_logo.png'}
          {options.assetType === 'secondary-logo' && 'Whitestone/logo/secondary_logo.png'}
          {options.assetType === 'shared-logo' && 'Whitestone/logo/shared_logo.png'}
          {options.assetType === 'blueprint-grid' && 'Whitestone/website/blueprint_grid.svg'}
        </p>
      </div>
    </div>
  );
}
