<template>
  <div class="home">
    <p class="title">欢迎使用联医群APP后台管理系统，您本次登录时间为2016年7月15日14：42分，登录IP为192.163.1.123。</p>
    <el-row :gutter="20" class="statistics_warp">
      <el-col :span="6"  v-for="(list,index) in statisticsListTop" :key="index">
        <div class="grid-content bg-purple">
          <div class="s_l">
            <p>{{list.title}}</p>
            <h1>{{list.num}}<span>条</span></h1>
          </div>
          <div class="s_r">
            <img :src="list.imgUrl" alt="">
          </div>
        </div>
        </el-col>
    </el-row>
    <el-row :gutter="20" class="chart_warp" >
      <el-col :span="6" v-for="(list,index) in statisticsListBottom" :key="index">
        <div class="grid-content bg-purple">
          <p class="charts_title">{{list.title}}</p>
          <div class="progress_warp" v-for="(listItem,index) in list.content" :key="index" >
            <div v-if="list.content">
              <span>{{listItem.title}}:</span>
              <el-progress :color="listItem.color" :show-text=false :percentage="listItem.proportion"></el-progress>
                <span class="p_r">{{listItem.count}}<small>条</small></span>
              </div>
            </div>
            <div v-if="!list.content" style="text-align:center;padding-top:100px;">
                暂无
            </div>
            
            <!-- <span v-else ></span> -->
        </div>
      </el-col>
    </el-row>


    <!-- vue-ueditor-wrap -->
    <!-- <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import headerTop from '@/components/headerTop.vue'
import { home } from '../service/index'
export default {
  name: 'home',
  data () {
    return {
      img:[
        require("@/assets/images/home/home_icon1.png"),
        require("@/assets/images/home/home_icon2.png"),
        require("@/assets/images/home/home_icon3.png"),
        require("@/assets/images/home/home_icon4.png")
      ],
      statisticsListTop:[
      ],
      statisticsListBottom:[
        
      ],
      color:['#707073','#F52653','#547BE8','#15BE9D']
    }
  },
  methods:{
    click(){
      console.log(this.msg)
    },
    FindAll(){
      home().then( res => {
        this.statisticsListTop = res.data.data.statisticsListTop;
        this.statisticsListBottom = res.data.data.statisticsListBottom;
        for (var i in this.statisticsListBottom){
          var ListItem = this.statisticsListBottom[i];   //获取列表的每项
          var count = 0;
          for(var j in ListItem.content){
            var ItemContent =  ListItem.content[j]
            count += ItemContent.count
          }
          for(var j in ListItem.content){
            var ItemContent =  ListItem.content[j]
            ItemContent.color = this.color[j]
            ItemContent.proportion = parseInt(ItemContent.count/count * 100)
          }
        }
        for(var i in this.statisticsListTop){
          this.statisticsListTop[i].imgUrl = this.img[i]
        }
        this.statisticsListBottom.push(
          {title: '广告统计信息'},
        )
        }).catch( err => {

      })
    }
  },
  beforeMount(){
      this.FindAll();
  }
}
</script>
<style lang="scss">
  .el-progress{
    display: inline-block;
    width: px2rem(210);
    left: px2rem(10);
    /* line-height: 10px; */
    top: px2rem(-2);
    // height: px2rem(7);
  }
</style>


<style lang="scss" scoped>
    .home{
      padding: 0px px2rem(40);
      .title{
        color: #AFB0B2;
        font-size: px2rem(14);
        text-align: center;
        padding: px2rem(24) 0;
      }
      @mixin content_warp(){
        box-sizing: border-box;
        overflow: hidden;
        padding: px2rem(50) px2rem(40) 0 px2rem(40);
      }
      .statistics_warp{
        .bg-purple{
          height: px2rem(194);
          border-radius: px2rem(8);
          background: #fff;
          @include content_warp();
          .s_l{
            float: left;
            p{
              color:#547BE8;
              font-size: px2rem(18);
              padding-left: px2rem(12);
              position: relative;
            }
            p::before{
              content: "";
              position: absolute;
              left: 0px;
              top: 0px;
              width:px2rem(6);
              height: px2rem(16);
              border-radius: px2rem(3);
              background: #E5ECFF;

            }
            h1{
              display: inline-block;
              margin-top: px2rem(37);
              font-size: px2rem(60);
              span{
                font-size: px2rem(14);
                color: #414142;
              }
            }
          }
          .s_r{
            float: right;
          }
        }
      }
      .chart_warp{
        margin-top: px2rem(60);
        .bg-purple{
          height: px2rem(460);
          @include content_warp();
          background: url('../assets/images/home/charts1.png') no-repeat;
          background-size: cover;
          background-position: center;
          .charts_title{
            color:#547BE8;
            font-size: px2rem(18);
            padding-left: px2rem(12);
            position: relative;
            margin-bottom: px2rem(7);
          }
          .charts_title::before{
            content: "";
            position: absolute;
            left: 0px;
            top: 0px;
            width:px2rem(6);
            height: px2rem(16);
            border-radius: px2rem(3);
            background: #E5ECFF;

          }
          .progress_warp{
            color: #414142;
            font-size: px2rem(14);
            margin-top: px2rem(33);
            .p_r{
              font-size: px2rem(18);
              float:right;
              small{
                font-size: px2rem(14);
              }
            }
          }
        }
      }
    }
</style>

