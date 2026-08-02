import { WeatherKioskCard } from "./weather-kiosk-card";

const CARD_TAG = "weather-kiosk-card";

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, WeatherKioskCard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: "Weather Kiosk",
    description: "A full-screen weather station card for wall-mounted displays.",
    preview: false,
  });
}

console.info(
  "%c WEATHER-KIOSK-CARD %c 0.1.0 ",
  "color: white; background: #1565c0; font-weight: 700;",
  "color: #1565c0; background: white; font-weight: 700;",
);
