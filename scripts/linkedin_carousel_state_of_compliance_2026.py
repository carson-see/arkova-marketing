"""
Generate a 5-slide LinkedIn document carousel for the State of Compliance 2026
article. Output: public/research/state-of-compliance-2026-carousel.pdf

LinkedIn document posts: portrait 1080x1350 PNG slides combined into a single
PDF (each slide = one PDF page). LinkedIn renders the PDF as a swipeable
carousel in-feed; this format gets ~3x the dwell time of single-image posts
on compliance-leader feeds.

5 slides:
  1. Cover hook
  2. The framework explosion chart
  3. Three failure modes of vendor-centric evidence
  4. What GRC platforms can't fix
  5. Pull quote + CTA
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ── Brand palette
BG = (10, 14, 26)
INK = (255, 255, 255)
DIM = (148, 163, 184)
ACCENT = (130, 184, 208)
PRE = (219, 234, 241)
PRE_BORDER = (130, 184, 208)
NEW = (245, 158, 11)
NEW_BORDER = (217, 119, 6)
SUBSTRATE = (31, 41, 55)
SUBSTRATE_BORDER = (71, 85, 105)
MUTED = (203, 213, 214)

W, H = 1080, 1350
PAD = 80


def f(name: str, size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        f"/System/Library/Fonts/{name}.ttc",
        f"/System/Library/Fonts/{name}.ttf",
        f"/System/Library/Fonts/Supplemental/{name}.ttf",
        f"/Library/Fonts/{name}.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


F_EYEBROW = f("Helvetica", 22)
F_HUGE = f("HelveticaNeue", 100)
F_BIG = f("HelveticaNeue", 64)
F_HEAD = f("HelveticaNeue", 56)
F_SUB = f("Helvetica", 32)
F_BODY = f("Helvetica", 28)
F_LABEL = f("HelveticaNeue", 26)
F_COUNT = f("Helvetica", 24)
F_SMALL = f("Helvetica", 20)
F_BYLINE = f("HelveticaNeue", 22)
F_QUOTE = f("HelveticaNeue", 56)


def new_slide() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    # Left edge accent stripe
    draw.rectangle((0, 0, 6, H), fill=ACCENT)
    return img, draw


def draw_eyebrow(draw: ImageDraw.ImageDraw, text: str, y: int = 72):
    draw.text((PAD, y), text, font=F_EYEBROW, fill=ACCENT)


def draw_footer(draw: ImageDraw.ImageDraw, page: int, total: int = 5):
    """Bottom-right page indicator + bottom-left brand."""
    draw.text((PAD, H - 60), "ARKOVA · arkova.ai/research", font=F_SMALL, fill=DIM)
    page_text = f"{page} / {total}"
    bbox = draw.textbbox((0, 0), page_text, font=F_SMALL)
    tw = bbox[2] - bbox[0]
    draw.text((W - PAD - tw, H - 60), page_text, font=F_SMALL, fill=DIM)


def wrap(text: str, font: ImageFont.FreeTypeFont,
         max_w: int, draw: ImageDraw.ImageDraw) -> list[str]:
    """Greedy wrap respecting font metrics."""
    words = text.split()
    lines: list[str] = []
    line = ""
    for word in words:
        candidate = f"{line} {word}".strip()
        bbox = draw.textbbox((0, 0), candidate, font=font)
        if bbox[2] - bbox[0] <= max_w:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


# ─────────────────────────────────────────────────────────────────────────
# SLIDE 1 — Cover hook
# ─────────────────────────────────────────────────────────────────────────
def slide1() -> Image.Image:
    img, draw = new_slide()
    draw_eyebrow(draw, "ARKOVA · RESEARCH")

    draw.text((PAD, 200), "5", font=F_HUGE, fill=INK)
    draw.text((PAD + 90, 240), "frameworks in 2018.",
              font=F_HEAD, fill=INK)
    draw.text((PAD, 360), "~20", font=F_HUGE, fill=NEW)
    draw.text((PAD + 200, 400), "in 2026.", font=F_HEAD, fill=INK)

    # Divider
    draw.rectangle((PAD, 540, W - PAD, 543), fill=ACCENT)

    sub_lines = wrap(
        "The compliance footprint a multinational carries today "
        "is roughly four times what it was eight years ago. "
        "The vendor-controlled audit substrate underneath each new "
        "regulation has not changed in twenty.",
        F_SUB, W - 2 * PAD, draw,
    )
    y = 600
    for line in sub_lines:
        draw.text((PAD, y), line, font=F_SUB, fill=MUTED)
        y += 50

    # Byline
    draw.text((PAD, H - 200), "SARAH RUSHTON", font=F_BYLINE, fill=INK)
    draw.text((PAD, H - 170), "COO & Co-Founder, Arkova", font=F_SMALL, fill=DIM)

    # Swipe hint (ASCII-safe)
    draw.text((PAD, H - 130), "SWIPE  >", font=F_SMALL, fill=ACCENT)

    draw_footer(draw, 1)
    return img


# ─────────────────────────────────────────────────────────────────────────
# SLIDE 2 — The chart
# ─────────────────────────────────────────────────────────────────────────
def slide2() -> Image.Image:
    img, draw = new_slide()
    draw_eyebrow(draw, "THE GROWTH")

    # Headline
    draw.text((PAD, 140), "Five years.", font=F_BIG, fill=INK)
    draw.text((PAD, 220), "Three new framework families.",
              font=F_BIG, fill=INK)

    # Subhead
    sub = ("NIST AI RMF · EU AI Act · DORA · SEC cyber disclosure · "
           "19 US state privacy laws · LGPD · DPDP · PDPA · POPIA · APP")
    sub_lines = wrap(sub, F_BODY, W - 2 * PAD, draw)
    y = 340
    for line in sub_lines:
        draw.text((PAD, y), line, font=F_BODY, fill=DIM)
        y += 42

    # ── Chart area
    chart_top = 580
    row_h = 50
    gap = 16
    block_w = 50
    block_gap = 6
    blocks_x = 220

    # Row 1 — 2018
    y1 = chart_top
    draw.text((PAD, y1 + (row_h - F_LABEL.size) / 2), "2018",
              font=F_LABEL, fill=INK)
    for i in range(5):
        x = blocks_x + i * (block_w + block_gap)
        draw.rounded_rectangle((x, y1, x + block_w, y1 + row_h),
                               radius=8, fill=PRE,
                               outline=PRE_BORDER, width=1)
    draw.text((blocks_x + 5 * (block_w + block_gap) + 16,
               y1 + (row_h - F_COUNT.size) / 2),
              "5 frameworks", font=F_COUNT, fill=DIM)

    # Row 2 — 2026
    y2 = y1 + row_h + gap + 30
    draw.text((PAD, y2 + (row_h - F_LABEL.size) / 2), "2026",
              font=F_LABEL, fill=INK)
    for i in range(14):
        x = blocks_x + i * (block_w + block_gap)
        face = PRE if i < 4 else NEW
        edge = PRE_BORDER if i < 4 else NEW_BORDER
        draw.rounded_rectangle((x, y2, x + block_w, y2 + row_h),
                               radius=8, fill=face, outline=edge, width=1)
    draw.text((blocks_x, y2 + row_h + 18),
              "14+ frameworks", font=F_COUNT, fill=NEW)

    # Substrate band
    sy = y2 + row_h + 80
    sw = 14 * (block_w + block_gap) - block_gap
    draw.rounded_rectangle((blocks_x, sy, blocks_x + sw, sy + 60),
                           radius=8, fill=SUBSTRATE,
                           outline=SUBSTRATE_BORDER, width=1)
    sub_text = "Same vendor-controlled audit substrate"
    bbox = draw.textbbox((0, 0), sub_text, font=F_BODY)
    tw = bbox[2] - bbox[0]
    draw.text((blocks_x + (sw - tw) / 2, sy + 14), sub_text,
              font=F_BODY, fill=DIM)

    # Tag below substrate
    draw.text((PAD, sy + 90),
              "Each new regulation lands on the same primitives.",
              font=F_BODY, fill=MUTED)

    draw_footer(draw, 2)
    return img


# ─────────────────────────────────────────────────────────────────────────
# SLIDE 3 — Three failure modes
# ─────────────────────────────────────────────────────────────────────────
def slide3() -> Image.Image:
    img, draw = new_slide()
    draw_eyebrow(draw, "THE PROBLEM")

    draw.text((PAD, 140), "Why the substrate", font=F_BIG, fill=INK)
    draw.text((PAD, 220), "is broken.", font=F_BIG, fill=INK)

    items = [
        ("LOCK-IN",
         "When evidence lives inside a vendor's system, leaving the vendor "
         "breaks the audit chain. Old timestamps may not survive the round-trip."),
        ("MIGRATION",
         "Internal system migrations create the same problem without changing "
         "vendors. Every transition quietly degrades chain-of-custody."),
        ("SELF-ATTESTATION",
         "The vendor stores, exports, and timestamps its own evidence. "
         "Auditors accept this because there is no commonly available alternative."),
    ]

    y = 380
    for i, (label, text) in enumerate(items, 1):
        # Number
        draw.text((PAD, y - 4), str(i),
                  font=F_BIG, fill=ACCENT)
        # Label
        draw.text((PAD + 90, y + 8), label,
                  font=F_LABEL, fill=NEW)
        # Body
        body_lines = wrap(text, F_BODY, W - PAD - 90 - PAD, draw)
        body_y = y + 50
        for line in body_lines:
            draw.text((PAD + 90, body_y), line, font=F_BODY, fill=MUTED)
            body_y += 40
        y = body_y + 40

    draw_footer(draw, 3)
    return img


# ─────────────────────────────────────────────────────────────────────────
# SLIDE 4 — What GRC can't fix
# ─────────────────────────────────────────────────────────────────────────
def slide4() -> Image.Image:
    img, draw = new_slide()
    draw_eyebrow(draw, "WHAT DOESN'T SOLVE THIS")

    draw.text((PAD, 140), "GRC platforms", font=F_BIG, fill=INK)
    draw.text((PAD, 220), "aggregate evidence.", font=F_BIG, fill=INK)

    draw.text((PAD, 380), "Vanta · Drata · Secureframe · Workiva",
              font=F_BODY, fill=DIM)

    # Big quote-style line
    body = ("They do not produce evidence that can be verified "
            "independently of the system that stored it.")
    body_lines = wrap(body, F_HEAD, W - 2 * PAD, draw)
    y = 480
    for line in body_lines:
        draw.text((PAD, y), line, font=F_HEAD, fill=INK)
        y += 70

    # Divider
    draw.rectangle((PAD, y + 30, W - PAD, y + 33), fill=NEW)

    # Lower kicker
    kicker = ("Aggregation is necessary. It is not sufficient. "
              "An auditor examining a vendor log has no way to verify "
              "log entries haven't been modified. They are trusting the "
              "system and the operator.")
    kicker_lines = wrap(kicker, F_BODY, W - 2 * PAD, draw)
    y = y + 80
    for line in kicker_lines:
        draw.text((PAD, y), line, font=F_BODY, fill=MUTED)
        y += 42

    draw_footer(draw, 4)
    return img


# ─────────────────────────────────────────────────────────────────────────
# SLIDE 5 — Pull quote + CTA
# ─────────────────────────────────────────────────────────────────────────
def slide5() -> Image.Image:
    img, draw = new_slide()
    draw_eyebrow(draw, "THE BOTTOM LINE")

    # Big amber bar above the quote (visual anchor)
    draw.rectangle((PAD, 220, PAD + 80, 226), fill=NEW)

    quote = ('"You cannot solve a verification problem by adding '
             'more frameworks. You solve it by fixing what evidence '
             'actually means."')
    quote_lines = wrap(quote, F_QUOTE, W - 2 * PAD, draw)
    y = 270
    for line in quote_lines:
        draw.text((PAD, y), line, font=F_QUOTE, fill=INK)
        y += 70

    y += 40
    draw.text((PAD, y), "SARAH RUSHTON",
              font=F_BYLINE, fill=INK)
    draw.text((PAD, y + 30), "COO & Co-Founder, Arkova",
              font=F_SMALL, fill=DIM)

    # CTA card
    cta_y = H - 320
    draw.rounded_rectangle((PAD, cta_y, W - PAD, cta_y + 160),
                           radius=14, fill=SUBSTRATE,
                           outline=ACCENT, width=2)
    draw.text((PAD + 30, cta_y + 28),
              "Read the full piece.", font=F_HEAD, fill=INK)
    draw.text((PAD + 30, cta_y + 100),
              "arkova.ai/research/state-of-compliance-2026",
              font=F_BODY, fill=ACCENT)

    draw_footer(draw, 5)
    return img


def main():
    slides = [slide1(), slide2(), slide3(), slide4(), slide5()]
    out_dir = Path(__file__).resolve().parent.parent / "public" / "research"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "state-of-compliance-2026-carousel.pdf"

    slides[0].save(out_path, "PDF", resolution=150,
                   save_all=True, append_images=slides[1:])
    print(f"Wrote {out_path} ({out_path.stat().st_size} bytes, "
          f"{len(slides)} slides at {W}x{H})")

    # Also save individual PNGs for preview / manual upload
    for i, slide in enumerate(slides, 1):
        png_path = out_dir / f"state-of-compliance-2026-carousel-{i}.png"
        slide.save(png_path, "PNG", optimize=True)
    print(f"Wrote {len(slides)} preview PNGs alongside the PDF")


if __name__ == "__main__":
    main()
