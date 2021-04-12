import React, { useMemo } from 'react'

import { usePersistent, makeVersionedValue } from 'react-use-persistent'

const App = () => {
  const [ persistent, setPersistent, { revision: persistentRevision } ] = usePersistent("persistent-key", 1);
  const [ versioned, setVersioned, { revision: versionedRevision } ] = useMemo(() => makeVersionedValue(1), []).useAsState();

  return (
    <div>
      <div>
        <button onClick={() => setPersistent(persistent - 1)}>-</button>
        Persistent: {persistent} Revision: {persistentRevision}
        <button onClick={() => setPersistent(persistent + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setVersioned(versioned - 1)}>-</button>
        Versioned: {versioned} Revision: {versionedRevision}
        <button onClick={() => setVersioned(versioned + 1)}>+</button>
      </div>
    </div>
  )
}

export default App
