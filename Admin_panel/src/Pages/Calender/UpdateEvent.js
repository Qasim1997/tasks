/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
// project imports

import MainCard from 'ui-component/cards/MainCard';
// @mui
import { Button, TextField, Alert, Box } from '@mui/material';
import { RotatingSquare } from 'react-loader-spinner';
// hooks
// components
// sections
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    useAddClassMutation,
    useAddEventMutation,
    useEditClassDataMutation,
    useEditEventDataMutation,
    useGetOneEventQuery
} from 'services/userAuthApi';
import { getToken } from 'services/LocalStorage';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios';
function AddEvent() {
    const token = getToken();
    const navigate = useNavigate();
    const [preloadedValues, setpreloadedValues] = useState('');
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
    const formOptions = { resolver: yupResolver(formSchema), defaultValues: useMemo(() => preloadedValues, [preloadedValues]) };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        // errors,
        reset,
        trigger,
        control
    } = useForm(formOptions);

    const [errorshow, setErrorShow] = useState({
        status: false,
        msg: '',
        type: ''
    });

    const [editclass] = useEditClassDataMutation();
    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, reset]);
    const { id } = useParams();
    // login kar k console.log check karo
    const { data, isLoading, isSuccess } = useGetOneEventQuery({ id, token });
    // get data

    useEffect(() => {
        async function getStudent() {
            try {
                // const student = await axios.get(`http://127.0.0.1:8000/api/admin/teacher/${id}`);
                // console.log(student.data, 'teacher data');
                // setStudent(student.data.result);
                await axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8000/api/admin/calender/1',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    let result = res.data;
                    console.log(result, 'teacher data');
                    setpreloadedValues(res.data);
                    // setStudent(result);
                });
            } catch (error) {
                console.log('Something is Wrong');
            }
        }
        getStudent();
    }, [id]);
    console.log(data.title, 'data');
    const [events, setevents] = useState('');
    useEffect(() => {
        if (data && isSuccess) {
            setevents(data);
        }
    }, [data]);
    console.log(events, 'success');

    const onSubmit = async (data) => {
        console.log(data, 'selectedValue');
        const res = await addEvent({ token, data });
        console.log(res, 'selectedValue');
    };
    if (isLoading) {
        return (
            <RotatingSquare
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
            />
        );
    }
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
                                        defaultValue={data.title}
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
