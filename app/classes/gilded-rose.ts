import { Item } from "./item";
import {
  updateQuality_AgedBrie,
  updateQuality_Concert,
  updateQuality_Sulfuras,
  updateQuality_Conjured,
  updateQuality_Normal
} from '../functions/updateQuality'

export class GildedRose {
  items: Array<Item>;
  
  /* istanbul ignore next */
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    this.items.forEach(currentItem => {

      switch (currentItem.name) {
        case 'Conjured Mana Cake': {
          currentItem = updateQuality_Conjured(currentItem)
          break;
        }
        case 'Backstage passes to a TAFKAL80ETC concert': {
          currentItem = updateQuality_Concert(currentItem)
          break;
        }
        case 'Aged Brie': {
          currentItem = updateQuality_AgedBrie(currentItem)
          break;
        }
        case 'Sulfuras, Hand of Ragnaros': {
          currentItem = updateQuality_Sulfuras(currentItem)
          break;
        }
        default: {
          currentItem = updateQuality_Normal(currentItem)
        }
      }
    })

    return this.items;
  }
}
