// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },

  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })
    console.log('上传成功')
  },

  cDownloadFile: function (options) {
    wx.cloud.downloadFile({
      fileID: app.globalData.fileID,
      success: res => {
        console.log(res.tempFilePath)
        wx.showToast({
          icon: 'none',
          title: '下载成功',
        })
      },
      fail: console.error
    })
  },

  cGetTempFileURL: function (options) {
    wx.cloud.getTempFileURL({
      fileList: [app.globalData.fileID],
      success: res => {
        // handle success
        console.log('图片真实链接获取成功：', res.fileList[0])
        wx.showToast({
          icon: 'none',
          title: '获取成功',
        })
        const bTempFileURL = res.fileList[0].tempFileURL
        this.setData({
          bTempFileURL,
        })
      },
      fail: err => {
        console.log(res)
      }

    })
  },

  cDelete: function (options) {
    wx.cloud.deleteFile({
      fileList: [app.globalData.cloudPath,'cloud://canai-da7edb.6361-canai-da7edb/111.png'],
      success: res => {
        // handle success
        console.log('图片清除成功：', res.fileList[0])
        wx.showToast({
          icon: 'none',
          title: '删除成功' + res.fileList[0].errMsg,
        })
      },
      fail: err => {
        console.log(res)
      }

    })
  }

})