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
    - сделать move тул
    - добавить параметры и их обновление
    - пофиксить баг, когда работаешь со слоями, 
    переходишь на канвас, а фигура сама рисуется за мышкой
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