type Route = {
  title: string
  path: string
}

const pageRoutes: Route[] = [
  {
    title: 'Dashboard',
    path: '/'
  },
  {
    title: 'Categories',
    path: '/manage-categories'
  },
  {
    title: 'Expenses',
    path: '/expenses'
  }
]

export default pageRoutes
