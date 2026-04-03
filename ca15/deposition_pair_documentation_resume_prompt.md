<!-- loc: C:\Users\nate\Desktop\CLAUDE\CA_15_instrument\judd_results\deposition_pair_documentation_resume_prompt.md -->

# Deposition Pair Documentation System - Resume Prompt

## Project Goal
Create a systematic documentation pipeline for 395 Q&A pairs from the Benjamin Gibson / Shell Deer Park Fire deposition, with both wide (all pairs) and deep (single pair with all measurement data) views.

## Work Order: Deep First, Wide Second

### DEEP VERSION (Priority - Pair 0063)
For a single pair (0063), document all excavated measurement data across all batteries:

**For each JSON measurement file:**
- Generate PDF with:
  - Page 1: Actual data from pair 0063
  - Page 2: Schema explaining what the data represents (if `--add schema` flag is used)
- Generate HTML with:
  - Tab 1: Actual data from pair 0063
  - Tab 2: Schema explaining what the data represents (if `--add schema` flag is used)

**Process:**
1. Start with the script that contains the LLM prompt used to generate the schema
2. Design a schema extractor based on that prompt
3. Build a Python script that can:
   - Read all JSON files in the battery's folder
   - Process all pairs OR target `--pair 0063`
   - Include schema as second page/tab when `--add schema` flag is present
   - Output both PDF and HTML

**Command structure:**
```bash
python scriptname.py --pair 0063 --add schema
```

### WIDE VERSION (Do Last)
After completing deep version for all batteries:
- All 395 pairs
- PDF + HTML showing actual data across all pairs
- PDF + HTML showing template/schema explanation

## Current Approach
Working iteratively, one battery/measurement script at a time:
1. Artfu shows the LLM prompt script for one battery
2. We design the schema extractor for that battery
3. We build the Python PDF/HTML generator for that battery
4. Test with pair 0063
5. Repeat for next battery

## Technical Requirements
- Scripts must be able to process entire folders of JSON pair data
- Must support single-pair targeting via `--pair XXXX` flag
- Must support optional schema inclusion via `--add schema` flag
- Output format: PDF (multi-page) and HTML (multi-tab or equivalent)
- All outputs go to `/mnt/user-data/outputs/`

## File Context
- 395 Q&A pairs from deposition
- Multiple JSON files per pair (one per measurement battery)
- Scripts contain the original LLM prompts that defined each measurement schema
- Working with pair 0063 as the exemplar for deep documentation

## Next Step
Artfu will provide the first LLM prompt script to begin building the first battery's documentation system.
