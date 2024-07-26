import { RouteDefinition, Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { lazy } from 'solid-js';
import BottomNav from './components/BottomNav';
import Drawer from './components/Drawer';
import Nav from './components/Nav';
import './index.css';

const queryClient = new QueryClient();

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '**',
    component: lazy(() => import('./pages/NotFound')),
  },
];

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div class="drawer">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
          <Nav />
          <div class="mb-16">
            <Router>{routes}</Router>
          </div>
          <BottomNav />
        </div>
        <Drawer />
      </div>
      <SolidQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
