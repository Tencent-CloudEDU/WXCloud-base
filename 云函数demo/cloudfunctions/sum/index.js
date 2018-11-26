exports.main = (event, context) => {
  console.log('参数',event)
  console.log('运行状态',context)
  return {
    sum: event.a + event.b
}
}