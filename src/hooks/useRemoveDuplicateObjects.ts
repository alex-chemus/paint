const treesEqual = (tree1: any, tree2: any) => { // both ISheet
  // проверка на соответсвие ключей деревьев друг другу
  for (let key in tree1) {
    if (!Object.keys(tree2).includes(key)) return false
  }
  for (let key in tree2) {
    if (!Object.keys(tree1).includes(key)) return false
  }
  // проверка на соответствие значений деревьев
  for (let i=0; i<Object.values(tree1).length; i++) {
    const arr1 = Object.values(tree1).sort() // значения первого дерева
    const arr2 = Object.values(tree2).sort() // значения второго дерева

    if (typeof arr1[i] !== 'object') { 
      // не объект, проверка по примитивам
      if (arr1[i] !== arr2[i]) { 
        return false
      }
    } else if (arr1[i] instanceof HTMLElement && arr2[i] instanceof HTMLElement) {
      // html-объект, пропускаем
    } else if (typeof arr1[i] === typeof arr2[i] && arr1[i] && arr2[i]) {
      // два объекта, рекурсия
      if ( !treesEqual(arr1[i], arr2[i]) ) { 
        return false
      }
    } // другой случай - оба значения null, проходит проверку всегда
  }

  return true
}

const useRemoveDuplicateObjects = () => {
  return (prevOrig: any[], nextOrig: any[]) => { // both ISheet[]
    const prev = [...prevOrig]
    const next = [...nextOrig]
    while (true) {
      let removed = false
      next.forEach((nextItem, i) => {
        prev.forEach((prevItem, j) => {
          if ( treesEqual(nextItem, prevItem) ) {
            prev.splice(j, 1)
            next.splice(i, 1)
            removed = true
          }
        })
        return
      })
      if (!removed) break
    }

    return [prev, next]
  }
}
 
export default useRemoveDuplicateObjects