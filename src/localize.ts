export interface WeatherKioskTranslations {
  defaultTitle: string;
  cardName: string;
  cardDescription: string;
  temperatures: string;
  weatherDetails: string;
  outdoor: string;
  indoor: string;
  temperature: string;
  humidity: string;
  pressure: string;
  rainNow: string;
  rain24h: string;
  wind: string;
  windSpeed: string;
  windDirection: string;
  rising: string;
  steady: string;
  falling: string;
  trendUnavailable: string;
  history: string;
  closeHistory: string;
  historyRange: string;
  loadingHistory: string;
  now: string;
  noHistory: string;
  entityDetails: string;
  historyError: string;
  forecast: string;
  forecast24h: string;
  minimumAbbreviation: string;
  maximumAbbreviation: string;
  showHistory: (label: string) => string;
  historyGraph: (label: string) => string;
  editor: {
    display: string;
    displayDescription: string;
    title: string;
    layout: string;
    automatic: string;
    landscape: string;
    portrait: string;
    temperatures: string;
    temperaturesDescription: string;
    humidity: string;
    humidityDescription: string;
    weatherDetails: string;
    weatherDetailsDescription: string;
    outdoorTemperature: string;
    indoorTemperature: string;
    outdoorHumidity: string;
    indoorHumidity: string;
    pressure: string;
    currentRainRate: string;
    rain24h: string;
    windSpeed: string;
    windDirection: string;
    pressureTrend: string;
    pressureTrendDescription: string;
    steadyThreshold: string;
    automaticThreshold: string;
    pressureUnitHelper: string;
    forecast: string;
    forecastDescription: string;
    forecastEntity: string;
    forecastType: string;
    hourly: string;
    daily: string;
  };
}

const en: WeatherKioskTranslations = {
  defaultTitle: "Weather",
  cardName: "Weather Kiosk",
  cardDescription: "A full-screen weather station card for wall-mounted displays.",
  temperatures: "Temperatures",
  weatherDetails: "Weather details",
  outdoor: "Outdoor",
  indoor: "Indoor",
  temperature: "temperature",
  humidity: "Humidity",
  pressure: "Pressure",
  rainNow: "Rain now",
  rain24h: "Rain · 24 h",
  wind: "Wind",
  windSpeed: "Wind speed",
  windDirection: "Wind direction",
  rising: "rising",
  steady: "steady",
  falling: "falling",
  trendUnavailable: "Trend unavailable",
  history: "History",
  closeHistory: "Close history",
  historyRange: "History range",
  loadingHistory: "Loading history…",
  now: "Now",
  noHistory: "No recorded numeric history for this period.",
  entityDetails: "Entity details",
  historyError: "History could not be loaded. Check that Recorder includes this entity.",
  forecast: "Forecast",
  forecast24h: "Next 24 h",
  minimumAbbreviation: "min",
  maximumAbbreviation: "max",
  showHistory: (label) => `Show ${label.toLowerCase()} history`,
  historyGraph: (label) => `${label} history graph`,
  editor: {
    display: "Display",
    displayDescription: "Choose the heading and how the card responds to its available space.",
    title: "Title",
    layout: "Layout",
    automatic: "Automatic",
    landscape: "Landscape",
    portrait: "Portrait",
    temperatures: "Temperatures",
    temperaturesDescription: "Both temperature sensors are required and shown at equal size.",
    humidity: "Humidity",
    humidityDescription: "Optional humidity readings shown with their matching temperature.",
    weatherDetails: "Weather details",
    weatherDetailsDescription: "Optional pressure, rain, and wind readings.",
    outdoorTemperature: "Outdoor temperature",
    indoorTemperature: "Indoor temperature",
    outdoorHumidity: "Outdoor humidity",
    indoorHumidity: "Indoor humidity",
    pressure: "Pressure",
    currentRainRate: "Current rain rate",
    rain24h: "Rain over the last 24 hours",
    windSpeed: "Wind speed",
    windDirection: "Wind direction",
    pressureTrend: "Pressure trend",
    pressureTrendDescription: "Leave blank to use the automatic threshold for the pressure unit.",
    steadyThreshold: "Steady threshold",
    automaticThreshold: "Automatic",
    pressureUnitHelper: "Uses the configured pressure sensor's unit.",
    forecast: "Forecast",
    forecastDescription: "Select a weather entity. Outdoor graphs then place now at the center, with history before it and forecast after it.",
    forecastEntity: "Weather entity",
    forecastType: "Forecast resolution",
    hourly: "Hourly",
    daily: "Daily",
  },
};

const da: WeatherKioskTranslations = {
  defaultTitle: "Vejret",
  cardName: "Vejrkiosk",
  cardDescription: "Et vejrstationskort i fuld skærm til vægmonterede skærme.",
  temperatures: "Temperaturer",
  weatherDetails: "Vejrdata",
  outdoor: "Ude",
  indoor: "Inde",
  temperature: "temperatur",
  humidity: "Luftfugtighed",
  pressure: "Lufttryk",
  rainNow: "Regn nu",
  rain24h: "Regn · 24 t",
  wind: "Vind",
  windSpeed: "Vindhastighed",
  windDirection: "Vindretning",
  rising: "stigende",
  steady: "stabilt",
  falling: "faldende",
  trendUnavailable: "Trend ikke tilgængelig",
  history: "Historik",
  closeHistory: "Luk historik",
  historyRange: "Tidsinterval for historik",
  loadingHistory: "Indlæser historik…",
  now: "Nu",
  noHistory: "Der er ingen registrerede numeriske data for perioden.",
  entityDetails: "Entitetsoplysninger",
  historyError: "Historikken kunne ikke indlæses. Kontrollér, at Recorder medtager denne entitet.",
  forecast: "Prognose",
  forecast24h: "Næste 24 t",
  minimumAbbreviation: "min.",
  maximumAbbreviation: "maks.",
  showHistory: (label) => `Vis historik for ${label.toLowerCase()}`,
  historyGraph: (label) => `Historikgraf for ${label.toLowerCase()}`,
  editor: {
    display: "Visning",
    displayDescription: "Vælg overskrift, og hvordan kortet tilpasses den tilgængelige plads.",
    title: "Titel",
    layout: "Layout",
    automatic: "Automatisk",
    landscape: "Liggende",
    portrait: "Stående",
    temperatures: "Temperaturer",
    temperaturesDescription: "Begge temperatursensorer er påkrævede og vises lige store.",
    humidity: "Luftfugtighed",
    humidityDescription: "Valgfri luftfugtighed, som vises sammen med den tilhørende temperatur.",
    weatherDetails: "Vejrdata",
    weatherDetailsDescription: "Valgfri målinger af lufttryk, regn og vind.",
    outdoorTemperature: "Udendørstemperatur",
    indoorTemperature: "Indendørstemperatur",
    outdoorHumidity: "Udendørs luftfugtighed",
    indoorHumidity: "Indendørs luftfugtighed",
    pressure: "Lufttryk",
    currentRainRate: "Aktuel regnintensitet",
    rain24h: "Regn de seneste 24 timer",
    windSpeed: "Vindhastighed",
    windDirection: "Vindretning",
    pressureTrend: "Lufttrykstrend",
    pressureTrendDescription: "Lad feltet stå tomt for at bruge den automatiske grænse for lufttryksenheden.",
    steadyThreshold: "Grænse for stabilt lufttryk",
    automaticThreshold: "Automatisk",
    pressureUnitHelper: "Bruger den konfigurerede lufttrykssensors enhed.",
    forecast: "Prognose",
    forecastDescription: "Vælg en vejrentitet. Udendørsgrafer placerer derefter nu i midten med historik før og prognose efter.",
    forecastEntity: "Vejrentitet",
    forecastType: "Prognoseopløsning",
    hourly: "Timevis",
    daily: "Daglig",
  },
};

export function translationsFor(language: string | undefined): WeatherKioskTranslations {
  const baseLanguage = language?.toLowerCase().split(/[-_]/)[0];
  return baseLanguage === "da" ? da : en;
}
