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
    - добавить параметры и их обновление
    - пофиксить тул image (можно убрать вью-порт, чтобы картинка загружалась с
    исходными соотношениями, и при изменении ширины/высоты вторая характеристика
    менялась под это соотношение)
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