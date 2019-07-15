const questOrder = ["general_1", "general_2", "general_3", "review", "buzz"];

export function questSortFunction(a, b) {
  return questOrder.indexOf(a.quest_type) - questOrder.indexOf(b.quest_type);
}

export function filterGeneralQuests(item, index) {
  return item.quest_type.indexOf("general") > -1;
}

