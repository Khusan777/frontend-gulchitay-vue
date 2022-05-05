export const privateRoutes = [
  {
    path: '/',
    name: 'app',
    component: () => import('~/layouts/AppLayout'),
    children: [
      {
        path: '/',
        name: 'personalData',
        component: () => import('~/pages/home/PersonalData'),
        meta: { title: 'Персональные данные' },
      },
      {
        path: '/credits-card',
        name: 'creditsCard',
        component: () => import('~/pages/home/CreditsCard'),
        meta: { title: 'Кредитная история' },
      },
      {
        path: '/credits-byuro',
        name: 'creditByuro',
        component: () => import('~/pages/home/CreditByuro'),
        meta: { title: 'КБ' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('~/pages/PageNotFound'),
  },
];
