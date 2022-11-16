import { expect } from 'chai';
import { GildedRose } from '../../app/classes/gilded-rose';
import { Item } from '../../app/classes/item'

describe('Gilded Rose', () => {
    it('Should add new item', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const addedItem = gildedRose.items[0]
        expect(addedItem.name).to.equal('foo');
        expect(addedItem.quality).to.equal(0);
        expect(addedItem.sellIn).to.equal(0);
    });
});

describe('Normal quality rules', () => {
    it('Should update quality - decrease 1', () => {
        const gildedRose = new GildedRose([new Item('foo', 4, 3)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(2);
        expect(addedItem.sellIn).to.equal(3);
    });

    it('Should update quality - decrease 2x fast when sell by date has passed', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 8)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(6);
        expect(addedItem.sellIn).to.equal(-1);
    });

    it('Quality should never lower than 0', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 1)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(0);
        expect(addedItem.sellIn).to.equal(-1);
    });
})

describe('Aged brie quality', () => {
    it('Should update quality of Aged Brie - increase 1 ', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 8)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(9);
        expect(addedItem.sellIn).to.equal(0);
    });

    it('Should update quality of Aged Brie - increase 2x faster when sellIn equal or lower than 0', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', -5, 6)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(8);
        expect(addedItem.sellIn).to.equal(-6);
    });

    it('Quality should never higher than 50', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(50);
        expect(addedItem.sellIn).to.equal(4);
    });
})

describe('Sulfuras quality rules', () => {
    it('Should never update quality of Sulfuras, Hand of Ragnaros', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 111)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(80);
        expect(addedItem.sellIn).to.equal(5);
    });
})

describe('Backstage pass quality rules', () => {
    it('Should update quality of backstage passes - increase 1 when more than 10 days remaining', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 1)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(2);
        expect(addedItem.sellIn).to.equal(14);
    });

    it('Should update quality of backstage passes - increase 2 when more than 5 days and "lower or equal" to 10 days.', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(3);
        expect(addedItem.sellIn).to.equal(9);
    });

    it('Should update quality of backstage passes - increase 3 when less or equal to 5 days', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 1)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(4);
        expect(addedItem.sellIn).to.equal(4);
    });

    it('Should update quality of backstage passes - decrease to 0 after concert', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(0);
        expect(addedItem.sellIn).to.equal(-1);
    });
})

describe('Conjured Items', () => {
    it('Should update quality of conjured items - decrease 2, lower quality twice as fast as normal items', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 2, 4)])
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(2);
        expect(addedItem.sellIn).to.equal(1);
    })
    
    it('Should update quality of conjured items -  decrease 4x fast when sell by date has passed', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 8)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(4);
        expect(addedItem.sellIn).to.equal(-1);
    });

    it('Conjured item quality should never lower than 0', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 1)]);
        const items = gildedRose.updateQuality();
        const addedItem = items[0]
        expect(addedItem.quality).to.equal(0);
        expect(addedItem.sellIn).to.equal(-1);
    });
})