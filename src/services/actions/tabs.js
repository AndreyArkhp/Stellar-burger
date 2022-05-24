export const SWITCH_TAB = "SWITCH_TAB";
export const SCROLL_INGREDIENTS = "SCROLL_INGREDIENTS";

export const scrollIngredients = (tab) => {
  return {type: SCROLL_INGREDIENTS, scroll: tab};
};

export const switchTab = (activeTab) => {
  return {type: SWITCH_TAB,activeTab};
};
