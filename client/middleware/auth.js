export default function ({ req, route, redirect }) {
  if (req) {
    const cookies = req.headers.cookie
    let isLoggedIn = false

    if (cookies) {
      const cookieValues = cookies.split(';').map((cookie) => cookie.trim())

      for (const cookieValue of cookieValues) {
        const [name, value] = cookieValue.split('=')
        if (name === 'isLoggedIn') {
          isLoggedIn = value === 'true'
        }
      }
    }

    if (isLoggedIn) {
      if (route.path === '/login' || route.path === '/register') {
        redirect('/')
      }
    }

    if (!isLoggedIn) {
      if (route.path.includes('/profile')) {
        redirect('/login')
      }
    }
  }
}
