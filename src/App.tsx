import { useState } from 'react';
import {  useParent } from 'post-punk';
import { nanoid } from 'nanoid';

import './App.css'

function App() {
  const [logoutRequests, setLogoutRequests] = useState(0);

  const { callChildMethod } = useParent({
    iframeOpts: {
      id: 'my-embedded-iframe',
      containerId: 'my-embedded-iframe-container',
      src: 'http://localhost:3002',
      classes: ['iframe'],
    },
    handlers: {
      logout: () => {
        setLogoutRequests(prevNumber => prevNumber + 1);
      },
      sendToken: () => {
        const token = nanoid();
        parentRef.current?.callChildMethod({
          functionName: 'saveToken',
          args: token,
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
    callChildMethod({ functionName: 'logout'});
  }
}

export default App
