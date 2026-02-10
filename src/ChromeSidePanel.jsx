import { dims } from './chrome-tokens';

// close_chrome_refresh.icon (CANVAS 20), rendered at header icon size
function CloseIcon({ color }) {
  const s = dims.sidePanelHeaderIconSize;
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill={color}>
      <path d="M6.06 15L5 13.94 8.94 10 5 6.06 6.06 5 10 8.94 13.94 5 15 6.06 11.06 10 15 13.94 13.94 15 10 11.06Z" />
    </svg>
  );
}

export default function ChromeSidePanel({ title = 'Side Panel', theme, onClose, children }) {
  const pad = dims.sidePanelBorderPadding;
  const r = dims.sidePanelContentCornerRadius;

  return (
    <div style={{
      width: dims.sidePanelContentWidth,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: theme.toolbar,
      '--toolbar-btn-hover': theme.toolbarBtnHover,
    }}>
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        height: dims.sidePanelHeaderHeight,
        paddingLeft: pad + 8,
        paddingRight: pad + dims.sidePanelHeaderMarginH,
      }}>
        <span style={{
          flex: 1, fontSize: 13, fontWeight: 500,
          color: theme.toolbarText,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          userSelect: 'none',
        }}>
          {title}
        </span>

        <div
          onClick={onClose}
          className="side-panel-close-btn"
          style={{
            width: dims.sidePanelHeaderButtonSize,
            height: dims.sidePanelHeaderButtonSize,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background 0.15s',
          }}
        >
          <CloseIcon color={theme.toolbarIcon} />
        </div>
      </div>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: pad,
        paddingRight: pad,
        paddingBottom: pad,
      }}>
        <div style={{
          flex: 1,
          minHeight: 0,
          borderRadius: r,
          background: '#FFFFFF',
          border: `1px solid ${theme.separator}`,
          overflow: 'auto',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
