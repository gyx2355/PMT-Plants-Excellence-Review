# Test Plan: PMT Plants Excellence Review System

## 1. Unit Testing
- Test domain status calculation strategy (`IKpiStatusStrategy`).
- Test completion rate calculations.
- Test dataverse-to-domain adapters and null vs zero handling.
- Command: `npm run test`

## 2. Type Check & Linting
- TypeScript type check: `npm run build` (`tsc -b && vite build`)
- ESLint linting: `npm run lint`

## 3. Manual Acceptance Scenarios
- Desktop viewport (1920x1080 and 1366x768).
- Tablet drawer layout navigation.
- Empty period state vs entered data state.
- Data entry saving and duplicate prevention.
