import { getRequest, postRequest } from "./common";

/**
 * 用户注册
 * @param {userName} 用户名
 * @param {password} 用户密码
 * @param {avatar} 头像地址
 * @param {province} 省份
 * @param {city} 市
 * @param {country} 区域
 * @param {addrDetail} 详细地址
 * @returns {code, msg}
 */
export function register(data: any): Promise<any> {
    return postRequest("/app/register", data);
}

/**
 * 用户登录
 * @param {userName} 用户名称
 * @param {password} 用户密码
 * @returns {code,msg,token}
 */
export function login(data: any): Promise<any> {
    return postRequest("/app/login", data);
}