import { dims } from './chrome-tokens';
import ChromeVerticalTab from './ChromeVerticalTab';

const ICON = dims.verticalTabStripButtonIconSize;      // 20
const BTN = dims.verticalTabStripTopContainerBtnSize;   // 28
const NEW_TAB_BTN = dims.verticalTabStripNewTabButtonSize; // 32
const R = dims.verticalTabCornerRadius;                 // 8
const FLAT_PAD = dims.verticalTabStripFlatEdgeButtonPad; // 2

// views::kMenuCloseIcon (CANVAS 24, scaled to 20)
// Three lines with left-pointing arrow. Used when strip is expanded (click to collapse).
function MenuCloseIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill={color}>
      <path d="M21 18v-2H8v2zM4.4 17l5-5-5-5L3 8.4 6.6 12 3 15.6zM21 13v-2H11v2zM21 8V6H8v2z" />
    </svg>
  );
}

// views::kMenuOpenIcon (CANVAS 24, scaled to 20)
// Three lines with right-pointing arrow. Used when strip is collapsed (click to expand).
function MenuOpenIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill={color}>
      <path d="M3 18v-2h13v2zM19.6 17l-5-5 5-5L21 8.4 17.4 12 21 15.6zM3 13v-2h10v2zM3 8V6h13v2z" />
    </svg>
  );
}

// kSavedTabGroupBarEverythingIcon (CANVAS 20)
// 2x2 grid of outlined squares
function TabGroupsIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M3 9V3h6v6zm0 8v-6h6v6zm8-8V3h6v6zm0 8v-6h6v6zM4.5 7.5h3v-3h-3zm8 0h3v-3h-3zm0 8h3v-3h-3zm-8 0h3v-3h-3z" />
    </svg>
  );
}

// kTabSearchTabStripIcon (CANVAS 24, scaled to 20)
// Three lines on left + magnifier on right
function TabSearchIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill={color}>
      <path d="M2 19v-2h10v2zm0-5v-2h5v2zm0-5V7h5v2zm18.6 10l-3.85-3.85a4.5 4.5 0 01-1.31.64Q14.72 16 14 16q-2.07 0-3.54-1.46Q9 13.07 9 11q0-2.07 1.46-3.54Q11.93 6 14 6q2.08 0 3.54 1.46Q19 8.93 19 11q0 .48-.07.96a4.5 4.5 0 01-.64 1.31L22 17.6zM14 14q1.25 0 2.13-.87A2.9 2.9 0 0017 11q0-1.25-.87-2.12A2.9 2.9 0 0014 8q-1.25 0-2.12.88A2.9 2.9 0 0011 11q0 1.25.88 2.13A2.9 2.9 0 0014 14z" />
    </svg>
  );
}

// vector_icons::kAddIcon (CANVAS 16)
function NewTabIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
      <path d="M13 7.2H8.8V3H7.2v4.2H3v1.7h4.2V13h1.7V8.8H13V7.2Z" />
    </svg>
  );
}

// macOS Tahoe traffic lights: 14px circles, 10px gap, inset 12px
function MacTrafficLights() {
  const colors = ['#FF5F57', '#FEBC2E', '#28C840'];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      paddingLeft: 12, flexShrink: 0,
    }}>
      {colors.map((color, i) => (
        <div key={i} className="traffic-light" style={{
          width: 14, height: 14, borderRadius: '50%',
          background: color, cursor: 'pointer', flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

function StripButton({ size, onClick, children, style }) {
  return (
    <div onClick={onClick} className="vertical-strip-btn" style={{
      width: size, height: size, borderRadius: R,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0, ...style,
    }}>
      {children}
    </div>
  );
}

// TabStripComboButton: start_button_ (tab groups) + end_button_ (tab search)
// Horizontal when expanded with shared bg and flat inner edges.
// Vertical when collapsed, each button has its own bg.
function ComboButton({ theme, collapsed }) {
  const ic = theme.toolbarIcon;
  const bg = theme.headerContainerBg;

  if (collapsed) {
    return (
      <>
        <div className="vertical-strip-btn" style={{
          width: BTN, height: BTN, borderRadius: R,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', background: bg,
        }}>
          <TabGroupsIcon color={ic} />
        </div>
        <div className="vertical-strip-btn" style={{
          width: BTN, height: BTN, borderRadius: R,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', background: bg,
        }}>
          <TabSearchIcon color={ic} />
        </div>
      </>
    );
  }

  // Expanded: horizontal BoxLayout with kVerticalTabStripFlatEdgeButtonPadding (2px) gap
  return (
    <div style={{
      display: 'flex',
      gap: FLAT_PAD, // kVerticalTabStripFlatEdgeButtonPadding = 2
      borderRadius: R, overflow: 'hidden',
      background: bg, flexShrink: 0,
    }}>
      <div className="vertical-strip-btn" style={{
        width: BTN, height: BTN,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', borderRadius: 0,
      }}>
        <TabGroupsIcon color={ic} />
      </div>
      <div className="vertical-strip-btn" style={{
        width: BTN, height: BTN,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', borderRadius: 0,
      }}>
        <TabSearchIcon color={ic} />
      </div>
    </div>
  );
}

export default function ChromeVerticalTabStrip({
  tabs, activeTabId, theme, platform = 'mac',
  onTabClick, onTabClose, onNewTab,
  collapsed = false, onToggleCollapse,
  width,
  toolbarHeight = 0,
}) {
  const isMac = platform === 'mac';
  const pad = collapsed
    ? dims.verticalTabStripCollapsedPadding     // 8
    : dims.verticalTabStripUncollapsedPadding;  // 12

  const stripWidth = collapsed
    ? dims.verticalTabStripCollapsedWidth        // 48
    : (width || 230);

  const ic = theme.toolbarIcon;

  // layout_constants.cc VERTICAL_TAB_STRIP_BOTTOM_BUTTON insets: {V, H}
  const bottomPadV = 5;
  const bottomPadH = collapsed ? 6 : 14;

  return (
    <div style={{
      width: stripWidth,
      display: 'flex',
      flexDirection: 'column',
      background: theme.tabStripBg,
      flexShrink: 0,
      overflow: 'hidden',
      '--vertical-strip-btn-hover': theme.inactiveTabHover,
      '--vertical-tab-hover': theme.inactiveTabHover,
    }}>
      {/* ── 1. Top button container (FlexSpec: kPreferred/kPreferred) ── */}
      {/* Expanded: horizontal row [traffic lights] [collapse] ... [combo] */}
      {/* Height matches toolbar via SetToolbarHeightForLayout */}
      {!collapsed && (
        <div style={{
          display: 'flex', alignItems: 'center',
          height: toolbarHeight || (dims.toolbarButtonHeight + dims.toolbarInteriorMarginV * 2),
          flexShrink: 0,
        }}>
          {isMac && <MacTrafficLights />}
          <StripButton size={BTN} onClick={onToggleCollapse}
            style={{
              // collapse_button_.x = caption_button_width_ (after traffic lights)
              // spacing from previous = kVerticalTabStripTopButtonPadding = 4
              marginLeft: dims.verticalTabStripTopButtonPadding,
            }}>
            <MenuCloseIcon color={ic} />
          </StripButton>
          <div style={{ flex: 1 }} />
          <div style={{ marginRight: pad }}>
            <ComboButton theme={theme} collapsed={false} />
          </div>
        </div>
      )}

      {/* Collapsed: vertical stack — sidebar starts BELOW toolbar */}
      {/* No traffic lights here (they're in the toolbar area above) */}
      {collapsed && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          paddingTop: dims.verticalTabStripRegionVerticalPad,
          gap: dims.verticalTabStripCollapsedPadding,
          flexShrink: 0,
        }}>
          <StripButton size={BTN} onClick={onToggleCollapse}>
            <MenuOpenIcon color={ic} />
          </StripButton>
          <ComboButton theme={theme} collapsed={true} />
        </div>
      )}

      {/* ── 2. Separator (views::Separator) ── */}
      <div style={{
        height: 1,
        background: theme.tabDivider,
        marginLeft: pad, marginRight: pad,
        marginTop: dims.verticalTabStripTopButtonPadding,
        marginBottom: dims.verticalTabStripTopButtonPadding,
        flexShrink: 0,
      }} />

      {/* ── 3. Tab strip view (FlexSpec: kScaleToMinimum/kPreferred) ── */}
      {/* Takes content height only — does NOT flex-grow */}
      {/* kTabVerticalPadding = 2 between tabs */}
      <div style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: `0 ${pad}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // kTabVerticalPadding = 2
        flexShrink: 0,
      }}>
        {tabs.map((tab) => (
          <ChromeVerticalTab
            key={tab.id}
            title={tab.title}
            favicon={tab.favicon}
            active={tab.id === activeTabId}
            theme={theme}
            collapsed={collapsed}
            onClick={() => onTabClick?.(tab.id)}
            onClose={() => onTabClose?.(tab.id)}
          />
        ))}
      </div>

      {/* ── 4. Bottom container (FlexSpec: kPreferred/kUnbounded) ── */}
      {/* Fills remaining space; new tab button at top of this area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: `${bottomPadV}px ${bottomPadH}px`,
      }}>
        <div
          onClick={onNewTab}
          className="vertical-strip-btn"
          style={{
            height: NEW_TAB_BTN,
            borderRadius: R,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            background: theme.headerContainerBg,
            width: collapsed ? NEW_TAB_BTN : '100%',
            alignSelf: collapsed ? 'center' : 'stretch',
          }}
        >
          <NewTabIcon color={ic} />
        </div>
      </div>
    </div>
  );
}
