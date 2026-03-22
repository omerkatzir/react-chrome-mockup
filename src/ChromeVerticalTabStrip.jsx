import { dims } from './chrome-tokens';
import ChromeVerticalTab from './ChromeVerticalTab';

// layout_constants.cc exact values
const ICON = dims.verticalTabStripButtonIconSize;       // 20
const BTN = dims.verticalTabStripTopContainerBtnSize;    // 28
const NEW_TAB_BTN = dims.verticalTabStripNewTabButtonSize; // 32
const R = dims.verticalTabCornerRadius;                  // 8
const FLAT_PAD = dims.verticalTabStripFlatEdgeButtonPad; // 2
const TOP_BTN_PAD = dims.verticalTabStripTopButtonPadding; // 4
const COLLAPSED_PAD = dims.verticalTabStripCollapsedPadding; // 8
const UNCOLLAPSED_PAD = dims.verticalTabStripUncollapsedPadding; // 12
const REGION_V_PAD = dims.verticalTabStripRegionVerticalPad; // 5
const COLLAPSED_WIDTH = dims.verticalTabStripCollapsedWidth; // 48
const COLLAPSED_SEP_W = dims.verticalTabStripCollapsedSepWidth; // 24
const TAB_V_PAD = 2; // kTabVerticalPadding from vertical_unpinned_tab_container_view.cc

// tab_strip_flat_edge_button.cc
const FLAT_R = 2;   // kFlatRadius
const ROUND_R = 10;  // kRoundedRadius

// Toolbar height = toolbarButtonHeight(34) + toolbarInteriorMarginV(6) * 2 = 46
const TOOLBAR_H = dims.toolbarButtonHeight + dims.toolbarInteriorMarginV * 2;

// ── Icons from Chromium source ──

// views::kMenuCloseIcon (CANVAS 24) — collapse button (expanded state)
function MenuCloseIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill={color}>
      <path d="M21 18v-2H8v2zM4.4 17l5-5-5-5L3 8.4 6.6 12 3 15.6zM21 13v-2H11v2zM21 8V6H8v2z" />
    </svg>
  );
}

// views::kMenuOpenIcon (CANVAS 24) — expand button (collapsed state)
function MenuOpenIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill={color}>
      <path d="M3 18v-2h13v2zM19.6 17l-5-5 5-5L21 8.4 17.4 12 21 15.6zM3 13v-2h10v2zM3 8V6h13v2z" />
    </svg>
  );
}

// kSavedTabGroupBarEverythingIcon (CANVAS 20)
function TabGroupsIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color}>
      <path d="M3 9V3h6v6zm0 8v-6h6v6zm8-8V3h6v6zm0 8v-6h6v6zM4.5 7.5h3v-3h-3zm8 0h3v-3h-3zm0 8h3v-3h-3zm-8 0h3v-3h-3z" />
    </svg>
  );
}

// kTabSearchTabStripIcon (CANVAS 24)
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

// macOS traffic lights: 14px circles, 10px gap, 12px left inset
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

// TopContainerButton: LabelButton with ConfigureInkDropForToolbar → FULLY CIRCULAR
// Emphasis::kMaximum → borderRadius: 50%
function CollapseButton({ size, onClick, children }) {
  return (
    <div onClick={onClick} className="vertical-strip-btn" style={{
      width: size, height: size,
      borderRadius: '50%', // ToolbarButtonHighlightPathGenerator: Emphasis::kMaximum
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

// TabStripFlatEdgeButton: 28×28, paints own background, custom corner radii
function FlatEdgeButton({ children, bg, borderRadius }) {
  return (
    <div className="vertical-strip-btn" style={{
      width: BTN, height: BTN,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', background: bg, borderRadius,
    }}>
      {children}
    </div>
  );
}

// TabStripComboButton: start_button_ + end_button_
// BoxLayout, between_child_spacing = kVerticalTabStripFlatEdgeButtonPadding = 2
// Each button paints own bg via OnPaintBackground
function ComboButton({ theme, collapsed }) {
  const ic = theme.toolbarIcon;
  const bg = theme.headerContainerBg;

  if (collapsed) {
    // Vertical orientation: each button fully rounded (ROUND_R=10)
    return (
      <>
        <FlatEdgeButton bg={bg} borderRadius={ROUND_R}>
          <TabGroupsIcon color={ic} />
        </FlatEdgeButton>
        <FlatEdgeButton bg={bg} borderRadius={ROUND_R}>
          <TabSearchIcon color={ic} />
        </FlatEdgeButton>
      </>
    );
  }

  // Horizontal: start=round-left/flat-right, end=flat-left/round-right
  return (
    <div style={{ display: 'flex', gap: FLAT_PAD, flexShrink: 0 }}>
      <FlatEdgeButton bg={bg}
        borderRadius={`${ROUND_R}px ${FLAT_R}px ${FLAT_R}px ${ROUND_R}px`}>
        <TabGroupsIcon color={ic} />
      </FlatEdgeButton>
      <FlatEdgeButton bg={bg}
        borderRadius={`${FLAT_R}px ${ROUND_R}px ${ROUND_R}px ${FLAT_R}px`}>
        <TabSearchIcon color={ic} />
      </FlatEdgeButton>
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
  const pad = collapsed ? COLLAPSED_PAD : UNCOLLAPSED_PAD;
  const stripWidth = collapsed ? COLLAPSED_WIDTH : (width || 230);
  const ic = theme.toolbarIcon;

  // vertical_tab_strip_region_view.cc: separator_padding
  const sepPad = collapsed ? (COLLAPSED_WIDTH - COLLAPSED_SEP_W) / 2 : pad;

  return (
    <div style={{
      width: stripWidth,
      display: 'flex', flexDirection: 'column',
      background: theme.tabStripBg,
      flexShrink: 0, overflow: 'hidden',
      '--vertical-strip-btn-hover': theme.inactiveTabHover,
      '--vertical-tab-hover': theme.inactiveTabHover,
    }}>

      {/* ═══ 1. top_button_container_ ═══ */}
      {/* Expanded: margins = VH(0, pad=12). Height = toolbar_height_ */}
      {!collapsed && (
        <div style={{
          display: 'flex', alignItems: 'center',
          height: toolbarHeight || TOOLBAR_H,
          margin: `0 ${pad}px`, // VH(0, padding)
          flexShrink: 0,
        }}>
          {isMac && <MacTrafficLights />}
          {/* collapse_button_.x = caption_button_width_ (right after traffic lights) */}
          <CollapseButton size={BTN} onClick={onToggleCollapse}>
            <MenuCloseIcon color={ic} />
          </CollapseButton>
          <div style={{ flex: 1 }} />
          {/* combo_button: right-aligned */}
          <ComboButton theme={theme} collapsed={false} />
        </div>
      )}

      {/* Collapsed: margins = TLBR(0, pad=8, kRegionVerticalPadding=5, pad=8) */}
      {collapsed && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          margin: `0 ${pad}px ${REGION_V_PAD}px ${pad}px`, // TLBR(0, 8, 5, 8)
          gap: COLLAPSED_PAD, // kVerticalTabStripCollapsedPadding = 8
          flexShrink: 0,
        }}>
          <CollapseButton size={BTN} onClick={onToggleCollapse}>
            <MenuOpenIcon color={ic} />
          </CollapseButton>
          <ComboButton theme={theme} collapsed={true} />
        </div>
      )}

      {/* ═══ 2. top_button_separator_ ═══ */}
      {/* margins = VH(0, separator_padding) */}
      <div style={{
        height: 1,
        background: theme.tabDivider,
        margin: `0 ${sepPad}px`,
        flexShrink: 0,
      }} />

      {/* ═══ 3. tab_strip_view_ ═══ */}
      {/* margins = VH(kVerticalTabStripCollapsedPadding=8, 0) */}
      {/* Tabs have their own horizontal_padding (8 collapsed, 12 uncollapsed) */}
      {/* FlexSpec: kScaleToMinimum/kPreferred — content height only */}
      <div style={{
        overflowY: 'auto', overflowX: 'hidden',
        margin: `${COLLAPSED_PAD}px 0`, // VH(8, 0)
        padding: `0 ${pad}px`, // horizontal_padding applied to tab container
        display: 'flex', flexDirection: 'column',
        gap: TAB_V_PAD, // kTabVerticalPadding = 2
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

      {/* ═══ 4. bottom_button_container_ ═══ */}
      {/* region_view margins = TLBR(kVerticalTabStripCollapsedPadding=8, pad, 0, pad) */}
      {/* FlexSpec: kPreferred/kUnbounded — fills remaining space */}
      {/* Button: 32×32 preferred, kUnbounded stretches full width in uncollapsed */}
      {/* Button insets VH(5,14)/VH(5,6) are internal border (icon padding) */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        margin: `${COLLAPSED_PAD}px ${pad}px 0 ${pad}px`, // TLBR(8, pad, 0, pad)
      }}>
        <div
          onClick={onNewTab}
          className="vertical-strip-btn"
          style={{
            height: NEW_TAB_BTN, // 32px
            borderRadius: R,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            background: theme.headerContainerBg,
            // Uncollapsed: kUnbounded stretches full width
            // Collapsed: preferred 32×32
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
