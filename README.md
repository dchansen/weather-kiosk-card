# Weather Kiosk Card

A landscape-first, responsive Home Assistant weather-station card designed to
fill a wall-mounted tablet and remain readable from across a room.

This is a clean v0.1 foundation. It renders live state, follows the active Home
Assistant theme, supports portrait displays, preserves real zero values, and
opens Home Assistant's entity details when a value is pressed.

## Configuration

```yaml
type: custom:weather-kiosk-card
title: Weather at home
layout: auto
entities:
  outdoor_temperature: sensor.ecowitt_outdoor_temperature
  indoor_temperature: sensor.airthings_indoor_temperature
  outdoor_humidity: sensor.ecowitt_outdoor_humidity
  indoor_humidity: sensor.airthings_indoor_humidity
  pressure: sensor.ecowitt_relative_pressure
  rain_rate: sensor.ecowitt_rain_rate
  rain_24h: sensor.ecowitt_rain_24_hours
  wind_speed: sensor.ecowitt_wind_speed
  wind_direction: sensor.ecowitt_wind_direction
```

Only `outdoor_temperature` and `indoor_temperature` are required. All entity
IDs are configurable; the card does not depend on a particular integration.

`layout` accepts `auto`, `landscape`, or `portrait`. In `auto`, CSS orientation
and available width determine the layout.

## Development

```bash
npm install
npm run check
npm test
npm run build
```

Copy `dist/weather-kiosk-card.js` to Home Assistant's `config/www` directory,
then add `/local/weather-kiosk-card.js` as a JavaScript module dashboard
resource. Use a panel view for the intended full-screen kiosk presentation.

## Planned next slices

- Pressure trend and richer wind/rain presentation
- Forecast panel
- In-card history graphs with selectable time ranges
- Graphical card editor
- Browser-level visual and interaction tests
- Release/HACS automation
