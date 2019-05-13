import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faH1,
  faH2,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faLink,
  faCode,
  faHighlighter,
  faHeading,
  faQuoteLeft,
  faAngleDoubleRight,
  faListOl,
  faListUl,
    faBracketsCurly
} from '@fortawesome/pro-regular-svg-icons';

export const loadFonts = () => {
  library.add(
      faH1,
      faH2,
      faBold,
      faItalic,
      faUnderline,
      faStrikethrough,
      faLink,
      faCode,
      faHighlighter,
      faHeading,
      faQuoteLeft,
      faAngleDoubleRight,
      faListOl,
      faListUl,
      faBracketsCurly,
  );
};

// export {default as } from ''
// import path from 'path'
//
// // https://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
// function camelCase(input) {
//   let camelCase = input.toLowerCase().replace(/-(.)/g, function(match, group1) {
//     return group1.toUpperCase();
//   });
//   return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
// }
//
// const reqSvgs = require.context('../_assets/svgs/', true, /\.svg$/);
// // console.log(reqSvgs.keys())
// const iconNames = reqSvgs.keys().map((icon) => path.basename(icon).slice(0, path.basename(icon).length-4))
// const dirNames = reqSvgs.keys().map((icon) => path.dirname(icon))
// // console.log(dirNames)
// const rxFileNames = iconNames.map((icon) => camelCase(icon))
// // const object = iconNames.reduce((o, k, i) => ({...o,
// //   [`fa${dirNames[i].split('/')[1].charAt(0).toUpperCase() + dirNames[i].split('/')[1].slice(1)}${el}`]: `${dirNames[i]}/${rxFileNames[i]}.js`
// // }), {})
//
// const exportThis = rxFileNames.map((el, i) => {
//   return `export {default as fa${dirNames[i].split('/')[1].charAt(0).toUpperCase() + dirNames[i].split('/')[1].slice(1)}${el}} from '${dirNames[i]}/${rxFileNames[i]}.js'`
// })
//
// console.log(exportThis.join('\n'))

