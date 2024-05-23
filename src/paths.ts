export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in' },
  dashboard: {
    overview: '/dashboard',
    gym: '/dashboard/gym',
    addGym: '/dashboard/gym/add',
    editGym: '/dashboard/gym/edit/:id'
  },
  errors: { notFound: '/errors/not-found' },
} as const;
