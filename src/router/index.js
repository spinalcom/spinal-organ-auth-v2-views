import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/Dashboard'
import Users from '@/views/Users'
import DetailUser from '@/views/DetailUser'
import Platforms from '@/views/Platforms'
import DetailPlatform from '@/views/DetailPlatform'
import Application from '@/views/Application'
import DetailApp from '@/views/DetailApp'
import AddApp from '@/views/AddApp'
import AddUser from '@/views/AddUser'
import EditApp from '@/views/EditApp'
import EditUser from '@/views/EditUser'
import Logs from '@/views/Logs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Users',
      name: 'Users',
      component: Users
    },
    {
      path: '/DetailUser',
      name: 'DetailUser',
      component: DetailUser
    },
    {
      path: '/Platforms',
      name: 'Platforms',
      component: Platforms
    },
    {
      path: '/DetailPlatform',
      name: 'DetailPlatform',
      component: DetailPlatform
    },
    {
      path: '/Application',
      name: 'Application',
      component: Application
    },
    {
      path: '/DetailApp',
      name: 'DetailApp',
      component: DetailApp
    },{
      path: '/AddUser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/AddApp',
      name: 'AddApp',
      component: AddApp
    },
    {
      path: '/EditApp',
      name: 'EditApp',
      component: EditApp
    },
    {
      path: '/EditUser',
      name: 'EditUser',
      component: EditUser
    },
    {
      path: '/Logs',
      name: 'Logs',
      component: Logs
    },
  ]
})
