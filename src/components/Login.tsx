import * as React from "react";
import Button from '@material-ui/core/Button';
import { googleAuthProvider, firebase } from '../firestore/firestore'

const LoginPage = () => {

    const redirectIfUserAuth = () => {
        const userId = localStorage.getItem('userInfo')
        if(userId){
            location.href = '/dashboard'
        }
    }

    redirectIfUserAuth()

    const Login = () => {
      firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
          const user = result.user
          if(user){
            localStorage.setItem('userInfo', user.uid)
            location.href = '/dashboard'
          }
      }).catch((err) => {
          return alert(err.message)
      })
}

return (
 <div className="box-layout">
    <div className="box-layout__box">
        <h1 className="box-layout__typo">MAYDAY</h1>
        <p className="box-layout__typo">Find Health Care Facilities Near You</p>
        <Button variant="contained" onClick={Login} color="primary">
            Login With Google.
        </Button>
    </div>
</div>
    )
}

export { LoginPage as default }