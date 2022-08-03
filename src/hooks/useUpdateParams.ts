import { IState } from "@/types"
import { useDispatch, useSelector } from "react-redux"

interface Params {
  setObjects(value: any): void,
  objects: any[] // any[]
}

const useUpdateParams = ({ setObjects, objects }: Params) => {
  const dispatch = useDispatch()
  const canvasObjects = useSelector((state: IState) => state.canvasObjects)

  return (object: any) => {
    for (let i=0; i<objects.length; i++) {
      if (objects[i].id !== object.id) continue
      const list = [...objects]
      list.splice(i, 1, object)
      setObjects(list)
      dispatch({
        type: 'change params',
        value: [canvasObjects[0], ...list]
      })
    }
  }
}

export default useUpdateParams