let app = getApp();
Page({
  // 页面初始化数据
  data: {
    userInfo: null,  
    isLogin: false,  // 登录状态
    mineBeen: null  // 保存个人信息
  },
  // 程序加载时执行
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      isLogin: app.globalData.isLogin
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 切换界面监听授权
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      this.login()
    }
  },
  // 监听授权的点击事件
  authorizeClick(event) {
    let userInfo = event.detail.rawData
    // console.log(userInfo)
    // 1.授权成功保存数据
    if(userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
      // 2.保存用户信息到app.js中
      app.globalData.userInfo = userInfo;
      // 3.登录功能
      this.login()
    }
    else{
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
            _this.setData({
              isLogin: true,
              mineBeen: res.data.data
            })
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

  // 处理item的点击事件
  itemClick(event) {
    let index = event.currentTarget.dataset.index;
    switch(index) {
      case 0:
        wx.navigateTo({
          url: '../indent/indent',
        })
      case 1:
        wx.navigateTo({
          url: '../discount/discount',
        })
      case 2:
    }
  }
})