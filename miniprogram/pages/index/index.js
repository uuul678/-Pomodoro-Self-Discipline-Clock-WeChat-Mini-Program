//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    clockShow:false,
    clockHeight:0,
    time:'5',
    mTime:300000,
    timeStr:'05:00',
    rate:'',
    timer:null,
    cateArr:[
      {
        icon:'work',
        text:'工作'
      },
      {
        icon:'study',
        text:"学习",
      },
      {
        icon:'think',
        text:'思考'
      },
      {
        icon:'write',
        text:'写作'
      },
      {
        icon:'sport',
        text:'运动'
      },
      {
        icon:'read',
        text:"阅读"
      }
    ],
    cateActive:'0',
    okShow:false,
    pauseShow:true,
    continueCancleShow:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 750rpx 
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;

              //  ? / res.windowHeight;
    this.setData({
      rate: rate,
      clockHeight: rate* res.windowHeight
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  slideChange: function (e) {
    this.setData({
      time:e.detail.value
    })
  },
  clickCate:function (e) {
    this.setData({
      cateActive:e.currentTarget.dataset.index
    })
  },
  start: function () {
    this.setData({
      clockShow:true,
      mTime:this.data.time*60*1000,
      timeStr:parseInt(this.data.time)>=10? this.data.time+':00':'0'+this.data.time+':00'
    })
    this.drawBg();
    this.drawActive();
  },
  drawBg:function () {
    var lineWidth = 6 / this.data.rate; // px
    var ctx =wx.createCanvasContext('progress_bg');
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle('#000000');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2- 2* lineWidth,0,2*Math.PI,false);
    ctx.stroke();
    ctx.draw();
  },
  drawActive: function () {
    var _this = this;
    var timer = setInterval(function (){
      // 1.5 3.5
      // 0 2 
      // 300000 100
      // 3000
      // 2 / 3000
      var angle = 1.5 + 2*(_this.data.time*60*1000 - _this.data.mTime)/(_this.data.time*60*1000);
      var currentTime=_this.data.mTime - 100
      _this.setData({
        mTime:currentTime
      });
      if(angle < 3.5) {
        if(currentTime % 1000 ==0){
          var timeStr1 =currentTime/1000;
          var timeStr2 =parseInt(timeStr1/60);
          var timeStr3 =(timeStr1-timeStr2*60)>=10 ? (timeStr1-timeStr2*60):'0'+(timeStr1-timeStr2*60);
          var timeStr2=timeStr2 >=10 ? timeStr2:'0'+timeStr2;
          _this.setData({
            timeStr:timeStr2+':'+timeStr3
          })
        }
        var lineWidth = 6 / _this.data.rate; // px
        var ctx = wx.createCanvasContext('progress_active');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#ffffff');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        ctx.stroke();
        ctx.draw();
      } else {
        _this.setData({
          timeStr:'00:00',
          okShow:true,
          pauseShow: false,
          continueCancleShow: false        
        })
        clearInterval(timer);
      }
    },100);
    _this.setData({
      timer:timer
    })

  },
  pause: function () {
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: false,
      continueCancleShow: true,
      okShow: false
    })
  },
  continue: function () {
    this.drawActive();
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false
    })    
  },
  cancle: function (){
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false,
      clockShow:false      
    })
  },
  ok: function () {
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false,
      clockShow: false
    })    
  }



})