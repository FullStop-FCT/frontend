import Cookie from 'js-cookie'

type MenuItems = {
  title: string,
  url: string,
  cName: string,

}
const user = Cookie.get('user')

export const menu : MenuItems[] = [
  {
    title: 'Home',
    url: "/home",
    cName: 'nav-links'

  },{
    title: 'Explore',
    url: "#",
    cName: 'nav-links'

  },{
    title: 'Profile',
    url: `/users/${user}`,
    cName: 'nav-links'

  },
  {
    title: 'Notification',
    url: "/",
    cName: 'nav-links'

  },
  {
    title: 'More',
    url: "#",
    cName: 'nav-links'

  }
  
]