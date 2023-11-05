import HexButton from './components/hex-button/hex-button.vue'
import HexButton2 from './components/hex-button/HexButton2.vue'
import HexCellGroup from './components/hex-cell-group/hex-cell-group.vue'
import HexCellItem from './components/hex-cell-item/hex-cell-item.vue'

// const _components: Record<string, unknown> = {}
// const componentsGlob: Record<string, { default: any }> =  import.meta.glob('./components/**/*.vue', { eager: true })

// Object.entries(componentsGlob).forEach(([key, value]) => {
//   _components[key] = value.default 
// })

// console.log(_components, "_components");


export {
  HexButton,
  HexButton2,
  HexCellGroup,
  HexCellItem
}



// // console.log(components);


// export const components = _components