import Vue from "vue";
import { AxiosPromise } from "axios";


// 例如：我需要单独的封装，方便后期将各个模块的api单独放置，方便管理
export function getRequest(url: string, params: any = {}, config = {}): AxiosPromise<any> {
    return Vue.$axios({ method: 'GET', url, params, ...config })
}

export function delRequest(url: string, params: any, config: any = {}): AxiosPromise<any> {
    return Vue.$axios({ method: 'DELETE', url, params, ...config })
}

export function postRequest(url: string, data: any, config: any = {}): AxiosPromise<any> {
    return Vue.$axios({ method: 'POST', url, data, ...config })
}

export function putRequest(url: string, data: any, config: any = {}): AxiosPromise<any> {
    return Vue.$axios({ method: 'PUT', url, data, ...config })
}