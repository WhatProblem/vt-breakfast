import { getRequest, postRequest } from "./common";

/**
 * 获取banner列表
 */
export function getBannerList(): Promise<any> {
    return getRequest("/app/getBannerList");
}

/**
 * 获取类别列表
 * @returns
 */
export function getSortList(): Promise<any> {
    return getRequest("/app/getSortList");
}

/**
 * 获取促销列表
 * @returns
 */
export function getDiscountList(): Promise<any> {
    return getRequest("/app/getDiscountList");
}

/**
 * 添加收藏
 * @param {id} 商品id
 * @param {status} int 1: 收藏 2: 取消
 * @returns {code, msg}
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

/**
 * 查询商品--模糊查询
 * @param {goodsName} 商品名称
 */
export function searchFor(param: any): Promise<any> {
    return getRequest("/app/searchFor", param);
}

/**
 * 热销商品
 */
export function getHotSale(): Promise<any> {
    return getRequest("/app/getHotSale");
}

/**
 * 推荐商品
 */
export function getHistory(): Promise<any> {
    return getRequest("/app/getHistory");
}