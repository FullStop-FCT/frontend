import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


export default function SessionOf() {
  const router = useRouter();

  const login = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    router.push('/login')
  }

  return (
    <div>

      <div>

        <h1>Your session has expired</h1>
        <button onClick={login}>Login in</button>

      </div>







    </div>











  )











}