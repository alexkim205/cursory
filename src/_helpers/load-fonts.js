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
  // faQuestionCircle,
} from '@fortawesome/pro-regular-svg-icons';

import {
  // faPenNib,
  // faPalette,
  faQuestionCircle,
  faPlusHexagon,
  faPlusCircle,
  faPlus,
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
      // Brands
      faGithub,
      faGoogle,
      faFacebookF,
      faTwitter,
      faMicrosoft,
  );
};
