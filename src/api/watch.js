import request from '@/lib/fetch'
import config from '@/lib/config'
//获取商品列表
export async function getPage (data) {
    return request({
        url: `${config.apiPrefix}/watch/app/list`,
        method: 'post',
        data
    })
}

//获取手表详情
export async function getDetail(data) {
    return request({
        url:`${config.apiPrefix}/watch/app/detail`,
        method:"post",
        data
    })
}
