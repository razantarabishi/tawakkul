# Tawakkul Agent Instructions

These instructions apply to all future Codex tasks in this repository. Inspect the actual repository before implementing changes; this document defines conventions, not a claim that every planned feature already exists.

## Project

- Project: Tawakkul Modest — premium contemporary modest fashion e-commerce.
- Brand statement: MODESTY, EVERYWHERE.
- Repository: `https://github.com/razantarabishi/tawakkul.git`.
- Application source root: `src/`. Preserve the configured Angular selector prefix and naming conventions.
- Two application areas: Admin and Customer, with reusable Shared resources.
- Package manager: npm 10.8.2. Preserve `package-lock.json`.

## Technology Stack

The versions below are resolved versions from the supplied lockfile. Consult the actual `package.json` and lockfile before making dependency changes.

| Technology | Version | Purpose |
|---|---|---|
| Angular core, common, compiler, forms, platform-browser, router | 21.2.26 | Standalone SPA, forms, routing |
| Angular compiler-cli | 21.2.26 | Compilation |
| Angular CLI and build | 21.2.31 | Development and production builds |
| Angular CDK | 21.2.14 | Accessible UI primitives |
| TypeScript | 5.9.3 | Strict application code |
| RxJS | 7.8.2 | Reactive asynchronous streams |
| tslib | 2.9.1 | TypeScript runtime helpers |
| Tailwind CSS and @tailwindcss/postcss | 4.3.5 | Responsive styling |
| PostCSS | 8.5.33 | CSS processing |
| PrimeNG | 21.1.10 | UI components |
| PrimeIcons | 8.0.2 | Icons |
| @primeuix/themes | 2.0.3 | PrimeNG themes and tokens |
| tailwindcss-primeui | 0.6.1 | PrimeNG/Tailwind integration |
| Supabase JS | 2.109.0 | Database, authentication and storage integration |
| ngx-translate core and HTTP loader | 18.1.0 | Internationalization |
| Highcharts | 13.1.1 | Charts and reports |
| highcharts-angular | 5.4.1 | Angular chart integration |
| Vitest | 4.1.12 | Unit testing |
| jsdom | 28.1.0 | DOM test environment |
| ESLint | 10.15.0 | Linting |
| @eslint/js | 10.0.1 | JavaScript lint configuration |
| angular-eslint | 21.4.0 | Angular linting |
| typescript-eslint | 8.59.2 | TypeScript linting |
| Prettier | 3.10.1 | Formatting |
| prettier-plugin-tailwindcss | 0.8.1 | Tailwind class formatting |

- Prefer the installed libraries. Do not add Bootstrap, Angular Material, another state library, or other dependencies without a justified requirement and user approval.
- Use a compatible Node.js version; Node 22.13+ within the 22.x line or Node 24 LTS is a sensible baseline. Verify the actual runtime and dependency engine requirements.
- Do not upgrade packages, regenerate the lockfile unnecessarily, or use `--force` / `--legacy-peer-deps` to hide dependency conflicts.

## Required Engineering Rules

- Use Angular standalone components. Do not introduce application NgModules; importing existing library NgModules into standalone components is acceptable.
- Prefer signals, `computed()`, typed inputs/outputs and `ChangeDetectionStrategy.OnPush` for new or touched components unless a documented exception applies.
- Keep TypeScript strict. Never use `any`, unsafe casts, or suppress template errors to hide defects.
- Use modern template control flow (`@if`, `@for`, `@switch`); track lists using stable unique identifiers.
- Keep HTML and TypeScript in separate files. Follow the existing Angular CLI naming convention, such as `admin-layout.ts` and `admin-layout.html`. Use Tailwind CSS v4 utility classes directly in HTML templates. Do not create component CSS/SCSS files or inline styles.
- Import template dependencies explicitly into standalone components (e.g. `RouterOutlet`, `RouterLink`, form directives, translation pipes and PrimeNG imports).
- Prefer typed reactive forms for complex forms. Provide accessible validation messages.
- Reuse existing components, services, models, state, routes, translations and utilities before introducing new abstractions.
- Never hardcode products, stock, prices, categories, customers, sales totals or other database-backed data. Do not create mock data unless requested.
- Preserve existing functionality and responsive behavior. Make the smallest professional change that meets the request.
- Inspect existing files, configurations and Git status before changing code. Do not overwrite unrelated changes.
- Run validation after implementation and report actual results.

## Test File Policy (Mandatory)

- Do not create or generate any `*.spec.ts`, `*.spec.js`, or other `*.spec.*` files anywhere in the repository.
- Always use `--skip-tests` when generating Angular components, services, directives, pipes, guards, or other artifacts whose schematics support it.
- Configure `skipTests: true` in `angular.json` for applicable Angular schematics when explicitly asked to update project configuration.
- Do not create alternative test files to circumvent this rule. Preserve existing tests unless the user explicitly asks to modify or remove them.
- Validate changes using the production build, lint, and relevant manual checks. Existing tests may be run without creating new test files.

## Existing Commands

```bash
npm ci                      # Reproducible installation from lockfile
npm run start               # Angular dev server
npm run build               # Angular build (verify default configuration)
npm run build -- --configuration production
npm run watch               # Development build in watch mode
npm run test                # Angular unit tests
npm run lint                # Angular ESLint
npm run ng -- <args>         # Local Angular CLI
```

- Use the project-local CLI, not a mismatched global CLI.
- Inspect `angular.json` for the configured port, assets, build budgets, test and lint targets. Do not copy Nestora Home budget values into this project.
- If full lint fails for unrelated pre-existing errors, run targeted lint on changed files where possible and report both results.

## Folder Structure And Conventions

The intended architecture is feature-based. Create feature directories only as needed and verify existing names before importing files.

```text
src/app/
├── admin/
│   ├── layout/admin-layout/
│   ├── dashboard/
│   ├── products/
│   ├── categories/
│   ├── collections/
│   ├── inventory/
│   ├── orders/
│   ├── customers/
│   ├── promotions/
│   ├── reports/
│   ├── settings/
│   └── admin.routes.ts
├── customer/
│   ├── layout/customer-layout/
│   ├── home/
│   ├── shop/
│   ├── product-details/
│   ├── collections/
│   ├── cart/
│   ├── checkout/
│   ├── wishlist/
│   ├── account/
│   ├── auth/
│   └── customer.routes.ts
├── shared/
│   ├── components/
│   ├── services/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   ├── pipes/
│   ├── directives/
│   ├── utils/
│   └── constants/
├── app.ts
├── app.html
├── app.css (existing only, if required; no new custom rules)
├── app.config.ts
└── app.routes.ts
```

- Admin contains store management and reporting; customer contains the storefront and account experience.
- Shared contains genuinely reusable code. Feature-specific components, services and state remain within their feature when possible.
- Shared must not import admin or customer feature implementations. Avoid circular dependencies and direct imports between the two role areas.
- Use existing static asset and translation paths; verify `public/`, `src/assets/` and build configuration before adding files.
- Keep database migrations under `supabase/migrations/` if migrations are introduced or already present.

## Lazy Loading And Routing

- `app.routes.ts` is the root routing configuration. Register it using `provideRouter` in the application configuration.
- `/admin` loads `admin.routes.ts` through `loadChildren`; `/` loads `customer.routes.ts` through `loadChildren`. Place the admin route before the empty-path customer route.
- Each area has an independent standalone layout and nested `RouterOutlet`.
- Use `loadComponent` for individual route pages, and `loadChildren` for larger feature route groups when needed.
- Redirect `/admin` to `/admin/dashboard` with `pathMatch: 'full'`.
- Keep the root application lightweight. Do not statically import lazy feature pages into root or shared infrastructure.
- Place wildcard routes last; ensure nested wildcard routes do not swallow valid routes.
- Do not enable blanket preloading without a measured requirement.
- Preserve deep links and browser back/forward navigation.
- Lazy loading is a performance boundary, not an authorization boundary. Use functional guards (e.g. `CanMatch` for admin and `CanActivate` where appropriate) together with backend authorization.

## Angular And UI Conventions

- Keep route-aware behavior in pages or existing routing services.
- Keep business logic in typed services or feature state; keep templates focused on presentation.
- Use `inject()` and existing dependency injection conventions. Avoid duplicate service instances and global providers for feature-only functionality.
- Prefer signals for synchronous UI state and RxJS for asynchronous streams as appropriate. Use `takeUntilDestroyed()` for subscriptions and clean up listeners and realtime channels.
- Keep loading, empty, success and error states explicit. Prevent duplicate submissions and preserve filters during updates.
- Use PrimeNG for suitable complex controls (tables, dialogs, selects, pagination, toast messages). Use Tailwind CSS v4 utilities for all custom styling, and PrimeIcons for consistent iconography. Use existing PrimeNG theme tokens and supported styling APIs instead of custom CSS overrides.
- Load Highcharts only within features that need charts, primarily admin reporting. Use typed chart options and dispose of chart instances when necessary.
- Preserve existing providers, theme configuration and zoneless setup if present. Do not add Zone.js merely to work around incorrect state updates.

## Data, State And Supabase Security

- Use a centralized, typed Supabase client and reusable data services. Do not create a new client per component.
- Direct browser access to Supabase is acceptable for operations protected by correctly scoped RLS. Privileged or secret-bearing operations belong in trusted server-side functions when needed.
- Use only public publishable/anon keys in frontend code. Never expose service-role keys, secret keys, database passwords, payment credentials or access tokens in source, logs or UI.
- Inspect the actual database schema, generated types, policies and RPC signatures before using or changing them. Never invent tables or columns.
- Require RLS and least-privilege grants for exposed tables and appropriate Storage policies. Customers may access only authorized data; public catalog reads must expose only intended published data.
- Admin rights must be enforced using trusted backend authorization, not editable local storage, UI flags or user-editable profile metadata.
- Preserve the existing authentication/session architecture. Handle initialization, expiry, refresh and sign-out correctly. Do not manually duplicate tokens or bypass authentication for convenience.
- Validate prices, discounts, shipping totals, stock and order transitions on the trusted backend. Treat all browser input as untrusted.
- Use atomic database operations for order creation and stock updates; handle concurrent orders and retries safely.
- Do not modify schema, RLS, functions, storage policies or production data for UI-only tasks. For requested database changes, use reviewable migrations, explain impact and test permissions; do not apply destructive or production changes without explicit approval.
- Avoid fetching unnecessary columns and records. Use appropriate filters, pagination and indexes; handle Supabase errors explicitly.
- Do not add a global state library. Keep transient UI state separate from business state, with a single source of truth for desktop and mobile.

## Fashion E-commerce Domain Rules

- Model products and variants distinctly where the real schema supports them. Size, color, SKU, images, availability and price must stay consistent with the selected variant.
- Keep product, category and collection concepts distinct. Preserve unpublished and archived item visibility rules.
- Use real inventory and order data, not static dashboard statistics. Do not infer payment success from a frontend redirect.
- Preserve order item snapshots and historical prices where supported. Do not silently recalculate historical orders from current catalog prices.
- Keep cart and wishlist state scoped to the correct user or supported guest session. Validate quantity limits and availability at checkout.
- Do not assume payment methods, currencies, shipping rules, return policies, countries or supported languages; use verified project requirements and configuration.

## Styling And Responsiveness

- Follow Tawakkul's approved design and brand assets: premium editorial, contemporary modest fashion with Russian-inspired aesthetics. Do not reuse Nestora Home colors or branding.
- Use the actual design tokens, fonts, spacing and theme from the project or approved Figma design. Do not invent a fixed brand palette.
- Customer pages should emphasize product photography, clear hierarchy, refined typography and frictionless shopping. Admin pages should prioritize readable tables, efficient workflows and consistent controls.
- Tailwind CSS v4 is mandatory for all new and modified UI in Admin, Customer and Shared. Apply utility classes directly in HTML templates. Do not use component-scoped CSS/SCSS, inline `style` attributes, `[style]` bindings for ordinary UI styling, CSS strings in TypeScript, `::ng-deep`, or custom CSS selectors as substitutes for Tailwind utilities.
- Use Tailwind utilities for layout, spacing, typography, colors, borders, shadows, responsive breakpoints, hover/focus states, transitions, animations and positioning. Use arbitrary values and variants when needed, preferring existing theme tokens.
- Preserve the existing global Tailwind entry stylesheet, theme tokens, font declarations and required third-party stylesheet imports. Do not add custom global CSS rules to bypass the Tailwind-only requirement. Any genuinely unavoidable custom CSS requires explicit user approval first.
- Generate new components without a stylesheet using `npm run ng -- generate component <path> --style=none --skip-tests`. Keep HTML templates in separate files; do not use inline templates.
- When modifying existing components with custom CSS, migrate their styles to Tailwind utilities within the task scope, preserve the visual design and behavior, and remove unused stylesheet references and empty CSS files. Do not delete global or unrelated stylesheets.
- Use existing PrimeNG theme configuration, component inputs, `styleClass` or supported pass-through APIs for library styling where applicable. Preserve required third-party internal styling.
- Do not use `@apply` to recreate component stylesheets or move large blocks of CSS into global files.
- Preserve desktop, tablet and mobile layouts; avoid horizontal page overflow. Make tables intentionally scrollable where appropriate.
- Keep touch targets usable, forms accessible, focus visible, and dialogs/drawers keyboard accessible. Restore focus and background scrolling when overlays close.
- Use controlled layering and safe-area padding where needed. Do not introduce fixed heights that clip translated content.
- Optimize product imagery, preserve aspect ratios and use lazy image loading for below-the-fold content. Avoid lazy loading the primary above-the-fold hero image when it harms performance.

## Internationalization

- Use existing ngx-translate configuration, translation keys and HTTP loader paths.
- Do not hardcode user-facing UI text when translation infrastructure is available. Update all supported locale files consistently.
- Keep dynamic product translations aligned with the real data model. Do not invent supported locales.
- Preserve RTL/LTR behavior where applicable. Use logical spacing and locale-aware formatting for dates, numbers and currencies.

## Git And Collaboration

- The development branch for Yazan is `yazan`; `razan` is a separate collaborator branch. Verify the current branch with `git branch --show-current` and `git status` before editing.
- Work on the requested branch. Do not switch branches automatically when there are uncommitted changes.
- Do not commit, push, merge, rebase, reset, force-push or delete branches unless explicitly requested.
- Keep changes focused. Do not commit `node_modules/`, build output, credentials or local temporary files.

## Validation Expectations

After code changes:

- Run the production build and resolve errors introduced by the task. Inspect configured budgets; do not raise them simply to pass the build.
- Run lint and relevant existing Vitest/Angular tests when practical. Do not create new test files or modify existing tests unless explicitly requested (new spec files remain prohibited).
- For routing changes, verify `/`, `/admin`, `/admin/dashboard`, affected child routes, direct navigation and lazy chunks.
- For security-sensitive changes, verify unauthorized, customer and admin behavior, including backend enforcement. Use safe test environments and non-sensitive test data.
- For responsive UI changes, check relevant mobile, tablet and desktop widths (e.g. 375, 768 and 1440 px) when tooling is available. Verify that new or modified components use Tailwind utility classes and introduce no unauthorized CSS/SCSS files, style declarations or stylesheet references.
- Check loading, empty, error and success states, keyboard navigation and affected translations.
- Report any check that could not be run and why. Never claim a passing result without execution.

## Final Response Expectations

For implementation tasks, include:

- Root cause or implementation objective.
- Concise explanation of the change and relevant decisions.
- Modified files and reusable components/services/state added or changed.
- Responsive, routing, database or security implications when relevant.
- Actual build, lint and test results.
- Any unresolved issue, assumptions, or validation gap.

Do not report changes, deployments or database operations that were not actually performed.
