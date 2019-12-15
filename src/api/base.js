
import request from '@/lib/fetch'
import config from '@/lib/config'

//获取基础数据
export async function getBase (type,data) {
  return request({
    url: `${config.apiPrefix}/${type}/app/list`,
    method: 'post',
    data
  })
}

//获取系统信息
export async function getSys (type,data) {
  return request({
    url: `${config.apiPrefix}/sys/info`,
    method: 'post',
    data
  })
}
