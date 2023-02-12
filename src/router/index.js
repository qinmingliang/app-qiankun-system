// import { createRouter, createWebHashHistory } from 'vue-router'

// const Layout = () => import('@/views/Layout')
const Rule = () => import('@/views/rule/index')

const routes = [
  {
    path: '/rule',
    component: Rule
  }
]

// const router = createRouter({
//   history: createWebHashHistory(),
//   // @ts-ignore
//   base: window.__POWERED_BY_QIANKUN__ ? '/cloud' : '/', // 独立运行是用"/"做为根路径
//   routes
// })

export default routes
