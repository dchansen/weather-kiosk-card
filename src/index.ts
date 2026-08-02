import { WeatherKioskCard } from "./weather-kiosk-card";
import { WeatherKioskCardEditor } from "./weather-kiosk-editor";
import { translationsFor } from "./localize";

const CARD_TAG = "weather-kiosk-card";
const EDITOR_TAG = "weather-kiosk-card-editor";

if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, WeatherKioskCardEditor);
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, WeatherKioskCard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === CARD_TAG)) {
  const translations = translationsFor(document.documentElement.lang);
  window.customCards.push({
    type: CARD_TAG,
    name: translations.cardName,
    description: translations.cardDescription,
    preview: false,
  });
}

console.info(
  "%c WEATHER-KIOSK-CARD %c 0.5.0 ",
  "color: white; background: #1565c0; font-weight: 700;",
  "color: #1565c0; background: white; font-weight: 700;",
);
