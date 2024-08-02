import { RouteSectionProps } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import BottomNav from './components/BottomNav';
import Drawer from './components/Drawer';
import Nav from './components/Nav';
import './index.css';

const queryClient = new QueryClient();

const App = (props: RouteSectionProps) => (
  <QueryClientProvider client={queryClient}>
    <div class="drawer text-slate-300">
      <input id="drawer-left" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <Nav />
        <div class="mb-16">{props.children}</div>
        <BottomNav />
      </div>
      <Drawer />
    </div>
    <SolidQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
