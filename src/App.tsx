import { useState } from 'react';
import { useParent } from '@drew-daniels/liaison-react-sdk';
import { nanoid } from 'nanoid';

import './App.css'

function App() {
  const [logoutRequests, setLogoutRequests] = useState(0);

  const { callIFrameEffect } = useParent({
    iframeOpts: {
      id: 'my-embedded-iframe',
      containerId: 'my-embedded-iframe-container',
      src: 'http://localhost:3002',
      classes: ['iframe'],
    },
    effects: {
      logout: () => {
        setLogoutRequests(prevNumber => prevNumber + 1);
      },
      sendToken: ({ callIFrameEffect }) => {
        const token = nanoid();
        callIFrameEffect({
          name: 'saveToken',
          args: {token},
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
          Initiate <em>Child</em> Logout Process
        </button>
      </div>
      <div>
        <h2>Logout Requests:</h2>
        <p>{logoutRequests}</p>
      </div>
      <div id="my-embedded-iframe-container" />
    </>
  )

  function initiateChildLogout() {
    callIFrameEffect({ name: 'logout', args: {} });
  }
}

export default App
