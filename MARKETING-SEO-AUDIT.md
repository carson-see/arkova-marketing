# Marketing SEO Audit — arkova.ai

Date: 2026-04-26
Companion to: [GEO-TECHNICAL-AUDIT.md](GEO-TECHNICAL-AUDIT.md) (which scored 86 → ~98 after PR #18)
Method: live page inspection + WebSearch competitive analysis + on-page meta inventory from `prerender.mjs`

## Executive Summary

**Arkova has a strong technical and editorial foundation but a weak commercial keyword footprint.** The site ranks (or could rank) for thoughtful, low-volume thought-leadership terms — *"agentic recordkeeping"*, *"cryptographic verification"*, *"convergence stack"* — but it currently does not target any of the high-intent, high-volume terms where prospects actually are: **`SOC 2 compliance software`**, **`Vanta alternatives`**, **`audit automation`**, **`HIPAA compliance platform`**, etc.

The competitor space (Vanta, Drata, Secureframe, Sprinto, Hyperproof, Scytale) has invested heavily in framework-specific landing pages, comparison pages, and SEO-optimized cost calculators. Arkova has zero of any of those. That's the biggest gap. Closing it does not require new positioning — Arkova's actual differentiation (multi-jurisdiction breadth, cryptographic verification, privacy-first) is genuinely strong; it just needs landing pages that map to the keywords prospects type.

The top three priorities, in order:
1. **Fix the meta description on every research article** — three are 200–360 chars, far over the 160 limit, getting truncated in SERPs
2. **Build framework-specific landing pages** — `/compliance/sox`, `/compliance/hipaa`, `/compliance/gdpr`, `/compliance/ferpa`, `/compliance/dora` — each ~1,500 words, real differentiation pitch
3. **Build "vs Vanta / vs Drata" comparison pages** — each captures 2–10K monthly searches at high commercial intent

Overall assessment: **needs commercial-keyword work**. Foundation is solid; volume is missing.

---

## Keyword Opportunity Table

Volume / difficulty estimates are directional (no Ahrefs/Semrush MCP connected) and based on competitive landscape research.

| # | Keyword | Est. Difficulty | Opportunity | Current Ranking | Intent | Recommended Content Type |
|---|---|---|---|---|---|---|
| 1 | Vanta alternatives | Hard | **High** | None | Commercial | Comparison page `/compare/vanta` |
| 2 | Drata alternatives | Hard | **High** | None | Commercial | Comparison page `/compare/drata` |
| 3 | Secureframe alternatives | Moderate | **High** | None | Commercial | Comparison page `/compare/secureframe` |
| 4 | SOX audit automation | Moderate | **High** | None | Commercial | Framework page `/compliance/sox` |
| 5 | HIPAA compliance platform | Hard | **High** | None | Commercial | Framework page `/compliance/hipaa` |
| 6 | GDPR audit software | Hard | **High** | None | Commercial | Framework page `/compliance/gdpr` |
| 7 | EU AI Act compliance | Moderate | **High** | None | Commercial | Framework page `/compliance/eu-ai-act` (timely) |
| 8 | DORA compliance software | Easy | **High** | None | Commercial | Framework page `/compliance/dora` (timely) |
| 9 | FERPA compliance software | Easy | **High** | None | Commercial | Framework page `/compliance/ferpa` (less competitive) |
| 10 | Multi-jurisdiction compliance | Easy | **High** | None | Commercial | Pillar page (Arkova's core differentiator) |
| 11 | Cryptographic audit trail | Easy | Medium | None | Informational | Already covered in `/whitepaper`; add a dedicated explainer page |
| 12 | SOC 2 audit cost calculator | Hard | Medium | None | Commercial | Skip — saturated by 5+ free tools |
| 13 | Audit prep time calculator | Easy | **High** | None | Commercial | Free tool — Arkova-native angle |
| 14 | Compliance evidence verification | Moderate | **High** | None | Commercial | Cluster page `/use-cases/evidence-verification` |
| 15 | Continuous compliance monitoring | Hard | Medium | None | Commercial | Capability page |
| 16 | Audit ready export | Easy | Medium | None | Commercial | Capability page |
| 17 | Privacy-preserving compliance | Easy | **High** | None | Commercial | Cluster page (Arkova's privacy moat) |
| 18 | Document fingerprinting | Easy | Medium | None | Informational | Glossary/explainer |
| 19 | Independent audit verification | Easy | Medium | None | Informational | Explainer + research linking |
| 20 | What is FERPA / SOX / GDPR (each) | Moderate | Medium | None | Informational | Glossary entries with internal links |
| 21 | Agentic recordkeeping | Easy | Medium | Likely indirect | Informational | Already covered ✓ — Arkova may already rank |
| 22 | NIST AI RMF compliance | Easy | **High** | None | Commercial | Framework page (timely + low-competition) |
| 23 | SEC cybersecurity disclosure compliance | Easy | Medium | None | Commercial | Framework page |
| 24 | Audit fatigue / quarterly audit fire drill | Easy | Low | None | Informational | Already covered in research articles |
| 25 | GxP compliance pharma FMCG | Moderate | Medium | None | Commercial | Industry vertical page (Sarah's angle) |

---

## On-Page Issues Table

Audited every prerendered route. Title and meta description inventory pulled from `prerender.mjs`. Severity rated against impact on SERP click-through rate and Google Discover.

| Page | Issue | Severity | Recommended Fix |
|---|---|---|---|
| `/research/state-of-compliance-2026` | Meta description **358 chars** (160 max) | Critical | Trim to ≤160. Suggested: *"Average audit fees hit $6.06M in FY2024 while NIST AI RMF, EU AI Act, DORA, SEC cyber, and 19 US state privacy laws landed since 2020. Why more frameworks won't fix the evidence problem. By Sarah Rushton."* (197 chars — still trim) |
| `/research/state-of-compliance-2026` | Title tag **122 chars** | High | Trim to ≤60. Suggested: *"The State of Compliance in 2026 — Arkova Research"* (51 chars) — drop the subtitle from the title |
| `/research/rise-of-agentic-economy` | Meta description **264 chars** | Critical | Trim to ≤160 |
| `/research/rise-of-agentic-economy` | Title tag **112 chars** | High | Trim to ≤60 |
| `/research/agentic-recordkeeping` | Title tag **96 chars** | High | Trim to ≤60 |
| `/research/convergence-stack` | Title tag **91 chars** | High | Trim to ≤60 |
| `/research/government-records` | Title tag **96 chars** | High | Trim to ≤60 |
| `/research` (index) | Title only **26 chars** ("Research & Insights — Arkova") | Medium | Add a keyword target. Suggested: *"Compliance & Audit Automation Research — Arkova"* (49 chars) |
| `/` (homepage) | Description 161 chars (just over 160) | Low | Tighten by 1–2 words |
| `/contact` | Title **18 chars** ("Contact — Arkova") | Low | Add intent. Suggested: *"Contact — Request Early Access — Arkova"* (40 chars) |
| `/wiki` | Title pitches "partners, investors, integration teams" but the page also has SEO value for technical buyers | Low | Add `Architecture` to title for Google: *"Architecture & Security Wiki — Arkova"* |
| All article pages | Articles use H2 sub-section headings but no FAQ schema even when sections clearly contain Q&A | Medium | Add `FAQPage` JSON-LD when an article has >3 H2 sections that read as questions |
| Homepage | "Multi-jurisdiction compliance, one platform" section — 18 framework chips link to Wikipedia (PR #17 fix) | Low | Replace with anchor links to internal `/compliance/{slug}` pages once those exist |

**Quality check on the rest** (no issues found):
- Single H1 per page ✓
- Sequential heading order (no H2→H4 jumps) ✓
- All images have alt text ✓
- Canonical tags on every page, self-referencing ✓
- All title tags include "Arkova" brand suffix ✓ (good for branded search)

---

## Content Gap Recommendations

Identified by comparing Arkova's current content footprint to Vanta / Drata / Secureframe / Hyperproof / Sprinto.

### Tier 1 — High priority (commercial impact, Arkova-shaped)

| Topic | Why It Matters | Format | Priority | Effort |
|---|---|---|---|---|
| **`/compare/vanta`** | "Vanta alternatives" gets 2–10K monthly searches. Vanta's own "Vanta vs X" pages capture huge clicks. Arkova's differentiators (multi-jurisdiction, cryptographic verification, privacy-first) are real. | Comparison page | High | Half day |
| **`/compare/drata`** | Same logic; Drata's user base skews enterprise GRC | Comparison page | High | Half day |
| **`/compare/secureframe`** | Lower volume but lower competition | Comparison page | Medium | Half day |
| **`/compliance/sox`** | "SOX automation" is the keyword Sarah's State of Compliance article should funnel to. Currently the article ranks for nothing because no commercial landing page exists. | Framework landing page | High | 1 day |
| **`/compliance/hipaa`** | Healthcare GRC is a high-LTV vertical | Framework landing page | High | 1 day |
| **`/compliance/gdpr`** | Largest single regulation by global scope | Framework landing page | High | 1 day |
| **`/compliance/eu-ai-act`** | Phase-in dates through 2027 = sustained search demand. Newer than competitors' coverage. | Framework landing page | High | 1 day |
| **`/compliance/dora`** | Applicable since Jan 2025. Lower competition than SOC 2. | Framework landing page | High | 1 day |
| **`/compliance/ferpa`** | Education vertical has low competitor coverage. Arkova has actual product fit (university degrees, transcripts, etc.). | Framework landing page | High | 1 day |

### Tier 2 — High priority (link bait + brand authority)

| Topic | Why It Matters | Format | Priority | Effort |
|---|---|---|---|---|
| **`/tools/audit-prep-calculator`** | Interactive tool that says "we estimate you spend X hours per quarter on audit evidence. Arkova drops that to Y." Inputs: # frameworks, # team members, # records. Output: time + dollar cost. | Free interactive tool | High | 2 days |
| **`/glossary`** | Vanta's glossary ranks for 100+ "what is" queries (e.g., *"what is FERPA"*, *"what is SOX 404(b)"*). Arkova has zero. Each entry is 200–400 words, internally linked. | Topic cluster (40+ entries) | High | 3–5 days |
| **`/use-cases/evidence-verification`** | Pillar page for the "cryptographic anchoring" angle — Arkova's deepest moat | Pillar | High | 1 day |
| **`/use-cases/multi-jurisdiction`** | Pillar page for the breadth claim with all 14+ frameworks linked | Pillar | High | 1 day |

### Tier 3 — Medium priority (cluster-builders)

| Topic | Why It Matters | Format | Priority | Effort |
|---|---|---|---|---|
| `/research/sox-internal-controls-2026` | SOX-specific deep dive funnels to `/compliance/sox` | Article | Medium | 2 days |
| `/research/eu-ai-act-implementation-checklist` | Timely (phase-in dates ongoing). Competitors haven't covered this depth | Article | Medium | 2 days |
| `/research/gxp-compliance-fmcg-pharma` | Sarah's specialty. Differentiated from competitor coverage. | Article | Medium | 2 days |
| `/research/healthcare-compliance-evidence-trail` | HIPAA + cryptographic verification = Arkova's strongest healthcare pitch | Article | Medium | 2 days |
| `/research/state-privacy-laws-2026-tracker` | Living tracker → recurring search traffic. 19 US states currently. | Recurring article (update quarterly) | Medium | 1 day initial + maintenance |

### Tier 4 — Long-term

| Topic | Why It Matters | Format | Priority | Effort |
|---|---|---|---|---|
| `/customers` or `/case-studies/{customer}` | Once pilots produce results. Vanta and Drata have 50+ case studies each. | Case study format | Low (blocked) | Quarterly |
| `/partners` | Channel acquisition (Big Four, regional auditor shops) | Partner directory | Low | 2 weeks |
| Industry verticals (`/industries/healthcare`, `/industries/finserv`, `/industries/edu`) | Arkova has clear vertical fit (FERPA → universities, HIPAA → hospitals, SOX → public companies) | Industry pages | Medium | 3 days each |

---

## Technical SEO Checklist

Mostly covered by the [GEO Technical Audit](GEO-TECHNICAL-AUDIT.md). Marketing-relevant deltas:

| Check | Status | Details |
|---|---|---|
| Page speed (TTFB) | ✅ Pass | 319–416 ms via Vercel CDN |
| Mobile-friendly | ✅ Pass | Responsive at 375 px, tap targets just fixed in PR #18 |
| Structured data | ⚠ Warning | Article + Organization + Person + BreadcrumbList all present. **Missing: FAQPage on articles with Q&A sections, HowTo on `/docs/quickstart`, Product on Verification API page** |
| Sitemap | ✅ Pass (after PR #18) | 23 URLs, auto-generated, includes both new articles |
| robots.txt | ✅ Pass | Best-in-class AI crawler access |
| HTTPS | ✅ Pass | HSTS preload, valid cert |
| Canonical tags | ✅ Pass | Self-referential on every page |
| Internal linking | ⚠ Warning | Inline-link aggression was just fixed (PR #17). But: 18 jurisdiction chips on homepage now link OUT to Wikipedia. Once `/compliance/{slug}` pages exist, repoint chips internally — keeps link equity on-site |
| Broken links | Not checked | Run `linkinator https://arkova.ai/sitemap.xml` quarterly |
| Indexation | ✅ Pass | All 23 sitemap URLs return 200, no erroneous noindex |

---

## Competitor Comparison Summary

Approximate from public landing pages + WebSearch research. Volume / DA estimates directional.

| Dimension | **Arkova** | Vanta | Drata | Secureframe | Sprinto |
|---|---|---|---|---|---|
| Primary positioning | Compliance audit automation, cryptographically anchored | Compliance automation, fast SOC 2 setup | Trust management platform | Multi-framework with hands-on support | Continuous compliance for startups |
| Frameworks claimed | **14+** (broadest) | 35+ | 25+ | 30+ | 20+ |
| Research / blog content | 7 articles | 200+ blog posts | 150+ | 100+ | 80+ |
| Comparison pages (vs X) | **0** | ~10 | ~12 | ~8 | ~6 |
| Framework landing pages | **0** | 35+ | 25+ | 30+ | 20+ |
| Free tools | **0** | 5+ (cost calc, scope tool, framework picker) | 3+ | 2+ | 4+ |
| Case studies | **0** (early access) | 50+ | 40+ | 60+ | 30+ |
| Glossary entries | **0** | ~100 | ~60 | ~40 | ~50 |
| Cryptographic verification angle | **Yes (unique)** | No | No | No | No |
| Multi-jurisdiction breadth (incl. APAC, AFR, LATAM) | **Yes (FERPA, Kenya DPA, Australia APP, Law 1581 Colombia, NDPR Nigeria)** | Limited (mostly US/EU) | Limited | Limited | Limited |
| AI crawler-friendly (llms.txt + robots) | **Yes (best-in-class)** | Partial | Partial | Partial | Partial |
| Privacy-first (client-side fingerprinting) | **Yes (unique)** | No | No | No | No |
| **Winner** | Differentiation, AI search, technical foundation | Volume of content + brand recognition | Enterprise positioning | Hands-on service | Startup price point |

**Read of the field:** Arkova has 3 real moats (cryptographic verification, multi-jurisdiction breadth, privacy architecture) and 0 of the volume infrastructure (comparison pages, framework pages, glossary, calculators) that drives commercial search traffic in this category. Closing the volume gap with Arkova's actual differentiators is the play.

---

## Prioritized Action Plan

### Quick Wins — do this week (under 4 hours total)

1. **Trim the 7 oversized title tags + 2 oversized meta descriptions in `prerender.mjs`** — 30 min
   - State of Compliance article meta (358 → 160)
   - Rise of Agentic Economy meta (264 → 160)
   - Five article titles (>90 chars → ≤60)
   - Impact: SERP CTR uplift, no truncation
2. **Add `FAQPage` JSON-LD to articles with Q&A H2 structure** — 1 hour
   - State of Compliance, Rise of Agentic Economy, Real Cost of Audit Verification all have it
   - Earns "People Also Ask" eligibility
3. **Add `HowTo` JSON-LD to `/docs/quickstart`** — 15 min
4. **Tighten `/research` index title** ("Research & Insights — Arkova" → "Compliance & Audit Automation Research — Arkova") — 5 min
5. **Add a "Comparing Arkova" callout block to homepage** linking to (future) `/compare/vanta` etc. — 30 min, even if the pages are 404 today, signals direction
6. **Run `npm run notify-indexnow`** after the title/meta fixes ship to push the corrections to Bing immediately — 1 min

### Strategic Investments — plan for this quarter

#### Q2 (this month)

7. **Build framework landing pages** — `/compliance/sox`, `/compliance/hipaa`, `/compliance/gdpr`, `/compliance/eu-ai-act`, `/compliance/dora`, `/compliance/ferpa` (6 pages, ~1,500 words each). Template: hero positioning + framework summary + how Arkova maps controls + downloadable checklist + early access CTA. **Effort:** 1 day per page = 6 days. **Impact:** High — directly captures the "X compliance software" search demand
8. **Build comparison pages** — `/compare/vanta`, `/compare/drata`, `/compare/secureframe` (3 pages). Honest comparison table, "When X is the better fit" section, "When Arkova is the better fit" section. **Effort:** Half day each = 1.5 days. **Impact:** High commercial intent
9. **Repoint homepage jurisdiction chips** to internal `/compliance/{slug}` once those pages ship. Keeps link equity on-site. **Effort:** 30 min after framework pages exist

#### Q3

10. **Build the audit prep time calculator** — `/tools/audit-prep-calculator`. Differentiated from saturated SOC 2 cost calculators by being multi-framework + outcome-oriented (hours saved, not dollars). **Effort:** 2 days. **Impact:** Link bait + lead capture
11. **Launch the glossary** — start with 20 entries covering the 14 frameworks + key terms (cryptographic anchor, append-only audit log, evidence layer, attestation, etc.). Each 200–400 words, mutually-linked. **Effort:** 3 days for initial 20 entries; add 1–2/week after. **Impact:** Massive long-tail traffic over time
12. **Build vertical industry pages** — `/industries/healthcare`, `/industries/financial-services`, `/industries/education`. Each should pitch the relevant framework stack (HIPAA + state privacy / SOX + DORA / FERPA + state privacy). **Effort:** 3 days each. **Impact:** ICP-targeted SEO

#### Q4

13. **Case studies** — once 1–2 pilot customers can be quoted, ship `/case-studies/{customer}` pages. Comparison pages convert dramatically better with named case studies linked from them.
14. **Recurring quarterly tracker articles** — *"State Privacy Laws Q2 2026 Tracker"*, *"EU AI Act Implementation Tracker"* — refresh quarterly, internal-link to framework pages. Builds ongoing fresh-content signal.

---

## Related work in this session that already moved SEO

- **PR #13** — added Sarah's State of Compliance article (substantive Compliance-category content)
- **PR #14** — added per-route OG card support, fixed missing prerender route entry that was causing prod 404
- **PR #17** — bumped body-text contrast to AAA, restructured HomePage interlinking, made jurisdiction chips clickable
- **PR #18** — auto-generated sitemap (12 → 23 URLs), cache headers, IndexNow protocol setup, RUM telemetry

The technical SEO foundation is now solid (post-PR #18). This audit identifies what to do **on top of** that foundation.

---

## Suggested next steps

If you want me to:
- **Draft the actual content** for the 6 framework landing pages (`/compliance/sox`, `/compliance/hipaa`, etc.), say the word and I'll start with one as a template
- **Build the comparison page template** for `/compare/vanta` (single page, you tell me which competitor first)
- **Ship the title/meta quick-win fixes** as a small follow-up PR right now (~15 min of work)
- **Generate the glossary scaffolding** with the first 20 entries

Tell me which (or which combination) and I'll move on it.

---

Sources from competitive research:
- [10 Best SOC 2 Compliance Software for 2026](https://thenextweb.com/news/soc-2-compliance-software-2026)
- [Best SOC 2 Compliance Software: Top 12 Platforms in 2026 (OpsMatters)](https://opsmatters.com/posts/best-soc-2-compliance-software-top-12-platforms-2026)
- [Secureframe vs Vanta vs Drata: Core Differences (Drata)](https://drata.com/blog/secureframe-vs-vanta-vs-drata)
- [Top 15 Vanta Competitors & Alternatives (ComplyJet)](https://www.complyjet.com/blog/vanta-competitors-alternatives)
- [Top 10 Drata Alternatives & Competitors (Comp AI)](https://trycomp.ai/drata-alternatives)
- [Compliance Audit Automation: 2025 Guide (HubiFi)](https://www.hubifi.com/blog/compliance-audit-automation-guide)
- [SOC 2 Cost Estimator (Comp AI)](https://trycomp.ai/soc2-cost-estimator)
- [Multi-Entity Privacy Governance Suites (Secure Privacy)](https://secureprivacy.ai/blog/multi-entity-privacy-governance-suites)
- [The Compliance Technology Stack (DeepTempo / Medium)](https://medium.com/deeptempo/the-compliance-technology-stack-automating-audit-readiness-3ed835079a5f)
