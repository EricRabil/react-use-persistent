# react-use-persistent

> Persistent state made easy

## Install

```bash
npm install --save react-use-persistent
```

## Usage

```tsx
import React, { Component } from 'react'

import { usePersistent } from 'react-use-persistent'

function MyComponent() {
  const [ setting, setSetting ] = usePersistent("localstorage-key", false);

  return (
    <input type="checkbox" checked={setting} onChange={event => setSetting(event.target.checked)} />
  )
}
```

## License

MIT © [EricRabil](https://github.com/EricRabil)
