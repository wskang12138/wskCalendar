import {Component} from 'react'
import {View, Text, ScrollView} from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

export  class RefreshPage extends Component {
  constructor(props) {
    super(props)
    const info = Taro.getSystemInfoSync()
    const {windowHeight} = info
    this.state = {
      dargStyle: {//下拉框的样式
        top: 0 + 'px'
      },
      downDragStyle: {//下拉图标的样式
        height: 0 + 'px'
      },
      downText: this.props.downText ? this.props.downText[0] : '下拉刷新',
      upDragStyle: {//上拉图标样式
        height: 0 + 'px'
      },
      pullText: this.props.pullText ? this.props.pullText[0] : '上拉加载更多',
      scrollY: true,
      dargState: 0,//刷新状态 0不做操作 1刷新 -1加载更多
      windowHeight: windowHeight
    }
  }

  start_p = null
  isInTop = true
  isInBottom = true

  reduction() {//还原初始设置
    const time = 0.5;
    this.setState({
      upDragStyle: {//上拉图标样式
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      dargState: 0,
      dargStyle: {
        top: 0 + 'px',
        transition: `all ${time}s`
      },
      downDragStyle: {
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      scrollY: true
    })
    setTimeout(() => {
      this.setState({
        dargStyle: {
          top: 0 + 'px',
        },
        upDragStyle: {//上拉图标样式
          height: 0 + 'px'
        },
        pullText: this.props.pullText ? this.props.pullText[0] : '上拉加载更多',
        downText: this.props.downText ? this.props.downText[0] : '下拉刷新'
      })
    }, time * 1000);
  }

  // touchStart(e) {
  //   console.log(e.touches[0])
  //     this.setState({
  //         start_p: e.touches[0]
  //     })
  // }
  touchmove(e) {
    if (!this.isInTop && !this.isInBottom) return;
    if (!this.start_p) {
      this.start_p = e.touches[0];
      return;
    }
    let that = this
    let move_p = e.touches[0],//移动时的位置
      deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 70,//拉动长度（低于这个值的时候不执行）
      maxY = 100;//拉动的最大高度

    let start_x = this.start_p.clientX,
      start_y = this.start_p.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY;


    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
      let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
      if (move_y - start_y > 0) {//下拉操作
        if (!this.isInTop) return;
        var downText = this.props.downText;
        if (pY >= deviationY) {
          this.setState({dargState: 1, downText: (downText && downText[1]) ? downText[1] : '释放刷新'})
        } else {
          this.setState({dargState: 0, downText: (downText && downText[0]) ? downText[0] : '下拉刷新'})
        }
        if (pY >= maxY) {
          pY = maxY
        }
        this.setState({
          dargStyle: {
            top: pY + 'px',
          },
          downDragStyle: {
            height: pY + 'px'
          },
          scrollY: false//拖动的时候禁用
        })
      }
      if (start_y - move_y > 0) {//上拉操作
        if (!this.isInBottom) return;
        // console.log('上拉操作')
        var pullText = this.props.pullText;
        if (pY >= deviationY) {
          this.setState({dargState: -1, pullText: (pullText && pullText[1]) ? pullText[1] : '释放加载更多'})
        } else {
          this.setState({dargState: 0, pullText: (pullText && pullText[0]) ? pullText[0] : '上拉加载更多'})
        }
        if (pY >= maxY) {
          pY = maxY
        }
        this.setState({
          dargStyle: {
            top: -pY + 'px',
          },
          upDragStyle: {
            height: pY + 'px'
          },
          scrollY: false//拖动的时候禁用
        })
      }
    }
  }

  pull() {//上拉
    console.log('上拉')
    this.props.onPull && this.props.onPull()
  }

  down() {//下拉
    console.log('下拉')
    this.props.onDown && this.props.onDown()
  }

  ScrollToUpper() { //滚动到顶部事件
    console.log('滚动到顶部事件')
    this.props.onUpper && this.props.onUpper()
  }

  ScrollToLower() { //滚动到底部事件
    console.log('滚动到底部事件')
    this.props.onLower && this.props.onLower()
  }

  touchEnd(e) {
    this.start_p = null;
    if (!this.isInTop && !this.isInBottom) return;
    if (this.state.dargState === 1) {
      this.down()
    } else if (this.state.dargState === -1) {
      this.pull()
    }
    this.reduction()
  }

  scrollPage(e) {
    this.isInTop = e.detail.scrollTop < 10 ? true : false;
    this.isInBottom = e.detail.scrollHeight - (e.detail.scrollTop + this.state.windowHeight) < 10 ? true : false;
    console.log(this.isInTop, this.isInBottom);
  }

  render() {
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;
    let style = this.props.style || {width: "100%"}
    if (this.props.height) style.height = this.props.height;
    return (
      <View
        catchMove={true}
        onTouchMove={this.touchmove.bind(this)}
        onTouchEnd={this.touchEnd.bind(this)}
        className={`dragUpdataPage ${this.props.className || ""}`} style={style}>
        {
          this.props.onDown ?
            (
              <View className='downDragBox' style={downDragStyle}>
                <Text
                  className={`downText ${this.state.dargState == 1 ? "downText_cho" : ""}`}>{this.state.downText}</Text>
              </View>) : null
        }
        <ScrollView

          style={dargStyle}
          onScroll={this.scrollPage.bind(this)}

          // onTouchStart={this.touchStart.bind(this)}
          upperThreshold={20}
          lowerThreshold={20}
          onScrollToUpper={this.ScrollToUpper.bind(this)}
          onScrollToLower={this.ScrollToLower.bind(this)}
          className='dragUpdata'
          scrollY={true}
          scrollWithAnimation>
          <View className='dragUpdataPage_children' style={`width:100%;`}>{this.props.children}</View>
        </ScrollView>
        {
          this.props.onPull ?
            (
              <View className='upDragBox' style={upDragStyle}>
                <Text
                  className={`downText ${this.state.dargState == -1 ? "downText_cho" : ""}`}>{this.state.pullText}</Text>
              </View>
            ) : null
        }
      </View>
    )
  }
}
