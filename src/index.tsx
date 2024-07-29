import { render } from 'solid-js/web';

import { RouteDefinition, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import App from './App';

const root = document.getElementById('root');

const routes: RouteDefinition[] = [
  {
    path: '',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/books',
    component: lazy(() => import('./pages/Books')),
  },
  {
    path: '/book/:id',
    component: lazy(() => import('./pages/ViewBook')),
  },
  {
    path: '/houses',
    component: lazy(() => import('./pages/Houses')),
  },
  {
    path: '/characters',
    component: lazy(() => import('./pages/Characters')),
  },
  {
    path: '/spells',
    component: lazy(() => import('./pages/Spells')),
  },
  {
    path: '**',
    component: lazy(() => import('./pages/NotFound')),
  },
];

if (!root) {
  throw new Error('No root element found');
} else {
  render(() => <Router root={App}>{routes}</Router>, root);
}
