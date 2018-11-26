exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    // 在 3 秒后返回结果给调用方（小程序 / 其他云函数）
    setTimeout(() => {
      resolve(event.a + event.b)
    }, 3000)
  })
}