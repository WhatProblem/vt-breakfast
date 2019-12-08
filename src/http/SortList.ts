import { getRequest, postRequest } from "./common";

/**
 * 获取对应分类列表
 * @param {sortId} int
 * @param {pageNum} int
 * @param {pageSize} int
 * @returns {code,msg,data,{total,pages,currentPage,pageNum,pageSize}}
 */
export function getSortList(params: any): Promise<any> {
    return getRequest("/app/getSortGoodsList", params);
}