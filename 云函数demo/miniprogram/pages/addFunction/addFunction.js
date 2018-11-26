// pages/addFunction/addFunction.js

const code = `// 云函数入口函数
exports.main = (event, context) => {
  console.log(event)
  console.log(context)
  return {
    sum: event.a + event.b
  }
}`

Page({

  data: {
    result: '',
    canIUseClipboard: wx.canIUse('setClipboardData'),
  },

  cTestFunction() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 2,
        b: 2
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        this.setData({
          result: JSON.stringify(res.result)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },


  cGetWXContext() {
    wx.cloud.callFunction({
      name: 'user',
      complete: res => {
        console.log('callFunction user result: ', res)
        const cAPPID=res.result.APPID
        const cOPENID = res.result.OPENID
        const cerrMsg=res.errMsg
        this.setData({
          cAPPID,
          cOPENID,
          cerrMsg
        });
      }
    })
  },

  cSetTimeout() {
    wx.cloud.callFunction({
      name: 'settimeout',
      data: {
        a: 1,
        b: 2,
      },
      success: res => {
        console.log('调用成功: ', res)
        wx.showToast({
          title: '调用成功',
        })
        this.setData({
          cSetTimeout: JSON.stringify(res.result)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },


  clear() {
    this.setData({
      result: '',
      cAPPID: '',
      cOPENID: '',
      cerrMsg: '',
      cSetTimeout: '',
    })
  },

  cUser() {
    wx.cloud.callFunction({
      name: 'user',
      complete: res => {
        console.log('callFunction user result: ', res)
      }
    })
  },

})

