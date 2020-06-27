import Axios from 'axios';
// import qs from 'qs'
var http = Axios.create({
    baseURL: 'http://localhost/hairShop/',
    timeout:5000,
    'content-type': 'application/x-www-form-urlencoded'
});
//request 请求拦截器
http.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = token  //请求头加上token
    }
    return config
},err => {
    return Promise.reject(err)
})
// response 响应拦截器
http.interceptors.response.use(response => {
    //拦截响应，做统一处理 
    
    return response
},error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
})

export default {
    get(url,params={}){
    //    params = qs.stringify(params);
       return http({
           url,
           params,
           method:'get',
       });
   },
   post(url,data={}){
    //    data = qs.stringify(data);
       return http({
           url,
           data,
           method:'post',
       });
   },
   baseURL: 'http://localhost/hairShop/', 
   imgBaseUrl: 'http://localhost/hairShop/upload/',
   uploadUrl:'http://localhost/hairShop/upload/uploadHead.php',
};