
import { renderToString } from 'react-dom/server'

let getComponentList = []
let loadedComponentList = {}

export const add = (getComponent) => {
  if (getComponent) {
    getComponentList.push(getComponent)
    return getComponentList.length - 1
  }
}
export const getComponent = (indexKey) => {
  return loadedComponentList[indexKey] || function () { return undefined }
}

export const flushLoadable = async (app) => {
  renderToString(app)

  loadedComponentList = {}
  let i = 0;
  console.log('load...', getComponentList.length)
  for (let getComponent of getComponentList) {
    const Component = await getComponent()
    console.log(Component.default)
    loadedComponentList[i] = Component.default
    i++;
  }
  getComponentList = []
  return loadedComponentList
}

export const flushLoadableClient = async () => {
  console.log('client flush loadable')
  let i = 0;
  console.log('for ', i)
  for (let getComponent of getComponentList) {
    if (__LOADED__[i]) {
      console.log('component already load from ssr')
      loadedComponentList[i] = __LOADED__[i]
      __LOADED__[i]
    } else {

      const Component = await getComponent()
      loadedComponentList[i] = Component.default
    }
    i++;
  }

}