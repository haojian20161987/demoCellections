import Vue from "vue";
import Router from "vue-router";

import hellohao from "@/components/hellohao.vue";
import mxchart from '@/components/mxchart/mxchart.vue'
import mxchart2 from '@/components/mxchart/mxchart2.vue'

Vue.use(Router);



/** 
 * routerArray变量是用来直接生成router的路径的。
 */
let routerArray = [{
        path: "/",
        redirect: "/hellohao" ///设置重定向
    },
    {
        path: "/hellohao",
        component: hellohao
    },
];



/** 
 * 下面会将pages中的第一项当做默认项。
 */

//将routerArray生成为router，
const router = new Router({
    routes: routerArray
});
router.beforeEach((to, from, next) => {
    next();
});

export default router;