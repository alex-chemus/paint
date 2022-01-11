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
    менялась под это соотношение) [image багован со всеми параметрами, 
    пересмотреть весь код]
    - пофиксить: размер картинки и толщина обводки должны быть относительно 
    канваса, чтобы в слоях всё корректно отображалось (можно сделать ВСЕ параметры в стейте 
    абсолютными, а миниканвасы их уже подгонят под свои размеры,
    либо можно расчитать эти параметры в render) [и так со всеми параметрами]
    - доекомпозировать render
    - добавить в ParamItems где нужно валидацию isNan
    - пофиксить end и start у круга
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