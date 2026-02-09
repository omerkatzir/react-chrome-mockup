import { useState, useMemo } from 'react';
import ChromeWindow from './ChromeWindow';
import { createChromeTheme } from './chrome-tokens';
import './App.css';

const DEMO_TABS = [
  { id: 1, title: 'Google', favicon: 'https://www.google.com/favicon.ico' },
  { id: 2, title: 'New Tab' },
  { id: 3, title: 'Chromium Design Docs — Very Long Title That Should Truncate Nicely' },
];

const VARIANTS = ['tonalSpot', 'neutral', 'vibrant', 'expressive', 'content'];

function Divider({ isDark }) {
  return <div className="ctrl-divider" style={{ background: isDark ? '#444' : '#ccc' }} />;
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [platform, setPlatform] = useState('mac');
  const [tabs, setTabs] = useState(DEMO_TABS);
  const [activeTab, setActiveTab] = useState(1);
  const [nextId, setNextId] = useState(4);
  const [themeMode, setThemeMode] = useState('baseline');
  const [seedColor, setSeedColor] = useState('#4285F4');
  const [variant, setVariant] = useState('tonalSpot');

  const theme = useMemo(
    () => createChromeTheme({ mode: themeMode, seedColor, variant, isDark }),
    [themeMode, seedColor, variant, isDark],
  );

  const fg = isDark ? '#E8EAED' : '#202124';
  const fgDim = isDark ? '#9AA0A6' : '#5F6368';
  const panelBg = isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(255, 255, 255, 0.6)';

  function handleNewTab() {
    const id = nextId;
    setNextId(id + 1);
    setTabs([...tabs, { id, title: 'New Tab' }]);
    setActiveTab(id);
  }

  function handleCloseTab(id) {
    const remaining = tabs.filter((t) => t.id !== id);
    if (remaining.length === 0) return;
    setTabs(remaining);
    if (activeTab === id) setActiveTab(remaining.at(-1).id);
  }

  const accent = (on) => ({
    background: on ? theme.accent : 'transparent',
    color: on ? (isDark ? '#202124' : '#fff') : fg,
    border: on ? 'none' : `1px solid ${isDark ? '#555' : '#ccc'}`,
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? '#1a1a1a' : '#e8e8e8',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 20, padding: 40,
    }}>
      {/* Controls */}
      <div className="controls-panel" style={{ background: panelBg, color: fg }}>
        {/* Mode selector */}
        {['baseline', 'seed', 'grayscale'].map((m) => (
          <button key={m} className="ctrl-btn" onClick={() => setThemeMode(m)}
            style={accent(themeMode === m)}>
            {m[0].toUpperCase() + m.slice(1)}
          </button>
        ))}

        {themeMode === 'seed' && (
          <>
            <Divider isDark={isDark} />
            <label className="ctrl-label" style={{ color: fgDim }}>
              Seed
              <input type="color" value={seedColor} className="ctrl-color-input"
                onChange={(e) => setSeedColor(e.target.value)} />
            </label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)}
              className="ctrl-select" style={{
                background: isDark ? '#333' : '#fff',
                color: fg, border: `1px solid ${isDark ? '#555' : '#ccc'}`,
              }}>
              {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </>
        )}

        <Divider isDark={isDark} />

        <button className="ctrl-btn" onClick={() => setIsDark(!isDark)}
          style={{ background: isDark ? '#333' : '#f0f0f0', color: fg, border: 'none' }}>
          {isDark ? 'Light' : 'Dark'}
        </button>

        <button className="ctrl-btn" onClick={() => setPlatform(p => p === 'mac' ? 'windows' : 'mac')}
          style={{ background: isDark ? '#333' : '#f0f0f0', color: fg, border: 'none' }}>
          {platform === 'mac' ? 'Windows' : 'macOS'}
        </button>
      </div>

      {/* Chrome window mockup */}
      <ChromeWindow
        tabs={tabs} activeTabId={activeTab} theme={theme}
        url="https://www.google.com" platform={platform}
        onTabClick={setActiveTab} onTabClose={handleCloseTab} onNewTab={handleNewTab}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', color: '#999', fontFamily: 'system-ui',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, color: '#bbb', marginBottom: 12 }}>Your UI Here</div>
            <div style={{ fontSize: 14 }}>Web content viewport</div>
          </div>
        </div>
      </ChromeWindow>
    </div>
  );
}
