import { dims } from './chrome-tokens';
import ChromeTab from './ChromeTab';

function NewTabButton({ theme, onClick }) {
  return (
    <div
      onClick={onClick}
      className="tab-strip-btn"
      style={{
        width: 28, height: 28, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, alignSelf: 'center',
        marginLeft: dims.tabOverlap - (dims.tabBottomCornerRadius - dims.tabStripPadding),
      }}
    >
      {/* vector_icons::kAddIcon (CANVAS 16) */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill={theme.toolbarIcon}>
        <path d="M13 7.2H8.8V3H7.2v4.2H3v1.7h4.2V13h1.7V8.8H13V7.2Z" />
      </svg>
    </div>
  );
}

function TabSearchButton({ theme, platform }) {
  return (
    <div
      className="tab-strip-btn"
      style={{
        width: 28, height: 28, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, alignSelf: 'center',
        marginRight: platform === 'mac' ? 4 : 0,
        marginLeft: platform === 'mac' ? 0 : 4,
        background: theme.headerContainerBg,
      }}
    >
      {/* caret_down.icon (CANVAS 16) */}
      <svg width="14" height="14" viewBox="0 0 16 16"
        fill="none" stroke={theme.toolbarIcon} strokeWidth="1.765"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6l4 4 4-4" />
      </svg>
    </div>
  );
}

// macOS Tahoe: 14px circles, 10px gap, inset 12px from left
function MacTrafficLights() {
  const colors = ['#FF5F57', '#FEBC2E', '#28C840'];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      paddingLeft: 12, flexShrink: 0, marginTop: -3, alignSelf: 'center',
    }}>
      {colors.map((color, i) => (
        <div
          key={i}
          className="traffic-light"
          style={{
            width: 14, height: 14, borderRadius: '50%',
            background: color, cursor: 'pointer', flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function WindowsCaptionButtons({ theme }) {
  const iconColor = theme.inactiveTabText;
  const btnStyle = {
    width: dims.captionButtonWidth, height: dims.captionButtonHeight,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  };

  return (
    <div style={{ display: 'flex', alignSelf: 'flex-start', flexShrink: 0 }}>
      <div style={btnStyle} className="caption-btn caption-btn-minimize">
        <svg width="10" height="1" viewBox="0 0 10 1">
          <rect width="10" height="1" fill={iconColor} />
        </svg>
      </div>
      <div style={btnStyle} className="caption-btn caption-btn-maximize">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={iconColor} strokeWidth="1">
          <rect x="0.5" y="0.5" width="9" height="9" />
        </svg>
      </div>
      <div style={btnStyle} className="caption-btn caption-btn-close">
        <svg width="10" height="10" viewBox="0 0 10 10" stroke={iconColor} strokeWidth="1">
          <line x1="0" y1="0" x2="10" y2="10" />
          <line x1="10" y1="0" x2="0" y2="10" />
        </svg>
      </div>
    </div>
  );
}

export default function ChromeTabStrip({ tabs, activeTabId, theme, onTabClick, onTabClose, onNewTab, platform = 'mac' }) {
  const isMac = platform === 'mac';

  return (
    <div style={{
      height: dims.tabStripHeight,
      background: theme.tabStripBg,
      display: 'flex', alignItems: 'flex-end',
      paddingRight: isMac ? 4 : 0,
      overflow: 'hidden',
      '--header-hover': theme.inactiveTabHover,
    }}>
      {isMac ? <MacTrafficLights /> : <TabSearchButton theme={theme} platform={platform} />}

      {tabs.map((tab, i) => (
        <ChromeTab
          key={tab.id}
          title={tab.title}
          favicon={tab.favicon}
          active={tab.id === activeTabId}
          nextIsActive={i < tabs.length - 1 && tabs[i + 1].id === activeTabId}
          theme={theme}
          width={Math.min(dims.tabStandardWidth, Math.max(dims.tabMinWidth, 240))}
          onClick={() => onTabClick?.(tab.id)}
          onClose={() => onTabClose?.(tab.id)}
        />
      ))}

      <NewTabButton theme={theme} onClick={onNewTab} />

      {/* Draggable fill area */}
      <div style={{ flex: 1, minWidth: 20, WebkitAppRegion: 'drag' }} />

      {isMac ? <TabSearchButton theme={theme} platform={platform} /> : <WindowsCaptionButtons theme={theme} />}
    </div>
  );
}
