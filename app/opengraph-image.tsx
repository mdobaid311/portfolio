import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Mohammed Obaid: I build web software end to end, mostly after dark.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#eeebe4";
const INK = "#121212";
const MUTED = "#9b968d"; // the night tone's dim grey
const ACCENT = "#d9381e"; // the LED
const TEXT = "Mohammed ObaidFull-stack engineer, HyderabadI build web softwareend to end,mostlyafter dark.mohammedobaid.in";

/** Schibsted Grotesk from Google Fonts, subset to the text above. Satori needs TTF/OTF, which the CSS API serves to non-browser agents. */
async function font(axis: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:${axis}&text=${encodeURIComponent(TEXT)}`,
  ).then((r) => r.text());
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error("no ttf in font CSS");
  return fetch(src).then((r) => r.arrayBuffer());
}

/** The hero at night: paper headline on ink, the desk footage set inline as a word, the red LED. Rendered once at build. */
export default async function Image() {
  const poster = await readFile(join(process.cwd(), "public/hero-poster.jpg"));
  const footage = `data:image/jpeg;base64,${poster.toString("base64")}`;

  // Without network at build time, fall back to the default face rather than failing the build.
  // Every weight used below must be loaded, or Satori substitutes the nearest face (the italic, for 400).
  const fonts = await Promise.all([font("wght@400"), font("wght@600"), font("ital,wght@1,500")])
    .then(([regular, bold, italic]) => [
      { name: "Schibsted", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Schibsted", data: bold, weight: 600 as const, style: "normal" as const },
      { name: "Schibsted", data: italic, weight: 500 as const, style: "italic" as const },
    ])
    .catch(() => undefined);

  const line = { display: "flex", alignItems: "center", height: 104 } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          background: INK,
          color: PAPER,
          fontFamily: "Schibsted",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
          <span style={{ fontWeight: 600 }}>Mohammed Obaid</span>
          {/* The standby LED: the one spot of colour. */}
          <span style={{ width: 16, height: 16, borderRadius: 8, background: ACCENT }} />
          <span style={{ color: MUTED }}>Full-stack engineer, Hyderabad</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 100, fontWeight: 600, letterSpacing: -4.5, lineHeight: 1 }}>
          <div style={line}>I build web software</div>
          <div style={line}>
            end to end,
            {/* Satori renders plain <img> only; the footage is decorative, the alt export describes the card. */}
            {/* The footage is dark, so a hairline keeps the capsule's outline against the ink. */}
            <div style={{ display: "flex", marginLeft: 26, width: 210, height: 74, borderRadius: 37, overflow: "hidden", border: "2px solid #5a5853" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={footage}
                width={206}
                height={70}
                style={{ objectFit: "cover", objectPosition: "49% 37%" }}
              />
            </div>
          </div>
          <div style={line}>
            mostly
            <span style={{ marginLeft: 26, fontStyle: "italic", fontWeight: 500 }}>after dark.</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: MUTED }}>mohammedobaid.in</div>
      </div>
    ),
    { ...size, fonts },
  );
}
