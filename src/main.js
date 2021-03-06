// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import '@/assets/main.css'
Vue.use(ElementUI);

import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Base64 from 'js-base64'

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueQuillEditor)
Vue.use(Base64)
Vue.config.productionTip = false
/*路由验证*/
router.beforeEach((to, from, next) => {
  // 部分代码
  if(to.path =='/login'){
  	sessionStorage.clear();
  	next()
  }else if(to.path =='/forgetpassword'||to.path =='/stop'){
  	next()
  }else{
  		if(sessionStorage.getItem('token')){
				next()
			}else{
				next('/login')
			}

  }

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

