import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Blaze } from '@busy-hour/blaze';
import { cors } from '@busy-hour/blaze/cors';

export type { BlazeTrpcRouter } from '@busy-hour/blaze/trpc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicePath = path.resolve(__dirname, 'services');

const app = new Blaze();

await app.load({
  path: servicePath,
  middlewares: [['ALL', cors()]],
  autoStart: true,
});

app.trpc('/trpc/*', {
  middlewares: [cors()],
});

const config = app.serve(3000);

export default config;
