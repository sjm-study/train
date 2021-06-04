// 计算subtotal
export const composeSubtotal =  (list) => {
    var total = 0
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        total = total + element.quantitly * element.price
    }
    return parseFloat(total).toFixed(2)
}

// 保存购物车至本地
export const saveCartToLoacl = (obj) => {
    localStorage.cart = JSON.stringify(obj)
}

// 清楚本地购物车
export const ClearCartToLoacl = () => {
    localStorage.removeItem('cart')
}

// 保存products至本地
export const saveProductToLoacl = (obj) => {
    localStorage.products = JSON.stringify(obj)
}