# Too Good To Hire

A Chrome extension that detects fake and suspicious job postings on LinkedIn using a hybrid heuristics and AI-based classification pipeline.

## Features

- Automatically analyzes job postings as you browse LinkedIn
- Injects an inline risk banner (Low / Medium / High) directly into the job posting
- Detects suspicious signals including:
  - Missing company name
  - Vague or misleading job titles
  - Unrealistic salary or earnings claims
  - Requests for personal information (SSN, bank details, etc.)
  - Personal email contacts (Gmail, Yahoo, etc.)
  - Pressure or urgency language
  - Too good to be true promises
  - Vague responsibilities
  - Extremely short job descriptions
- Re-analyzes automatically when navigating between postings (handles LinkedIn's SPA navigation)
- Optional AI-enhanced analysis using your own API key (coming soon)

## Tech Stack

- JavaScript (Vanilla ES6+)
- Chrome Extensions API (Manifest V3)
- MutationObserver for SPA navigation detection
- OpenAI GPT-4o-mini / Google Gemini Flash (Tier 2, coming soon)

## Installation (Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/too-good-to-hire.git
   cd too-good-to-hire
   ```

2. Open Chrome and navigate to `chrome://extensions`

3. Enable **Developer Mode** in the top right

4. Click **Load Unpacked** and select the project folder

5. Navigate to any LinkedIn job posting — the extension will run automatically

## How It Works

### Tier 1: Heuristics (Free, instant)
Each job posting is analyzed against a set of weighted heuristic rules. Each triggered rule adds to a suspicion score, which maps to a risk level:

| Score | Risk Level |
|-------|------------|
| 0-1   | Low     |
| 2-4   | Medium  |
| 5+    | High    |

### Tier 2: AI Analysis (Coming soon)
Users will be able to provide their own OpenAI or Gemini API key for enhanced analysis. The AI tier catches subtle signals that heuristics miss — inconsistent writing style, unrealistic job requirements, and misleading company descriptions. API calls are made directly from the extension using the user's key and are never sent to any third-party server.

## Project Structure

```
too-good-to-hire/
├── manifest.json      # Extension config and permissions
├── content.js         # Entry point, DOM extraction, SPA navigation handling
├── analyzer.js        # Heuristics logic and scoring
├── banner.js          # Risk banner UI injection
└── icons/             # Extension icons
```

## Roadmap

- [x] Heuristics-based detection
- [x] Inline risk banner
- [x] LinkedIn SPA navigation support
- [ ] Settings page for API key storage
- [ ] AI-enhanced analysis (Tier 2)
- [ ] Chrome Web Store release

## License

MIT
