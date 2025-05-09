// src/bootstrap.tsx
import { createRoot } from 'react-dom/client';
import App2 from './App2';

// Создаем отдельный корневой элемент для React 18
const container = document.getElementById('react18-root');
if (container) {
    const root = createRoot(container);
    root.render(<App2 />);
}

export default App2;