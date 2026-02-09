import { dims } from './chrome-tokens';

// Replicates GM2TabStyle::GetPath() — the distinctive Chrome tab shape.
function buildTabPath(width, top, bottom) {
  const topR = dims.tabTopCornerRadius;
  const botR = dims.tabBottomCornerRadius;
  const ext = botR;
  const tabL = ext;
  const tabR = width - ext;

  return [
    `M 0 ${bottom}`,
    `L ${tabL - botR} ${bottom}`,
    `A ${botR} ${botR} 0 0 0 ${tabL} ${bottom - botR}`,
    `L ${tabL} ${top + topR}`,
    `A ${topR} ${topR} 0 0 1 ${tabL + topR} ${top}`,
    `L ${tabR - topR} ${top}`,
    `A ${topR} ${topR} 0 0 1 ${tabR} ${top + topR}`,
    `L ${tabR} ${bottom - botR}`,
    `A ${botR} ${botR} 0 0 0 ${tabR + botR} ${bottom}`,
    `L ${width} ${bottom}`,
  ].join(' ');
}

export default function ChromeTab({
  title = 'New Tab',
  favicon,
  active = false,
  nextIsActive = false,
  theme,
  width = 240,
  onClose,
  onClick,
}) {
  const h = dims.tabStripHeight;
  const w = width;
  const tabPath = buildTabPath(w, dims.tabStripPadding, h);

  const textColor = active ? theme.activeTabText : theme.inactiveTabText;
  const contentLeft = dims.tabBottomCornerRadius + dims.tabHorizontalPadding;
  const contentRight = contentLeft + dims.tabCloseButtonSize + dims.tabAfterTitlePadding;
  const contentTop = dims.tabStripPadding + dims.tabVerticalPadding;

  // Separator: hide on active tab or when next tab is active
  const showSep = !active && !nextIsActive;
  const visH = h - dims.tabstripToolbarOverlap;
  const sepTop = (visH - dims.tabStripPadding * 2 - dims.tabSeparatorHeight) / 2 + dims.tabStripPadding;

  return (
    <div
      onClick={onClick}
      className="chrome-tab"
      style={{
        position: 'relative',
        width: w,
        height: h,
        cursor: 'pointer',
        flexShrink: 0,
        marginRight: -dims.tabOverlap,
        zIndex: active ? 2 : 1,
      }}
    >
      {/* Tab shape + hover overlay */}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
        style={{ position: 'absolute', top: 0, left: 0 }}>
        <path d={tabPath} fill={active ? theme.activeTabBg : 'transparent'} />
        {!active && (
          <rect
            x={dims.hoverRectInsetX} y={dims.tabStripPadding}
            width={w - dims.hoverRectInsetX * 2} height={dims.hoverRectHeight}
            rx={dims.hoverRectCornerRadius} ry={dims.hoverRectCornerRadius}
            fill={theme.inactiveTabHover} className="tab-hover-rect"
          />
        )}
      </svg>

      {/* Separator */}
      {showSep && (
        <div
          className="tab-separator"
          style={{
            position: 'absolute',
            right: dims.tabBottomCornerRadius - dims.tabSeparatorHMargin - dims.tabSeparatorThickness,
            top: sepTop,
            width: dims.tabSeparatorThickness,
            height: dims.tabSeparatorHeight,
            borderRadius: dims.tabSeparatorCornerRadius,
            background: theme.tabDivider,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content: favicon + title */}
      <div style={{
        position: 'absolute',
        top: contentTop, left: contentLeft, right: contentRight,
        height: 16,
        display: 'flex', alignItems: 'center', gap: 8,
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{ width: 16, height: 16, flexShrink: 0, borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {favicon
            ? <img src={favicon} width={16} height={16} alt="" />
            : <svg width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6" fill={theme.toolbarIcon} opacity="0.2" />
              </svg>
          }
        </div>
        <span style={{
          fontSize: 12, fontWeight: 400, color: textColor,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          flex: 1, lineHeight: '16px',
        }}>
          {title}
        </span>
      </div>

      {/* Close button */}
      <div
        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        className="tab-close-btn"
        style={{
          position: 'absolute',
          top: contentTop,
          right: dims.tabBottomCornerRadius + dims.tabHorizontalPadding,
          width: dims.tabCloseButtonSize, height: dims.tabCloseButtonSize,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', pointerEvents: 'auto',
        }}
      >
        <svg width={dims.tabCloseButtonSize} height={dims.tabCloseButtonSize}
          viewBox="0 0 16 16" fill={textColor}>
          <path d="M10.94 4L4 10.94 5.06 12 12 5.07 10.94 4ZM5.06 4L4 5.06 10.94 12 12 10.93 5.06 4Z" />
        </svg>
      </div>
    </div>
  );
}
