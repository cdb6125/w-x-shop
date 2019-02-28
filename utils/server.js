// 导入模块
import { fetch } from "./fetch.js"
import { HOMEAPI } from "./api.js"

const getHomeBeen = () => {
  return fetch({
    url: HOMEAPI
  })
}

// 导出封装好的getHomeBeen
export { getHomeBeen }