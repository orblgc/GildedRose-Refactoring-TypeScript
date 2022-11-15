import { Item } from "../classes/item";
import config from "../config.json";

const isHigherThanMinimum = (quality: number) => quality > config.minimumQuality;
const isLowerThanMaximum = (quality: number) => quality < config.maximumQuality;

const increaseQuality = (quality: number) => isLowerThanMaximum(quality) ? (quality + 1) : quality;
const decreaseQuality = (quality: number) => isHigherThanMinimum(quality) ? (quality - 1) : quality;

//#region Update Quality For Items
export const updateQuality_Normal = (item: Item) => {
    item = decreaseQualityItem(item, (item.sellIn <= 0 ? 2 : 1))

    return item
}

export const updateQuality_Conjured = (item: Item) => {
    item = decreaseQualityItem(item, (2 * (item.sellIn <= 0 ? 2 : 1))) // "Conjured" items degrade in Quality twice as fast as normal items

    return item;
}

export const updateQuality_Concert = (item: Item) => {
    item = increaseQualityItem(item, (item.sellIn <= 5 ? 3 : item.sellIn <= 10 ? 2 : 1));
    item.quality = item.sellIn < 0 ? 0 : item.quality;

    return item;
}

export const updateQuality_AgedBrie = (item: Item) => {
    item = increaseQualityItem(item, (item.sellIn <= 0 ? 2 : 1));

    return item
}

export const updateQuality_Sulfuras = (item: Item) => {
    item.quality = 80;

    return item
}
//#endregion

//#region Common Functions
const decreaseQualityItem = (item: Item, coeff: number) => { // coefficient => quality decreasing multiplier 
    for (let i = 0; i < coeff; i++) {
        item.quality = decreaseQuality(item.quality);
    }
    item.sellIn -= 1

    return item;

}
const increaseQualityItem = (item: Item, coeff: number) => { // coefficient => quality increasing multiplier 
    for (let i = 0; i < coeff; i++) {
        item.quality = increaseQuality(item.quality);
    }
    item.sellIn -= 1

    return item;

}
//#endregion