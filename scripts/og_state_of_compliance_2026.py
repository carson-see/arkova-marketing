"""
Generate the OG card for Sarah's State of Compliance 2026 article.
Output: public/research/state-of-compliance-2026-og.png (1200x630)

Built with PIL for pixel-precise layout. Dark theme matches the marketing
site. Headline + comparison chart (5 vs 14+ frameworks, 10 added since 2020)
+ shared substrate bar + byline.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ── Brand palette
BG = (10, 14, 26)               # #0a0e1a
INK = (255, 255, 255)
DIM = (148, 163, 184)           # #94a3b8
ACCENT = (130, 184, 208)        # #82b8d0 arkova-steel
PRE = (219, 234, 241)           # #dbeaf1
PRE_BORDER = (130, 184, 208)
NEW = (245, 158, 11)            # #f59e0b
NEW_BORDER = (217, 119, 6)
SUBSTRATE = (31, 41, 55)        # #1f2937
SUBSTRATE_BORDER = (71, 85, 105) # #475569

W, H = 1200, 630


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    """Try a few common macOS font paths; fall back to default."""
    candidates = [
        f"/System/Library/Fonts/{name}.ttc",
        f"/System/Library/Fonts/{name}.ttf",
        f"/Library/Fonts/{name}.ttf",
        f"/System/Library/Fonts/Supplemental/{name}.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


# Fonts: Helvetica for marketing-grade type
font_eyebrow = load_font("Helvetica", 16)
font_title = load_font("HelveticaNeue", 58) or load_font("Helvetica", 58)
font_subhead = load_font("Helvetica", 24)
font_label = load_font("HelveticaNeue", 22)
font_count = load_font("Helvetica", 18)
font_substrate = load_font("HelveticaNeue", 14)
font_byline_name = load_font("Helvetica", 16)
font_byline_role = load_font("Helvetica", 14)
font_legend = load_font("Helvetica", 13)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── Eyebrow
draw.text((60, 50), "ARKOVA  ·  RESEARCH", font=font_eyebrow, fill=ACCENT)

# ── Headline
draw.text((60, 96), "The State of Compliance", font=font_title, fill=INK)
draw.text((60, 162), "in 2026", font=font_title, fill=INK)

# ── Subhead
draw.text((60, 240), "Why more frameworks won't fix the evidence problem.",
          font=font_subhead, fill=DIM)

# ── Comparison chart
chart_top = 320
row_h = 38
gap = 10
block_w = 36
block_gap = 4
label_x = 60
blocks_x = 180

# Row 1: 2018 — 5 pre-2020 blocks
y1 = chart_top
draw.text((label_x, y1 + (row_h - font_label.size) / 2), "2018",
          font=font_label, fill=INK)
for i in range(5):
    x = blocks_x + i * (block_w + block_gap)
    draw.rounded_rectangle((x, y1, x + block_w, y1 + row_h),
                           radius=6, fill=PRE, outline=PRE_BORDER, width=1)
draw.text((blocks_x + 5 * (block_w + block_gap) + 14,
           y1 + (row_h - font_count.size) / 2),
          "5 frameworks", font=font_count, fill=DIM)

# Row 2: 2026 — 4 pre-2020 + 10 new
y2 = y1 + row_h + gap
draw.text((label_x, y2 + (row_h - font_label.size) / 2), "2026",
          font=font_label, fill=INK)
for i in range(14):
    x = blocks_x + i * (block_w + block_gap)
    if i < 4:
        face, edge = PRE, PRE_BORDER
    else:
        face, edge = NEW, NEW_BORDER
    draw.rounded_rectangle((x, y2, x + block_w, y2 + row_h),
                           radius=6, fill=face, outline=edge, width=1)
draw.text((blocks_x + 14 * (block_w + block_gap) + 14,
           y2 + (row_h - font_count.size) / 2),
          "14+ frameworks", font=font_count, fill=NEW)

# Substrate bar — spans the full width of the 2026 row
substrate_y = y2 + row_h + 16
substrate_h = 36
substrate_w = 14 * (block_w + block_gap) - block_gap
draw.rounded_rectangle(
    (blocks_x, substrate_y, blocks_x + substrate_w, substrate_y + substrate_h),
    radius=6, fill=SUBSTRATE, outline=SUBSTRATE_BORDER, width=1)
substrate_text = "Same vendor-controlled audit substrate underneath both"
text_bbox = draw.textbbox((0, 0), substrate_text, font=font_substrate)
text_w = text_bbox[2] - text_bbox[0]
text_h = text_bbox[3] - text_bbox[1]
draw.text((blocks_x + (substrate_w - text_w) / 2,
           substrate_y + (substrate_h - text_h) / 2 - 2),
          substrate_text, font=font_substrate, fill=DIM)

# ── Byline (bottom-left)
byline_y = H - 70
draw.text((60, byline_y), "SARAH RUSHTON", font=font_byline_name, fill=INK)
draw.text((60, byline_y + 22),
          "COO & Co-Founder, Arkova   ·   arkova.ai/research",
          font=font_byline_role, fill=DIM)

# ── Legend (bottom-right)
legend_y = H - 50
legend_x = W - 240
swatch = 14
draw.rounded_rectangle(
    (legend_x, legend_y, legend_x + swatch, legend_y + swatch),
    radius=2, fill=NEW, outline=NEW_BORDER, width=1)
draw.text((legend_x + swatch + 8, legend_y - 1),
          "Added since 2020", font=font_legend, fill=DIM)

# Subtle accent stripe along the left edge
draw.rectangle((0, 0, 4, H), fill=ACCENT)

out_dir = Path(__file__).resolve().parent.parent / "public" / "research"
out_dir.mkdir(parents=True, exist_ok=True)
out_path = out_dir / "state-of-compliance-2026-og.png"
img.save(out_path, "PNG", optimize=True)
print(f"Wrote {out_path} ({out_path.stat().st_size} bytes, {W}x{H})")
