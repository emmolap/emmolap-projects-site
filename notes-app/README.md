# Notes App (React + TypeScript + Chakra UI)

A markdown notes app. Create notes, write in Markdown, preview them, search, and delete with confirmation. Notes persist in the browser.

## Features
- Add, edit and delete notes
- Markdown preview (rendered safely with react-markdown, no raw HTML injection)
- Search across all notes
- Delete confirmation dialog
- Notes saved to localStorage through a typed `useLocalStorage` hook
- Most recently edited notes appear first
- Responsive grid layout

## Tech
React 19, TypeScript, Vite, Chakra UI v3, react-markdown, lucide-react

## Run locally
```bash
npm install
npm run dev
```

## Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- No environment variables needed
