(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-730ac11e"],{"07e0":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"publish"},[a("el-dialog",{attrs:{title:t.parameter.title,visible:t.seePublishDialogVisible,"close-on-click-modal":!1,center:"",width:"80%"},on:{"update:visible":function(e){t.seePublishDialogVisible=e},open:t.handleOpen}},[a("el-form",{ref:"publishForm",staticClass:"publish_warp",attrs:{"label-width":"100px",model:t.publishForm}},[a("el-form-item",{attrs:{label:"标题:",prop:"title"}},[t._v("\n                    "+t._s(t.publishForm.title)+"\n                ")]),a("el-form-item",{attrs:{label:"文章封面图:",id:"avatar-uploader"}},[t.publishForm.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.publishForm.imageUrl}}):t._e()]),a("el-form-item",{attrs:{label:"分类:"}},[t._v("\n                    "+t._s(t.publishForm.sort)+"\n                ")]),a("el-form-item",{attrs:{label:"简介:"}},[t._v("\n                    "+t._s(t.publishForm.content)+"\n                ")]),a("el-form-item",{staticClass:"rich_text uploadVideo_warp",attrs:{label:"视频:"}},[a("video",{staticStyle:{width:"500px",height:"300px"},attrs:{src:this.publishForm.url,controls:"controls"}})])],1)],1)],1)},s=[],l=(a("55dd"),a("8e44")),o={name:"publish",props:["parameter"],data:function(){return{seePublishDialogVisible:!1,publishForm:{title:"",sort:"",imageUrl:"",content:"",url:"",videoType:""}}},methods:{handleOpen:function(){var t=this,e={id:this.parameter.data.id};Object(l["Q"])(e).then(function(e){console.log(e),t.publishForm.title=e.data.data.title,t.publishForm.sort=e.data.data.sort,t.publishForm.imageUrl="http://"+e.data.data.tphoto,t.publishForm.content=e.data.data.content,t.publishForm.id=e.data.data.id,"本地视频"==e.data.data.videoType?t.publishForm.url="http://"+e.data.data.video:t.publishForm.url=e.data.data.url})}}},r=o,n=(a("3abe"),a("5c7b"),a("2877")),u=Object(n["a"])(r,i,s,!1,null,"03ace472",null);e["a"]=u.exports},"0c4b":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"publishArticle"},[a("el-row",[a("el-button",{staticClass:"publish_btn",on:{click:t.publish_btn}},[t._v("发布视频")])],1),a("el-row",{staticClass:"tabel_warp"},[a("el-col",{attrs:{span:24}},[a("search",{ref:"searchComponent",attrs:{searchData:t.searchData},on:{search:t.search_btn}}),a("div",{staticClass:"grid-content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"序号",width:"57",align:"center"}}),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"118",align:"center","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{prop:"content",label:"简介",width:"131",align:"center","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{prop:"sort",label:"分类",width:"92",align:"center"}}),a("el-table-column",{attrs:{prop:"video",label:"视频链接",width:"212",align:"center","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{prop:"releaseTime",label:"发布日期",width:"165",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.releaseTime?a("span",[t._v(t._s(t._f("moment")(e.row.releaseTime)))]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"top",label:"是否置顶",width:"96",align:"center"}}),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"88",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("font",{attrs:{color:"#547BE8"}},[t._v("待审核")]):2==e.row.status?a("font",{attrs:{color:"#15BE9D"}},[t._v("已发布")]):3==e.row.status?a("font",{attrs:{color:"#F52653"}},[t._v("已驳回")]):4==e.row.status?a("font",{attrs:{color:"#414142"}},[t._v("草稿箱")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"reviewName",label:"审核人",width:"98",align:"center"}}),a("el-table-column",{attrs:{prop:"oppose",label:"驳回原因",width:"173",align:"center","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{prop:"",label:"操作",width:"171",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:1!=e.row.status&&2!=e.row.status,expression:"tableData.row.status != 1 && tableData.row.status != 2"}],staticClass:"editArticle",attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==e.row.status,expression:"tableData.row.status == 2"}],staticClass:"seeArticle",attrs:{size:"mini"},on:{click:function(a){return t.handleSee(e.$index,e.row)}}},[t._v("查看")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2!=e.row.status,expression:"tableData.row.status != 2"}],staticClass:"deleteArticle",attrs:{size:"mini"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1),a("el-pagination",{attrs:{"current-page":t.searchContent.page,"page-sizes":[10,20,30,40],"page-size":t.searchContent.size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.searchContent,"page",e)},"update:current-page":function(e){return t.$set(t.searchContent,"page",e)},"update:pageSize":function(e){return t.$set(t.searchContent,"size",e)},"update:page-size":function(e){return t.$set(t.searchContent,"size",e)},"current-change":t.FindAll,"size-change":t.FindAll}})],1)],1),a("publish",{ref:"publish",attrs:{parameter:t.parameter}}),a("seePublish",{ref:"seePublish",attrs:{parameter:t.parameter}})],1)},s=[],l=a("8e44"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"publish"},[a("el-dialog",{attrs:{title:t.parameter.title,visible:t.publishDialogVisible,"close-on-click-modal":!1,center:"",width:"80%"},on:{"update:visible":function(e){t.publishDialogVisible=e},open:t.handleOpen}},[a("el-form",{ref:"publishForm",staticClass:"publish_warp",attrs:{"label-width":"100px",model:t.publishForm,rules:t.publishRule}},[a("el-form-item",{attrs:{label:"标题:",prop:"title"}},[a("el-input",{attrs:{placeholder:"请输入标题"},model:{value:t.publishForm.title,callback:function(e){t.$set(t.publishForm,"title",e)},expression:"publishForm.title"}})],1),a("el-form-item",{attrs:{label:"文章封面图:",prop:"imageUrl"}},[t._e(),a("el-upload",{ref:"uploadImg",attrs:{id:"avatar-uploader","show-file-list":!1,action:t.action,"on-change":t.handleChange,"auto-upload":!1,"on-success":t.ImageSuc,data:t.publishForm,name:"image"}},[t.publishForm.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.publishForm.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"分类:",prop:"sort"}},[a("el-select",{attrs:{placeholder:"请选择分类"},model:{value:t.publishForm.sort,callback:function(e){t.$set(t.publishForm,"sort",e)},expression:"publishForm.sort"}},t._l(t.sort,function(t,e){return a("el-option",{key:e,attrs:{label:t.sortName,value:t.sortName}})}),1)],1),a("el-form-item",{attrs:{label:"简介:",prop:"content"}},[a("el-input",{attrs:{placeholder:"请输简介"},model:{value:t.publishForm.content,callback:function(e){t.$set(t.publishForm,"content",e)},expression:"publishForm.content"}})],1),a("el-form-item",{staticClass:"rich_text uploadVideo_warp",attrs:{label:"视频:"}},[[a("el-select",{staticClass:"videoType",attrs:{placeholder:"请选择分类"},model:{value:t.publishForm.videoType,callback:function(e){t.$set(t.publishForm,"videoType",e)},expression:"publishForm.videoType"}},[a("el-option",{attrs:{label:"本地视频",value:"本地视频"}}),a("el-option",{attrs:{label:"视频链接",value:"视频链接"}})],1),a("el-upload",{directives:[{name:"show",rawName:"v-show",value:"本地视频"==t.publishForm.videoType,expression:"publishForm.videoType == '本地视频'"}],ref:"uploadVideo",staticClass:"upload-demo uploadVideo",attrs:{action:t.actionVideo,limit:1,"on-change":t.videoHandleChange,"auto-upload":!1,accept:".mp4",data:t.videoIdCommit,name:"video","on-success":t.VideoSuc}},[a("el-button",[t._v("上传")])],1),a("el-input",{directives:[{name:"show",rawName:"v-show",value:"视频链接"==t.publishForm.videoType,expression:"publishForm.videoType == '视频链接'"}],staticClass:"uploadVideoURL",attrs:{placeholder:"请输入视频链接"},model:{value:t.publishForm.url,callback:function(e){t.$set(t.publishForm,"url",e)},expression:"publishForm.url"}})]],2)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"closeMessage",on:{click:function(e){t.publishDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{staticClass:"DetermineMessage",attrs:{type:"primary"},on:{click:t.DetermineBtn}},[t._v("确 定")])],1)],1)],1)},r=[],n=(a("55dd"),{name:"publish",props:["parameter"],data:function(){return{sort:[],file:null,publishDialogVisible:!1,action:Object(l["N"])(),actionVideo:Object(l["eb"])(),publishForm:{title:"",sort:"",imageUrl:"",content:"",url:"",videoType:""},videoIdCommit:{id:""},publishRule:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],imageUrl:[{required:!0,message:"请输入封面",trigger:"blur"}],type:[{required:!0,message:"请选择分类",trigger:"blur"}],content:[{required:!0,message:"简介不能为空",trigger:"blur"}]}}},methods:{DetermineBtn:function(){var t=this,e=this;this.$refs["publishForm"].validate(function(a){if(!a)return t.$message({message:"内容不能为空",type:"warning"}),!1;delete t.publishForm.imageUrl,e.$refs.uploadImg.submit()})},handleChange:function(t,e){this.publishForm.imageUrl=URL.createObjectURL(t.raw)},handleOpen:function(){var t=this;if(this.parameter){var e={id:this.parameter.data.id};Object(l["Q"])(e).then(function(e){t.publishForm.title=e.data.data.title,t.publishForm.sort=e.data.data.sort,t.publishForm.imageUrl="http://"+e.data.data.tphoto,t.publishForm.content=e.data.data.content,t.publishForm.id=e.data.data.id,t.publishForm.videoType=e.data.data.videoType,"本地视频"==e.data.data.videoType?t.publishForm.url="http://"+e.data.data.video:t.publishForm.url=e.data.data.url,t.publishForm.videoType="视频链接"})}},videoHandleChange:function(t,e){},ImageSuc:function(t){"本地视频"==this.publishForm.videoType&&(this.videoIdCommit.id=t.data,this.$refs.uploadVideo.submit())},VideoSuc:function(t){200==t.code&&this.$message.success(t.message),this.publishDialogVisible=!1}},beforeMount:function(){var t=this;Object(l["j"])().then(function(e){t.sort=e.data.data})}}),u=n,c=(a("94cb"),a("b59b"),a("2877")),p=Object(c["a"])(u,o,r,!1,null,"1f7cb84e",null),d=p.exports,h=a("07e0"),m={name:"publishVideo",data:function(){return{tableData:[],publishDialogVisible:!1,seePublishDialogVisible:!1,paginationMain:"",searchData:{publisher:!0,status:!0,releasetime:!0,sort:{countName:l["j"]}},parameter:{},total:0,searchContent:{page:1,limit:10},index:"1"}},components:{publish:d,seePublish:h["a"]},methods:{search_btn:function(t){this.searchContent=t[0],this.FindAll()},FindAll:function(){var t=this;Object(l["S"])(this.searchContent).then(function(e){200==e.data.code&&(t.tableData=e.data.data,t.total=e.data.count)})},handleEdit:function(t,e){this.$refs.publish.publishDialogVisible=!0,this.parameter={title:"编辑",data:e,jumParameter:this.$route.query.jumParameter}},handleDelete:function(t,e){var a=this;this.$confirm("删除后将不能恢复，确定要删除系统中的这条记录吗?","删除",{dangerouslyUseHTMLString:!0,confirmButtonText:"确定",cancelButtonText:"取消",center:!0,customClass:"deleteDlog",cancelButtonClass:"closeMessage",confirmButtonClass:"DetermineMessage"}).then(function(){var i={id:e.id};Object(l["s"])(i).then(function(e){200==e.data.code&&(a.$message({type:"success",message:e.data.message}),a.tableData.splice(t,1))})}).catch(function(t){a.$message({type:"info",message:"已取消删除"})})},handleSee:function(t,e){this.parameter={title:"查看",data:e,jumParameter:this.$route.query.jumParameter},this.$refs.seePublish.seePublishDialogVisible=!0},publish_btn:function(){this.$refs.publish.publishDialogVisible=!0,this.parameter={title:"发布视频",data:"",jumParameter:this.$route.query.jumParameter}},DetermineBtn:function(){}},beforeMount:function(){this.FindAll()}},b=m,f=(a("7e12"),a("8ec0"),Object(c["a"])(b,i,s,!1,null,"bae37f78",null));e["default"]=f.exports},"3abe":function(t,e,a){"use strict";var i=a("fcc3"),s=a.n(i);s.a},4135:function(t,e,a){},"5b1a":function(t,e,a){},"5c7b":function(t,e,a){"use strict";var i=a("5b1a"),s=a.n(i);s.a},"68d5":function(t,e,a){},"7e12":function(t,e,a){"use strict";var i=a("ab50"),s=a.n(i);s.a},"8ec0":function(t,e,a){"use strict";var i=a("68d5"),s=a.n(i);s.a},"94cb":function(t,e,a){"use strict";var i=a("c9a8"),s=a.n(i);s.a},ab50:function(t,e,a){},b59b:function(t,e,a){"use strict";var i=a("4135"),s=a.n(i);s.a},c9a8:function(t,e,a){},fcc3:function(t,e,a){}}]);
//# sourceMappingURL=chunk-730ac11e.14d43794.js.map