import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Button, Input, Label, Text } from 'theme-ui';
import * as Yup from 'yup';

const Constants = {
    NETLIFY_FORM_NAME: 'contact'
};

const ContactSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
});

const encode = data => {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
};

const ErrorText = ({ children }) => (
    <Text sx={{ color: 'red' }}>{children}</Text>
);

const IndexPage = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: ''
    };

    const handleOnSubmit = (values, actions) => {
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
            .then(() => {
                actions.resetForm();
            })
            .catch(error => alert(error));
    };

    return (
        <Box as="main" sx={{ maxWidth: '600px', mx: 'auto', my: 4 }}>
            <Formik
                initialValues={initialValues}
                validationSchema={ContactSchema}
                onSubmit={handleOnSubmit}
            >
                <Form
                    name={Constants.NETLIFY_FORM_NAME}
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <Field
                        type="hidden"
                        name="my-form-name"
                        value={Constants.NETLIFY_FORM_NAME}
                    />
                    <Box sx={{ mb: 3 }}>
                        <Label htmlFor="firstName">First Name</Label>
                        <Field as={Input} id="firstName" name="firstName" />
                        <ErrorMessage component={ErrorText} name="firstName" />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Field as={Input} id="lastName" name="lastName" />
                        <ErrorMessage component={ErrorText} name="lastName" />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Label htmlFor="email">Email</Label>
                        <Field as={Input} id="email" name="email" />
                        <ErrorMessage component={ErrorText} name="email" />
                    </Box>
                    <Button type="submit">Contact Me!</Button>
                </Form>
            </Formik>
        </Box>
    );
};

export default IndexPage;
