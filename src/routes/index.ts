import { Hono } from 'hono';
import tiktok from './tiktok';
import youtube from './youtube';
import instagram from './instagram';
import facebook from './facebook';

const routes = new Hono();

routes.route('/tiktok', tiktok);
routes.route('/youtube', youtube);
routes.route('/instagram', instagram);
routes.route('/facebook', facebook);

routes.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'hono-scraper-api',
  });
});

export default routes;
