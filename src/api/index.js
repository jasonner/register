
import axios from 'axios'
import {bus} from '@/bus/bus.js'

axios.defaults.withCredentials = true;
// axios.defaults.headers.common['token'] = sessionStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';//配置请求头
//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    if(config.url.indexOf("/api/login")>-1){
        sessionStorage.setItem('token',"");
        config.headers.token = "";
    }else if(config.url.indexOf("/api/forget/get")>-1||config.url.indexOf("/api/forget/update")>-1){//忘记密码
    	sessionStorage.setItem('token',"");
        config.headers.token = "";
    }else if(config.url.indexOf("/api/before/verify")>-1||config.url.indexOf("/api/thirdLogin")>-1){
    	sessionStorage.setItem('token',"");
        config.headers.token = "";
    }else if(config.url.indexOf("/api/Browser/list")>-1){
    	config.headers.token = "";
    }else{
    	config.headers.token = sessionStorage.getItem("token");
    	config.headers.username = (JSON.parse(sessionStorage.getItem("user"))).user.account;
    }

    return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
//console.log(response)
  if (response.data && response.status === 200 && (response.config.url != '/api/login'||response.config.url !='/api/thirdLogin/' ) ) {
    if (!sessionStorage.getItem("token") || response.data.code===2) {
      //未登录
      bus.$emit('goto', '/login')
    }

  }

  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//基地址
let base = '';  //接口代理地址参见：config/index.js中的proxyTable配置

//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

// export const GET = (url, params) => {
//   return axios.get(`${base}${url}/${params}`).then(res => res.data)
// }

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}/${params}`).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
