import { getRequest, postRequest } from "./common";

/**
 * 查询商品详情
 * @param {id} 商品id
 * @returns {code,msg,data}
 */
export function getGoodsDetail(params: any) {
    return getRequest('/app/goodsDetail', params);
}