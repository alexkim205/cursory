import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faGithub,
  faGoogle,
  faFacebookF,
  faTwitter,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';

import {
  faStar,
  faTags,
  faHourglassStart,
  faFire,
  faUserFriends,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';

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
  faBracketsCurly,
  faPenNib,
  faPenFancy,
  faCheck,
  faTrash,
  faPlus as farPlus,
  // faQuestionCircle,
} from '@fortawesome/pro-regular-svg-icons';

import {
  // faPenNib,
  // faPalette,
  faQuestionCircle,
  faPlusHexagon,
  faPlusCircle,
  faPlus, // add
  faFileAlt, // document/page
  faBars, // settings
  faRss, // feed
  faNewspaper, // statistics
  faRulerHorizontal, // rules/guidelines
  faFont, // Text
  faPencilAlt, // Form
  faClock, // Timer
  faLink as falLink, // Link
  faAppleAlt, // Icons
  faTh, // Container
  faImage, //Image
  faVideo, // Video
  faCameraRetro, // Gallery
  faPepperHot, // Widget
  faCode as falCode, //Embed
  faSearch, // Search Bar
  faGripLines, // Divider
} from '@fortawesome/pro-light-svg-icons';

export const loadFonts = () => {
  library.add(
      // Regular
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
      faPenNib,
      faPenFancy,
      faCheck,
      faTrash,
      farPlus,
      // Light
      faQuestionCircle,
      faPlusHexagon,
      faPlusCircle,
      faPlus,
      // Solid
      faStar,
      faTags,
      faHourglassStart,
      faFire,
      faUserFriends,
      faCaretDown,
      // Brands
      faGithub,
      faGoogle,
      faFacebookF,
      faTwitter,
      faMicrosoft,

      // For Floating Widget
      faPlus, // add new element
      faFileAlt, // document/page
      faBars, // settings
      faRss, // feed
      faNewspaper, // statistics
      faRulerHorizontal, // rules/guidelines
      faFont, // Text
      faPencilAlt, // Form
      faClock, // Timer
      falLink, // Link
      faAppleAlt, // Icons
      faTh, // Container
      faImage, //Image
      faVideo, // Video
      faCameraRetro, // Gallery
      faPepperHot, // Widget
      falCode, //Embed
      faSearch, // Search Bar
      faGripLines, // Divider
  );
};
