import { render } from 'solid-js/web';
import MainRouter from './MainRouter';

const root = document.getElementById('root');

if (!root) {
  throw new Error('No root element found');
} else {
  render(MainRouter, root);
}
