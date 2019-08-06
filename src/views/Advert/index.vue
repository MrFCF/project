<template>
    <div class="advert">
        <left-tree></left-tree>
        <div class="publishArticle">
            <div class="box-warp">
                <el-col :span="12">
                    <div class="banner_warp">
                        <div class="title">
                            首页轮播图
                        </div>
                        <div class="banner_nothing" v-if="swiper.length == 0">
                            暂无轮播图片
                        </div>
                        <ul class="banner_list" v-if="swiper.length != 0">
                            <li v-for="(item,index) in swiper" :key="index" :style="'backgroundImage: url(http://'+item.adv+')'" draggable="true"
                                @dragstart="handleDragStart($event, item)"
                                @dragenter="handleDragEnter($event, item)"
                                @dragover.prevent="handleDragover($event, item)"
                                @drop="handleDrop($event, item, 'swiper')"
                                @dragend="handleDragEnd($event, item)">
                                <div class="img_bg" @click="deleteItem('swiper',item.id)" :dataId="item.id">
                                    <img src="@/assets/images/banner/delete.png" alt="">
                                </div>
                            </li>
                        </ul>
                        <!-- <el-upload
                                :show-file-list="false"
                                :action="actionLunbo" 
                                :before-upload="beforeUpload"
                                :on-change="handleChange"
                                :auto-upload="false"> 
                                
                        </el-upload> -->
                        <div class="addBtn" @click="lunboAdd">+添加</div>
                        <div class="prompt">
                            <span>提示:</span>拖动图片可调整顺序
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="banner_warp">
                        <div class="title">
                            发现页banner
                        </div>
                        <div class="banner_nothing" v-if="swiper.length == 0">
                            暂无轮播图片
                        </div>
                        <ul class="banner_list" v-if="swiper.length != 0">
                            <li v-for="(item,index) in banner" :key="index" :style="'backgroundImage: url(http://'+item.url+')'" draggable="true">
                                <!-- @dragstart="handleDragStart($event, item)"
                                @dragenter="handleDragEnter($event, item)"
                                @dragover.prevent="handleDragover($event, item)"
                                @drop="handleDrop($event, item, 'banner')"
                                @dragend="handleDragEnd($event, item)" 图片拖动-->
                                  <div class="img_bg" @click="deleteItem('banner',index,item.id)">
                                    <img src="@/assets/images/banner/delete.png" alt="">
                                </div>
                            </li>
                        </ul>
                        <!-- <el-upload
                                :show-file-list="false"
                                :action="actionBanner" 
                                :before-upload="beforeUploadBanner"
                                :on-change="handleChangeBanner"
                                :auto-upload="false">
                        </el-upload> -->
                        <div class="addBtn" @click="bannerAdd">+添加</div>
                    </div>
                </el-col>
            </div>
        </div>
        
        <publish ref="publish" :parameter="parameter"></publish>
    </div>
</template>

<script>
import publish from './publishMessage'
import { findBannerPhoto,findPhoto,insertAdvertisementPhoto,AdvertisementPhoto,deleteAdvertisementPhoto,AdvertisementPosition } from '../../service/index'
export default {
    name:'advert',
    data() {
        return {
            actionBanner:AdvertisementPhoto(),
            actionLunbo:insertAdvertisementPhoto(),
            swiper:[
                
            ],
            banner:[
                
            ],
            dragging: null,
            parameter:{
                title: '添加'
            },
            positionImg:{

            },
        }
    },
    components:{
        publish,
    },
    methods:{
        FindAll(){
             findPhoto().then( res => {
                if(res.data.code == 200){
                    this.swiper = res.data.data;
                }
            });
            findBannerPhoto().then( res => {
                if(res.data.code == 200){
                    this.banner = res.data.data;
                }
            })
        },
        lunboAdd(){
            this.$refs.publish.publishDialogVisible = true;
            this.parameter = {
                title: '添加',
                fun: this.actionLunbo
            }
        },
        bannerAdd(){
            this.$refs.publish.publishDialogVisible = true;
            this.parameter = {
                title: '添加',
                fun: this.actionBanner
            }
        },
        deleteItem(item,index,id){
            this[item].splice(index,1);
            deleteAdvertisementPhoto({id:id}).then(res => {
                if(res.data.code == 200){
                    this.$message.success(res.data.message);
                }
            })
        },
        handleChange (file, fileList) {
            this.swiper.push({
                backgroundImage: "url(" + URL.createObjectURL(file.raw) + ")"
            });
        },
        beforeUpload(file) {
            return true;
        },
        handleChangeBanner (file, fileList) {
            this.banner.push({
                backgroundImage: "url(" + URL.createObjectURL(file.raw) + ")"
            });
        },
        beforeUploadBanner(file) {
            return true;
        },
        // 当元素被拖动时
        handleDragStart(e, item) {
            this.dragging = item;
            this.positionImg.picId1 = item.id;
            this.positionImg.picPosition1 = item.sort;
        },
        // 当被鼠标拖动的对象进入其容器范围内时触发此事件
        handleDragEnter(e) {
        // 为需要移动的元素设置dragstart事件
        e.dataTransfer.effectAllowed = 'move'
        },
        // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
        handleDragover(e) {
        // 首先把div变成可以放置的元素，即重写dragenter/dragover
        // 在dragenter中针对放置目标来设置!
        e.dataTransfer.dropEffect = 'move'
        },
        // 当放置被拖元素时
        handleDrop(e, item, main) {
        e.dataTransfer.dropEffect = 'move'
        if(item === this.dragging){
            return
        }
        let list = main == 'swiper' ? 'banner' : 'swiper';
        const listItems = [...this[list]]
        const newItems = [...this[main]]
        const from = newItems.indexOf(this.dragging)   //如果来自相同区域,为当前拖拽的元素下标,否则为-1
        const to = newItems.indexOf(item)              //如果来自相同区域,为当前释放的元素下标
        const from1 = listItems.indexOf(this.dragging)   //记录在不同区域下，当前拖拽元素的下标,相同区域时为-1
        // console.log(from,to,from1)
        if(from != -1){   //判断拖拽的元素跟完成拖动的元素是否为同一区域  == -1 极为不同父元素
            newItems[from] = item
            newItems[to] = this.dragging
            this[main] = newItems 
        }else{
            newItems[to] = this.dragging
            listItems[from1] = item
            this[main] = newItems 
            this[list] = listItems 
        }
        //item是放的，this.draggin是拖得,item放的变了，this.draggin拖得没变
        },
        // 完成元素拖动后触发
        handleDragEnd(e,item) {
            this.dragging = null;
            this.positionImg.picId2 = item.id;
            this.positionImg.picPosition2 = item.sort;
            AdvertisementPosition(this.positionImg).then(res => {
                console.log(res)
            })
        }
    },
    beforeMount(){
        this.FindAll()
    }
}
</script>
<style lang="scss">
    .advert{
        .addBtn{
            margin-top: px2rem(30);
            width: 100%;
            height: px2rem(36);
            line-height: px2rem(36);
            text-align: center;
            background: #F0F1F5;
            color: #707073;
            font-size: px2rem(14);
        }
    }
</style>

<style lang='scss' scoped>
    .advert{
        width: 100%;
        height: 100%;
        .publishArticle{
            width: px2rem(1620);
            height: px2rem(900);
            overflow-y: auto;
            overflow-x: hidden;
            padding: px2rem(30) px2rem(40) 0 px2rem(40);
            float: left;
            .box-warp{
                display: inline-block;
                background: #ffffff;
                width: 100%;
                padding: px2rem(30) 0 px2rem(30) px2rem(30);
                .banner_warp{
                    width: px2rem(640);
                    .title{
                        color: #547BE8;
                        font-size: px2rem(18);
                        position: relative;
                        right: -8px;
                    }
                    .title::before{
                         content: "";
                         width: px2rem(6);
                         height: px2rem(18);
                         border-radius: px2rem(3);
                         background: #E5ECFF;
                         position: absolute;
                         left: -8px;
                         top: 0px; 
                    }
                    .banner_nothing{
                        margin-top: px2rem(30);
                        width: 100%;
                        height: px2rem(160);
                        border: 1px dashed #F0F1F5;
                        color: #AFB0B2;
                        text-align: center;
                        line-height: px2rem(160);
                    }
                    .banner_list{
                        li{
                            margin-top: px2rem(30);
                            width: 100%;
                            height: px2rem(160);
                            border: 1px dashed #F0F1F5;
                            color: #AFB0B2;
                            border-radius: px2rem(12);position: relative;
                            .img_bg{
                                position: absolute;
                                top: px2rem(5);
                                left: px2rem(5);
                                width: px2rem(36);
                                height: px2rem(36);
                                line-height: px2rem(45);
                                border-radius: 50%;
                                background: rgba(0,0,0,0.3);
                                text-align: center;
                            }
                        }
                    }
                    .prompt{
                        margin-top: px2rem(30);
                        font-size: px2rem(14);
                        color: #707073;
                        text-align: center;
                        span{
                            color: #F52653;
                        }
                    }
                }
            }
        }
    }
    
</style>