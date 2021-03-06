import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Button, Input, Label, Text, Textarea } from 'theme-ui';
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
    email: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!')
});

const encode = data => {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
};

const ComposedField = ({
    as = Input,
    helpText,
    id,
    label,
    name,
    type = 'text',
    sx
}) => (
    <Box sx={{ mb: 3, ...sx }}>
        <Label htmlFor={id || name}>{label}</Label>
        {helpText && (
            <Text as="span" sx={{ fontSize: 1 }}>
                {helpText}
            </Text>
        )}
        <Field as={as} id={id || name} name={name} type={type} />
        <ErrorMessage component={ErrorText} name={name} />
    </Box>
);

const ErrorText = ({ children }) => (
    <Text sx={{ color: 'red' }}>{children}</Text>
);

const ContactUs = () => (
    <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            message: ''
        }}
        validationSchema={ContactSchema}
        onSubmit={(values, actions) => {
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encode({
                    'form-name': Constants.NETLIFY_FORM_NAME,
                    ...values
                })
            })
                .then(() => {
                    actions.resetForm();
                })
                .catch(error => alert(error));
        }}
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
            <ComposedField label="First Name" name="firstName" />
            <ComposedField label="Last Name" name="lastName" />
            <ComposedField label="Email" name="email" type="email" />
            <ComposedField
                as={Textarea}
                helpText="Give us your honest thoughts"
                label="Message"
                name="message"
            />
            <Button type="submit">Contact Me!</Button>
        </Form>
    </Formik>
);

const GetToKnowYou = () => (
    <Formik
        initialValues={{
            favoriteColor: '',
            favoritePizza: ''
        }}
        onSubmit={(values, actions) => {
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encode({
                    'form-name': 'get-to-know-you',
                    ...values
                })
            })
                .then(() => {
                    actions.resetForm();
                })
                .catch(error => alert(error));
        }}
    >
        <Form
            name={'get-to-know-you'}
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
        >
            {/* You still need to add the hidden input with the form name to your JSX form */}
            <Field
                type="hidden"
                name="get-to-know-you"
                value="get-to-know-you"
            />
            <ComposedField label="Favorite Color" name="favoriteColor" />
            <ComposedField label="Favorite Pizza" name="favoritePizza" />
            <Button type="submit">My faves!</Button>
        </Form>
    </Formik>
);

const IndexPage = () => {
    return (
        <Box as="main" sx={{ maxWidth: '600px', mx: 'auto', my: 4 }}>
            <ContactUs />
            <GetToKnowYou />
        </Box>
    );
};

export default IndexPage;
