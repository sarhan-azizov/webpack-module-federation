import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

import { Button } from '@lightspeed/design-system-react';
import "@lightspeed/design-system-css";

const App2: React.FC = (props: any) => {
    const [state, setState] = useState(0);
    const [parentState, setParentState] = useState(props.initialState);


    useEffect(() => {
        const handleStateChange = (event: CustomEvent<{ state: number }>) => {
            console.log('Received state from parent:', event.detail.state);
            setParentState(event.detail.state);
        };

        window.addEventListener('parentStateChange', (handleStateChange as EventListener));

        return () => {
            window.removeEventListener('parentStateChange', handleStateChange as EventListener);
        };
    }, []);

    return (
        <>
            <h1 onClick={() => setState((prevState) => prevState + 1)}>
                Micro-Frontend | React v{React.version} | local state: {state} | parent state: {parentState}
            </h1>
            <div style={{ marginLeft: '20px' }}>
                <Button>Helios Button</Button>
            </div>
        </>
    );
};

export const mount = (containerId: string, props: any) => {
    const container = document.getElementById(containerId);
    if (container) {
        const root = createRoot(container);
        root.render(<App2 {...props} />);
    }
};

export default App2;