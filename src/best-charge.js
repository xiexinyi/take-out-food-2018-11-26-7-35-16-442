const loadAllItems = require('../src/items');
const loadPromotions = require("../src/promotions");

module.exports = function bestCharge(selectedItems) {
  allItems = loadAllItems();
  allProms = loadPromotions();

  let itemsWithPrice = [];
  let itemsWithProm = [];
  let [finalPrice, price1, price2, saved] = [0, 0, 0, 0];
  let result = '\n============= 订餐明细 =============\n';
  let ending = '===================================';
  let cutline = '-----------------------------------\n';
  
  for (var i = 0; i < selectedItems.length; i++){
    let detail = selectedItems[i].split(" ");
    let itemId = detail[0];
    let itemCount = detail[2];
    itemsWithPrice[i] = new Object();
    for (var j = 0; j < allItems.length; j++){
      if (itemId == allItems[j].id){
        itemsWithPrice[i].name = allItems[j].name;
        itemsWithPrice[i].totalprice = allItems[j].price * itemCount;
        finalPrice += itemsWithPrice[i].totalprice;
        price2 += itemsWithPrice[i].totalprice;
        result += allItems[j].name + ' x ' + itemCount + ' = ' + itemsWithPrice[i].totalprice + '元\n';
        break;
      }
    }
    if (itemId == allProms[1].items[0] || itemId == allProms[1].items[1]){
      itemsWithProm.push(itemsWithPrice[i].name);
      saved += itemsWithPrice[i].totalprice / 2;
      price2 -= itemsWithPrice[i].totalprice / 2;
    }
  }

  price1 = finalPrice;
  if (finalPrice >= 30){
    price1 -= 6;
  }

  if (price1 <= price2 && price1 < finalPrice){
    result += cutline + '使用优惠:\n' + '满30减6元，省6元\n' + cutline + '总计：' + price1 + '元\n';
  }else if (price2 < price1){
    result += cutline + '使用优惠:\n指定菜品半价(';
    for (i = 0; i < itemsWithProm.length; i++){
      if (i != itemsWithProm.length - 1){
        result += itemsWithProm[i] + '，';
      }else{
        result += itemsWithProm[i] + ')，';
      }
    }
    result += '省' + saved + '元\n' + cutline + '总计：' + price2 + '元\n';
  }else{
    result += cutline + '总计：' + finalPrice + '元\n';
  }

  result += ending;

  return result;
}

