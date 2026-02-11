// Layout tokens extracted from Chromium source (layout_constants.cc and friends)

import { createChromeTheme } from './chrome-color-system';

export const light = createChromeTheme({ mode: 'baseline', isDark: false });
export const dark = createChromeTheme({ mode: 'baseline', isDark: true });
export { createChromeTheme };

export const dims = {
  // Tab (tab_style.cc, layout_constants.cc)
  tabHeight:             34,   // kTabHeight = 34 + overlap(1) = 35
  tabStripHeight:        41,   // kTabHeight(35) + kTabStripPadding(6)
  tabStripPadding:       6,
  tabTopCornerRadius:    10,
  tabBottomCornerRadius: 12,
  tabOverlap:            18,   // 2*12 - (4 + 2)
  tabStandardWidth:      256,  // kTabWidth(232) + 2*bottomCornerR(12)
  tabMinWidth:           36,
  tabCloseButtonSize:    16,
  tabSeparatorHeight:    16,
  tabSeparatorThickness: 2,
  tabSeparatorHMargin:   2,
  tabSeparatorCornerRadius: 1,
  tabAfterTitlePadding:  4,
  tabstripToolbarOverlap:1,
  tabVerticalPadding:    6,
  tabHorizontalPadding:  8,

  // Hover rect (tab_style_views.cc)
  hoverRectInsetX:       12,
  hoverRectHeight:       28,
  hoverRectCornerRadius: 10,

  // Toolbar (layout_constants.cc)
  toolbarButtonHeight:   34,
  toolbarInteriorMarginV:6,
  toolbarInteriorMarginH:5,
  toolbarElementPadding: 4,
  toolbarStandardSpacing:9,
  toolbarIconSize:       20,
  toolbarDividerWidth:   2,
  toolbarDividerHeight:  16,
  toolbarDividerCornerRadius: 1,
  toolbarDividerSpacing: 9,

  // Omnibox / Location Bar (layout_constants.cc)
  omniboxHeight:         34,
  omniboxBorderRadius:   17,   // height / 2
  omniboxIconSize:       16,
  omniboxTrailingIcon:   20,   // kLocationBarTrailingIconSize
  omniboxChildRadius:    12,
  omniboxLeadingEdgePadding:  5,
  omniboxTextLeftPadding:     8,    // text_left in location_bar_view.cc
  omniboxTrailingEdgePadding: 12,

  // Window (custom_frame_view.cc)
  captionButtonWidth:    46,
  captionButtonHeight:   32,

  // Side Panel (side_panel.cc, side_panel_header.cc)
  sidePanelContentWidth:        360,
  sidePanelHeaderHeight:        40,
  sidePanelHeaderButtonSize:    20,
  sidePanelHeaderIconSize:      16,
  sidePanelHeaderMarginH:       4,
  sidePanelContentCornerRadius: 16,
  sidePanelBorderPadding:       8,

  // Bookmark Bar (layout_constants.cc, bookmark_button_util.h, chrome_layout_provider.cc)
  bookmarkBarHeight:             34,   // kBookmarkBarButtonHeight(28) + 6 vertical margin
  bookmarkBarButtonHeight:       28,   // kBookmarkBarButtonHeight (non-touch)
  bookmarkBarButtonPadding:      4,    // kToolbarElementPadding (between buttons)
  bookmarkBarButtonInset:        6,    // INSETS_BOOKMARKS_BAR_BUTTON (uniform)
  bookmarkBarImageLabelSpacing:  6,    // kBookmarkBarButtonImageLabelPadding
  bookmarkBarMaxButtonWidth:     150,  // kMaxButtonWidth
  bookmarkBarLeadingMargin:      6,    // kBookmarkBarLeadingMargin
  bookmarkBarTrailingMargin:     8,    // kBookmarkBarTrailingMargin
  bookmarkBarFaviconSize:        16,   // gfx::kFaviconSize
  bookmarkBarSeparatorThickness: 2,    // kBookmarkBarSeparatorThickness
  bookmarkBarSeparatorPadding:   8,    // kSeparatorPadding
};
