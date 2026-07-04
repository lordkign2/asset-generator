import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Paintbrush, Grid as GridIcon, Smartphone, Contact, Download, 
  Copy, Check, Sparkles, Code, FileCode, ExternalLink, Laptop, Layers, ShieldCheck
} from 'lucide-react';

import { AssetTab, LogoOptions, PatternOptions, AppIconOptions, AvatarOptions, WhitestoneOptions, MockupType } from './types';
import { 
  generateLogoSVG, 
  generatePatternCSS, 
  generatePatternCSSStyleString, 
  generateAppIconSVG, 
  generateAvatarSVG,
  generateWhitestoneSVG
} from './utils/generators';

import LogoGenerator from './components/LogoGenerator';
import PatternGenerator from './components/PatternGenerator';
import AppIconComposer from './components/AppIconComposer';
import AvatarGenerator from './components/AvatarGenerator';
import WhitestoneGenerator from './components/WhitestoneGenerator';
import MockupShowcase from './components/MockupShowcase';

export default function App() {
  // Core Tabs State
  const [activeTab, setActiveTab] = useState<AssetTab>('logo');
  const [mockupType, setMockupType] = useState<MockupType>('browser');

  // Individual Asset Generators State
  const [logoOptions, setLogoOptions] = useState<LogoOptions>({
    type: 'infinity',
    colorStart: '#8b5cf6',
    colorEnd: '#ec4899',
    strokeWidth: 5,
    glow: true,
    animate: false,
    rotationSpeed: 12,
  });

  const [patternOptions, setPatternOptions] = useState<PatternOptions>({
    type: 'blueprint',
    bgColor: '#0b162b',
    patternColor: '#02e1f2',
    size: 40,
    opacity: 0.2,
    thickness: 1,
  });

  const [appIconOptions, setAppIconOptions] = useState<AppIconOptions>({
    shape: 'squircle',
    bgType: 'gradient',
    bgColorStart: '#7c3aed',
    bgColorEnd: '#ec4899',
    iconName: 'rocket',
    iconColor: '#ffffff',
    iconSize: 56,
    glow: true,
    border: false,
    borderColor: '#ffffff',
  });

  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>({
    style: 'pixel',
    bgColor: '#030712',
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    seed: 'matrix-core',
    text: 'MX',
    borderType: 'thin',
  });

  const [whitestoneOptions, setWhitestoneOptions] = useState<WhitestoneOptions>({
    assetType: 'primary-logo',
    primaryColorStart: '#059669',
    primaryColorEnd: '#34d399',
    secondaryColorStart: '#7c3aed',
    secondaryColorEnd: '#a78bfa',
    sharedColorStart: '#d97706',
    sharedColorEnd: '#fbbf24',
    blueprintColor: '#00f0ff',
    blueprintBgColor: '#0a0e1a',
    blueprintGridSize: 40,
    badgeScale: 1
  });

  // UI state
  const [activeCodeTab, setActiveCodeTab] = useState<'svg' | 'react' | 'tailwind'>('svg');
  const [copied, setCopied] = useState(false);

  // Auto-align mockup context depending on tab triggers for an intuitive workspace flow
  useEffect(() => {
    if (activeTab === 'appicon') {
      setMockupType('mobile');
    } else if (activeTab === 'pattern') {
      setMockupType('browser');
    } else if (activeTab === 'avatar') {
      setMockupType('badge');
    } else if (activeTab === 'whitestone') {
      setMockupType(whitestoneOptions.assetType === 'blueprint-grid' ? 'browser' : 'badge');
    } else {
      setMockupType('browser');
    }
  }, [activeTab, whitestoneOptions.assetType]);

  // Compute Active Vector Asset Strings
  const computedLogoSVG = generateLogoSVG(logoOptions);
  const computedPattern = generatePatternCSS(patternOptions);
  const computedPatternStyleStr = generatePatternCSSStyleString(patternOptions);
  const computedAppIconSVG = generateAppIconSVG(appIconOptions);
  const computedAvatarSVG = generateAvatarSVG(avatarOptions);
  const computedWhitestoneSVG = generateWhitestoneSVG(whitestoneOptions);

  // Retrieve current active SVG and filenames
  const getActiveAssetDetails = () => {
    switch (activeTab) {
      case 'logo':
        return {
          raw: computedLogoSVG,
          ext: 'svg',
          filename: `brand-logo-${logoOptions.type}.svg`,
          react: `// Copy and paste this into /components/BrandLogo.tsx
import React from 'react';

export default function BrandLogo({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: \`${computedLogoSVG.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`,
          css: `/* Tailwind Utility classes to float your brandmark logo */
<div className="w-16 h-16 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(${logoOptions.colorStart === '#ff007f' ? '255,0,127' : '139,92,246'},0.3)] transition-all hover:scale-105 duration-300">
  {/* Inject SVG inline or wrap as React component */}
</div>`
        };
      case 'pattern':
        return {
          raw: computedPatternStyleStr,
          ext: 'css',
          filename: `css-pattern-${patternOptions.type}.css`,
          react: `// Copy and paste this React component to wrap page layouts in your background patterns
import React from 'react';

export default function PatternLayout({ children }: { children: React.ReactNode }) {
  const patternStyle = {
    backgroundColor: '${patternOptions.bgColor}',
    backgroundImage: \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${patternOptions.size}' height='${patternOptions.size}'%3E%3Cpath d='M ${patternOptions.size} 0 L 0 0 0 ${patternOptions.size}' fill='none' stroke='${encodeURIComponent(patternOptions.patternColor)}' stroke-width='${patternOptions.thickness}' opacity='${patternOptions.opacity}'/%3E%3C/svg%3E")\`,
    backgroundSize: '${patternOptions.size}px ${patternOptions.size}px'
  };

  return (
    <div style={patternStyle} className="min-h-screen w-full relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}`,
          css: `${computedPatternStyleStr}

/* Paste this tailwind style directly inside index.css */
@utility custom-pattern-layer {
  background-color: ${patternOptions.bgColor};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${patternOptions.size}' height='${patternOptions.size}'%3E%3Cpath d='M ${patternOptions.size} 0 L 0 0 0 ${patternOptions.size}' fill='none' stroke='${encodeURIComponent(patternOptions.patternColor)}' stroke-width='${patternOptions.thickness}' opacity='${patternOptions.opacity}'/%3E%3C/svg%3E");
  background-size: ${patternOptions.size}px ${patternOptions.size}px;
}`
        };
      case 'appicon':
        return {
          raw: computedAppIconSVG,
          ext: 'svg',
          filename: `app-icon-${appIconOptions.shape}-${appIconOptions.iconName}.svg`,
          react: `// Copy and paste this into /components/AppIconLauncher.tsx
import React from 'react';

export default function AppIconLauncher({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: \`${computedAppIconSVG.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`,
          css: `/* Display styles for launching on SaaS dashboard docks */
<div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
  {/* Embed composed app launcher SVG */}
</div>`
        };
      case 'avatar':
        return {
          raw: computedAvatarSVG,
          ext: 'svg',
          filename: `procedural-avatar-${avatarOptions.seed}.svg`,
          react: `// Copy and paste this into /components/HashedAvatar.tsx
import React from 'react';

export default function HashedAvatar({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: \`${computedAvatarSVG.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`,
          css: `/* Responsive avatar container */
<div className="w-16 h-16 p-0.5 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 hover:border-slate-500 hover:scale-105 duration-200 shadow-md">
  {/* Embed computed hashed avatar SVG */}
</div>`
        };
      case 'whitestone':
        return {
          raw: computedWhitestoneSVG,
          ext: 'svg',
          filename: `whitestone-${whitestoneOptions.assetType}.svg`,
          react: `// Copy and paste this into your Whitestone division website or CMS components
import React from 'react';

export default function WhitestoneAsset({ className = 'w-32 h-32' }: { className?: string }) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: \`${computedWhitestoneSVG.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`,
          css: `/* Tailwind positioning styles for Whitestone brand elements */
<div className="w-32 h-32 flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(5,150,105,0.15)] transition-transform hover:scale-105">
  {/* Embed Whitestone brand asset */}
</div>`
        };
    }
  };

  const activeAsset = getActiveAssetDetails();

  // Handle copy to clipboard triggers
  const copyToClipboard = () => {
    let textToCopy = '';
    if (activeCodeTab === 'svg') textToCopy = activeAsset.raw;
    else if (activeCodeTab === 'react') textToCopy = activeAsset.react;
    else textToCopy = activeAsset.css;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Trigger real local file download utilizing Blobs
  const triggerDownload = () => {
    let content = activeAsset.raw;
    let mimeType = 'image/svg+xml';
    
    if (activeTab === 'pattern' && activeCodeTab !== 'svg') {
      content = computedPatternStyleStr;
      mimeType = 'text/css';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeAsset.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-white antialiased flex flex-col relative overflow-x-hidden">
      
      {/* Background Ambience Aura */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Global Navbar */}
      <header className="border-b border-slate-800/85 bg-[#090b11]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Layers className="w-4.5 h-4.5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide uppercase font-mono">Creative Asset Studio</h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider">Procedural SVG & Style Vector Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800/60 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Engine Online</span>
            </div>
            <a 
              href="https://ai.studio/build" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[10px] text-slate-400 hover:text-indigo-400 flex items-center gap-1.5 transition-colors font-semibold uppercase"
            >
              AI Build
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">
        
        {/* Left Side: Creative Workbench Panel (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 h-full">
          
          {/* Main Workspace Navigation (Asset Framework Tabs) */}
          <div className="bg-[#090b11] border border-slate-800/60 rounded-2xl p-4 shadow-xl">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono block mb-3 px-1">
              Select Creative Canvas
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'logo', name: 'Brand Logo', desc: 'Vector logo curves', icon: <Paintbrush className="w-4 h-4" /> },
                { id: 'pattern', name: 'CSS Pattern', desc: 'SaaS landing canvas', icon: <GridIcon className="w-4 h-4" /> },
                { id: 'appicon', name: 'App Icon', desc: 'Phone launch tiles', icon: <Smartphone className="w-4 h-4" /> },
                { id: 'avatar', name: 'Hashed Avatar', desc: 'Procedural portraits', icon: <Contact className="w-4 h-4 text-center" /> },
                { id: 'whitestone', name: 'Whitestone CMS', desc: 'Division school assets', icon: <ShieldCheck className="w-4 h-4 text-center" /> },
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                const isFullWidth = tab.id === 'whitestone';
                return (
                  <button
                    key={tab.id}
                    id={`asset-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as AssetTab)}
                    className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${
                      isFullWidth ? 'col-span-2' : ''
                    } ${
                      isSelected
                        ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono font-bold text-xs tracking-wide">
                      {tab.icon}
                      {tab.name}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 tracking-wide truncate block max-w-full">
                      {tab.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Generator Configurations */}
          <div className="bg-[#090b11] border border-slate-800/60 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-5">
              <span className="p-1.5 bg-indigo-500/10 border border-indigo-400/20 rounded-lg text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Framework Controls</h3>
                <p className="text-[9px] text-slate-500 font-mono">Tweak math equations in real-time</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {activeTab === 'logo' && (
                    <LogoGenerator options={logoOptions} setOptions={setLogoOptions} />
                  )}
                  {activeTab === 'pattern' && (
                    <PatternGenerator options={patternOptions} setOptions={setPatternOptions} />
                  )}
                  {activeTab === 'appicon' && (
                    <AppIconComposer options={appIconOptions} setOptions={setAppIconOptions} />
                  )}
                  {activeTab === 'avatar' && (
                    <AvatarGenerator options={avatarOptions} setOptions={setAvatarOptions} />
                  )}
                  {activeTab === 'whitestone' && (
                    <WhitestoneGenerator options={whitestoneOptions} setOptions={setWhitestoneOptions} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Stage & Export Drawer (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 h-full min-w-0">
          
          {/* Mockup Preview Stage */}
          <div className="flex-1">
            <MockupShowcase 
              activeTab={activeTab}
              logoSVG={computedLogoSVG}
              patternStyle={computedPattern}
              appIconSVG={computedAppIconSVG}
              avatarSVG={computedAvatarSVG}
              whitestoneSVG={computedWhitestoneSVG}
              mockupType={mockupType}
              setMockupType={setMockupType}
              primaryColor={logoOptions.colorStart}
            />
          </div>

          {/* Integration & Export drawer panel */}
          <div className="bg-[#090b11] border border-slate-800/60 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-500/10 border border-indigo-400/20 rounded-lg text-indigo-400">
                  <Code className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Integration Drawer</h3>
                  <p className="text-[9px] text-slate-500 font-mono">Paste clean code directly into your codebases</p>
                </div>
              </div>

              {/* Code Tab Selector */}
              <div className="flex bg-[#121520] p-1 rounded-xl border border-slate-800/60 self-start sm:self-center">
                {(['svg', 'react', 'tailwind'] as const).map((tab) => {
                  const isSelected = activeCodeTab === tab;
                  return (
                    <button
                      key={tab}
                      id={`code-tab-${tab}`}
                      onClick={() => setActiveCodeTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wide uppercase transition-all ${
                        isSelected
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab === 'svg' ? 'Raw SVG' : tab === 'react' ? 'React TSX' : 'Utility/CSS'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code Highlight Box */}
            <div className="relative mb-5 bg-[#050609] border border-slate-800 rounded-xl overflow-hidden group">
              {/* Copy Notification Toast overlay */}
              <AnimatePresence>
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 bg-indigo-600/95 flex items-center justify-center gap-2 z-20"
                  >
                    <ShieldCheck className="w-5 h-5 text-white" />
                    <span className="text-xs font-bold font-mono tracking-widest text-white uppercase">Code Block Copied to Clipboard!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Monospace Code Editor View */}
              <pre className="p-4 overflow-x-auto text-[11px] text-indigo-200/90 font-mono leading-relaxed select-text max-h-[160px] h-[160px]">
                <code>{activeCodeTab === 'svg' ? activeAsset.raw : activeCodeTab === 'react' ? activeAsset.react : activeAsset.css}</code>
              </pre>

              {/* Copy floating absolute button */}
              <button
                id="copy-code-btn"
                onClick={copyToClipboard}
                className="absolute top-3 right-3 p-2 bg-[#141824] hover:bg-[#1a2030] border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-all shadow-md cursor-pointer opacity-100"
                title="Copy Code to Clipboard"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Downloader triggers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="download-asset-btn"
                onClick={triggerDownload}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 font-mono font-bold tracking-wider text-xs uppercase text-white rounded-xl shadow-lg shadow-indigo-600/15 cursor-pointer active:scale-98 transition-all"
              >
                <Download className="w-4 h-4 shrink-0" />
                Download Vector SVG File
              </button>
              
              <button
                id="drawer-copy-btn"
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#121520] hover:bg-[#151a2a] border border-slate-800 hover:border-slate-700 text-slate-300 font-mono font-bold tracking-wider text-xs uppercase rounded-xl transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4 shrink-0" />
                Copy code block
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-slate-800/60 bg-[#08090d] py-6 text-center text-xs font-mono text-slate-500">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span>Creative Asset Studio © 2026</span>
          <span className="flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Vibrant Hashed Math Vectors
          </span>
        </div>
      </footer>
    </div>
  );
}
