export default defineAppConfig({
  pages: [
    "pages/website/index",
    "pages/index/index",
    "pages/popCalendar/index",
    "pages/swipeCalendar/index",
    "pages/weekCalendar/index",
    "pages/simpleCalendar/index",
    "pages/tabsCalendar/index",
    "pages/commonCalendar/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    backgroundColor: "#f0f2f5",
    enablePullDownRefresh: true,
  },
  tabBar: {
    custom: true,
    color: "#000000",
    selectedColor: "#1aad19",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        // iconPath:'',
        // selectedIconPath:''
      },

    ],
  },
  usingComponents: {},
});
