# Weather Kiosk Card

A landscape-first, responsive Home Assistant weather-station card designed to
fill a wall-mounted tablet and remain readable from across a room.

Version 0.3 renders live state, follows the active Home Assistant theme,
supports portrait displays, preserves real zero values, and opens an in-card
history graph when any value is pressed. It includes a graphical card editor,
so normal setup does not require writing YAML.

## Install with HACS

The GitHub repository must be named `weather-kiosk-card`. The compiled file
`dist/weather-kiosk-card.js` is intentionally committed because HACS installs
that browser bundle; it does not build the TypeScript source.

1. In HACS, open **Dashboard**.
2. Open the three-dot menu and choose **Custom repositories**.
3. Enter the GitHub repository URL, select **Dashboard**, and add it.
4. Find **Weather Kiosk Card** in HACS and choose **Download**.
5. Refresh the browser. If the card is still not listed in the card picker,
   clear the frontend cache or reload Home Assistant.

If HACS reports an invalid structure, verify on GitHub—not only locally—that
the default branch contains both:

```text
hacs.json
dist/weather-kiosk-card.js
```

Do not upload the project ZIP as a single file in the repository. Extract its
contents so `hacs.json`, `README.md`, `src/`, and `dist/` are at repository
root.

## Add the card to a dashboard

The graphical editor is the recommended setup method:

1. Edit the dashboard and select **Add card**.
2. Search for **Weather Kiosk** and select it.
3. Choose the indoor and outdoor temperature entities. These two are required.
4. Add any available humidity, pressure, rain, and wind sensors.
5. Select **Save**.

The editor also provides the title, layout, and pressure-trend threshold. YAML
mode remains available for copying configurations or advanced troubleshooting.

### Manual YAML configuration

After HACS installs the card, edit a dashboard, add a **Manual** card, and use:

```yaml
type: custom:weather-kiosk-card
title: Weather at home
layout: auto
entities:
  outdoor_temperature: sensor.ecowitt_outdoor_temperature
  indoor_temperature: sensor.airthings_indoor_temperature
```

Replace those two example entity IDs with your own. They are required; the
remaining sensors below are optional.

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

Every configured value is independently tappable. The history overlay reads
the entity from Home Assistant Recorder and supports 6-hour, 24-hour, and
7-day ranges. Its **Entity details** button still opens Home Assistant's native
more-info dialog.

Pressure trend is calculated automatically by comparing the current pressure
with the oldest recorded value from the last three hours. The default steady
threshold is selected from the pressure unit. It can be overridden at card
level when needed:

```yaml
pressure_trend_threshold: 0.5
```

The threshold uses the same unit as the configured pressure entity.

## Development

```bash
npm install
npm run check
npm test
npm run build
```

For a manual installation, copy `dist/weather-kiosk-card.js` to Home
Assistant's `config/www` directory, then add `/local/weather-kiosk-card.js` as
a JavaScript module dashboard resource. Use a panel view for the intended
full-screen kiosk presentation.

## Planned next slices

- Forecast panel
- Browser-level visual and interaction tests
