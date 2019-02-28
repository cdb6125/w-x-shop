// 导入封装的fetch函数
import { fetch } from "../../utils/fetch.js"
import { getHomeBeen } from "../../utils/server.js"
let app = getApp()
Page({
  data: {
    homeBean: null,
    userInfo: null
  },
  /**
   * 获取跳转页面传递过来的参数保存到options中
   */
  onLoad(options) {
    // 获取网络请求数据
    getHomeBeen().then((res) => {
      this.setData({
        homeBean: res.data.data
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 切换界面监听授权
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    wx.stopPullDownRefresh();
  },
  /**
   * 上拉加载
   */
  onReachBottom() {
    console.log("onReachButtom")
  },
  // 点击授权
  bindgetuserinfo(event) {
    let userInfo = event.detail.rawData
    // console.log(userInfo)
    // 1.授权成功保存数据
    if (userInfo) {
      let user = JSON.parse(userInfo)
      this.setData({
        userInfo: user
      })
      // 2.保存用户信息到app.js中
      app.globalData.userInfo = user
      // 3.登录功能
      this.login()
    }
    else {
      console.log("授权失败")
    }
  },
  // wx登录功能
  login() {
    let _this = this;
    wx.login({
      // 成功
      success(res) {
        // 拿到code
        let code = res.code;
        // 把code提交到后台
        wx.request({
          url: 'http://47.93.30.78:8080/XiaoMiShop/mine?code=' + code,
          method: 'get',
          success(res) {
            let token = 151543110;
            app.globalData.token = token;
            // console.log(res)
            app.globalData.isLogin = true;
          }
        })
      },
      // 失败
      fail(error) {
        wx.showModal({
          title: '登录提示',
          content: '登录失败',
        })
      }
    })
  },

})