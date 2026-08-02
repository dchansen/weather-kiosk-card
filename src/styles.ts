import { css } from "lit";

export const weatherKioskStyles = css`
  :host {
    display: block;
    height: 100%;
    min-height: 420px;
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
  }

  ha-card {
    box-sizing: border-box;
    height: 100%;
    min-height: inherit;
    overflow: hidden;
    padding: clamp(16px, 2.6vmin, 32px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }

  button {
    border: 0;
    color: inherit;
    font: inherit;
  }

  .kiosk {
    display: grid;
    height: 100%;
    gap: clamp(12px, 2vmin, 24px);
    grid-template-rows: auto minmax(0, 1fr) auto;
  }

  header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    min-width: 0;
  }

  h1,
  h2 {
    margin: 0;
  }

  h1 {
    overflow: hidden;
    font-size: clamp(18px, 2.4vmin, 30px);
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .temperatures {
    display: grid;
    min-height: 0;
    gap: clamp(12px, 2vmin, 24px);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .temperature,
  .metric {
    border: 1px solid color-mix(in srgb, var(--divider-color) 75%, transparent);
    border-radius: var(--ha-card-border-radius, 16px);
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  button.temperature-main,
  button.metric {
    width: 100%;
    text-align: inherit;
    cursor: pointer;
  }

  button:hover,
  button:focus-visible {
    outline: none;
  }

  .temperature:focus-within,
  button.metric:hover,
  button.metric:focus-visible,
  .wind:focus-within {
    border-color: var(--primary-color);
  }

  .temperature {
    display: flex;
    min-height: 190px;
    flex-direction: column;
    justify-content: center;
    padding: clamp(14px, 2.8vmin, 34px);
  }

  .temperature-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    background: transparent;
  }

  .label {
    color: var(--secondary-text-color);
    font-size: clamp(13px, 1.7vmin, 21px);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .temperature-value {
    margin-top: 0.06em;
    font-size: clamp(58px, 11vmin, 136px);
    font-variant-numeric: tabular-nums;
    font-weight: 300;
    letter-spacing: -0.07em;
    line-height: 0.95;
  }

  .unit {
    margin-left: 0.12em;
    color: var(--secondary-text-color);
    font-size: 0.38em;
    letter-spacing: 0;
    vertical-align: top;
  }

  .secondary-value {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 0.5em;
    margin-top: clamp(8px, 1.5vmin, 18px);
    padding: 0;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    font-size: clamp(16px, 2.4vmin, 29px);
    font-variant-numeric: tabular-nums;
  }

  .secondary-value:hover,
  .secondary-value:focus-visible {
    color: var(--primary-color);
  }

  .secondary-value strong {
    color: var(--primary-text-color);
    font-weight: 500;
  }

  .forecast-range {
    display: block;
    margin-top: 0.45em;
    color: var(--secondary-text-color);
    font-size: clamp(10px, 1.2vmin, 15px);
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.25;
    text-transform: none;
  }

  .secondary-value .forecast-range {
    display: inline;
    margin: 0 0 0 0.4em;
    font-size: 0.62em;
  }

  .metrics {
    display: grid;
    gap: clamp(8px, 1.4vmin, 16px);
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .metric {
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
    padding: clamp(11px, 1.8vmin, 22px);
  }

  .metric-value {
    margin-top: 0.25em;
    overflow: hidden;
    font-size: clamp(23px, 4vmin, 48px);
    font-variant-numeric: tabular-nums;
    font-weight: 400;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trend {
    display: block;
    overflow: hidden;
    margin-top: 0.65em;
    color: var(--secondary-text-color);
    font-size: clamp(11px, 1.25vmin, 15px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trend.rising {
    color: var(--success-color, #43a047);
  }

  .trend.falling {
    color: var(--warning-color, #fb8c00);
  }

  .wind-values {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: clamp(8px, 1.3vmin, 16px);
    margin-top: 0.25em;
  }

  .wind-direction,
  .wind-speed {
    padding: 0;
    background: transparent;
    cursor: pointer;
  }

  .wind-direction {
    display: grid;
    flex: none;
    place-items: center;
  }

  .wind-arrow {
    display: inline-block;
    color: var(--primary-color);
    font-size: clamp(28px, 4.4vmin, 53px);
    line-height: 0.85;
    transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .direction-label {
    color: var(--secondary-text-color);
    font-size: clamp(10px, 1.2vmin, 14px);
    font-weight: 700;
  }

  .wind-speed {
    overflow: hidden;
    font-size: clamp(23px, 4vmin, 48px);
    font-variant-numeric: tabular-nums;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .unavailable {
    opacity: 0.55;
  }

  .history-backdrop {
    position: fixed;
    z-index: 1000;
    display: grid;
    padding: clamp(12px, 3vmin, 36px);
    background: rgb(0 0 0 / 0.58);
    inset: 0;
    place-items: center;
    animation: fade-in 160ms ease-out;
  }

  .history-dialog {
    box-sizing: border-box;
    width: min(920px, 94vw);
    max-height: 92vh;
    overflow: auto;
    padding: clamp(18px, 3vmin, 34px);
    border: 1px solid var(--divider-color);
    border-radius: 24px;
    background: var(--ha-card-background, var(--card-background-color));
    box-shadow: 0 24px 80px rgb(0 0 0 / 0.38);
    animation: dialog-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .dialog-header {
    display: grid;
    align-items: center;
    gap: 20px;
    grid-template-columns: 1fr auto auto;
  }

  .dialog-eyebrow {
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .dialog-header h2 {
    margin-top: 3px;
    font-size: clamp(25px, 4vmin, 42px);
    font-weight: 500;
  }

  .dialog-current {
    font-size: clamp(30px, 5vmin, 52px);
    font-variant-numeric: tabular-nums;
    font-weight: 300;
  }

  .dialog-current span {
    margin-left: 0.12em;
    color: var(--secondary-text-color);
    font-size: 0.42em;
    vertical-align: top;
  }

  .close-button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    cursor: pointer;
    font-size: 30px;
    line-height: 1;
  }

  .range-selector {
    display: flex;
    gap: 6px;
    margin: 22px 0 14px;
  }

  .range-selector button,
  .dialog-footer button {
    padding: 8px 15px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    cursor: pointer;
    font-weight: 600;
  }

  .range-selector button.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, white);
  }

  .chart-frame {
    position: relative;
    min-height: min(38vh, 330px);
    padding: 18px 0 28px;
  }

  .history-chart {
    width: 100%;
    height: min(38vh, 330px);
    overflow: visible;
  }

  .grid-line {
    stroke: var(--divider-color);
    stroke-dasharray: 5 7;
    stroke-width: 1;
  }

  .chart-area {
    fill: url(#history-fill);
  }

  .chart-line {
    fill: none;
    stroke: var(--primary-color);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 4;
    vector-effect: non-scaling-stroke;
  }

  .forecast-line {
    fill: none;
    stroke: var(--accent-color, var(--primary-color));
    stroke-dasharray: 9 7;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 4;
    vector-effect: non-scaling-stroke;
  }

  .now-line {
    stroke: var(--secondary-text-color);
    stroke-dasharray: 3 5;
    stroke-width: 1.5;
    vector-effect: non-scaling-stroke;
  }

  .latest-point {
    fill: var(--primary-color);
    stroke: var(--ha-card-background, var(--card-background-color));
    stroke-width: 3;
    vector-effect: non-scaling-stroke;
  }

  .chart-y-label {
    position: absolute;
    z-index: 1;
    left: 24px;
    padding: 2px 5px;
    border-radius: 4px;
    background: color-mix(in srgb, var(--card-background-color) 82%, transparent);
    color: var(--secondary-text-color);
    font-size: 11px;
    pointer-events: none;
  }

  .chart-y-label.max {
    top: 18px;
  }

  .chart-y-label.min {
    bottom: 31px;
  }

  .chart-x-labels {
    display: flex;
    justify-content: space-between;
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .chart-legend {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 7px;
    margin-top: 5px;
    color: var(--secondary-text-color);
    font-size: 11px;
  }

  .chart-legend span {
    width: 24px;
    border-top: 3px dashed var(--accent-color, var(--primary-color));
  }

  .chart-message {
    display: flex;
    min-height: min(38vh, 330px);
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--secondary-text-color);
    text-align: center;
  }

  .chart-message.error {
    color: var(--error-color);
  }

  .spinner {
    width: 22px;
    height: 22px;
    border: 3px solid var(--divider-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 700ms linear infinite;
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: var(--secondary-text-color);
    font-size: 13px;
  }

  .dialog-footer span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .portrait .temperatures {
    grid-template-columns: 1fr;
  }

  .portrait .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (orientation: portrait), (max-width: 680px) {
    .auto .temperatures {
      grid-template-columns: 1fr;
    }

    .auto .metrics {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .temperature-value {
      font-size: clamp(52px, 15vw, 100px);
    }

    .dialog-header {
      gap: 10px;
    }

    .dialog-current {
      display: none;
    }

    .dialog-header {
      grid-template-columns: 1fr auto;
    }
  }

  @keyframes fade-in {
    from { opacity: 0; }
  }

  @keyframes dialog-in {
    from { transform: translateY(12px) scale(0.98); opacity: 0; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .wind-arrow,
    .history-backdrop,
    .history-dialog,
    .spinner {
      transition: none;
      animation: none;
    }
  }
`;
