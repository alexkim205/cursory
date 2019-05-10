import {library} from '@fortawesome/fontawesome-svg-core';

import {fab} from '@fortawesome/free-brands-svg-icons';
import {
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
} from '@fortawesome/free-solid-svg-icons';

export const loadFonts = () => {
  library.add(
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
  );
};
