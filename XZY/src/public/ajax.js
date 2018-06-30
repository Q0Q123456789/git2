import router from '../router'
import Ajax from 'axios'
import qs from 'qs'
import config from '../config/config.js'

// 创建实例时设置配置的默认值
var instance = Ajax.create({})

// 在实例已创建后修改默认值
// instance.defaults.withCredentials = true
instance.defaults.withCredentials = true

let baseURL = config.Api

var url = {
  api: {
    a: '/performance/model/list.do',
    b: '/performance/model/result',
    c: 'https://haimanchajian.com/jx3/search-mob?table=adventure&q=',
    d: 'https://haimanchajian.com/jx3/search-mob?table=item&q=',
    e: 'https://haimanchajian.com/jx3/search/suggest?table=item&q=',
    f: 'http://www.jx3pve.com/api/server/list.php',
    g: 'https://www.j3pz.com/data/prediction.json',
    h: 'https://www.j3pz.com/api/equip?position=0&school=',
    i: 'https://www.j3pz.com/api/buff?school=',
    activity: '/performance/model/activity',
    sid: '/performance/model/sid',
    cities: '/performance/model/cities',
    login: '/performance/model/login.do'
  }
}

instance.interceptors.response.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.data.errCode === 2) {
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  }
)
const ajax = (type, params) => {
  // let Public = {  // 公共参数
  //   'srAppid': ''
  // }
  let httpDefaultOpts = {  // http默认配置
    method: type.method,
    baseURL: baseURL,
    url: url.api[type.api],
    timeout: 6000,
    params: params,
    data: qs.stringify(params),
    headers: type.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'set-cookie': '123456789'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  if (type.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  let promise = new Promise(function (resolve, reject) {
    instance(httpDefaultOpts).then(
      (res) => {
        // successState(res)
        resolve(res.data)
      }
    ).catch(
      (response) => {
        // errorState(response)
        reject(response)
      }
    )
  })
  return promise
}
export default ajax
