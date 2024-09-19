import '@busy-hour/blaze-trpc';
import { BlazeTrpcRouter } from '@busy-hour/blaze-trpc/types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Blaze } from '@busy-hour/blaze';
import { cors } from '@busy-hour/blaze/cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicePath = path.resolve(__dirname, 'services');

const app = new Blaze();

await app.load({
  path: servicePath,
  middlewares: [['ALL', cors()]],
  autoStart: true,
});

app.useTrpc('/trpc/*', {
  middlewares: [cors()],
});

const config = app.serve(3000);

export type { BlazeTrpcRouter };

export default config;
