import request from '@/lib/fetch'
import config from '@/lib/config'
//获取商品列表
export async function getPage (data) {
    return request({
        url: `${config.apiPrefix}/watch/list`,
        method: 'post',
        data
    })
}

//创建手表
export async function create(data) {
    return request({
        url:`${config.apiPrefix}/watch/create`,
        method:"post",
        data
    })
}

//更新手表
export async function update(data) {
    return request({
        url:`${config.apiPrefix}/watch/update`,
        method:"post",
        data
    })
}

//获取手表详情
export async function getDetail(data) {
    return request({
        url:`${config.apiPrefix}/watch/detail`,
        method:"post",
        data
    })
}
