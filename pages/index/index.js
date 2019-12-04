
Page({
  data: {
    headTitle: '',
    headImage: '',
    headSource: '',
    headTime: '',
  },
  
  onLoad() {
    this.getNews()
  },
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },

  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        this.setHeadNews(result)
        this.setListNews(result)
        console.log(result.length)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setHeadNews(result) {
    let headTitle = result[0].title
    let headImage = result[0].firstImage
    let headSource = result[0].source
    let headTime = result[0].date.slice(11, 16) //截取返回时间字符串中的11-16的字符作为时间显示 HH:MM
    this.setData({
      headTitle: headTitle,
      headImage: "https://" + headImage,
      headSource: headSource,
      headTime: headTime,
    })
  },

  setListNews(result) {
    let listResults = []
    for(let i = 1; i<result.length; i += 1) {
      listResults.push({
        listTitle: result[i].title,
        listSource: result[i].source ,
        listTime: result[i].date.slice(11,16),//截取返回时间字符串中的11-16的字符作为时间显示 HH:MM
        listImage:"https://" + result[i].firstImage
      })
    }
    this.setData({
      listResults: listResults
    })
  },

})
