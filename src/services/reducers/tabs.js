import { SWITCH_TAB, SCROLL_INGREDIENTS } from "../actions/tabs";

const initialState = {
  activeTab: "bun",
  scroll: null,
};

export const tabsReduser = (state = initialState, action) => {
  switch (action.type) {
    case SCROLL_INGREDIENTS:
      return {
        ...state,
        scroll: action.scroll,
      };
    case SWITCH_TAB:
      return {
        ...state,
        activeTab: action.activeTab,
      };
    default:
      return state;
  }
};
