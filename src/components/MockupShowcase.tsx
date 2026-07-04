import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Laptop, Shirt, Contact, ShieldCheck, Wifi, Battery, Sparkles } from 'lucide-react';
import { MockupType, AssetTab } from '../types';

interface MockupShowcaseProps {
  activeTab: AssetTab;
  logoSVG: string;
  patternStyle: { backgroundImage: string; backgroundColor: string; backgroundSize: string };
  appIconSVG: string;
  avatarSVG: string;
  whitestoneSVG?: string;
  mockupType: MockupType;
  setMockupType: (type: MockupType) => void;
  primaryColor: string;
}

export default function MockupShowcase({
  activeTab,
  logoSVG,
  patternStyle,
  appIconSVG,
  avatarSVG,
  whitestoneSVG = '',
  mockupType,
  setMockupType,
  primaryColor,
}: MockupShowcaseProps) {
  // Safe HTML embed for inline raw SVGs
  const renderSVGInline = (rawSvg: string) => {
    return <div className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: rawSvg }} />;
  };

  return (
    <div className="flex flex-col h-full bg-[#090b11] border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Mockup Header Selector */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#0d0f17]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <h2 className="text-xs font-semibold text-slate-300 tracking-wider uppercase font-mono">Live Stage Preview</h2>
        </div>
        <div className="flex bg-[#141824] p-1 rounded-xl border border-slate-800/60">
          {(['mobile', 'browser', 'swag', 'badge'] as MockupType[]).map((type) => {
            const isSelected = mockupType === type;
            const getIcon = () => {
              switch (type) {
                case 'mobile': return <Smartphone className="w-3.5 h-3.5" />;
                case 'browser': return <Laptop className="w-3.5 h-3.5" />;
                case 'swag': return <Shirt className="w-3.5 h-3.5" />;
                case 'badge': return <Contact className="w-3.5 h-3.5" />;
              }
            };
            return (
              <button
                key={type}
                id={`mockup-tab-${type}`}
                onClick={() => setMockupType(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  isSelected
                    ? 'bg-slate-700 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {getIcon()}
                <span className="capitalize hidden md:inline">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#08090d] overflow-y-auto relative min-h-[420px]">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#121520_1px,transparent_1px),linear-gradient(to_bottom,#121520_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

        <AnimatePresence mode="wait">
          <motion.div
            key={mockupType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full flex items-center justify-center z-10"
          >
            {/* 1. MOBILE PHONE MOCKUP */}
            {mockupType === 'mobile' && (
              <div className="relative w-[280px] h-[520px] bg-slate-950 rounded-[44px] p-3 shadow-2xl shadow-black/80 border-4 border-slate-800">
                {/* Dynamic Camera Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-4 border border-slate-800" />
                </div>
                
                {/* Screen Container */}
                <div className="w-full h-full rounded-[34px] bg-[#0c0d12] overflow-hidden relative flex flex-col select-none">
                  {/* Lock/Status Bar */}
                  <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-mono text-slate-400 z-30 font-medium">
                    <span>13:37</span>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-slate-400" />
                      <Battery className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Dynamic Mobile View based on activeTab */}
                  {activeTab === 'appicon' ? (
                    /* App icon dock preview */
                    <div className="flex-1 flex flex-col justify-end p-5 pb-8 relative bg-gradient-to-b from-slate-900/40 to-slate-950">
                      {/* Grid of other dummy apps */}
                      <div className="grid grid-cols-4 gap-y-6 gap-x-4 mb-auto pt-10">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div key={i} className="flex flex-col items-center gap-1.5 opacity-35">
                            <div className="w-11 h-11 rounded-[10px] bg-slate-800 border border-slate-700/50" />
                            <div className="w-8 h-1.5 bg-slate-700 rounded-sm" />
                          </div>
                        ))}
                        {/* Our App Icon in the center of the grid */}
                        <motion.div
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ repeat: Infinity, duration: 4 }}
                          className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        >
                          <div className="w-12 h-12 shadow-lg shadow-black/50">
                            {renderSVGInline(appIconSVG)}
                          </div>
                          <span className="text-[9px] text-indigo-400 font-mono font-semibold tracking-wider uppercase animate-pulse">My App</span>
                        </motion.div>
                      </div>

                      {/* Dock with dummy icons and our App Icon */}
                      <div className="bg-slate-900/60 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800/50 grid grid-cols-4 gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800/50 opacity-40" />
                        <div className="w-10 h-10 rounded-xl bg-slate-800/50 opacity-40" />
                        {/* App Icon in dock */}
                        <div className="w-10 h-10">
                          {renderSVGInline(appIconSVG)}
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-800/50 opacity-40" />
                      </div>
                    </div>
                  ) : activeTab === 'logo' || activeTab === 'whitestone' ? (
                    /* Splash Screen Frame */
                    <div className="flex-1 flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
                      <div className="w-12 h-12 rounded-xl border border-slate-800/50 bg-slate-900/40 flex items-center justify-center opacity-50">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="w-28 h-28 flex items-center justify-center">
                        {renderSVGInline(activeTab === 'whitestone' ? whitestoneSVG : logoSVG)}
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">powered by</span>
                        <span className="text-[11px] text-slate-300 font-semibold tracking-wider font-mono">CREATIVE STUDIO</span>
                      </div>
                    </div>
                  ) : activeTab === 'pattern' ? (
                    /* Lock Screen Wall paper Preview */
                    <div style={patternStyle} className="flex-1 flex flex-col items-center justify-start pt-14 px-6 relative">
                      {/* Vignette cover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-transparent to-[#090b11]/80 pointer-events-none" />
                      <div className="z-10 flex flex-col items-center text-center mt-6">
                        <span className="text-4xl font-light text-white font-sans tracking-tight">13:37</span>
                        <span className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold mt-1 bg-black/30 px-3 py-0.5 rounded-full backdrop-blur-sm">
                          Saturday, July 4
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Avatar Lockscreen preview */
                    <div className="flex-1 flex flex-col items-center justify-center px-6 relative bg-gradient-to-b from-[#131522] to-[#0c0d12]">
                      <div className="w-28 h-28 p-1 bg-slate-800/40 border-2 border-slate-700/60 rounded-[28px] shadow-xl shadow-black/40 mb-4">
                        {renderSVGInline(avatarSVG)}
                      </div>
                      <span className="text-base font-semibold text-slate-200">Welcome Back</span>
                      <span className="text-xs text-indigo-400 font-mono mt-1">lordkign1@gmail.com</span>
                      
                      <div className="mt-8 bg-slate-900/60 border border-slate-800/60 rounded-xl px-4 py-2.5 text-[11px] text-slate-400 font-mono text-center max-w-[180px]">
                        Scan fingerprint or swipe up to login
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. SAAS WEB BROWSER FRAME MOCKUP */}
            {mockupType === 'browser' && (
              <div className="w-full max-w-[560px] bg-[#0c0e16] border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col">
                {/* Browser Titlebar */}
                <div className="flex items-center px-4 py-3 bg-[#0d101d] border-b border-slate-800/60 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  
                  {/* Mock Address Bar */}
                  <div className="flex-1 max-w-[320px] mx-auto bg-[#141828] border border-slate-800/50 rounded-lg py-1 px-3 text-[10px] text-slate-400 font-mono text-center truncate">
                    {activeTab === 'whitestone' ? 'https://whitestone.edu/portal' : 'https://my-saas-platform.com'}
                  </div>
                </div>

                {/* Browser Page Body */}
                <div className="h-[280px] bg-[#07080d] flex flex-col relative overflow-hidden select-none">
                  {/* Navbar */}
                  <div className="flex items-center justify-between px-6 py-3 bg-[#0c0e18]/80 border-b border-slate-800/30 z-20 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        {renderSVGInline(activeTab === 'logo' ? logoSVG : activeTab === 'appicon' ? appIconSVG : activeTab === 'whitestone' ? whitestoneSVG : logoSVG)}
                      </div>
                      <span className="text-[11px] font-bold text-white tracking-wide uppercase font-mono">
                        {activeTab === 'whitestone' ? 'WHITESTONE' : 'BrandOS'}
                      </span>
                    </div>
                    <div className="flex gap-4 text-[10px] text-slate-400 font-mono">
                      <span>{activeTab === 'whitestone' ? 'Admissions' : 'Products'}</span>
                      <span>{activeTab === 'whitestone' ? 'Academics' : 'Pricing'}</span>
                      <span className="text-white font-semibold">{activeTab === 'whitestone' ? 'CMS Portal' : 'Docs'}</span>
                    </div>
                  </div>

                  {/* Hero Container with Pattern/Logo */}
                  <div className="flex-1 flex items-center p-6 relative">
                    {/* Pattern Background overlay */}
                    {activeTab === 'pattern' ? (
                      <div style={patternStyle} className="absolute inset-0 z-0 transition-all opacity-80" />
                    ) : activeTab === 'whitestone' && whitestoneSVG.includes('blueprint-grid') ? (
                      <div className="absolute inset-0 z-0 transition-all opacity-40 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover" dangerouslySetInnerHTML={{ __html: whitestoneSVG }} />
                    ) : (
                      <div className="absolute inset-0 z-0 transition-all bg-[#07080d]" />
                    )}
                    {/* Linear fade layout */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-[#07080d]/90 to-[#07080d]/40 pointer-events-none z-0" />

                    {/* Content text */}
                    <div className="z-10 max-w-[280px] flex flex-col">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-[9px] text-emerald-400 font-mono font-medium mb-3 self-start">
                        <Sparkles className="w-3 h-3 animate-pulse" />
                        {activeTab === 'whitestone' ? 'Education Excellence' : 'Next-gen Architecture'}
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight font-sans tracking-tight">
                        {activeTab === 'whitestone' ? 'Shaping leaders of tomorrow, today.' : 'Powering high-fidelity developer workflows.'}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-2 font-mono leading-relaxed">
                        {activeTab === 'whitestone' 
                          ? 'Empowering students across Primary & Secondary divisions with high-caliber technology curriculum.' 
                          : 'Deploy microservices instantly with auto-scaling container configurations.'}
                      </p>
                      
                      <div className="flex gap-2.5 mt-4">
                        <div className="px-3 py-1.5 bg-emerald-600 rounded-lg text-[9px] font-semibold text-white">
                          {activeTab === 'whitestone' ? 'Admissions Portal' : 'Start Building'}
                        </div>
                        <div className="px-3 py-1.5 bg-slate-800/80 border border-slate-700/60 rounded-lg text-[9px] font-semibold text-slate-300">
                          {activeTab === 'whitestone' ? 'Learn More' : 'Live Demo'}
                        </div>
                      </div>
                    </div>

                    {/* Secondary Visual Asset Preview inside Web Frame */}
                    {activeTab !== 'pattern' && !(activeTab === 'whitestone' && whitestoneSVG.includes('blueprint-grid')) && (
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center z-10 p-2 bg-slate-900/30 border border-slate-800/40 rounded-xl backdrop-blur-sm shadow-xl">
                        {renderSVGInline(activeTab === 'logo' ? logoSVG : activeTab === 'appicon' ? appIconSVG : activeTab === 'whitestone' ? whitestoneSVG : avatarSVG)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. STREETWEAR T-SHIRT SWAG MOCKUP */}
            {mockupType === 'swag' && (
              <div className="relative w-[340px] h-[340px] flex items-center justify-center">
                {/* Vector Minimal T-Shirt Silhouette Outline */}
                <svg className="absolute inset-0 w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 50,15 
                           C 45,15 42,17 38,18 
                           L 25,23 
                           C 22,24 20,27 20,30 
                           L 22,46 
                           C 22.5,49 26,48 27,45 
                           L 31,34 
                           L 31,85 
                           C 31,88 33,90 36,90 
                           L 64,90 
                           C 67,90 69,88 69,85 
                           L 69,34 
                           L 73,45 
                           C 74,48 77.5,49 78,46 
                           L 80,30 
                           C 80,27 78,24 75,23 
                           L 62,18 
                           C 58,17 55,15 50,15 Z" 
                        fill="#0b0d14" 
                        stroke="#1a1e2e" 
                        stroke-width="1.2" 
                  />
                  {/* Neck Ribbing */}
                  <path d="M 38,18 C 42,22 58,22 62,18" fill="none" stroke="#252b41" stroke-width="1.8" />
                </svg>

                {/* Print Placement Area on T-Shirt Chest */}
                <div className="absolute top-[28%] w-[68px] h-[68px] flex items-center justify-center z-20 pointer-events-none p-1">
                  <motion.div
                    animate={{ scale: [0.98, 1, 0.98] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  >
                    {renderSVGInline(activeTab === 'logo' ? logoSVG : activeTab === 'appicon' ? appIconSVG : activeTab === 'whitestone' ? whitestoneSVG : avatarSVG)}
                  </motion.div>
                </div>

                {/* T-Shirt Shadow overlays for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 rounded-full pointer-events-none" />
                <span className="absolute bottom-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  {activeTab === 'whitestone' ? 'School Uniform Swag' : 'Minimalist Tee Mockup'}
                </span>
              </div>
            )}

            {/* 4. DEVELOPER ID ACCESS BADGE MOCKUP */}
            {mockupType === 'badge' && (
              <div className="w-[230px] h-[370px] bg-slate-900 border-2 border-slate-700/60 rounded-2xl flex flex-col shadow-2xl shadow-black/90 overflow-hidden relative select-none">
                {/* Lanyard Cutout Slot */}
                <div className="h-6 bg-slate-950 flex items-center justify-center border-b border-slate-800">
                  <div className="w-10 h-2 bg-slate-900 border border-slate-800 rounded-full" />
                </div>

                {/* Corporate Banner Stripe */}
                <div className="h-14 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800/80 flex items-center justify-between px-4 relative">
                  <div className="w-4 h-4">
                    {renderSVGInline(activeTab === 'whitestone' ? whitestoneSVG : logoSVG)}
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 font-mono tracking-widest">
                    {activeTab === 'whitestone' ? 'WHITESTONE' : 'TECH ALLY'}
                  </span>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse border border-emerald-400/20" />
                </div>

                {/* Badge Card Contents */}
                <div className="flex-1 bg-[#0c0e16] p-4 flex flex-col items-center justify-between relative">
                  {/* Subtle Grid overlay on badge */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:10px_10px] opacity-20 pointer-events-none" />

                  {/* Profile Avatar Frame or Large Whitestone Logo */}
                  {activeTab === 'whitestone' ? (
                    <div className="w-28 h-28 flex items-center justify-center z-10 scale-105">
                      {renderSVGInline(whitestoneSVG)}
                    </div>
                  ) : (
                    <div className="w-24 h-24 p-1 rounded-[20px] bg-slate-950/80 border border-slate-800 shadow-md z-10">
                      {renderSVGInline(avatarSVG)}
                    </div>
                  )}

                  {/* User Credentials */}
                  <div className="text-center z-10 flex flex-col items-center mt-3">
                    <span className="text-xs font-bold text-white tracking-wide font-mono uppercase">
                      {activeTab === 'whitestone' ? 'DIVISION TRUSTEE' : 'lordkign1'}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5 tracking-wider uppercase">
                      {activeTab === 'whitestone' ? 'trustee@whitestone.edu' : 'lordkign1@gmail.com'}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-widest mt-2 uppercase px-2.5 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-400/15">
                      {activeTab === 'whitestone' ? 'Honor Board' : 'Lead Architect'}
                    </span>
                  </div>

                  {/* Security Clearance Details */}
                  <div className="w-full flex items-center justify-between border-t border-slate-800/60 pt-3 mt-4">
                    <div className="flex flex-col text-left">
                      <span className="text-[7px] text-slate-500 font-mono uppercase">Clearance</span>
                      <span className="text-[9px] font-bold text-emerald-400 font-mono uppercase">Level 5</span>
                    </div>
                    {/* Simulated Barcode */}
                    <div className="flex gap-[1.5px] items-stretch h-6 opacity-85">
                      <div className="w-[1.5px] bg-slate-400" />
                      <div className="w-[3px] bg-slate-400" />
                      <div className="w-[1px] bg-slate-400" />
                      <div className="w-[1.5px] bg-slate-400" />
                      <div className="w-[4px] bg-slate-400" />
                      <div className="w-[1.5px] bg-slate-400" />
                      <div className="w-[2px] bg-slate-400" />
                      <div className="w-[1px] bg-slate-400" />
                      <div className="w-[3px] bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mockup Quick Footer Info */}
      <div className="px-6 py-3.5 bg-[#0d0f17]/90 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span>Current Context: <strong className="text-indigo-400 capitalize">{activeTab}</strong></span>
        <span>Resolution: <strong>Responsive Vector (SVG)</strong></span>
      </div>
    </div>
  );
}
