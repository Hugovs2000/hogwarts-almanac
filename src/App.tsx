import { RouteDefinition, Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { lazy } from 'solid-js';
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
      <nav>
        <span>Hogwarts Almanac</span>
      </nav>
      <Router>{routes}</Router>
      <SolidQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
