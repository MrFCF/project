(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b617f10"],{"0be8":function(e,t,a){"use strict";var s=a("e49f"),i=a.n(s);i.a},5670:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"publishArticle"},[a("el-row",{staticClass:"tabel_warp"},[a("el-col",{attrs:{span:24}},[a("search",{ref:"searchComponent",attrs:{searchData:e.searchData},on:{search:e.search_btn}}),a("div",{staticClass:"grid-content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"序号",width:"57",align:"center"}}),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"118",align:"center","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{prop:"releasetime",label:"发布日期",width:"165",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("moment")(t.row.releasetime)))])]}}])}),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"88",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("font",{attrs:{color:"#547BE8"}},[e._v("待审核")]):2==t.row.status?a("font",{attrs:{color:"#15BE9D"}},[e._v("已发布")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"reviewname",label:"审核人",width:"98",align:"center"}}),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"90",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.status,expression:"tableData.row.status == 2"}],staticClass:"seeArticle",attrs:{size:"mini"},on:{click:function(a){return e.handleSee(t.$index,t.row)}}},[e._v("查看")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.status,expression:"tableData.row.status == 1"}],staticClass:"examineArticle",attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleArticle(t.$index,t.row)}}},[e._v("审核")])]}}])})],1)],1),a("el-pagination",{attrs:{"current-page":e.searchContent.page,"page-sizes":[10,20,30,40],"page-size":e.searchContent.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"update:currentPage":function(t){return e.$set(e.searchContent,"page",t)},"update:current-page":function(t){return e.$set(e.searchContent,"page",t)},"update:pageSize":function(t){return e.$set(e.searchContent,"limit",t)},"update:page-size":function(t){return e.$set(e.searchContent,"limit",t)},"current-change":e.FindAll,"size-change":e.FindAll}})],1)],1),a("examineMessage",{ref:"examineMessage",attrs:{parameter:e.parameter}}),a("seePublish",{ref:"seePublish",attrs:{parameter:e.parameter}})],1)},i=[],n=a("8e44"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"publish"},[a("el-dialog",{attrs:{title:e.parameter.title,visible:e.examinePublishDialogVisible,"close-on-click-modal":!1,center:"",width:"80%"},on:{"update:visible":function(t){e.examinePublishDialogVisible=t}}},[a("el-form",{ref:"examineForm",staticClass:"publish_warp",attrs:{"label-width":"100px",model:e.examineForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"标题:"}},[a("span",{domProps:{textContent:e._s(e.publishForm.messageContent.title)}})]),a("el-form-item",{attrs:{label:"发布时间:"}},[a("span",[e._v(e._s(e._f("moment")(e.publishForm.messageContent.releasetime)))])]),a("el-form-item",{staticClass:"rich_text",attrs:{label:"内容:"}},[a("vue-ueditor-wrap",{attrs:{config:e.myConfig},model:{value:e.publishForm.messageContent.content,callback:function(t){e.$set(e.publishForm.messageContent,"content",t)},expression:"publishForm.messageContent.content"}})],1),a("el-form-item",{staticClass:"rich_text",attrs:{label:"驳回原因:",prop:"oppose"}},[a("el-input",{attrs:{placeholder:"请输入驳回原因"},model:{value:e.examineForm.oppose,callback:function(t){e.$set(e.examineForm,"oppose",t)},expression:"examineForm.oppose"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"rejectMessage",on:{click:function(t){return e.rejectBtn("examineForm")}}},[e._v("驳回")]),a("el-button",{staticClass:"DetermineMessage",attrs:{type:"primary"},on:{click:e.adoptBtn}},[e._v("通过")])],1)],1)],1)},l=[],o={name:"publish",props:["parameter"],data:function(){return{examineForm:{oppose:""},reject:{id:""},examinePublishDialogVisible:!1,publishForm:{title:"",messageContent:{title:"",releasetime:"",content:""}},myConfig:{autoHeightEnabled:!1,initialFrameHeight:450,initialFrameWidth:"100%",serverUrl:"http://35.201.165.105:8000/controller.php",UEDITOR_HOME_URL:"UEditor/"},rules:{oppose:{required:!0,message:"请输入驳回原因",trigger:"blur"}}}},methods:{beforeUpload:function(e){return!0},rejectBtn:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.reject.status=3,t.reject.oppose=t.examineForm.oppose,Object(n["o"])(t.reject).then(function(e){t.$message({message:"文章已驳回",type:"success"}),t.$parent.FindAll()}),t.examinePublishDialogVisible=!1})},adoptBtn:function(){var e=this;this.reject.status=2,Object(n["o"])(this.reject).then(function(t){e.$message({message:"文章已通过",type:"success"}),e.$parent.FindAll()}),this.examinePublishDialogVisible=!1}},watch:{parameter:function(){this.parameter?(this.publishForm.messageContent=this.parameter,this.reject.id=this.parameter.messageContent.id):this.publishForm={title:"",messageContent:{title:"",releasetime:"",content:""}}}}},c=o,u=(a("0be8"),a("2877")),m=Object(u["a"])(c,r,l,!1,null,null,null),p=m.exports,h=a("9ef3"),b={name:"publishArticle",data:function(){return{examinePublishDialogVisible:!1,seePublishDialogVisible:!1,parameter:{},searchData:{publisher:!0,status:!0,releasetime:!0},tableData:[],total:0,searchContent:{page:1,limit:10},index:"1"}},components:{examineMessage:p,seePublish:h["a"]},methods:{search_btn:function(e){this.searchContent=e[0],this.FindAll()},FindAll:function(){var e=this;Object(n["x"])(this.searchContent).then(function(t){e.tableData=t.data.data,e.total=t.data.count}).catch(function(e){})},handleArticle:function(e,t){this.$refs.examineMessage.examinePublishDialogVisible=!0,this.parameter={title:"审核",messageContent:t}},handleSee:function(e,t){var a=this;Object(n["w"])({id:t.id}).then(function(e){a.parameter={title:"查看",messageContent:t,jumParameter:a.$route.query.jumParameter,data:e.data},a.$refs.seePublish.seePublishDialogVisible=!0}).catch(function(e){})}},mounted:function(){this.FindAll()}},d=b,f=(a("d8c8"),Object(u["a"])(d,s,i,!1,null,"2edfac40",null));t["default"]=f.exports},"9ef3":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.seePublishDialogVisible?a("div",{staticClass:"publish"},[a("el-dialog",{attrs:{title:e.parameter.title,visible:e.seePublishDialogVisible,"close-on-click-modal":!1,center:"",width:"80%"},on:{"update:visible":function(t){e.seePublishDialogVisible=t},open:e.handleOpen}},[a("el-form",{ref:"publishForm",staticClass:"publish_warp",attrs:{"label-width":"100px",model:e.parameter}},[a("el-form-item",{attrs:{label:"标题:"}},[a("span",{domProps:{textContent:e._s(e.parameter.data.title)}})]),a("el-form-item",{attrs:{label:"发布时间:"}},[a("span",[e._v(e._s(e._f("moment")(e.parameter.data.releasetime))+" ")])]),a("el-form-item",{staticClass:"rich_text",attrs:{label:"内容:"}},[a("vue-ueditor-wrap",{attrs:{config:e.myConfig},model:{value:e.parameter.data.content,callback:function(t){e.$set(e.parameter.data,"content",t)},expression:"parameter.data.content"}})],1)],1)],1)],1):e._e()},i=[],n={name:"publish",props:["parameter"],data:function(){return{seePublishDialogVisible:!1,myConfig:{autoHeightEnabled:!1,initialFrameHeight:450,initialFrameWidth:"100%",serverUrl:"http://35.201.165.105:8000/controller.php",UEDITOR_HOME_URL:"UEditor/"}}},methods:{beforeUpload:function(e){return!0},handleOpen:function(){console.log(this.parameter.jumParameter)}}},r=n,l=a("2877"),o=Object(l["a"])(r,s,i,!1,null,null,null);t["a"]=o.exports},c17a:function(e,t,a){},d8c8:function(e,t,a){"use strict";var s=a("c17a"),i=a.n(s);i.a},e49f:function(e,t,a){}}]);
//# sourceMappingURL=chunk-6b617f10.dc6bd52a.js.map