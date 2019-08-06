import leftTreeComponent from "@/components/leftTree.vue"
import previewComponent from "@/components/alert/preview.vue"
import deleteComponent from "@/components/alert/delete.vue"
import searchComponent from "@/components/search.vue"

const pluginComponetns = {
    install:function(Vue){
        Vue.component('left-tree',leftTreeComponent);
        Vue.component('preview',previewComponent);
        Vue.component('deleteDlog',deleteComponent);
        Vue.component('search',searchComponent);
    }
}

export default pluginComponetns;
