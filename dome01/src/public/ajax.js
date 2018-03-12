import Ajax from 'axios'
import qs from 'qs'
var API = 'http://localhost:8081'
var url = {
  api: {
    a: API + '/performance/model/list',
    b: API + '/performance/model/local',
    c: 'https://haimanchajian.com/jx3/search-mob?table=adventure&q=',
    d: 'https://haimanchajian.com/jx3/search-mob?table=item&q=',
    e: 'https://haimanchajian.com/jx3/search/suggest?table=item&q=',
    f: 'http://www.jx3pve.com/api/server/list.php',
    g: 'https://www.j3pz.com/data/prediction.json',
    h: 'https://www.j3pz.com/api/equip?position=0&school=',
    i: 'https://www.j3pz.com/api/buff?school='
  }
}
Ajax.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  })

const ajax = {
  get: function (type, params) {
    return new Promise((resolve, reject) => {
      Ajax.get(url.api[type], {
        params: qs.stringify(params)
      }).then((res) => {
        resolve(res)
      }).catch((cd) => {
        reject(cd)
      })
    })
  },
  post: function (type, params) {
    return new Promise((resolve, reject) => {
      Ajax.post(url.api[type], qs.stringify(params)).then((res) => {
        resolve(res)
      }).catch((cd) => {
        reject(cd)
      })
    })
  }
}
export default ajax
