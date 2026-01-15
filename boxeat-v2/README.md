# BoxEat V2

Monorepo pnpm pour BoxEat V2 (API NestJS + Mobile Expo + package partagé).

## Démarrage en 5 minutes
1. Copier `.env.example` vers `.env` et remplir les secrets.
2. Installer les dépendances : `pnpm install`.
3. Lancer Postgres local puis appliquer les migrations : `pnpm db:migrate`.
4. Seeder la base : `pnpm db:seed`.
5. Lancer l'API et le mobile : `pnpm dev`.

## Scripts
- `pnpm dev` : API + Mobile en parallèle.
- `pnpm api:dev` : API uniquement.
- `pnpm mobile:dev` : Mobile uniquement.
- `pnpm db:migrate` : migrations Prisma.
- `pnpm db:seed` : seed Prisma.

## Comptes de test
- admin@boxeat.test / Password123!
- operator@boxeat.test / Password123!
- customer@boxeat.test / Password123!

## Simulations
- Titres-repas simulés via `MEAL_VOUCHER_SIMULATION=true`.

## Release checklist
- [ ] Secrets prod configurés.
- [ ] Webhook Stripe activé.
- [ ] Storage S3 branché.
- [ ] Monitoring (logs/metrics) connecté.
