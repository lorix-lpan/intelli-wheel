import React from 'react';
import ToggleButton from './shared/ToggleButton';

function App() {
  return (
    <div>
      <ToggleButton
        emitEvent="motor:toggle"
        listenEvent="motor:state"
        btnName="Toggle Motor"
        stateName="Motor State"
      />
      <ToggleButton
        emitEvent="servo:toggle"
        listenEvent="servo:state"
        btnName="Start Moving"
        stateName="Motion State"
      />
      <ToggleButton
        emitEvent="direction:toggle"
        listenEvent="direction:state"
        btnName="Toggle Direction"
        stateName="Direction State"
      />
    </div>
  );
}

export default App;
