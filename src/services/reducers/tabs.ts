import { SWITCH_TAB, SCROLL_INGREDIENTS, TTabsActions } from "../actions/tabs";


interface ITabsState {
  activeTab: string;
  scroll: string|null;
}

const initialState:ITabsState = {
  activeTab: "bun",
  scroll: null,
};

export const tabsReduser = (state = initialState, action:TTabsActions):ITabsState => {
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
