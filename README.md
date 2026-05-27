# SubTrack AI
 live demo link: https://sub-track-ai-tau.vercel.app/

SubTrack AI is a free AI spend audit platform that helps startups identify overspending across tools like ChatGPT, Claude, Cursor, Gemini, and Copilot.
The platform generates instant savings recommendations, personalized AI summaries, and shareable audit reports while helping teams discover lower-cost AI infrastructure options.

## Features

- AI spend audit engine
- Dynamic savings calculations
- Public shareable audit URLs
- AI-generated summaries
- Lead capture + transactional emails
- GitHub Actions CI
- Automated audit engine tests
- Responsive SaaS-style UI

## Screenshots
![alt text](<Screenshot 2026-05-26 000001.png>)
![alt text](<Screenshot 2026-05-26 000032.png>)
![alt text](<Screenshot 2026-05-26 000049.png>)
![alt text](<Screenshot 2026-05-26 010529.png>)
![alt text](<Screenshot 2026-05-26 010549.png>)
## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase
- OpenAI API
- Nodemailer
- Gmail SMTP
- Vitest
- GitHub Actions

## Quick Start

## Environment Variables

Create a `.env.local` file with:

env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
GMAIL_USER=
GMAIL_APP_PASSWORD=


# ADD TESTING SECTION

md id="xjlwm0"
## Testing

Run tests:

bash
npm run test:run
bash
npm install
npm run dev