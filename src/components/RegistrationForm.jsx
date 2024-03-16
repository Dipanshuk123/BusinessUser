import React, { useState, useEffect } from 'react';
import { Container, RadioGroup, FormControlLabel, Radio, Button, Grid, Select, TextField, MenuItem, InputLabel, Paper, FormControl, Typography } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const BusinessSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    businessName: Yup.string().min(10, 'Business Name must be at least 10 characters').required('Business Name is required'),
    businessType: Yup.string().required('Business Type is required'),
    businessEstDate: Yup.date(),
    address: Yup.string().min(25, 'Address must be at least 25 characters').required('Address is required'),
    country: Yup.string().required('Country is required'),
    userName: Yup.string().required('Username is required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be alphanumeric and at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    isApproved: Yup.string().required().default('Pending')
});

const EndUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    businessEstDate: Yup.date()
        .test('is-at-least-18', 'Business Establishment Date must be at least 18 years ago', function (value) {
            const cutoffDate = new Date();
            cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);
            return value <= cutoffDate;
        }),
    address: Yup.string().min(25, 'Address must be at least 25 characters').required('Address is required'),
    country: Yup.string().required('Country is required'),
    userName: Yup.string().required('Username is required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be alphanumeric and at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    isApproved: Yup.string().required().default('Pending')
});

const RegistrationForm = () => {
    const [registrationType, setRegistrationType] = useState('business');
    const navigate = useNavigate();

    const handleUserTypeChange = (event) => {
        setRegistrationType(event.target.value);
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const schema = registrationType === 'business' ? BusinessSchema : EndUserSchema;
            await schema.validate(values, { abortEarly: false });
            const key = 'userData';
            const existingData = JSON.parse(localStorage.getItem(key)) || [];
            // Add the userType to the values
            const dataToAdd = { ...values, userType: registrationType };

            // Add the data to the existing data
            const updatedData = [...existingData, dataToAdd];

            // Update the localStorage with the updated data
            localStorage.setItem(key, JSON.stringify(updatedData));

            resetForm();
        } catch (error) {
            console.error('Validation error:', error.errors);
        }
    };

    const handleCancel = (resetForm) => {
        resetForm();
        navigate("/")
    };

    useEffect(() => {
        setRegistrationType('business');
    }, []);

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: '20px', margin: '20px', borderRadius: '15px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Registration Form
                </Typography>
                <Formik
                    initialValues={{
                        userType: 'business',
                        firstName: '',
                        lastName: '',
                        email: '',
                        businessName: '',
                        businessType: '',
                        businessEstDate: null,
                        address: '',
                        country: '',
                        state: '',
                        city: '',
                        landline: '',
                        mobile: '',
                        userName: '',
                        password: '',
                        confirmPassword: '',
                        isApproved: 'Pending'
                    }}
                    validationSchema={registrationType === 'business' ? BusinessSchema : EndUserSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, errors, touched, resetForm }) => (
                        <Form>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="userType"
                                    name="userType"
                                    value={values.userType}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleUserTypeChange(e);
                                    }}
                                    row
                                >
                                    <FormControlLabel
                                        value="business"
                                        control={<Radio />}
                                        label="Business"
                                    />
                                    <FormControlLabel
                                        value="endUser"
                                        control={<Radio />}
                                        label="End User"
                                    />
                                </RadioGroup>
                            </FormControl>
                            {registrationType === 'business' && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="First Name"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            error={touched.firstName && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                      
                                        <TextField
                                            label="Last Name"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Business Name"
                                            name="businessName"
                                            value={values.businessName}
                                            onChange={handleChange}
                                            error={touched.businessName && Boolean(errors.businessName)}
                                            helperText={touched.businessName && errors.businessName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel id="businessType-label">Business Type</InputLabel>
                                        <Select
                                            labelId="businessType-label"
                                            name="businessType"
                                            value={values.businessType}
                                            onChange={handleChange}
                                            error={touched.businessType && Boolean(errors.businessType)}
                                            fullWidth
                                        >
                                            <MenuItem value="Individual">Individual</MenuItem>
                                            <MenuItem value="Partnership">Partnership</MenuItem>
                                            <MenuItem value="Private Limited">Private Limited</MenuItem>
                                            <MenuItem value="Public Limited">Public Limited</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel id="businessEstDate-label">Business Establishment Date</InputLabel>
                                        <DatePicker
                                            selected={values.businessEstDate}
                                            onChange={(date) => handleChange({ target: { name: 'businessEstDate', value: date } })}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="Date"
                                            style={{ borderRadius: '8px', border: '1px solid #ccc', padding: '8px', width: '100%' }}
                                            error={touched.businessType && Boolean(errors.businessType)}
                                            shouldCloseOnSelect={false}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Address"
                                            name="address"
                                            multiline
                                            rows={4}
                                            value={values.address}
                                            onChange={handleChange}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="country-label">Country</InputLabel>
                                            <Field
                                                as={Select}
                                                labelId="country-label"
                                                name="country"
                                                value={values.country}
                                                onChange={handleChange}
                                                error={touched.country && Boolean(errors.country)}
                                            >
                                                <MenuItem value="">Select Country</MenuItem>
                                                <MenuItem value="USA">USA</MenuItem>
                                                <MenuItem value="Canada">Canada</MenuItem>
                                                <MenuItem value="UK">UK</MenuItem>
                                            </Field>
                                            <ErrorMessage name="country" component="div" className="error" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="State"
                                            name="state"
                                            value={values.state}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="City"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Landline No."
                                            name="landline"
                                            value={values.landline}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Mobile No."
                                            name="mobile"
                                            value={values.mobile}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Username"
                                            name="userName"
                                            value={values.userName}
                                            onChange={handleChange}
                                            error={touched.userName && Boolean(errors.userName)}
                                            helperText={touched.userName && errors.userName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Approval Status"
                                            name="isApproved"
                                            value={values.isApproved === 'Pending' ? 'Pending' : 'Approved'}
                                            InputProps={{ readOnly: true }}
                                            disabled
                                            fullWidth
                                            style={{ color: values.isApproved === 'Pending' ? 'red' : 'green' }} // Set color based on approval status
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {registrationType === 'endUser' && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            required
                                            name="firstName"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="First Name"
                                                    fullWidth
                                                    error={touched.firstName && !!errors.firstName}
                                                    helperText={touched.firstName && errors.firstName}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            required
                                            name="lastName"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Last Name"
                                                    fullWidth
                                                    error={touched.lastName && !!errors.lastName}
                                                    helperText={touched.lastName && errors.lastName}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            required
                                            name="email"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Email"
                                                    type="email"
                                                    fullWidth
                                                    error={touched.email && !!errors.email}
                                                    helperText={touched.email && errors.email}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel id="businessEstDate-label"> Date</InputLabel>
                                        <DatePicker
                                            selected={values.businessEstDate}
                                            onChange={(date) => handleChange({ target: { name: 'businessEstDate', value: date } })}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="Date"
                                            style={{ borderRadius: '8px', border: '1px solid #ccc', padding: '8px', width: '100%' }}
                                            error={touched.businessType && Boolean(errors.businessType)}
                                            shouldCloseOnSelect={false}
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <TextField
                                            label="Address"
                                            name="address"
                                            multiline
                                            rows={4}
                                            value={values.address}
                                            onChange={handleChange}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                            fullWidth
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="country-label">Country</InputLabel>
                                            <Field
                                                as={Select}
                                                labelId="country-label"
                                                name="country"
                                                value={values.country}
                                                onChange={handleChange}
                                                error={touched.country && Boolean(errors.country)}
                                            >
                                                <MenuItem value="">Select Country</MenuItem>
                                                <MenuItem value="USA">USA</MenuItem>
                                                <MenuItem value="Canada">Canada</MenuItem>
                                                <MenuItem value="UK">UK</MenuItem>
                                            </Field>
                                            <ErrorMessage name="country" component="div" className="error" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="State"
                                            name="state"
                                            value={values.state}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="City"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Landline No."
                                            name="landline"
                                            value={values.landline}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Mobile No."
                                            name="mobile"
                                            value={values.mobile}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Username"
                                            name="userName"
                                            value={values.userName}
                                            onChange={handleChange}
                                            error={touched.userName && Boolean(errors.userName)}
                                            helperText={touched.userName && errors.userName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Approval Status"
                                            name="isApproved"
                                            value={values.isApproved === 'Pending' ? 'Pending' : 'Approved'}
                                            InputProps={{ readOnly: true }}
                                            disabled
                                            fullWidth
                                            style={{ color: values.isApproved === 'Pending' ? 'red' : 'green' }} // Set color based on approval status
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="secondary" fullWidth onClick={() => handleCancel(resetForm)}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default RegistrationForm;
