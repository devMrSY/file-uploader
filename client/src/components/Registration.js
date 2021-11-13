import { useHistory } from 'react-router-dom'
import React from 'react'
import { RegistrationUser } from '../api'
import '../App.css'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup';
function Registration() {
    const paperStyle = { padding: '40px 20px', width: 500, margin: '20px auto' }
    const btnStyle = { marginTop: 20, width: 200 }
    const textStyle = { marginTop: 10, width: 300 }
    const history = useHistory()
    const initialValues = 
    {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    }
    const onSubmit = async (values, props) => {
        console.log(values)
        const status = await RegistrationUser(values)
        console.log(status)
        if (status.status === 200) {
            alert("you have successfully Signup")
            history.push("/")
        }
        else if (status.status === 409) {
            alert(status.data.message)
        }
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3, 'To short').required("Required"),
        lastName: Yup.string().min(3, 'To short').required("Required"),
        email: Yup.string().email('enter valid email').required("Required"),
        phone: Yup.number().typeError("Enter valid phone number").required("Required"),
        password: Yup.string().min(8, 'Minimun character should be 8').required("Required"),
    })

    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align="center">
                    <Typography variant='h6'>Register Here</Typography>
                    <Typography variant='caption'>Fill the form to create an account</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form value={props.values.name}
                            onChange={props.handleChange}>
                            <Field as={TextField} label='FirstName' name='firstName' style={textStyle} helperText={<ErrorMessage name='firstName' />} required />
                            <Field as={TextField} label='LastName' name='lastName' style={textStyle} marginTop='5' helperText={<ErrorMessage name='lastName' />} required />
                            <Field as={TextField} label='Email' name='email' type='Email' style={textStyle} helperText={<ErrorMessage name='email' />} required />
                            <Field as={TextField} label='Phone' name='phone' style={textStyle} helperText={<ErrorMessage name='phone' />} required />
                            <Field as={TextField} label='Password' name='password' type='password' style={textStyle} helperText={<ErrorMessage name='password' />} required />
                            <Button type='submit' style={btnStyle} variant='contained' color='secondary'>Register</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}
export default Registration
