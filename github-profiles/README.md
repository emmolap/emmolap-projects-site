# GitHub Profile Finder (React + TypeScript + Tailwind + shadcn/ui)

Search any GitHub username and see their profile: avatar, bio, location, followers, following, repo count and their top repositories by stars.

## Features
- Live search against the GitHub REST API
- Typed API responses (TypeScript interfaces for user and repo data)
- Loading skeleton, "user not found" and rate-limit error handling
- Request cancellation with AbortController so fast searches never show stale data
- Component library: shadcn/ui-style Card, Avatar, Badge, Input, Button, Skeleton (Radix UI + Tailwind)
- Responsive layout

## Tech
React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui components, Radix UI, lucide-react

## Run locally
```bash
npm install
npm run dev
```

## Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- No environment variables needed (GitHub's public API, no key required)
