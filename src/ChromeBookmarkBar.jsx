import { useState, useRef, useEffect, useCallback } from 'react';
import { dims } from './chrome-tokens';

const FAVICON = dims.bookmarkBarFaviconSize;
const ICON = dims.toolbarIconSize;
const PILL_RADIUS = dims.bookmarkBarButtonHeight / 2; // pill shape: min(w,h)/2

// folder_chrome_refresh.icon (CANVAS 20)
function FolderIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color} fillRule="nonzero" style={{ flexShrink: 0 }}>
      <path d="M3.5 16c-.4 0-.75-.15-1.05-.45-.3-.3-.45-.65-.45-1.05v-9c0-.41.15-.77.45-1.06A1.45 1.45 0 013.5 4H8l2 2h6.5c.41 0 .77.15 1.06.44.29.29.44.65.44 1.06v7c0 .4-.15.75-.44 1.05-.29.3-.64.45-1.06.45H3.5zm0-1.5h13v-7H9.38l-2-2H3.5v9zm0 0v-9 9z" />
    </svg>
  );
}

// saved_tab_group_bar_everything.icon (CANVAS 20)
function TabGroupsIcon({ color }) {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 20 20" fill={color} fillRule="nonzero" style={{ flexShrink: 0 }}>
      <path d="M3 9V3h6v6H3zm0 8v-6h6v6H3zm8-8V3h6v6h-6zm0 8v-6h6v6h-6zM4.5 7.5h3v-3h-3v3zm8 0h3v-3h-3v3zm0 8h3v-3h-3v3zm-8 0h3v-3h-3v3z" />
    </svg>
  );
}

// Overflow double chevron (CANVAS 16)
function ChevronIcon({ color }) {
  return (
    <svg width={FAVICON} height={FAVICON} viewBox="0 0 16 16" fill={color} style={{ flexShrink: 0 }}>
      <path d="M3.15 11.85l-1.06-1.06L6.24 6.64 2.09 2.49l1.06-1.06L8.36 6.64zM8.7 11.85L7.64 10.79l4.15-4.15L7.64 2.49 8.7 1.43l5.21 5.21z" />
    </svg>
  );
}

let _ctx;
function getTextWidth(text) {
  if (!_ctx) {
    const canvas = document.createElement('canvas');
    _ctx = canvas.getContext('2d');
    _ctx.font = '400 12px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  }
  return _ctx.measureText(text).width;
}

function calcButtonWidth(bookmark) {
  const textWidth = getTextWidth(bookmark.label);
  const iconWidth = bookmark.isFolder ? ICON : FAVICON;
  const gap = dims.bookmarkBarImageLabelSpacing;
  const inset = dims.bookmarkBarButtonInset * 2;
  return Math.min(Math.ceil(iconWidth + gap + textWidth + inset), dims.bookmarkBarMaxButtonWidth);
}

function BookmarkButton({ label, favicon, isFolder, theme, style }) {
  return (
    <div
      className="bookmark-btn"
      style={{
        height: dims.bookmarkBarButtonHeight,
        maxWidth: dims.bookmarkBarMaxButtonWidth,
        paddingLeft: dims.bookmarkBarButtonInset,
        paddingRight: dims.bookmarkBarButtonInset,
        borderRadius: PILL_RADIUS,
        display: 'inline-flex',
        alignItems: 'center',
        gap: dims.bookmarkBarImageLabelSpacing,
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.15s',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {isFolder ? (
        <FolderIcon color={theme.toolbarIcon} />
      ) : favicon ? (
        <img
          src={favicon}
          width={FAVICON}
          height={FAVICON}
          style={{ borderRadius: 2, flexShrink: 0 }}
          draggable={false}
        />
      ) : (
        <svg width={FAVICON} height={FAVICON} viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <circle cx="8" cy="8" r="7" fill={theme.toolbarIcon} opacity="0.25" />
        </svg>
      )}
      <span style={{
        fontSize: 12,
        fontWeight: 400,
        color: theme.toolbarText,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '16px',
        userSelect: 'none',
      }}>
        {label}
      </span>
    </div>
  );
}

function BarSeparator({ theme }) {
  return (
    <div style={{
      width: dims.bookmarkBarSeparatorThickness,
      height: dims.toolbarDividerHeight,
      borderRadius: dims.toolbarDividerCornerRadius,
      background: theme.frame,
      flexShrink: 0,
      marginLeft: dims.bookmarkBarSeparatorPadding,
      marginRight: dims.bookmarkBarSeparatorPadding,
    }} />
  );
}

export default function ChromeBookmarkBar({ bookmarks = [], theme }) {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(bookmarks.length);

  // Forced to square in bookmark_bar_view.cc
  const tabGroupsBtnWidth = dims.bookmarkBarButtonHeight;

  const recalcOverflow = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;

    const allBookmarksWidth = calcButtonWidth({ label: 'All Bookmarks', isFolder: true });
    const separatorWidth = dims.bookmarkBarSeparatorThickness + dims.bookmarkBarSeparatorPadding * 2;
    const tabGroupsReserved = tabGroupsBtnWidth + separatorWidth;
    const reserved = dims.bookmarkBarLeadingMargin + dims.bookmarkBarTrailingMargin +
      tabGroupsReserved + separatorWidth + allBookmarksWidth;

    const chevronWidth = dims.bookmarkBarButtonInset * 2 + FAVICON;
    let available = containerWidth - reserved;
    let cumulative = 0;
    let count = 0;

    for (let i = 0; i < bookmarks.length; i++) {
      const bw = calcButtonWidth(bookmarks[i]);
      const gap = i > 0 ? dims.bookmarkBarButtonPadding : 0;
      const needed = bw + gap;

      if (cumulative + needed > available) {
        // Recalculate with space reserved for the overflow chevron
        available = containerWidth - reserved - chevronWidth - dims.bookmarkBarButtonPadding;
        cumulative = 0;
        count = 0;
        for (let j = 0; j < bookmarks.length; j++) {
          const bw2 = calcButtonWidth(bookmarks[j]);
          const gap2 = j > 0 ? dims.bookmarkBarButtonPadding : 0;
          if (cumulative + bw2 + gap2 > available) break;
          cumulative += bw2 + gap2;
          count++;
        }
        setVisibleCount(count);
        return;
      }
      cumulative += needed;
      count++;
    }
    setVisibleCount(count);
  }, [bookmarks, tabGroupsBtnWidth]);

  useEffect(() => {
    recalcOverflow();
    if (!containerRef.current) return;
    const observer = new ResizeObserver(recalcOverflow);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [recalcOverflow]);

  const isOverflowing = visibleCount < bookmarks.length;

  return (
    <div
      ref={containerRef}
      style={{
        height: dims.bookmarkBarHeight,
        background: theme.toolbar,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: dims.bookmarkBarLeadingMargin,
        paddingRight: dims.bookmarkBarTrailingMargin,
        '--toolbar-btn-hover': theme.toolbarBtnHover,
      }}
    >
      {/* Tab groups */}
      <div
        className="bookmark-btn"
        style={{
          width: tabGroupsBtnWidth,
          height: dims.bookmarkBarButtonHeight,
          borderRadius: PILL_RADIUS,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.15s',
        }}
      >
        <TabGroupsIcon color={theme.toolbarIcon} />
      </div>

      <BarSeparator theme={theme} />

      {bookmarks.slice(0, visibleCount).map((bm, i) => (
        <BookmarkButton
          key={bm.id}
          label={bm.label}
          favicon={bm.favicon}
          isFolder={bm.isFolder}
          theme={theme}
          style={i > 0 ? { marginLeft: dims.bookmarkBarButtonPadding } : undefined}
        />
      ))}

      {isOverflowing && (
        <div
          className="bookmark-btn"
          style={{
            width: dims.bookmarkBarButtonInset * 2 + FAVICON,
            height: dims.bookmarkBarButtonHeight,
            borderRadius: PILL_RADIUS,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.15s',
            marginLeft: dims.bookmarkBarButtonPadding,
          }}
        >
          <ChevronIcon color={theme.toolbarIcon} />
        </div>
      )}

      <div style={{ flex: 1 }} />

      <BarSeparator theme={theme} />

      <BookmarkButton
        label="All Bookmarks"
        isFolder
        theme={theme}
      />
    </div>
  );
}
