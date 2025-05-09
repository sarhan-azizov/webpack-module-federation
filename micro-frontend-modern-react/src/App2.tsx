import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';

import { Button } from '@lightspeed/design-system-react';
import "@lightspeed/design-system-css";

const App2: React.FC = (props) => {
    const [state, setState] = useState(0);
    return (
        <>
            <h1 onClick={() => setState((prevState) => prevState + 1)}>
                Micro-Frontend | React v{React.version} | {state}
            </h1>
            <div>Host props: {JSON.stringify(props)}</div>
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