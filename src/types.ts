export type AssetTab = 'logo' | 'pattern' | 'appicon' | 'avatar' | 'whitestone';

export interface WhitestoneOptions {
  assetType: 'primary-logo' | 'secondary-logo' | 'shared-logo' | 'blueprint-grid';
  primaryColorStart: string;
  primaryColorEnd: string;
  secondaryColorStart: string;
  secondaryColorEnd: string;
  sharedColorStart: string;
  sharedColorEnd: string;
  blueprintColor: string;
  blueprintBgColor: string;
  blueprintGridSize: number;
  badgeScale: number;
}

export interface LogoOptions {
  type: 'infinity' | 'hexagon' | 'vortex' | 'waveform' | 'triquetra' | 'chevron';
  colorStart: string;
  colorEnd: string;
  strokeWidth: number;
  glow: boolean;
  animate: boolean;
  rotationSpeed: number;
}

export interface PatternOptions {
  type: 'grid' | 'blueprint' | 'dots' | 'waves' | 'isometric' | 'lines';
  bgColor: string;
  patternColor: string;
  size: number;
  opacity: number;
  thickness: number;
}

export interface AppIconOptions {
  shape: 'squircle' | 'round' | 'hexagon' | 'shield' | 'smooth-square';
  bgType: 'gradient' | 'solid';
  bgColorStart: string;
  bgColorEnd: string;
  iconName: string; // lucide icon name
  iconColor: string;
  iconSize: number;
  glow: boolean;
  border: boolean;
  borderColor: string;
}

export interface AvatarOptions {
  style: 'pixel' | 'monogram' | 'geometric' | 'silhouette';
  bgColor: string;
  primaryColor: string;
  secondaryColor: string;
  seed: string;
  text: string;
  borderType: 'none' | 'thin' | 'double';
}

export type MockupType = 'mobile' | 'browser' | 'swag' | 'badge';
