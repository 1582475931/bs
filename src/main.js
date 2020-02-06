// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
//请求响应
axios.interceptors.response.use(config => {
  console.log("-------" + config.config.url + "----------");
  console.log(config);
  return config;
})

// 响应拦截 config-后端返你的数据
axios.interceptors.response.use(config => {
  if (config.data.code == -1) {
    router.replace("/login")
    return config;
  }
  return config;

});

//重置样式
import './assets/css/reset.css'

//全局组件
import cont from './components/common/index'
for (var i in cont) {
  Vue.component(i, cont[i])
}
//全局过滤器
import filter from './filter/index'
for (var i in filter) {
  Vue.filter(i, filter[i])
}

//登录路由拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return;
  }
  //欢迎界面除了用户不能进
  if (to.path.includes('welcome')) {
    if (sessionStorage.getItem('type') == 0 || sessionStorage.getItem('type') == 1 || sessionStorage.getItem('type') == 2) {
      next();
    } else {
      next("/login");
    }
    return;
  }
  //管理员界面，只有超级管理员可以进
  if (to.path.includes('manage')) {
    if (sessionStorage.getItem('type') == 0) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }

  if (to.path.includes('updateManage')) {
    if (sessionStorage.getItem('type') == 1) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }

  
  //banner界面，只有超级管理员和管理员可以进
  if (to.path.includes('banner')) {
    if (sessionStorage.getItem('type') == 0 || sessionStorage.getItem('type') == 1) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }
  //商品管理界面，除了用户不能进
  if (to.path.includes('wares')) {
    if (sessionStorage.getItem('type') == 0 || sessionStorage.getItem('type') == 1 || sessionStorage.getItem('type') == 2) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }


  //管理员界面，只有超级管理员可以进
  if (to.path.includes('collection')) {
    if (sessionStorage.getItem('type') == 0|| sessionStorage.getItem('type') == 1) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }
  //banner界面，只有超级管理员和管理员可以进
  if (to.path.includes('buy')) {
    if (sessionStorage.getItem('type') == 0 || sessionStorage.getItem('type') == 1) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }
  //商品管理界面，除了用户不能进
  if (to.path.includes('point')) {
    if (sessionStorage.getItem('type') == 0 || sessionStorage.getItem('type') == 1 ) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }

  if (to.path.includes('cart')) {
    if (sessionStorage.getItem('type') == 0|| sessionStorage.getItem('type') == 1) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }

  if (to.path.includes('address')) {
    if (sessionStorage.getItem('type') == 0|| sessionStorage.getItem('type') == 1) {
      next();
    } else {
      sessionStorage.removeItem('type')
      next("/login");
    }
    return;
  }



  //店铺管理员不能进去，超级管理和管理员可以进去
  if (to.path.includes('user')) {
    if (sessionStorage.getItem('type') == 2) {
      sessionStorage.removeItem('type')
      next("/login");
    } else {
      next();
    }
    return;
  }
  if (to.path.includes('useradmin')) {
    if (sessionStorage.getItem('type') == 2) {
      sessionStorage.removeItem('type')
      next("/login");
    } else {
      next();
    }
    return;
  }
  
  next();
})

//axios放在原型链上
Vue.prototype.axios = axios;

//element-ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
