## Portfolio Fix Plan

### Goals
- Ensure links and modals in the Portfolio section are correct and consistent.

### Tasks
1) Update FuseQuote View Live link to official domain
   - Change or confirm any "View Live"/modal link points to `https://www.fusequote.com/`
   - Remove any `electro-quote-pro-v2.vercel.app` references
   - Acceptance: No references to the old Vercel URL remain; modal "View Live" opens the official site.

2) Add View Publication to Hypothesis Engineering Research
   - Show a button labeled "View Publication" pointing to `https://dl.acm.org/doi/10.1145/3698322.3698333`
   - Use a document icon, not globe; visible within the project modal
   - Acceptance: Opening the research case study modal shows a working "View Publication" link.

3) System Design Sandbox case study modal
   - Ensure clicking "View Case Study" opens a modal with a concise summary based on the provided description
   - Include core features (drag-and-design, scenario-driven, fast simulation, share/fork, chaos mode)
   - Ensure "View Live" points to `https://system-design-sandbox.vercel.app/`
   - Acceptance: Modal opens with updated overview and features; live link opens the Vercel app.

### QA Checklist
- Click each project → View Case Study → Links open correct targets in a new tab
- Verify overlay click and Escape key close the modal
- Validate there are no stale URLs via a quick search

### References
- FuseQuote: https://www.fusequote.com/
- System Design Sandbox: https://system-design-sandbox.vercel.app/
- Research DOI: https://dl.acm.org/doi/10.1145/3698322.3698333


