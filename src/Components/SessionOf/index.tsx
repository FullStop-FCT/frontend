import {useRouter} from 'next/router'



export default function SessionOf(){
  const router = useRouter();
  return ( 
      <div>

        <div>

          <h1>Your session has expired</h1>
          <button onClick={() => { router.push('/login')}}>Login in</button>

        </div>







      </div>











  )











}