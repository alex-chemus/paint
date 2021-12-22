import React from 'react'
// components
import CanvasContainer from './components/CanvasContainer/CanvasContainer'
import Leftbar from './components/Leftbar/Leftbar'
import Rightbar from './components/Rightbar/Rightbar'
import Topbar from './components/Topbar/Topbar'

function App() {
  /*
    todos:
    - сделать валидацию (достаточно широкий экран, мышь) и элемент-ворнинг
    - сделать, чтобы при обнулении currentObject создавался новый канвас,
    значение которого будет передаваться в рендер.
    также надо подумать, как сделать это с картинками
    - закоментить код (а то вообще пипяу)
  */

  return (
    <>
      <Topbar/>
      <Leftbar/>
      <Rightbar/>
      <CanvasContainer/>
    </>
  );
}

export default App;