import { dims } from './chrome-tokens';

const ICON = dims.toolbarIconSize;
const OMNI_ICON = dims.omniboxIconSize;

// Icons from Chromium's *_chrome_refresh.icon files (CANVAS 20 unless noted)

function BackIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M6.88 10.75l4.19 4.19L10 16l-6-6 6-6 1.06 1.06L6.88 9.25H16v1.5Z" />
    </svg>
  );
}

function ForwardIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M13.13 10.75H4v-1.5h9.13L8.94 5.06 10 4l6 6-6 6-1.06-1.06Z" />
    </svg>
  );
}

function ReloadIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M10 16c-1.67 0-3.08-.58-4.25-1.75C4.58 13.08 4 11.67 4 10c0-1.67.58-3.08 1.75-4.25C6.92 4.58 8.33 4 10 4c.9 0 1.74.19 2.51.56.77.38 1.43.88 1.99 1.5V4H16v5h-5V7.5h2.73a4.44 4.44 0 00-1.58-1.46A4.33 4.33 0 0010 5.5c-1.25 0-2.31.44-3.19 1.31S5.5 8.75 5.5 10c0 1.25.44 2.31 1.31 3.19C7.69 14.06 8.75 14.5 10 14.5c1.17 0 2.17-.39 3-1.16a4.43 4.43 0 001.44-2.84h1.54c-.12 1.56-.76 2.86-1.9 3.92C12.95 15.47 11.58 16 10 16Z" />
    </svg>
  );
}

function HomeIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M5.5 15.5h2v-5h5v5h2V8.25L10 4.88 5.5 8.25ZM4 17V7.5L10 3l6 4.5V17h-5v-5H9v5Z" />
    </svg>
  );
}

// page_info_chrome_refresh.icon (CANVAS 16)
function PageInfoIcon({ color }) {
  return (
    <svg width={OMNI_ICON} height={OMNI_ICON} viewBox="0 0 16 16" fill={color}>
      <path d="M11.66 13.77c-.69 0-1.28-.24-1.75-.71a2.38 2.38 0 01-.72-1.75c0-.69.24-1.28.72-1.75.48-.48 1.06-.72 1.75-.72.69 0 1.27.24 1.75.72a2.39 2.39 0 01.72 1.75c0 .69-.24 1.27-.72 1.75a2.39 2.39 0 01-1.75.71zm0-1.34c.31 0 .58-.11.8-.33a1.1 1.1 0 00.33-.8c0-.31-.11-.58-.33-.8a1.09 1.09 0 00-.8-.33c-.31 0-.58.11-.8.33a1.09 1.09 0 00-.33.8c0 .31.11.58.33.8.22.22.49.33.8.33zm-9.16-.44v-1.38h5.49v1.38zm1.83-4.83a2.38 2.38 0 01-1.75-.72 2.39 2.39 0 01-.72-1.75c0-.69.24-1.27.72-1.75a2.39 2.39 0 011.75-.71c.69 0 1.28.24 1.75.71.48.48.72 1.06.72 1.75 0 .69-.24 1.28-.72 1.75-.48.48-1.06.72-1.75.72zm0-1.34c.31 0 .58-.11.8-.33.22-.22.33-.48.33-.8 0-.31-.11-.58-.33-.8a1.1 1.1 0 00-.8-.33c-.31 0-.58.11-.8.33a1.1 1.1 0 00-.33.8c0 .31.11.58.33.8.22.22.49.33.8.33zm3.67-.44V4h5.49v1.38Z" />
    </svg>
  );
}

// star_chrome_refresh.icon (CANVAS 20), rendered at trailing icon size
function StarIcon({ color }) {
  return (
    <svg width={dims.omniboxTrailingIcon} height={dims.omniboxTrailingIcon} viewBox="0 0 20 20" fill={color}>
      <path d="M7.33 13.9 10 12.31l2.69 1.58-.71-3 2.31-1.98-3.06-.27L10 5.79 8.77 8.65l-3.06.27 2.34 1.98ZM5.06 17l1.31-5.54L2 7.73l5.75-.5L10 2l2.25 5.25 5.75.48-4.37 3.73L14.94 17 10 14.06Z" />
    </svg>
  );
}

function ExtensionsIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M4.5 17c-.41 0-.77-.15-1.06-.44A1.44 1.44 0 013 15.5V12a2.12 2.12 0 001.42-.61A1.88 1.88 0 005 10a1.88 1.88 0 00-.58-1.39A2.12 2.12 0 003 8V4.5c0-.41.15-.77.44-1.06A1.44 1.44 0 014.5 3H8c0-.56.19-1.03.58-1.42A1.93 1.93 0 0110 1c.56 0 1.03.19 1.42.58.39.39.58.86.58 1.42h3.5c.41 0 .77.15 1.06.44.29.29.44.65.44 1.06V8a1.94 1.94 0 011.42.58c.39.39.58.86.58 1.42 0 .56-.19 1.03-.58 1.42A1.94 1.94 0 0117 12v3.5c0 .41-.15.77-.44 1.06a1.44 1.44 0 01-1.06.44Zm0-1.5h11v-11h-11v2.33a3.23 3.23 0 011.47 1.28c.35.58.53 1.21.53 1.89 0 .7-.18 1.33-.53 1.91A3.12 3.12 0 014.5 13.17ZM10 10Z" />
    </svg>
  );
}

function MenuIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M10 6c.83 0 1.5-.68 1.5-1.5 0-.82-.67-1.5-1.5-1.5-.83 0-1.5.68-1.5 1.5 0 .82.67 1.5 1.5 1.5zm0 2.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 5.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5Z" />
    </svg>
  );
}

function AvatarIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color} fillRule="nonzero">
      <path d="M4.94 14.06a8.24 8.24 0 0 1 2.41-1.18A9.14 9.14 0 0 1 10 12.5c.92 0 1.8.13 2.66.39a8.24 8.24 0 0 1 2.41 1.18 5.78 5.78 0 0 0 1.08-1.89A6.64 6.64 0 0 0 16.5 10c0-1.8-.63-3.34-1.9-4.6C13.33 4.13 11.8 3.5 10 3.5c-1.8 0-3.34.63-4.6 1.9C4.13 6.66 3.5 8.2 3.5 10c0 .75.12 1.47.36 2.17a5.78 5.78 0 0 0 1.08 1.9ZM10 11.5a2.9 2.9 0 0 1-2.12-.87A2.9 2.9 0 0 1 7 8.5c0-.83.29-1.54.88-2.12A2.9 2.9 0 0 1 10 5.5c.83 0 1.54.29 2.13.88.58.58.88 1.29.88 2.13 0 .83-.29 1.54-.87 2.13A2.9 2.9 0 0 1 10 11.5Zm0 6.5a7.8 7.8 0 0 1-3.11-.62 8.07 8.07 0 0 1-2.55-1.72 8.07 8.07 0 0 1-1.72-2.55A7.8 7.8 0 0 1 2 9.99c0-1.1.21-2.14.63-3.1a8.12 8.12 0 0 1 1.72-2.54c.73-.73 1.58-1.3 2.55-1.72A7.8 7.8 0 0 1 10.01 2c1.11 0 2.14.21 3.11.63a8.12 8.12 0 0 1 2.54 1.72c.73.73 1.3 1.58 1.72 2.55.42.97.63 2 .63 3.11a7.8 7.8 0 0 1-.62 3.11 8.07 8.07 0 0 1-1.72 2.55c-.73.73-1.58 1.3-2.55 1.72a7.75 7.75 0 0 1-3.1.63ZM10 16.5c.72 0 1.42-.11 2.08-.34a6.62 6.62 0 0 0 1.88-1.01 7.36 7.36 0 0 0-1.89-.85A7.31 7.31 0 0 0 10 14c-.71 0-1.4.09-2.07.28-.67.19-1.3.48-1.88.86a6.62 6.62 0 0 0 1.88 1.01c.66.23 1.36.34 2.08.34Zm0-6.5c.42 0 .77-.14 1.06-.44.29-.29.44-.64.44-1.06 0-.42-.14-.77-.44-1.06A1.44 1.44 0 0 0 10 7c-.42 0-.77.14-1.06.44A1.44 1.44 0 0 0 8.5 8.5c0 .42.14.77.44 1.06.29.29.64.44 1.06.44Z" />
    </svg>
  );
}

function OmniboxAction({ children, className, background }) {
  return (
    <div
      className={`omnibox-action ${className || ''}`}
      style={{
        width: 24, height: 24, borderRadius: dims.omniboxChildRadius,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.15s',
        background: background || 'transparent',
      }}
    >
      {children}
    </div>
  );
}

function ToolbarButton({ children, disabled, style }) {
  return (
    <div
      className="toolbar-btn"
      style={{
        width: dims.toolbarButtonHeight, height: dims.toolbarButtonHeight,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transition: 'background 0.15s',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Windows caption buttons — shown in toolbar when vertical tabs are active
function WindowsCaptionButtonsToolbar({ theme }) {
  const iconColor = theme.toolbarIcon;
  const btnStyle = {
    width: dims.captionButtonWidth, height: dims.captionButtonHeight,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  };

  return (
    <div style={{ display: 'flex', alignSelf: 'stretch', flexShrink: 0, marginRight: -dims.toolbarInteriorMarginH }}>
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

export default function ChromeToolbar({ url = 'https://www.google.com', theme, platform = 'mac', verticalTabs = false, showTrafficLights = false }) {
  const ic = theme.toolbarIcon;
  const pad = dims.toolbarElementPadding;
  const spc = dims.toolbarStandardSpacing;
  const isMac = platform === 'mac';

  return (
    <div style={{
      height: dims.toolbarButtonHeight + dims.toolbarInteriorMarginV * 2,
      background: theme.toolbar,
      display: 'flex', alignItems: 'center',
      paddingLeft: showTrafficLights ? 0 : dims.toolbarInteriorMarginH,
      paddingRight: dims.toolbarInteriorMarginH,
      '--omnibox-action-hover': theme.omniboxActionHover,
      '--toolbar-btn-hover': theme.toolbarBtnHover,
    }}>
      {/* In collapsed vertical tabs on Mac, traffic lights are inside the toolbar row */}
      {showTrafficLights && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          paddingLeft: 12, paddingRight: 8, flexShrink: 0,
        }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((color, i) => (
            <div key={i} className="traffic-light" style={{
              width: 14, height: 14, borderRadius: '50%',
              background: color, cursor: 'pointer',
            }} />
          ))}
        </div>
      )}
      <ToolbarButton disabled><BackIcon color={ic} /></ToolbarButton>
      <ToolbarButton disabled style={{ marginLeft: pad }}><ForwardIcon color={ic} /></ToolbarButton>
      <ToolbarButton style={{ marginLeft: pad }}><ReloadIcon color={ic} /></ToolbarButton>
      <ToolbarButton style={{ marginLeft: pad }}><HomeIcon color={ic} /></ToolbarButton>

      <div
        className="omnibox"
        style={{
          flex: 1, height: dims.omniboxHeight,
          borderRadius: dims.omniboxBorderRadius,
          background: theme.omniboxBg,
          display: 'flex', alignItems: 'center',
          paddingLeft: dims.omniboxLeadingEdgePadding,
          paddingRight: dims.omniboxTrailingEdgePadding,
          marginLeft: spc, marginRight: spc,
          cursor: 'text', transition: 'background 0.15s',
        }}
      >
        <OmniboxAction background={theme.activeTabBg}>
          <PageInfoIcon color={ic} />
        </OmniboxAction>

        <span style={{
          flex: 1, fontSize: 14, color: theme.omniboxText,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          userSelect: 'none', paddingLeft: dims.omniboxTextLeftPadding, paddingRight: 2,
        }}>
          {url}
        </span>

        <OmniboxAction>
          <StarIcon color={ic} />
        </OmniboxAction>
      </div>

      <ToolbarButton><ExtensionsIcon color={ic} /></ToolbarButton>

      <div style={{
        width: dims.toolbarDividerWidth, height: dims.toolbarDividerHeight,
        borderRadius: dims.toolbarDividerCornerRadius,
        background: theme.separator, flexShrink: 0,
        marginLeft: dims.toolbarDividerSpacing, marginRight: dims.toolbarDividerSpacing,
      }} />

      <ToolbarButton><AvatarIcon color={ic} /></ToolbarButton>
      <ToolbarButton style={{ marginLeft: pad }}><MenuIcon color={ic} /></ToolbarButton>
      {verticalTabs && !isMac && <WindowsCaptionButtonsToolbar theme={theme} />}
    </div>
  );
}
