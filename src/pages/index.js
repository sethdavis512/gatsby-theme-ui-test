import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Input, Label } from 'theme-ui';

const Constants = {
    FORM_NAME: 'contact'
};

const encode = data => {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
};

const IndexPage = () => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: ''
            }}
            onSubmit={(values, actions) => {
                fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: encode({
                        'form-name': Constants.FORM_NAME,
                        ...values
                    })
                })
                    .then(() => alert('Success!'))
                    .catch(error => alert(error));

                actions.resetForm();
            }}
        >
            <Form
                name={Constants.FORM_NAME}
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                {/* You still need to add the hidden input with the form name to your JSX form */}
                <Field
                    type="hidden"
                    name="my-form-name"
                    value={Constants.FORM_NAME}
                />
                <Box sx={{ mb: 4 }}>
                    <Label htmlFor="firstName">First Name</Label>
                    <Field as={Input} id="firstName" name="firstName" />
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Field as={Input} id="lastName" name="lastName" />
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Label htmlFor="email">Email</Label>
                    <Field as={Input} id="email" name="email" />
                </Box>
                <Button type="submit">Contact Me!</Button>
            </Form>
        </Formik>
    );
};

export default IndexPage;
