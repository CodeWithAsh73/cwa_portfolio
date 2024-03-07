import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './login.module.css'
import signIn from '../../api/auth'

const Login = () => {
  const [formData, setFormData] = useState([])
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData);
    const token = await signIn(formData)
    if(token){
      localStorage.setItem('token',token)
      window.location = '/admin'
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({...formData,  [name]: value })
  }
  const data = ''
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit} >
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              required
              className={styles.input}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className={styles.input}
              onChange={handleChange}
            />
            {/* {error && <div className={styles.error_msg}>{error}</div>} */}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login