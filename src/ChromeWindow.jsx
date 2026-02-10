import { dims } from './chrome-tokens';
import ChromeTabStrip from './ChromeTabStrip';
import ChromeToolbar from './ChromeToolbar';
import ChromeSidePanel from './ChromeSidePanel';

export default function ChromeWindow({
  tabs, activeTabId, theme, url, children,
  width = 1280, height = 800, platform = 'mac',
  onTabClick, onTabClose, onNewTab,
  sidePanel = false, sidePanelContent, sidePanelTitle, onSidePanelClose,
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

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: theme.toolbar }}>
        <div style={{
          flex: 1,
          background: '#FFFFFF',
          overflow: 'auto',
          borderTop: `1px solid ${theme.separator}`,
          ...(sidePanel ? {
            borderRight: `1px solid ${theme.separator}`,
            borderTopRightRadius: 8,
          } : {}),
        }}>
          {children}
        </div>

        {sidePanel && (
          <ChromeSidePanel
            title={sidePanelTitle} theme={theme} onClose={onSidePanelClose}>
            {sidePanelContent}
          </ChromeSidePanel>
        )}
      </div>
    </div>
  );
}
