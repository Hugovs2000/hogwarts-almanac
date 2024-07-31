import { Navigate, RouteDefinition, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import App from './App';

const routes: RouteDefinition[] = [
  {
    path: '',
    component: () => <Navigate href="/home" />,
  },
  {
    path: '/',
    component: () => <Navigate href="/home" />,
  },
  {
    path: '/home',
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
    path: '/house/:house',
    component: lazy(() => import('./pages/ViewHouse')),
  },
  {
    path: '/characters',
    component: lazy(() => import('./pages/Characters')),
  },
  {
    path: '/character/:name',
    component: lazy(() => import('./pages/ViewCharacter')),
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

const MainRouter = () => <Router root={App}>{routes}</Router>;

export default MainRouter;
