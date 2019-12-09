import { getRequest, postRequest } from "./common";

/**
 * 添加收藏
 * @param {id} 商品id
 * @param {status} int 1: 收藏 2: 取消
 * @returns {code,msg}
 */
export function addOrDelFav(data: any): Promise<any> {
    return postRequest("/app/addOrDelFav", data);
}

/**
 * 添加到购物车
 * @param {id} 商品id
 * @param {goodsNum} 商品数量
 * @param {status} int 1: 添加 2: 删除当前选中 3：清空当前用户购物车
 * @returns {code,msg}
 */
export function addOrDelCart(data: any): Promise<any> {
    return postRequest("/app/addOrDelCart", data);
}