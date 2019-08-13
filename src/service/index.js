

import axios from 'axios'
import { getCookie } from './util/util'
import { Loading,Message } from 'element-ui';
axios.defaults.baseURL = 'http://192.168.0.129:10040/'
axios.defaults.timeout = 10000
axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8'
// var Ip = '/api/'
var Ip = 'http://192.168.0.129:10040/'


/**
 * @desc 首页
 * @param {string} url [请求的参数]
 * @param {Object} params [请求携带的参数] 
 */

 export function home(data){
	 return axios({
		 url:`home/toHome`,
		 method: 'post',
		 params:data
	 })
 }
/**
 * post方法,对应post请求
 * @desc 登录页
 * @param {string} url [请求的url地址]
 * @param {Object} params [请求的携带的参数]
 * 
 * */
//  登录完成后的所有请求必须添加用户token 
export function loginPost(data){
    return axios({
		url:`sys/login`,
		method:'post',
		params:data
	})
}

//  退出登录
export function logoutPost(data){
    return axios({
		url:`sys/logout`,
		method:'post',
		params:data
	})
}


/**
 * post 方法，对应post请求
 * @desc 退出登录
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function logout(data){
	// 当我退出登录时删除拦截器;	
	axios.interceptors.request.eject(axiosIns);
}


/**
 * post 方法，对应post请求
 * @desc 查询所有公告
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function messageFindAll(data){
    return axios({
		url:`findAll`,
		method:'post',
		params:data
	})
}


/**
 * post 方法，对应post请求
 * @desc 根据ID查询公告
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function messageFindById(data){
    return axios({
		url:`findByIdMessage`,
		method:'post',
		params:data
	})
}

/**
 * post 方法，对应post请求
 * @desc 公告修改
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function updateMessage(data){
    return axios({
		url:`updateMessage`,
		method:'post',
		params:data
	})
}

/**
 * post 方法，对应post请求
 * @desc 公告删除
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function delMessage(data){
    return axios({
		url:`delMessage`,
		method:'post',
		params:data
	})
}

/**
 * post 方法，对应post请求
 * @desc 公告添加
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function addMessage(data){
    return axios({
		url:`addMessage`,
		method:'post',
		params:data
	})
}

/**
 * post 方法，对应post请求
 * @desc 公告审核查询
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function findMessageAutid(data){
	return axios({
		url: `findMessageAutid`,
		method: 'post',
		params: data
	})
}


/**
 * post 方法，对应post请求
 * @desc 根据id查询公告
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function findByIdAutidMessage(data){
	return axios({
		url: `findByIdAutidMessage`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 公告审核和驳回
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function autidMessage(data){
	return axios({
		url: `autidMessage`,
		method: 'post',
		params: data
	})
}


// 公共卫生   服务包
/**
 * post 方法，对应post请求
 * @desc 查询所有服务包
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function findPackage(data){
	return axios({
		url: `findPackage`,
		method: 'post',
		params: data
	})
}


/**
 * post 方法，对应post请求
 * @desc 根据ID查询服务包
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function findByIdPackage(data){
	return axios({
		url: `findByIdPackage`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 修改服务包
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function updatePackage(data){
	return axios({
		url: `updatePackage`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 添加服务包
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function addPackage(data){
	return axios({
		url: `addPackage`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 服务包勾选使用
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function packageUse(data){
	return axios({
		url: `packageUse`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 查询所有服务协议
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function findPact(data){
	return axios({
		url: `findPact`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 根据ID查询服务协议
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function findByIdPact(data){
	return axios({
		url: `findByIdPact`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 修改服务协议
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function updatePact(data){
	return axios({
		url: `updatePact`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 添加服务协议
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function addPact(data){
	return axios({
		url: `addPact`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 服务协议勾选使用
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function pactUse(data){
	return axios({
		url: `pactUse`,
		method: 'post',
		params: data
	})
}

/**
 * post方法,对应post请求
 * @desc 查询所有文章
 * @param {string} url [请求的url地址]
 * @param {Object} data [请求的携带的参数]
 * 
 * */
export function findAllArticle(data){
	return axios({
		url: `article/findAllArticle`,
		method: 'post',
		params: data
	})
}

/**
 * post方法,对应post请求
 * @desc 查询所有文章   只传一个id时时删除文章
 * @param {string} url [请求的url地址]
 * @param {Object} data [请求的携带的参数]
 * 
 * */
export function articleDelete(data){
	return axios({
		url: `article/delete`,
		method: 'delete',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 根据ID查询文章
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function articleId(data){
	return axios({
		url: `article/id`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 添加文章
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function addArticle(data){
	return axios({
		url: `article/insertArticlePhoto`,
		method: 'post',
		params: data
	})
}
export function addArticleUrl(){
	return  Ip + `article/insertArticlePhoto`;
}

/**
 * post 方法，对应post请求
 * @desc 修改文章
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function updateArticle(data){
	return axios({
		url: `article/updateArticle`,
		method: 'post',
		params: data
	})
}

// 查询要审核和已发布的文章
export function findStausArticle(data){
	return axios({
		url: `article/findStausArticle`,
		method: 'post',
		params: data
	})
}
// 审核文章
export function reviewArticle(data){
	return axios({
		url: `article/reviewArticle`,
		method: 'post',
		params: data
	})
}


/**
 * post 方法，对应post请求
 * @desc 查询文章所有分类
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function allArticleSort(data){
	return axios({
		url: `articleSort/findAllArticleSort`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 添加文章分类
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function articInsertSort(data){
	return axios({
		url: `articleSort/insertSort`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 删除文章分类
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function articDeleteSort(data){
	return axios({
		url: `articleSort/deleteSortById`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 修改文章分类
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function articUpdateSort(data){
	return axios({
		url: `articleSort/updateSort`,
		method: 'post',
		params: data
	})
}

// 文章置顶
export function toTop(data){
	return axios({
		url: `article/toTop`,
		method: 'post',
		params: data
	})
}


// 取消文章置顶
export function unTop(data){
	return axios({
		url: `article/unTop`,
		method: 'post',
		params: data
	})
}

// 查询所有banner图片
export function findBannerPhoto(data){
	return axios({
		url: `AdvertisementPhoto/findBannerPhoto`,
		method: 'post',
		params: data
	})
}

// 查询所有轮播图片
export function findPhoto(data){
	return axios({
		url: `AdvertisementPhoto/findPhoto`,
		method: 'post',
		params: data
	})
}
// 广告管理
// 添加轮播图片
export function insertAdvertisementPhoto(data){
		return  Ip + `AdvertisementPhoto/insertAdvertisementPhoto`
}
// 添加banner图片
export function AdvertisementPhoto(data){
	return  Ip + `AdvertisementPhoto/AdvertisementPhoto`
}

// 删除图片
export function deleteAdvertisementPhoto(data){
	return axios({
		url: `AdvertisementPhoto/delPhoto`,
		method: 'post',
		params: data
	})
}

// 拖动图片交换位置
export function AdvertisementPosition(data){
	return axios({
		url: `AdvertisementPhoto/AdvertisementPosition`,
		method: 'post',
		params: data
	})
}



/**
 * post 方法，对应post请求
 * @desc 查询所有视频
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */

export function videoList(data){
	return axios({
		url: `videoRelease/videoList`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 按条件查询视频
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function selectVideoByRequired(data){
	return axios({
		url: `videoRelease/selectVideoByRequired`,
		method: 'post',
		params: data
	})
}

 /**
 * post 方法，对应post请求
 * @desc 发布视频和修改
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */

//  第一次上传
export function releaseVideo(){
	return  Ip + `videoRelease/releaseVideo`;
}
// 第二次上传
export function videoUpload(){
	return  Ip + `videoRelease/videoUpload`;
}


 /**
 * post 方法，对应post请求
 * @desc 根据id删除视频
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function deleteVideo(data){
	return axios({
		url: `videoRelease/deleteVideo`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 根据id查询视频
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function selectById(data){
	return axios({
		url: `videoRelease/selectById`,
		method: 'post',
		params: data
	})
}

/**
 * post 方法，对应post请求
 * @desc 查询所有已审核和待审核的数据
 * @param {sting} URl [请求的url地址]
 * @param {Object} data [请求携带的参数]
 */
export function examineVideoList(data){
	return axios({
		url: `videoReview/videoList`,
		method: 'post',
		params: data
	})
}

// 按条件查询已审核和未审核视频
export function selectExamineVideoByRequired(data){
	return axios({
		url: `videoReview/selectVideoByRequired`,
		method: 'post',
		params: data
	})
}
// 审核视频
export function reviewVideo(data){
	return axios({
		url: `videoReview/reviewVideo`,
		method: 'post',
		params: data
	})
}
// 查询所有视频分类
export function allSort(data){
	return axios({
		url: `videoSort/allSort`,
		method: 'post',
		params: data
	})
}
//据分类id删除视频分类
export function deleteVideoSortById(data){
	return axios({
		url: `videoSort/deleteSortById`,
		method: 'post',
		params: data
	})
}
// 添加视频分类
export function insertVideoSort(data){
	return axios({
		url: `videoSort/insertSort`,
		method: 'post',
		params: data
	})
}

// 修改视频分类
export function updateVideoSort(data){
	return axios({
		url: `videoSort/updateSort`,
		method: 'post',
		params: data
	})
}
// 置顶视频
export function toTopVideo(data){
	return axios({
		url: `videoReview/toTop`,
		method: 'post',
		params: data
	})
}
// 取消置顶
export function unTopVideo(data){
	return axios({
		url: `videoReview/unTop`,
		method: 'post',
		params: data
	})
}
// 查询所有用户列表

export function userList(data){
	return axios({
		url: `userManagement/userList`,
		method: 'post',
		params: data
	})
}
// 根据id查询用户信息
export function userFindById(data){
	return axios({
		url: `userManagement/findById`,
		method: 'post',
		params: data
	})
}
// 添加用户
export function addUser(data){
	return axios({
		url: `userManagement/addUser`,
		method: 'post',
		params: data
	})
}
// 修改用户信息
export function modifyUser(data){
	return axios({
		url: `userManagement/modifyUser`,
		method: 'post',
		params: data
	})
}
// 删除用户
export function delUser(data){
	return axios({
		url: `userManagement/delUser`,
		method: 'post',
		params: data
	})
}

// 根据用户等级查询所拥有的权限和地区
export function powerAndDistrict(data){
	return axios({
		url: `userManagement/powers`,
		method: 'post',
		params: data
	})
}
// 请求拦截器

var loadingInstance = null;
let axiosIns = axios.interceptors.request.use(
	config => {
		loadingInstance = Loading.service({
			lock: true,
			text: '加载中...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		})
		// const token = getCookie('JSESSIONID');
		// config.data = JSON.stringify(config.data);
		// if (token) {
		// 	config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
		// }
		// config.params.credentials = "include";
		let LoginToken = sessionStorage.getItem("LoginToken");
		if(LoginToken){
            // 添加token
			config.headers.Authorization = `Bearer ${LoginToken}`;
		}
	  	return config;
	},
	error => {
		console.log(error)
	  return Promise.reject(error);
	}	
  )
// 响应拦截器
  axios.interceptors.response.use(response => {
	// 对响应数据做点什么
	loadingInstance.close();
    return response;
  }, error => {
	// 对响应错误做点什么
	loadingInstance.close();
	// Message({
	// 	message: "请求超时",
	// 	type: 'error',
	// 	duration: 2000	
	// })
    return Promise.reject(error);
  });