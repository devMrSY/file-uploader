import React,{useState} from 'react'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup';
import { adminAuthentication, fetchData } from '../api'
import Tabledata from './table'

function Login () {
  const [userData,setuserData]=useState({
    status:false,
    userData:[]
  })
  const paperStyle = { padding: '40px 20px', width: 500, margin: '20px auto' }
  const btnStyle = { marginTop: 20, width: 200 }
  const textStyle = { marginTop: 10, width: 300 }
  const initialValues =
  {
      email: "",
      password: ""
  }
  const onSubmit = async (values, props) => {
    const response = await adminAuthentication(values)
    console.log(response)

    if(response.token !== null && response.success) {
      const userData = await fetchData(response.token);
      setuserData({
        userData: userData,
        status: userData.success
      })
    }
    else if(response.status === 400) {
      alert(response.data.message)
    }
    else if(response.status === 409) {
      console.log(response)
      alert(response.data.message)
    }
}
const validationSchema = Yup.object().shape({
    email: Yup.string().email('enter valid email').required("Required"),
    password: Yup.string().min(8, 'Minimun character should be 8').required("Required"),
})
    return (
      <div className="admin-container">
        { !userData.status?
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align="center">
                    <Typography variant='h6'>Admin-Login</Typography>
                    <Typography variant='caption'>Please enter your Email-ID and Password</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form value={props.values.name} onChange={props.handleChange}>
                            <Field as={TextField} label='Email' name='email' type='Email' style={textStyle} helperText={<ErrorMessage name='email' />} required />
                            <Field as={TextField} label='Password' name='password' type='password' style={textStyle} helperText={<ErrorMessage name='password' />} required />
                            <Button type='submit' style={btnStyle} variant='contained' color='secondary'>Login</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid> 
        : <Tabledata userData={userData.userData.data}/>}
      </div>
    )
  }
  export default Login;