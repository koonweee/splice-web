# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development workflow
bun install         # Install dependencies
bun run dev         # Start development server (http://localhost:5173)
bun run typecheck   # Run TypeScript type checking and generate React Router types

# Production build
bun run build       # Create production build
bun run start       # Start production server

# Docker deployment
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## Architecture Overview

This is a **React Router v7** application with **React 19** and **TypeScript**, designed as a banking API integration frontend. The app uses **Server-Side Rendering (SSR)** and **Tailwind CSS v4** for styling.

### Key Technologies
- **React Router v7** - Full-stack React framework with SSR
- **React 19** - Latest React version with modern features
- **TypeScript** - Strict typing enabled with path aliases (`~/*` → `./app/*`)
- **Tailwind CSS v4** - Utility-first CSS with dark mode support
- **Vite** - Build tool and development server
- **Bun** - Fast JavaScript runtime and package manager

### Project Structure
- `app/` - Main application code
  - `routes.ts` - Route configuration (file-based routing)
  - `routes/` - Route components
  - `root.tsx` - Root layout component
  - `app.css` - Global styles with Tailwind imports
- `plans/basic-flow.md` - Detailed application specification for banking workflow

### Application Purpose
The app implements a 5-step banking integration workflow:
1. User account creation (receives API key)
2. Bitwarden token storage (receives X-Secret header)
3. Bank connection setup (select bank, create connection)
4. Bank authentication (login with credentials)
5. Transaction fetching and display

Each section is progressively enabled as the previous step completes successfully.

### State Management
- Uses React's built-in state management
- Tracks user progress (`apiKey`, `x-secret`, `connectionId`)
- Implements progressive disclosure pattern

### Routing System
- Configured in `app/routes.ts`
- Type-safe routing with automatic type generation
- Currently implements single-page application with sections

### Important Files
- `react-router.config.ts` - SSR configuration
- `vite.config.ts` - Build configuration with Tailwind plugin
- `tsconfig.json` - TypeScript configuration with strict settings