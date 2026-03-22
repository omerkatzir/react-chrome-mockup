import { dims } from './chrome-tokens';
import ChromeTabStrip from './ChromeTabStrip';
import ChromeVerticalTabStrip from './ChromeVerticalTabStrip';
import ChromeToolbar from './ChromeToolbar';
import ChromeBookmarkBar from './ChromeBookmarkBar';
import ChromeSidePanel from './ChromeSidePanel';

// The toolbar height = button height + interior margin * 2
const TOOLBAR_HEIGHT = dims.toolbarButtonHeight + dims.toolbarInteriorMarginV * 2;

export default function ChromeWindow({
  tabs, activeTabId, theme, url, children,
  width = 1280, height = 800, platform = 'mac',
  onTabClick, onTabClose, onNewTab,
  sidePanel = false, sidePanelContent, sidePanelTitle, onSidePanelClose,
  showBookmarkBar = false, bookmarks = [],
  verticalTabs = false, verticalTabsCollapsed = false, onToggleVerticalCollapse,
}) {
  const isMac = platform === 'mac';

  // When vertical tabs are COLLAPSED, the toolbar spans full width across the top
  // and the sidebar starts BELOW the toolbar (top_offset = toolbar_height).
  // This matches BrowserViewTabbedLayoutImpl::GetCollapsedVerticalTabStripRelativeTop:
  //   return max(leading_exclusion_height, provisional_toolbar_height)
  // When expanded, the sidebar and toolbar are side-by-side (top_offset = 0).
  const verticalCollapsed = verticalTabs && verticalTabsCollapsed;
  const verticalExpanded = verticalTabs && !verticalTabsCollapsed;

  if (verticalExpanded) {
    // EXPANDED: sidebar and main column side-by-side, both from y=0
    // sidebar.top_container height aligns with toolbar height
    return (
      <div style={{
        width, height,
        borderRadius: isMac ? 26 : 8,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'row',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        fontSize: 13,
      }}>
        <ChromeVerticalTabStrip
          tabs={tabs} activeTabId={activeTabId} theme={theme}
          platform={platform}
          onTabClick={onTabClick} onTabClose={onTabClose} onNewTab={onNewTab}
          collapsed={false} onToggleCollapse={onToggleVerticalCollapse}
          toolbarHeight={TOOLBAR_HEIGHT}
        />
        {/* Main column with rounded top-left corner (CustomFloatingCorner) */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
          borderTopLeftRadius: 8, overflow: 'hidden',
        }}>
          <ChromeToolbar url={url} theme={theme} platform={platform} verticalTabs />
          {showBookmarkBar && <ChromeBookmarkBar bookmarks={bookmarks} theme={theme} />}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: theme.toolbar }}>
            <div style={{
              flex: 1, background: '#FFFFFF', overflow: 'auto',
              borderTop: `1px solid ${theme.separator}`,
              ...(sidePanel ? { borderRight: `1px solid ${theme.separator}`, borderTopRightRadius: 8 } : {}),
            }}>
              {children}
            </div>
            {sidePanel && (
              <ChromeSidePanel title={sidePanelTitle} theme={theme} onClose={onSidePanelClose}>
                {sidePanelContent}
              </ChromeSidePanel>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (verticalCollapsed) {
    // COLLAPSED: toolbar spans full width at top (with traffic lights/caption buttons).
    // Sidebar sits BELOW the toolbar, offset by toolbar height.
    // matches: vertical_tab_strip_bounds.y = visual_client_area.y + top_offset
    return (
      <div style={{
        width, height,
        borderRadius: isMac ? 26 : 8,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        fontSize: 13,
      }}>
        {/* Top row: traffic lights in the tab strip area + toolbar, spanning full width */}
        <div style={{
          display: 'flex', alignItems: 'stretch',
          background: theme.tabStripBg,
          flexShrink: 0,
        }}>
          {/* Traffic lights / caption area at leading edge */}
          {isMac && (
            <div style={{
              width: dims.verticalTabStripCollapsedWidth,
              display: 'flex', alignItems: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                paddingLeft: 12,
              }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((color, i) => (
                  <div key={i} className="traffic-light" style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: color, cursor: 'pointer',
                  }} />
                ))}
              </div>
            </div>
          )}
          <div style={{
            flex: 1,
            borderTopLeftRadius: 8, overflow: 'hidden',
          }}>
            <ChromeToolbar url={url} theme={theme} platform={platform} verticalTabs />
          </div>
        </div>

        {showBookmarkBar && <ChromeBookmarkBar bookmarks={bookmarks} theme={theme} />}

        {/* Below toolbar: collapsed sidebar + content side-by-side */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <ChromeVerticalTabStrip
            tabs={tabs} activeTabId={activeTabId} theme={theme}
            platform={platform}
            onTabClick={onTabClick} onTabClose={onTabClose} onNewTab={onNewTab}
            collapsed onToggleCollapse={onToggleVerticalCollapse}
            toolbarHeight={0}
          />
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: theme.toolbar }}>
            <div style={{
              flex: 1, background: '#FFFFFF', overflow: 'auto',
              borderTop: `1px solid ${theme.separator}`,
              ...(sidePanel ? { borderRight: `1px solid ${theme.separator}`, borderTopRightRadius: 8 } : {}),
            }}>
              {children}
            </div>
            {sidePanel && (
              <ChromeSidePanel title={sidePanelTitle} theme={theme} onClose={onSidePanelClose}>
                {sidePanelContent}
              </ChromeSidePanel>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: horizontal tab strip mode
  return (
    <div style={{
      width, height,
      borderRadius: isMac ? 26 : 8,
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
        <ChromeToolbar url={url} theme={theme} platform={platform} />
      </div>
      {showBookmarkBar && <ChromeBookmarkBar bookmarks={bookmarks} theme={theme} />}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: theme.toolbar }}>
        <div style={{
          flex: 1, background: '#FFFFFF', overflow: 'auto',
          borderTop: `1px solid ${theme.separator}`,
          ...(sidePanel ? { borderRight: `1px solid ${theme.separator}`, borderTopRightRadius: 8 } : {}),
        }}>
          {children}
        </div>
        {sidePanel && (
          <ChromeSidePanel title={sidePanelTitle} theme={theme} onClose={onSidePanelClose}>
            {sidePanelContent}
          </ChromeSidePanel>
        )}
      </div>
    </div>
  );
}
