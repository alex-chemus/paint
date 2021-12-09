import React from 'react'
import Store from './context/store'
// components
import Canvas from './components/Canvas/Canvas'
import Leftbar from './components/Leftbar/Leftbar'
import Rightbar from './components/Rightbar/Rightbar'
import Topbar from './components/Topbar/Topbar'

function App() {
  return (
    <Store>
      <Topbar/>
      <Leftbar/>
      <Rightbar/>
      <Canvas/>
    </Store>
  );
}

export default App;
