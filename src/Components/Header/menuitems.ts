import Cookie from 'js-cookie'

type MenuItems = {
  title: string,
  url: string,
  cName: string,

}
const user = Cookie.get('user')

export const menu : MenuItems[] = [
  {
    title: 'Perfil',
    url: `/${user}`,
    cName: 'user-nav-links'

  },
  {
    title: 'Explorar',
    url: "/home",
    cName: 'user-nav-links'

  },
  {
    title: 'Criar Atividade',
    url: "/createActivity",
    cName: 'user-nav-links'

  },
  {
    title: 'Conta',
    url: "/account",
    cName: 'user-nav-links'
  },
  {
    title: 'Notificações',
    url: "/home",
    cName: 'user-nav-links'

  }

]