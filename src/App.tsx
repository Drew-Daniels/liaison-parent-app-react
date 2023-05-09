import { useParent } from 'liaison-react';
import { nanoid } from 'nanoid';

import './App.css'

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const { callIFrameEffect } = useParent({
    iframe: {
      id: 'my-embedded-iframe',
      src: 'http://localhost:3002',
    },
    effects: {
      onLogoutComplete: () => {
        // do something
      },
      onSendTokenSync: ({ callIFrameEffect }) => {
        const token = nanoid();
        callIFrameEffect({
          name: 'onTokenReceived',
          args: { token },
        });
      },
      onSendTokenAsync: async ({ callIFrameEffect }) => {
        await timeout(3000);
        const token = nanoid();
        callIFrameEffect({
          name: 'onTokenReceived',
          args: { token },
        });
      }
    }
  })

  return (
    <>
      <h1>Parent Window</h1>
      <div className='buttons'>
        <p>Request to run events within the iFrame!</p>
        <button onClick={initiateChildLogout}>
          REQUEST iframe log out the user
        </button>
      </div>
      <div id="my-embedded-iframe-container">
        <iframe id="my-embedded-iframe" src="http://localhost:3002" className="iframe"></iframe>
      </div>
    </>
  )

  function initiateChildLogout() {
    callIFrameEffect({ name: 'onLogoutRequested' });
  }
}

export default App
