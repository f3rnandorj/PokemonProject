import { setupServer } from 'msw/node';

import { homeHandlers } from './Home/homeHandlers';

export const server = setupServer(...homeHandlers);
