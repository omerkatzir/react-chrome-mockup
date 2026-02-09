// Chrome Material Design Color System
// 3-layer architecture: ref_color_mixer.cc → sys_color_mixer.cc → chrome_color_mixer.cc

import {
  Hct, TonalPalette,
  SchemeContent, SchemeNeutral, SchemeVibrant, SchemeExpressive, SchemeTonalSpot,
  argbFromHex, hexFromArgb,
} from '@material/material-color-utilities';

// ── Helpers ──

function parseHex(h) {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

function toHex(r, g, b) {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function alphaBlend(fgHex, bgHex, alpha255) {
  const f = parseHex(fgHex), b = parseHex(bgHex);
  return toHex(...b.map((bv, i) => Math.round(bv + (f[i] - bv) * alpha255 / 255)));
}

function blendHex(base, overlay, alpha) {
  return alphaBlend(overlay, base, Math.round(alpha * 255));
}

function setAlpha(hex, alpha255) {
  const [r, g, b] = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${(alpha255 / 255).toFixed(3)})`;
}

// ── Layer 1: Reference Palette (hardcoded baseline = Google Blue) ──

const BASELINE_REF = {
  primary20: '#062E6F', primary40: '#0B57D0', primary80: '#A8C7FA',
  primary90: '#D3E3FD', primary95: '#ECF3FE',

  secondary15: '#002845', secondary25: '#003F66', secondary30: '#004A77',
  secondary40: '#4C6A92', secondary90: '#D3E3FD',

  tertiary40: '#7C4E7E', tertiary90: '#F6D8F7',

  neutral10: '#1F1F1F', neutral12: '#1F2020', neutral15: '#282828',
  neutral25: '#3C3C3C', neutral30: '#474747', neutral80: '#C7C7C7',
  neutral90: '#E3E3E3', neutral95: '#F1F1F1', neutral99: '#FDFCFB',
  neutral100: '#FFFFFF',

  neutralVariant30: '#444746', neutralVariant50: '#747775',
  neutralVariant80: '#C4C7C5', neutralVariant90: '#E1E3E1',

  error40: '#B3261E', error80: '#F2B8B5',
  surfaceFgLight: '#6991D6', surfaceFgDark: '#D1E1FF',
};

function buildRefFromPalettes(pri, sec, ter, neu, neuVar, surfaceFgLight, surfaceFgDark) {
  const t = (palette, tone) => hexFromArgb(palette.tone(tone));
  return {
    primary20: t(pri, 20), primary30: t(pri, 30), primary40: t(pri, 40),
    primary80: t(pri, 80), primary90: t(pri, 90), primary95: t(pri, 95),

    secondary12: t(sec, 12), secondary15: t(sec, 15), secondary25: t(sec, 25),
    secondary30: t(sec, 30), secondary40: t(sec, 40), secondary80: t(sec, 80),
    secondary90: t(sec, 90),

    tertiary40: t(ter, 40), tertiary90: t(ter, 90),

    neutral10: t(neu, 10), neutral12: t(neu, 12), neutral15: t(neu, 15),
    neutral25: t(neu, 25), neutral30: t(neu, 30), neutral80: t(neu, 80),
    neutral90: t(neu, 90), neutral94: t(neu, 94), neutral95: t(neu, 95),
    neutral98: t(neu, 98), neutral99: t(neu, 99), neutral100: t(neu, 100),

    neutralVariant30: t(neuVar, 30), neutralVariant50: t(neuVar, 50),
    neutralVariant80: t(neuVar, 80), neutralVariant90: t(neuVar, 90),

    error40: '#B3261E', error80: '#F2B8B5',
    surfaceFgLight, surfaceFgDark,
  };
}

// ── Layer 2: System Tokens ──

function resolveSystemTokens(ref, isDark, mode) {
  const isThemed = mode === 'seed';
  const isGrayscale = mode === 'grayscale';

  if (!isDark) {
    const surface = isThemed ? ref.neutral99 : ref.neutral100;
    const omniboxBg = isGrayscale
      ? ref.neutral94
      : alphaBlend(ref.surfaceFgLight, surface, 0x1E);

    return {
      sysHeader:            isThemed ? ref.secondary90 : ref.primary90,
      sysBase:              isThemed ? ref.neutral98   : ref.neutral100,
      sysOnSurface:         ref.neutral10,
      sysOnSurfaceSecondary: isThemed ? ref.secondary30 : ref.neutral30,
      sysOnHeaderDivider:   ref.primary80,
      sysStateHeaderHover:  ref.primary80,
      sysHeaderContainer:   ref.primary95,
      sysOmniboxContainer:  omniboxBg,
      sysAccent:            ref.primary40,
      sysHoverDimBlend:     setAlpha(ref.primary20, 0x2E),
      sysHoverOnSubtle:     setAlpha(ref.neutral10, 0x0F),
    };
  }

  // Dark: themed shifts Neutral→Secondary surfaces, Secondary→Primary states
  return {
    sysHeader:            isThemed ? ref.secondary12 : ref.neutral12,
    sysBase:              isThemed ? ref.secondary25 : ref.neutral25,
    sysOnSurface:         ref.neutral90,
    sysOnSurfaceSecondary: isThemed ? ref.secondary80 : ref.neutral80,
    sysOnHeaderDivider:   isThemed ? ref.secondary25 : ref.neutral25,
    sysStateHeaderHover:  isThemed ? ref.primary30   : ref.secondary30,
    sysHeaderContainer:   isThemed ? ref.secondary25 : ref.neutral25,
    sysOmniboxContainer:  isThemed ? ref.secondary15 : ref.neutral15,
    sysAccent:            ref.primary80,
    sysHoverDimBlend:     setAlpha(ref.neutral99, 0x1A),
    sysHoverOnSubtle:     setAlpha(ref.neutral99, 0x1A),
  };
}

// ── Layer 3: Chrome Theme ──

function resolveChromeTheme(sys, isDark) {
  return {
    frame:              sys.sysHeader,
    frameInactive:      isDark ? '#323232' : blendHex(sys.sysHeader, '#FFFFFF', 0.15),
    toolbar:            sys.sysBase,
    toolbarText:        sys.sysOnSurface,
    toolbarIcon:        sys.sysOnSurfaceSecondary,
    tabStripBg:         sys.sysHeader,
    activeTabBg:        sys.sysBase,
    activeTabText:      sys.sysOnSurface,
    inactiveTabText:    isDark ? '#9AA0A6' : sys.sysOnSurfaceSecondary,
    inactiveTabHover:   sys.sysStateHeaderHover,
    omniboxBg:          sys.sysOmniboxContainer,
    omniboxBgHover:     isDark ? '#44454A' : blendHex(sys.sysOmniboxContainer, '#000000', 0.04),
    omniboxText:        sys.sysOnSurface,
    omniboxTextDim:     sys.sysOnSurfaceSecondary,
    separator:          isDark ? '#3C4043' : '#DADCE0',
    tabDivider:         sys.sysOnHeaderDivider,
    accent:             sys.sysAccent,
    headerContainerBg:  sys.sysHeaderContainer,
    omniboxActionHover: sys.sysHoverDimBlend,
    toolbarBtnHover:    sys.sysHoverOnSubtle,
  };
}

// ── Palette Generators ──

const SCHEME_MAP = {
  tonalSpot: SchemeTonalSpot, neutral: SchemeNeutral,
  vibrant: SchemeVibrant, expressive: SchemeExpressive, content: SchemeContent,
};

function generateRefFromSeed(seedHex, variant = 'tonalSpot') {
  const hct = Hct.fromInt(argbFromHex(seedHex));
  const scheme = new (SCHEME_MAP[variant] || SchemeTonalSpot)(hct, false, 0.0);
  const { primaryPalette: p, secondaryPalette: s, tertiaryPalette: t,
          neutralPalette: n, neutralVariantPalette: nv } = scheme;
  return buildRefFromPalettes(p, s, t, n, nv,
    hexFromArgb(p.tone(40)), hexFromArgb(p.tone(80)));
}

function generateGrayscaleRef() {
  const n = TonalPalette.fromHct(Hct.fromInt(0xFF808080));
  return buildRefFromPalettes(n, n, n, n, n,
    hexFromArgb(n.tone(40)), hexFromArgb(n.tone(80)));
}

// ── Public API ──

/**
 * @param {'baseline'|'seed'|'grayscale'} mode
 * @param {string} [seedColor] — hex, required for mode='seed'
 * @param {string} [variant] — tonalSpot|neutral|vibrant|expressive|content
 * @param {boolean} isDark
 */
export function createChromeTheme({ mode = 'baseline', seedColor, variant = 'tonalSpot', isDark = false }) {
  const ref = mode === 'seed'      ? generateRefFromSeed(seedColor, variant)
            : mode === 'grayscale' ? generateGrayscaleRef()
            :                        BASELINE_REF;
  return resolveChromeTheme(resolveSystemTokens(ref, isDark, mode), isDark);
}

export { BASELINE_REF };
