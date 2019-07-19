import { availableChannels } from "utils/constants";
import _ from "lodash";

const questOrder = ["general_1", "general_2", "general_3", "review", "buzz"];

export function questSortFunction(a, b) {
  return questOrder.indexOf(a.quest_type) - questOrder.indexOf(b.quest_type);
}

export function filterAllowedChannels(hunterChannels, allowedChannels) {
  let filteredChannels = [];
  hunterChannels.forEach(channel => {
    const { channel_type } = channel;
    let { key } = _.find(availableChannels, ["key", channel_type]);
    if (allowedChannels.includes(key)) {
      filteredChannels.push(channel);
    }
  });

  console.log("filtered", filteredChannels);
  return filteredChannels;
}

export function filterGeneralQuests(item) {
  return item.quest_type.indexOf("general") > -1;
}

export function filterReviewQuests(item) {
  return item.quest_type.indexOf("review") > -1;
}

export function filterBuzzQuests(item) {
  return item.quest_type.indexOf("buzz") > -1;
}
