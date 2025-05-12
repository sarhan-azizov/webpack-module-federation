import React, { useState, useEffect, useRef } from 'react';

const App: React.FC = () => {
  const [state, setState] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadMicrofrontend = async () => {
      try {
        const module = await import('sarhanModern/App2');
        if (containerRef.current) {
          module.mount(containerRef.current.id, { initialState: state});
        }
      } catch (error) {
        console.error('Failed to load microfrontend:', error);
      }
    };

    loadMicrofrontend();
  }, []);

  useEffect(() => {
    const event = new CustomEvent('parentStateChange', {
      detail: { state }
    });
    window.dispatchEvent(event);
  }, [state]);

  return (
    <>
      <h1 onClick={() => setState((prevState) => prevState + 1)}>
        NuORDER | React v{React.version} | local state: {state} 
      </h1>
      <div id="microfrontend-container" ref={containerRef}>
        <div>Loading...</div>
      </div>
    </>
  );
};

export default App;