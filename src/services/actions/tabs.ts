export const SWITCH_TAB:"SWITCH_TAB" = "SWITCH_TAB";
export const SCROLL_INGREDIENTS: "SCROLL_INGREDIENTS" = "SCROLL_INGREDIENTS";

interface IScrollIngredients {
  type: typeof SCROLL_INGREDIENTS;
  scroll: string;
}

interface ISwitchTab {
  type: typeof SWITCH_TAB;
  activeTab: string;
}

export type TTabsActions = IScrollIngredients | ISwitchTab;

export const scrollIngredients = (tab:string):IScrollIngredients => {  
  return {type: SCROLL_INGREDIENTS, scroll: tab};
};

export const switchTab = (activeTab:string):ISwitchTab => {  
  return {type: SWITCH_TAB,activeTab};
};
