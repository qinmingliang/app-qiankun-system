import '@/micro/public-path';
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'
import { createRouter, createWebHistory } from 'vue-router';
let router = null;
let instance = null;
let history = null;
 
function render(props = {}) {
    const { container } = props;
    // let arr = routes.options.routes;
    console.log(window.__POWERED_BY_QIANKUN__);
    history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/system/' : '/');
    router = createRouter({
        history,
        routes,
    });
    instance = createApp(App);
    instance.use(router);
    // instance.use(store);
    // instance.use(ElementPlus);
    instance.mount(container ? container.querySelector('#app') : '#app');
}
 
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
 
/**
* bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
* 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
*/
export async function bootstrap() {
    console.log('%c%s', 'color: green;', '微应用初始化vue3.0 app bootstraped');
}
 
function storeTest(props) {
    props.onGlobalStateChange &&
    props.onGlobalStateChange(
        (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
        true,
    );
    props.setGlobalState &&
    props.setGlobalState({
        ignore: props.name,
        user: {
            name: props.name,
        },
    });
}
 
export async function mount(props) {
    storeTest(props);
    render(props);
    instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
    instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}
 
export async function unmount() {
    instance.unmount();
    instance._container.innerHTML = '';
    instance = null;
    router = null;
    history.destroy();
}