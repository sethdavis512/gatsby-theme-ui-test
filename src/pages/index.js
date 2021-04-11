import React, { useState } from 'react';
import { Box, Input, Label } from 'theme-ui';

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

    return (
        <main>
            <form
                name="contact"
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                {/* You still need to add the hidden input with the form name to your JSX form */}
                <input type="hidden" name="my-form-name" value="contact" />
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
