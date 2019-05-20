import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faStar,
    faTags,
    faHourglassStart,
    faFire,
    faUserFriends
} from "@fortawesome/pro-solid-svg-icons";

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
    faPenFancy
    // faQuestionCircle,
} from "@fortawesome/pro-regular-svg-icons";

import {
    // faPenNib,
    // faPalette,
    faQuestionCircle
} from "@fortawesome/pro-light-svg-icons";

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
        // Solid 
        faStar,
        faTags,
        faHourglassStart,
        faFire,
        faUserFriends
    );
};
