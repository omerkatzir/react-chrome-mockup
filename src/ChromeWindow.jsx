import { dims } from './chrome-tokens';
import ChromeTabStrip from './ChromeTabStrip';
import ChromeToolbar from './ChromeToolbar';

export default function ChromeWindow({
  tabs, activeTabId, theme, url, children,
  width = 1280, height = 800, platform = 'mac',
  onTabClick, onTabClose, onNewTab,
}) {
  return (
    <div style={{
      width, height,
      borderRadius: platform === 'mac' ? 26 : 8,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: 13,
    }}>
      <ChromeTabStrip
        tabs={tabs} activeTabId={activeTabId} theme={theme}
        onTabClick={onTabClick} onTabClose={onTabClose} onNewTab={onNewTab}
        platform={platform}
      />

      <div style={{ marginTop: -dims.tabstripToolbarOverlap }}>
        <ChromeToolbar url={url} theme={theme} />
      </div>

      <div style={{ height: 1, background: theme.separator, flexShrink: 0 }} />

      <div style={{ flex: 1, background: '#FFFFFF', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
