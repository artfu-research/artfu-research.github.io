<!-- loc: C:\Users\nate\Desktop\CLAUDE\CA_15_instrument\judd_results\ca15_github_site_implementation_plan.md -->

# CA15 GitHub Site: Implementation Plan

## Site Structure Overview

The GitHub site serves two distinct user journeys:

1. **Capability Demonstration** → Pair 63 showcase with full battery coverage
2. **Scale Verification + Workflow Integration** → Full corpus with integrated panel-based navigation (deposition-style summary + complete analysis)

---

## Complete Site Structure

```
LANDING PAGE
├─ Framing Document (inline)
├─ How to Navigate This Site
│
├─ SHOWCASE: PAIR 63 COMPLETE ANALYSIS
│  │
│  ├─ PART 1: CORE BATTERIES
│  │  ├─ Epistemic Movement Battery
│  │  │  ├─ Strategic Overlay: Client Perspective
│  │  │  ├─ Strategic Overlay: Opposition Perspective
│  │  │  └─ Primary Analysis
│  │  ├─ Forensic Analysis Battery
│  │  │  ├─ Strategic Overlay: Client Perspective
│  │  │  ├─ Strategic Overlay: Opposition Perspective
│  │  │  └─ Primary Analysis
│  │  └─ Semantic Content Battery
│  │     ├─ Strategic Overlay: Client Perspective
│  │     ├─ Strategic Overlay: Opposition Perspective
│  │     └─ Primary Analysis
│  │
│  └─ PART 2: SPECIALIZED BATTERIES
│     ├─ Witness Posture Battery
│     ├─ Attorney Performance Battery (Defense)
│     ├─ Attorney Performance Battery (Plaintiff)
│     ├─ Jury Selection Battery
│     └─ Entity Extraction Battery
│
└─ FULL DEPOSITION CORPUS (395 Pairs)
   ├─ RIGHT PANEL (collapsible):
   │  ├─ Battery selector at top
   │  └─ Deposition-style summary (all 395 pairs through selected lens)
   │
   └─ MAIN PANEL:
      └─ Selected pair, fully expanded (same structure as Pair 63 showcase)
```

---

## Landing Page Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ CA15 DEPOSITION ANALYSIS: Benjamin Gibson                       │
│ Defense Examination of Prosecution's Expert Witness             │
└─────────────────────────────────────────────────────────────────┘

[Framing Document - inline, full text from the markdown]

┌─────────────────────────────────────────────────────────────────┐
│ HOW TO NAVIGATE THIS SITE                                        │
│ [the navigation section from the framing document]              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SITE CONTENTS                                                    │
│                                                                  │
│ ► SHOWCASE: Pair 63 Complete Analysis                          │
│   └─ View full analytical coverage of a single Q&A pair         │
│                                                                  │
│ ► FULL CORPUS: All 395 Pairs (Integrated Analysis Interface)   │
│   └─ Panel-based navigation: select battery lens, browse pairs, │
│      view complete analysis with deposition-style summaries     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pair 63 Showcase Page Structure

This is the deep dive. User clicks "Pair 63 Complete Analysis" and lands here:

```
┌─────────────────────────────────────────────────────────────────┐
│ PAIR 63: Complete Analysis                                      │
│ Page 20, Line 5                                                  │
│ [Question/Answer text displayed prominently]                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PART 1: CORE BATTERIES                                          │
│                                                                  │
│ ┌─ EPISTEMIC MOVEMENT BATTERY ─────────────────────────────┐   │
│ │                                                            │   │
│ │ ► Strategic Overlay: Client Perspective                   │   │
│ │   [expandable section - shows summary, top calls, scores]  │   │
│ │                                                            │   │
│ │ ► Strategic Overlay: Opposition Perspective                │   │
│ │   [expandable section - shows summary, top calls, scores]  │   │
│ │                                                            │   │
│ │ ► Primary Analysis                                         │   │
│ │   [expandable section - full battery output with ⓘ icons]  │   │
│ └────────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌─ FORENSIC ANALYSIS BATTERY ──────────────────────────────┐   │
│ │ [same structure: strategic client, strategic opp, primary] │   │
│ └────────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌─ SEMANTIC CONTENT BATTERY ───────────────────────────────┐   │
│ │ [same structure: strategic client, strategic opp, primary] │   │
│ └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PART 2: SPECIALIZED BATTERIES                                   │
│                                                                  │
│ ► Witness Posture Battery                                      │
│   [expandable - shows scores, metrics with ⓘ tooltips]          │
│                                                                  │
│ ► Attorney Performance Battery (Defense)                       │
│   [expandable - shows scores, metrics with ⓘ tooltips]          │
│                                                                  │
│ ► Attorney Performance Battery (Plaintiff)                     │
│   [expandable - shows scores, metrics with ⓘ tooltips]          │
│                                                                  │
│ ► Jury Selection Battery                                       │
│   [expandable - demographics wanted/unwanted, contestation]     │
│                                                                  │
│ ► Entity Extraction Battery                                    │
│   [expandable - entity list, relationships, hoover data]        │
└─────────────────────────────────────────────────────────────────┘

[Back to Landing Page]
```

**Key implementation notes for Pair 63:**
- All sections default to collapsed (show headers only)
- User expands what they want to see
- Strategic overlays should visually stand out (different background color, bold headers)
- ⓘ icons next to every metric in primary analysis and specialized batteries
- Schema tooltips appear on hover or click (your choice)

---

## Full Corpus Page Structure (Integrated Panel Interface)

User clicks "Full Corpus: All 395 Pairs" and lands in the integrated analysis interface:

```
┌─────────────────────────────────────────────────────────────────┐
│ FULL DEPOSITION CORPUS                                          │
│ 395 Pairs - Defense Examination                                 │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────┬──────────────────────────────────────┐
│ RIGHT PANEL              │ MAIN PANEL                           │
│ (collapsible)            │                                      │
│                          │                                      │
│ ┌────────────────────┐  │ ┌──────────────────────────────────┐ │
│ │ BATTERY SELECTOR   │  │ │ PAIR 63: Page 20, Line 5         │ │
│ │                    │  │ │ [Question/Answer text displayed] │ │
│ │ ○ Epistemic Mvmt   │  │ └──────────────────────────────────┘ │
│ │ ● Forensic Analysis│  │                                      │
│ │ ○ Semantic Content │  │ ┌─ PART 1: CORE BATTERIES ────────┐ │
│ │ ○ Witness Posture  │  │ │                                  │ │
│ │ ○ Attorney Perf    │  │ │ ► Epistemic Movement Battery     │ │
│ │ ○ Jury Selection   │  │ │   ├─ Strategic: Client           │ │
│ │ ○ Entity Extract   │  │ │   ├─ Strategic: Opposition       │ │
│ └────────────────────┘  │ │   └─ Primary Analysis            │ │
│                          │ │                                  │ │
│ DEPOSITION SUMMARY       │ │ ► Forensic Analysis Battery      │ │
│ (Forensic Analysis lens) │ │   ├─ Strategic: Client           │ │
│                          │ │   ├─ Strategic: Opposition       │ │
│ ┌────────────────────┐  │ │   └─ Primary Analysis            │ │
│ │ PAIR 1 | Pg 1, Ln 3│  │ │                                  │ │
│ │ Pattern: Procedural│  │ │ ► Semantic Content Battery       │ │
│ │ No strategic sig.  │  │ │   ├─ Strategic: Client           │ │
│ └────────────────────┘  │ │   ├─ Strategic: Opposition       │ │
│                          │ │   └─ Primary Analysis            │ │
│ ┌────────────────────┐  │ └──────────────────────────────────┘ │
│ │ PAIR 2 | Pg 1, Ln 8│  │                                      │
│ │ Pattern: Credibil. │  │ ┌─ PART 2: SPECIALIZED BATTERIES ─┐ │
│ │ Foundation estab.  │  │ │                                  │ │
│ └────────────────────┘  │ │ ► Witness Posture Battery        │ │
│                          │ │ ► Attorney Performance (Defense) │ │
│ [... scrollable ...]     │ │ ► Attorney Performance (Plaintiff│ │
│                          │ │ ► Jury Selection Battery         │ │
│ ┌────────────────────┐  │ │ ► Entity Extraction Battery      │ │
│ │ PAIR 63 | Pg 20, 5 │◄─┼─│ (currently selected pair)        │ │
│ │ Pattern: Evasion   │  │ └──────────────────────────────────┘ │
│ │ Temporal hedging   │  │                                      │
│ │ detected. Moderate │  │                                      │
│ │ credibility risk.  │  │                                      │
│ └────────────────────┘  │                                      │
│                          │                                      │
│ [... more pairs ...]     │                                      │
│                          │                                      │
│ [Collapse Panel ▶]       │                                      │
└──────────────────────────┴──────────────────────────────────────┘

[Back to Landing Page]
```

**How the interface works:**

1. **Battery Selector (top of right panel):**
   - Choose which analytical lens to view the deposition through
   - Options: 3 core batteries (EM, FA, SC) + 4 specialized batteries (Witness, Attorney, Jury, Entity)
   - Switching batteries re-renders the summary view in the right panel
   - **Currently selected pair remains selected** when you switch batteries

2. **Deposition Summary (right panel, scrollable):**
   - Shows all 395 pairs through the currently selected battery lens
   - Each pair shows: pair number, page/line reference, pattern title, 1-3 line summary
   - Click any pair → loads that pair's full analysis in the main panel
   - Currently selected pair is highlighted
   - Summaries are generated from the strategic overlay output for the selected battery

3. **Main Panel (full analysis):**
   - Displays the currently selected pair with complete battery coverage
   - Same expandable structure as the Pair 63 showcase
   - Part 1: Core Batteries (strategic overlays first, then primary analysis)
   - Part 2: Specialized Batteries (all available for the selected pair)
   - All sections default to collapsed—user expands what they want to see

4. **Right Panel Collapse:**
   - Clicking "Collapse Panel ▶" hides the right panel entirely
   - Main panel expands to full width for focused analysis
   - Click again to restore panel navigation

**Key interaction patterns:**

- **Switching batteries:** Updates right panel summaries without losing pair context
- **Clicking a pair:** Loads that pair in main panel, highlights it in right panel
- **Collapsing right panel:** Focus mode—just the selected pair's full analysis
- **Expanding right panel:** Navigation mode—browse and select

**Implementation notes:**

- Right panel width: ~25-30% of viewport
- Main panel: remaining 70-75% (or 100% when right panel collapsed)
- Right panel summary blocks: ~80-120px height each, scrollable
- Main panel uses same template as Pair 63 showcase (don't rebuild)
- URL structure: `/corpus/?pair=63&battery=fa` (enables direct linking, browser back/forward)

---

## Schema Tooltip Implementation

Every metric in the primary analysis and specialized batteries needs an ⓘ icon.

**Tooltip content structure:**
```
[Metric Name]
────────────
What it measures: [1 sentence definition]
Scale/Range: [e.g., -5 to +5, or high/medium/low]
Why it matters: [1 sentence context]
```

**Example:**
```
Credibility Under Pressure ⓘ

What it measures: Witness stability when challenged on prior 
statements or inconsistencies.

Scale/Range: -5 to +5 (negative = evasive/defensive, 
positive = confident/coherent)

Why it matters: Predicts jury perception of witness reliability 
under cross-examination.
```

**Technical implementation:**
- Use your existing schema JSON files as the data source
- Map schema field names to ⓘ icon placements
- Tooltip can be pure CSS (`:hover` state) or JS-driven for mobile support
- Make sure tooltips don't get clipped at screen edges

---

## File Organization on GitHub

Suggested repo structure:

```
ca15-gibson-deposition/
├── index.html                 (landing page)
├── pair63.html                (showcase page)
├── corpus.html                (full corpus integrated interface)
├── css/
│   └── styles.css
├── js/
│   ├── corpus-navigation.js   (battery switching, pair selection, panel collapse)
│   ├── tooltips.js            (schema ⓘ functionality)
│   ├── expand-collapse.js     (battery section toggles)
│   └── summary-generator.js   (generates summary blocks from strategic overlay JSON)
├── data/
│   ├── pairs/
│   │   ├── pair_0001/
│   │   │   ├── em.json
│   │   │   ├── fa.json
│   │   │   ├── sc.json
│   │   │   ├── em_strategic_client.json
│   │   │   ├── em_strategic_opposition.json
│   │   │   ├── fa_strategic_client.json
│   │   │   ├── fa_strategic_opposition.json
│   │   │   ├── sc_strategic_client.json
│   │   │   ├── sc_strategic_opposition.json
│   │   │   ├── wpb.json
│   │   │   ├── apb_defense.json
│   │   │   ├── apb_plaintiff.json
│   │   │   ├── jsb.json
│   │   │   └── eeb.json
│   │   ├── pair_0002/
│   │   │   └── [same structure]
│   │   └── [... through pair_0395/]
│   └── schemas/
│       ├── em_schema.json
│       ├── fa_schema.json
│       ├── sc_schema.json
│       ├── wpb_schema.json
│       ├── apb_schema.json
│       ├── jsb_schema.json
│       └── eeb_schema.json
└── README.md
```

**Note on data organization:**

- Each pair gets its own folder with all battery outputs
- Summary generator pulls from strategic overlay JSON files
- Schemas loaded once on page load, referenced by tooltips
- Pair selection triggers AJAX/fetch to load that pair's data folder

---

## Build Order / Implementation Sequence

**Phase 1: Static Showcase (Pair 63 only)**
1. Build landing page with framing document
2. Build Pair 63 showcase page
   - Hardcode the HTML structure with expand/collapse functionality
   - Add ⓘ tooltips with schema content
   - Test on desktop and mobile
3. Deploy to GitHub Pages, send link to Judd
4. **STOP HERE** until you get feedback

**Phase 2: Full Corpus Interface (if Phase 1 gets positive response)**
1. Build integrated panel interface (corpus.html)
   - Right panel: battery selector + scrollable summary
   - Main panel: selected pair with full battery expansion
2. Implement battery switching logic
   - Updates right panel summaries
   - Preserves currently selected pair
3. Implement pair selection logic
   - Click summary block → loads that pair's data in main panel
   - Highlights selected pair in right panel
4. Build summary generator
   - Pulls pattern title, summary text, key calls from strategic overlay JSON
   - Renders summary blocks for all 395 pairs per selected battery
5. Implement panel collapse/expand
6. Load all 395 pairs into `/data/pairs/`
7. Test full navigation flow
8. Deploy update

---

## Critical Success Factors

**For Judd to see value, the site must:**
1. Load fast (GitHub Pages is fine, but watch file sizes—organize data into pair folders)
2. Be navigable on mobile (he might review on a tablet)
3. Present strategic overlays prominently (that's the value prop)
4. Make schema explanations easy to access without being intrusive
5. Prove scale (he sees 395 pairs exist) without overwhelming him (panel interface controls information density)
6. **Battery switching must preserve pair context** (critical UX detail—switching lenses shouldn't lose his place)

**What NOT to build yet:**
- Smart filtering ("next high-impact pair", "next credibility issue", etc.)
- Search functionality
- Comparison views (pair vs pair)
- Downloadable reports
- Annotation/note-taking features
- Linear prev/next navigation (the panel interface replaces this—he clicks pairs from the summary list)

Get the basic two-part structure working first (Pair 63 showcase + integrated corpus interface). If he uses it and asks for more, you'll know what to build next.

---

## Next Steps

1. **Create Pair 63 showcase page** (HTML/CSS/JS)
2. **Test locally** before pushing to GitHub
3. **Deploy to GitHub Pages**
4. **Send email with framing doc + link**
5. **Wait for feedback** before building Phase 2

You don't need the full corpus interface ready to launch. You need Pair 63 working perfectly and the framing document setting expectations correctly.

The integrated corpus interface (Phase 2) can wait until you know he's actually interested in exploring the full dataset.
