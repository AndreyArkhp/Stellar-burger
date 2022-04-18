import { SWITCH_TAB, SCROLL_INGREDIENTS } from "../actions/tabs";

const initialState = {
  activeTab: "buns",
  scroll: false,
};

export const tabsReduser = (state = initialState, action) => {
  switch (action.type) {
    case SCROLL_INGREDIENTS:
      return {
        ...state,
        activeTab: action.activeTab,
        scroll: true,
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
