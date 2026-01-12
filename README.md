Tiptap Document Editor with Real-Time Pagination 


A production-ready Tiptap-based document editor with real-time pagination designed for legal document drafting. Built as part of the OpenSphere Full-Stack Intern technical assignment.

Live Demo: https://editor-ruby-six.vercel.app/

📋 Overview
This project implements a rich text editor that displays visual page breaks in real-time as users type, matching exactly how documents will appear when printed. Designed specifically for legal professionals drafting USCIS submissions, where formatting accuracy is critical.

Key Features
✅ Real-time visual page breaks that update dynamically as content changes
✅ US Letter size (8.5" × 11") with standard 1-inch margins
✅ Print output matching - WYSIWYG between editor and printed PDF
✅ Standard formatting support - headings, bold/italic, lists, text alignment
✅ Dynamic page size switching - Letter, A4, Legal, A3, A5, Tabloid
✅ PDF export functionality via browser print-to-PDF
✅ Professional UI with glassmorphic toolbar and intuitive controls
✅ Undo/redo support with full editing history

🚀 Quick Start
Prerequisites
Node.js 18 or higher
npm, yarn, or pnpm
Installation & Setup
 
bash
# Clone the repository
git clone [https://github.com/Abhishekksoni/editor.git]
cd editor

# Install dependencies
npm install

# Run development server
npm run dev
Open http://localhost:3000 to view the editor.

Approach to Calculating Page Breaks
The Core Challenge
Calculating page breaks in a rich text editor is fundamentally challenging because:

Dynamic Content Heights: Different text styles (headings, paragraphs, lists) have varying line heights
User Interactions: Content constantly changes through typing, pasting, formatting, and deletion
DOM Measurement: Heights must be calculated from rendered DOM elements, not abstract content
Performance: Calculations must happen in real-time without blocking the UI
My Solution
I leveraged the tiptap-pagination-plus extension, which implements a sophisticated pagination algorithm:

1. Content Measurement Strategy
The extension uses the browser's layout engine to measure actual rendered heights:

javascript
PaginationPlus.configure({
pageHeight: 1056, // 11 inches at 96 DPI
pageWidth: 816, // 8.5 inches at 96 DPI
marginTop: 96, // 1 inch margins
marginBottom: 96,
marginLeft: 96,
marginRight: 96,
})
Why these dimensions?

US Letter is 8.5" × 11"
At 96 DPI (browser default): 8.5" × 96 = 816px, 11" × 96 = 1056px
1-inch margins = 96px, leaving 624px × 864px of usable content area
2. Real-time Break Calculation
3. Visual Representation
Pages are separated by a visual gap:
javascript
pageGap: 10, // 10px gap between pages
pageBreakBackground: "#F3F4F6", // Light gray separator
This creates the familiar "sheet of paper" appearance seen in word processors.

Why This Approach?
Advantages:

Accurate: Uses actual DOM measurements, not estimates
Dynamic: Updates automatically on any content change
Comprehensive: Handles all TipTap node types out-of-the-box
Performant: Optimised calculation algorithm with minimal re-rendering
Alternative approaches I considered:

⚖️ Trade-offs & Limitations
Current Limitations
1. Complex Layout Elements
Tables: While basic tables work, complex tables with merged cells or nested content may not break optimally. The current implementation doesn't have intelligent row-splitting logic.

Multi-column layouts: Not currently supported. Adding CSS columns would require significant extension modifications.

2. Performance Considerations
Large documents (50+ pages): Real-time height calculations for very long documents can cause noticeable lag. 


3. Browser Rendering Differences
Font rendering: Different browsers (Chrome, Firefox, Safari) render text with slightly different heights due to:

Font rendering engines
Sub-pixel rendering differences
Line height calculations
Impact: A document paginated in Chrome might have slightly different breaks in Firefox.

Solution: The differences are typically minimal (1-2px), but for critical use cases, server-side PDF generation with a controlled rendering environment would guarantee consistency.

4. Print Output Considerations
Print dialogue settings: The final PDF depends on:

Browser print margins (user can override the 1-inch setting)
Scaling options (fit-to-page, custom scale)
Background graphics setting (must be enabled to see page separators)
Current approach: Uses CSS @media print to hide UI elements and ensure clean output, but relies on user keeping default settings.

5. Limited Advanced Features
Currently missing:

❌ Headers and footers (extension supports it, but disabled in config)
❌ Orphan/widow control (preventing single lines at top/bottom of page)
❌ Keep-with-next (keeping headings with following paragraph)
These features exist in the extension but weren't implemented to keep the initial scope manageable.


What I Would Improve With More Time
Immediate Enhancements (1-2 days)
1. Headers/Footers
Enable the built-in support in tiptap-pagination-plus
This would immediately add professional document features.

2. Table Support

3. Document Templates
Pre-built templates for common legal documents:
USCIS cover letters (with proper formatting)
Support letters
Petition documents
Users could start from a template rather than a blank page.

4. Performance Optimization
Debounced recalculation: Only recalculate 300ms after user stops typing
Partial recalculation: Only measure pages affected by changes
Memoization: Cache node heights that haven't changed

5. Advanced Export Options
PDF.js integration: Generate PDFs programmatically for consistency
DOCX export: For compatibility with Microsoft Word
HTML export: For email or web publishing


6. Collaborative Editing
Integrate Tiptap's collaboration features:
Real-time multi-user editing
Cursor presence
Change tracking and commenting
Long-term Vision (2-4 weeks)


7. Server-Side PDF Generation
Use Puppeteer or similar for guaranteed consistency:

8. Smart Typography
Orphan/widow control (prevent single lines at page boundaries)
Keep-with-next (headings stay with following paragraph)
Hyphenation for justified text
Custom line spacing controls


9. Advanced Content Features
Citation management: Legal citation formatting and validation
Cross-references: Automatic reference updating
Track changes: Legal-grade change tracking
Redlining: Strike-through and underline for edits


 Challenges Overcome
1. Understanding ProseMirror's Data Model
TipTap is built on ProseMirror, which has a complex document model. Learning how to:

Access node positions and measurements
Listen to transactions
Update the document state properly
Solution: Extensive reading of TipTap and ProseMirror docs, studying extension source code.

2. CSS Print Media Queries
Getting the print output to match the screen required careful CSS:

 
css
@media print {
body {
margin: 0;
background: white !important;
}
.toolbar { display: none !important; }
}
Solution: Iterative testing with different browsers' print dialogs.

3. React Re-rendering Performance
Initial implementation had performance issues due to excessive re-renders.

Solution: Used useEditorState hook with careful selector function to only update when relevant state changes.


📧 Submission
Submitted by: Abhishek Soni
Email: soniabhishekk15@gmail.com
Date: 12 Jan 2026
Repository: https://github.com/Abhishekksoni
Live Demo: https://editor-ruby-six.vercel.app/


 
