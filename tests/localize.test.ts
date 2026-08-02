import { describe, expect, it } from "vitest";
import { translationsFor } from "../src/localize";

describe("translationsFor", () => {
  it.each(["da", "da-DK", "da_DK"])(
    "selects Danish for %s",
    (language) => {
      const translations = translationsFor(language);

      expect(translations.defaultTitle).toBe("Vejret");
      expect(translations.editor.outdoorTemperature).toBe(
        "Udendørstemperatur",
      );
      expect(translations.showHistory("Lufttryk")).toBe(
        "Vis historik for lufttryk",
      );
      expect(translations.forecast).toBe("Prognose");
      expect(translations.editor.forecastEntity).toBe("Vejrentitet");
    },
  );

  it("falls back to English for unsupported languages", () => {
    expect(translationsFor("de-DE").defaultTitle).toBe("Weather");
  });
});
