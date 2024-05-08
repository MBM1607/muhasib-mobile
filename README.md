# Muhasib Mobile

Cross-platform (iOS + Android) prayer times + tracking application built with React Native + Expo.

## Technologies

- `React`
- `React Native`
- `Expo` (Managed Workflow)
- `Typescript`
- `React Native Paper` for theming and components
- `Sentry` for logging and error reporting
- `pnpm` for package management
- `dotenv-vault` to share environment variables

---

## Scripts

Start: `pnpm start`

Start (Android): `pnpm android`

Start (iOS): `v ios`

Build: `pnpm build`

Build A Preview Version: `pnpm build:preview`

Build A Development Version (APK): `pnpm build:development`

Build An Independent APK: `pnpm expo build:android -t apk`

Publish: `pnpm expo publish`

Lint the code: `pnpm lint`

---

## Environment Variables

Environment variables are securely shared with `dotenv-vault`.

Create new vault: `pnpm env:new`

Login to the vault: `pnpm env:login`

Open vault: `pnpm env:open`

Pull environment from vault: `pnpm env:pull`

Push environment to vault: `pnpm env:push`
