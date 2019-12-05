Page({
  data: {
    title: '',
    source: '',
    firstImage: '',
    date: '',
    readCount: '',
    content: []
  },

  onLoad: function (options) {
    this.getDetail(options.id)
    // console.log(options.id)
  },
  getDetail(id) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
      //  id: "1552623252492"
      id: id
      },
      success: res => {
        const result = res.data.result
        // console.log(result.title)
        let { title, source, firstImage, date, readCount, content } = result
        date = date.substring(0, 10)
        this.setData({ title, source, firstImage, date, readCount, content })
      }
    })
  }
})