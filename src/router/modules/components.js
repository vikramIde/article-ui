/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/posts',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Posts',
    icon: 'component'
  },
  children: [
    {
      path: 'create-post',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Create-Post',
      meta: { title: 'Create Post' }
    }
  ]
}

export default componentsRouter
