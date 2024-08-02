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
    component: lazy(() => import('./pages/Home/Home')),
  },
  {
    path: '/books',
    component: lazy(() => import('./pages/Books/Books')),
  },
  {
    path: '/book/:id',
    component: lazy(() => import('./pages/Books/ViewBook')),
  },
  {
    path: '/houses',
    component: lazy(() => import('./pages/Houses/Houses')),
  },
  {
    path: '/house/:house',
    component: lazy(() => import('./pages/Houses/ViewHouse')),
  },
  {
    path: '/characters',
    component: lazy(() => import('./pages/Characters/Characters')),
  },
  {
    path: '/character/:name',
    component: lazy(() => import('./pages/Characters/ViewCharacter')),
  },
  {
    path: '/spells',
    component: lazy(() => import('./pages/Spells/Spells')),
  },
  {
    path: '/quiz',
    component: lazy(() => import('./pages/Quiz/Quiz')),
  },
  {
    path: '**',
    component: lazy(() => import('./pages/Error/NotFound')),
  },
];

const MainRouter = () => <Router root={App}>{routes}</Router>;

export default MainRouter;
