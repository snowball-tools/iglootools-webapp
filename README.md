# Igloo Tools

Multi-tenant Next.js Tailwind Postgres app hosted on Vercel. Home page with passkey impl can be found at [iglootools-home](https://github.com/snowball-tools/iglootools-home)

- [WIP] Create, Manage, and Use Passkeys on Mobile (Swift, Kotlin, React Native) and Web
    - [WIP] Init Tenant App (ie `appName.webapp.xyz`) handling `.well-known/apple-app-site-association` for passkeys + app bundle id association
        - [Nice To Have] Remote Notification
        - [Nice To Have] [Fastlane](https://fastlane.tools/) integration for Testflight and App Store signing + deployment

## Getting Started

- `.env.example` -> `.env` or `vercel env pull`

```bash
yarn install
```

### Lint

```bash
yarn lint
```

### Environment Variables

```bash
vercel env pull
```

### Development

```bash
yarn dev
```

### Production

```bash
vercel --prod
```
