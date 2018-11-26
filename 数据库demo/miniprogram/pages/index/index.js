//index.js
const app = getApp()

Page({
  data: {
    test: "测试",
    csid: ''
  },

formSubmit: function (e) {
  var shuzhi = e.detail.value.input
  const db = wx.cloud.database()
    db.collection('test').add({
      data: {
        test: shuzhi
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          csid: res._id,
          test: shuzhi
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  
  },

onQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的数据
    db.collection('test').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onCounterInc: function () {
    const db = wx.cloud.database()
    const newCount = this.data.csid + 1
    db.collection('test').doc(this.data.csid).update({
     data: {
       test: "测试更新"
      },
       success: res => {
       this.setData({
         test: "测试更新"
         })
       },
       fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
     })
  },

    onRemove: function () {
      if (this.data.csid) {
       const db = wx.cloud.database()
        db.collection('test').doc(this.data.csid).remove({
        success: res => {
          wx.showToast({
             title: '删除成功',
           })
          this.setData({
            csid: '',
             test: null,
           })
         },
         fail: err => {
          wx.showToast({
             icon: 'none',
             title: '删除失败',
          })
           console.error('[数据库] [删除记录] 失败：', err)
         }
       })
     } else {
      wx.showToast({
         title: '无记录可删，请见创建一个记录',
       })
    }
  }


})