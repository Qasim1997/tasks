import React, { useState, useEffect } from 'react';
// project imports

import MainCard from 'ui-component/cards/MainCard';
// @mui
import { Button, TextField, Alert, Box } from '@mui/material';
// hooks
// components
// sections
import { useNavigate } from 'react-router-dom';
// @mui
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddClassMutation, useAddEventMutation, useEditClassDataMutation } from 'services/userAuthApi';
import { getToken } from 'services/LocalStorage';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
function AddEvent() {
    const token = getToken();
    const navigate = useNavigate();
    // react hook form
    // validation
    const formSchema = Yup.object().shape({
        title: Yup.string().required(),
        start: Yup.string()
            .nullable()
            .test(function (value) {
                return moment(value, 'YYYY-MM-DD'), 'years';
            })
            .required('Please enter your age'),
        end: Yup.string()
            .nullable()
            .test(function (value) {
                return moment(value, 'YYYY-MM-DD'), 'years';
            })
            .required('Please enter your age')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        // errors,
        reset,
        trigger,
        control
    } = useForm(formOptions);
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);

    const [errorshow, setErrorShow] = useState({
        status: false,
        msg: '',
        type: ''
    });

    const [editclass] = useEditClassDataMutation();
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);
    // login kar k console.log check karo

    const ShadowBox = ({ shadow }) => (
        <Card sx={{ mb: 3, boxShadow: shadow }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor: 'primary.light',
                    color: 'grey.800'
                }}
            >
                <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
            </Box>
        </Card>
    );

    const [addEvent] = useAddEventMutation();

    const onSubmit = async (data) => {
        console.log(data, 'selectedValue');
        const res = await addEvent({ token, data });
        console.log(res, 'selectedValue');
    };
    return (
        <div>
            <MainCard
                title="Add Class"
                secondary={
                    <button className="btn btn-primary">
                        <i className="bi bi-skip-backward"></i>Back
                    </button>
                }
            >
                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <Box
                                sx={{
                                    width: 500,
                                    height: 300,
                                    // boxShadow,
                                    alignItems: 'center'
                                    // backgroundColor: 'darkGray',
                                }}
                            >
                                <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                                    <TextField
                                        label="Name"
                                        type="text"
                                        name="title"
                                        fullWidth
                                        margin="dense"
                                        sx={{ mb: 2 }}
                                        {...register('title')}
                                        className={`form-control mt-4 ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                    <Box sx={{ mb: 2 }}>
                                        {errors.title && <small className="text-danger">{errors.title.message}</small>}
                                    </Box>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Controller
                                            name="start"
                                            control={control}
                                            defaultValue={null}
                                            render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                                                <DatePicker
                                                    label="Date of birth"
                                                    value={value}
                                                    onChange={(value) => onChange(moment(value).format('YYYY-MM-DD'))}
                                                    renderInput={(params) => (
                                                        console.log(invalid),
                                                        (
                                                            <TextField
                                                                error={invalid}
                                                                helperText={invalid ? error.message : null}
                                                                id="start"
                                                                variant="standard"
                                                                margin="dense"
                                                                fullWidth
                                                                color="primary"
                                                                autoComplete="bday"
                                                                {...params}
                                                            />
                                                        )
                                                    )}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Controller
                                            name="end"
                                            control={control}
                                            defaultValue={null}
                                            render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                                                <DatePicker
                                                    label="Date of birth"
                                                    value={value}
                                                    onChange={(value) => onChange(moment(value).format('YYYY-MM-DD'))}
                                                    renderInput={(params) => (
                                                        console.log(invalid),
                                                        (
                                                            <TextField
                                                                error={invalid}
                                                                helperText={invalid ? error.message : null}
                                                                id="end"
                                                                variant="standard"
                                                                margin="dense"
                                                                fullWidth
                                                                color="primary"
                                                                autoComplete="bday"
                                                                {...params}
                                                            />
                                                        )
                                                    )}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <div className="d-grid mt-5">
                                        <Button type="submit" variant="contained" style={{ color: 'black' }}>
                                            Save
                                        </Button>
                                    </div>
                                    {errorshow.status ? (
                                        <Alert severity={errorshow.type} sx={{ mt: 3 }}>
                                            {errorshow.msg}
                                        </Alert>
                                    ) : (
                                        ''
                                    )}
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </form>
                            </Box>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default AddEvent;
