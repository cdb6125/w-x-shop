// 封装fetch函数，返回Promise
let fetch = (options) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: options.url || '',
      data: options.data || '',
      method: options.method || 'GET',
      header: options.header || { 'content-type': 'application/json' }, //指定提交的数据类型
      dataType: options.dataType || 'json', //指定返回的数据类型
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
// 导出匿名
export { fetch };