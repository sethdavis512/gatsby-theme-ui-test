import React, { useState } from 'react';
import { Box, Input, Label } from 'theme-ui';

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

const useForm = initialValues => {
    const [formState, setFormState] = useState(initialValues);

    const handleFieldChange = ({ target }) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        });
    };

    return [formState, handleFieldChange];
};

const IndexPage = () => {
    const [formState, setFormState] = useForm({
        firstName: '',
        email: ''
    });

    const handleFormSubmit = event => {
        event.preventDefault();

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': Constants.FORM_NAME, ...formState })
        })
            .then(() => alert('Success!'))
            .catch(error => alert(error));
    };

    return (
        <main>
            <form
                name={Constants.FORM_NAME}
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleFormSubmit}
            >
                {/* You still need to add the hidden input with the form name to your JSX form */}
                <input
                    type="hidden"
                    name="my-form-name"
                    value={Constants.FORM_NAME}
                />
                <Box sx={{ mb: 4 }}>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={setFormState}
                    />
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={setFormState}
                    />
                </Box>
            </form>
        </main>
    );
};

export default IndexPage;
