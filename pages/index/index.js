const newsTypeMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}

Page({
  data: {
    headTitle: '',
    headImage: '',
    headSource: '',
    headTime: '',
    type:'国内'
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
        type: newsTypeMap[this.data.type]
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        this.setHeadNews(result)
        this.setListNews(result)
        this.setNewsType()
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  // 获取头部新闻的数据
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
  // 获取新闻列表中的数据
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
  // 获取新闻类型
  setNewsType(){
    let typeCN = Object.keys(newsTypeMap)
    // let typeEN = Object.values(newsTypeMap)
    this.setData({
      typeCN: typeCN,
    })
  },
  //点击新闻类型并传递值
  onTapType(event){
    this.setData({
      type: event.currentTarget.dataset.type
    })
    this.getNews()
  },

})
