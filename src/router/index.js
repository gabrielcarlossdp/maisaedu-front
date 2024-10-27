import { createRouter, createWebHistory } from 'vue-router'
import StudentView from '../views/StudentView.vue'
import CreateStudentView from '@/views/CreateStudentView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import Layout from '@/layout/DefaultLayout.vue'
import { useUserStore } from '@/stores/user'
import TeamView from '@/views/TeamView.vue'
import CreateTeamView from '@/views/CreateTeamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'layout',
      redirect: { name: 'student' },
      component: Layout,
      children: [
        {
          path: '/student',
          name: 'student',
          component: StudentView,
        },
        {
          path: '/student/create',
          name: 'create-student',
          component: CreateStudentView,
        },
        {
          path: '/student/:id',
          name: 'edit-student',
          component: CreateStudentView,
          props: true,
        },
        {
          path: '/team',
          name: 'team',
          component: TeamView,
        },
        {
          path: '/team/create',
          name: 'create-team',
          component: CreateTeamView,
        },
        {
          path: '/team/:id',
          name: 'edit-team',
          component: CreateTeamView,
          props: true,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !useUserStore().token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
