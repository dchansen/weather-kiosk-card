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

  h1 {
    margin: 0;
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

  button.temperature,
  button.metric {
    width: 100%;
    color: inherit;
    font: inherit;
    text-align: inherit;
    cursor: pointer;
  }

  button.temperature:hover,
  button.metric:hover,
  button.temperature:focus-visible,
  button.metric:focus-visible {
    border-color: var(--primary-color);
    outline: none;
  }

  .temperature {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 190px;
    padding: clamp(14px, 2.8vmin, 34px);
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

  .humidity {
    margin-top: clamp(10px, 2vmin, 24px);
    color: var(--secondary-text-color);
    font-size: clamp(16px, 2.4vmin, 29px);
    font-variant-numeric: tabular-nums;
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

  .wind-value {
    display: flex;
    align-items: center;
    gap: 0.35em;
  }

  .wind-arrow {
    display: inline-block;
    color: var(--primary-color);
    transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .unavailable {
    opacity: 0.55;
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
  }

  @media (prefers-reduced-motion: reduce) {
    .wind-arrow {
      transition: none;
    }
  }
`;
