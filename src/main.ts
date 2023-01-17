import { render } from 'solid-js/web';
import { App } from './App.tsx';

const container = document.getElementById('root');
if (container) render(App,  container);
