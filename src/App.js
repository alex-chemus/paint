import React, { useEffect, useContext } from 'react'
//import Store from './context/store'
// components
import Canvas from './components/Canvas/Canvas'
import Leftbar from './components/Leftbar/Leftbar'
import Rightbar from './components/Rightbar/Rightbar'
import Topbar from './components/Topbar/Topbar'

function App() {
  /*
    todos:
    - сделать валидацию (достаточно широкий экран, мышь) и элемент-ворнинг
    - сделать шаблоны дла каждого инструмента (слой, фабрика и т.д.),
    поместить в templates
    - добавить "clear", очищающий canvas
    - реализовать undo и redo
  */

  return (
    <>
      <Topbar/>
      <Leftbar/>
      <Rightbar/>
      <Canvas/>
    </>
  );
}

export default App;