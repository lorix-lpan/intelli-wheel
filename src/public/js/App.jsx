import React from 'react';
import ToggleButton from './shared/ToggleButton';

function App() {
  return (
    <div>
      <ToggleButton
        listenEvent="motor:toggle"
        emitEvent="motor:state"
        btnName="Toggle Motor"
        stateName="Motor State"
      />
    </div>
  );
}

export default App;
