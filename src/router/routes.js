
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DiagramPage.vue') },
      { path: 'as-list', component: () => import('pages/AsListPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') }
    ]
  }
]

// Always leave this as last one.
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
