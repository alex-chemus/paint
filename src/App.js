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
    - пофиксить тул image (можно убрать вью-порт, чтобы картинка загружалась с
    исходными соотношениями, и при изменении ширины/высоты вторая характеристика
    менялась под это соотношение) [image багован со всеми параметрами, 
    пересмотреть весь код]
    - добавить в ParamItems где нужно валидацию isNan
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