import { dims } from './chrome-tokens';

// vertical_tab_view.cc constants
const ICON_DESIGN_WIDTH = 16;     // gfx::kFaviconSize
const HORIZONTAL_INSET = 7;       // hardcoded in vertical_tab_view.cc
const DEFAULT_PADDING = 4;        // padding between elements

export default function ChromeVerticalTab({
  title = 'New Tab',
  favicon,
  active = false,
  theme,
  collapsed = false,
  onClick,
  onClose,
}) {
  const r = dims.verticalTabCornerRadius;     // 8
  const h = dims.verticalTabHeight;           // 30
  const closeSize = dims.tabCloseButtonSize;  // 16

  const textColor = active ? theme.activeTabText : theme.inactiveTabText;

  // Collapsed: square icon-only tab, centered
  if (collapsed) {
    return (
      <div
        onClick={onClick}
        className="vertical-tab"
        style={{
          width: dims.verticalTabMinWidth,    // 32
          height: dims.verticalTabMinWidth,   // 32
          borderRadius: r,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: active ? theme.activeTabBg : 'transparent',
          flexShrink: 0,
          alignSelf: 'center',
          '--vertical-tab-hover': active ? theme.activeTabBg : theme.inactiveTabHover,
        }}
      >
        {favicon
          ? <img src={favicon} width={ICON_DESIGN_WIDTH} height={ICON_DESIGN_WIDTH} alt="" style={{ borderRadius: 2 }} />
          : <svg width={ICON_DESIGN_WIDTH} height={ICON_DESIGN_WIDTH} viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill={theme.toolbarIcon} opacity="0.2" />
            </svg>
        }
      </div>
    );
  }

  // Expanded: [inset] [icon] [padding] [title] [padding] [close] [inset]
  return (
    <div
      onClick={onClick}
      className="vertical-tab"
      style={{
        height: h,
        borderRadius: r,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: HORIZONTAL_INSET,
        paddingRight: HORIZONTAL_INSET,
        gap: DEFAULT_PADDING,
        cursor: 'pointer',
        position: 'relative',
        background: active ? theme.activeTabBg : 'transparent',
        flexShrink: 0,
        overflow: 'hidden',
        '--vertical-tab-hover': active ? theme.activeTabBg : theme.inactiveTabHover,
      }}
    >
      <div style={{
        width: ICON_DESIGN_WIDTH, height: ICON_DESIGN_WIDTH, flexShrink: 0,
        borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {favicon
          ? <img src={favicon} width={ICON_DESIGN_WIDTH} height={ICON_DESIGN_WIDTH} alt="" />
          : <svg width={ICON_DESIGN_WIDTH} height={ICON_DESIGN_WIDTH} viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill={theme.toolbarIcon} opacity="0.2" />
            </svg>
        }
      </div>

      <span style={{
        fontSize: 12, fontWeight: 400, color: textColor,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        flex: 1, lineHeight: `${h}px`, userSelect: 'none',
      }}>
        {title}
      </span>

      <div
        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        className="vertical-tab-close-btn"
        style={{
          width: closeSize, height: closeSize, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
          // Active tab always shows close button
          ...(active ? { opacity: 1 } : {}),
        }}
      >
        <svg width={closeSize} height={closeSize} viewBox="0 0 16 16" fill={textColor}>
          <path d="M10.94 4L4 10.94 5.06 12 12 5.07 10.94 4ZM5.06 4L4 5.06 10.94 12 12 10.93 5.06 4Z" />
        </svg>
      </div>
    </div>
  );
}
