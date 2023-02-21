/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from 'services/LocalStorage';
import { useDeleteSubjectDataMutation, useGetEventAllQuery, useGetSubjectAllQuery, useGetTeacherAllQuery } from 'services/userAuthApi';

function Events() {
    const token = getToken();
    const { data, isSuccess, isFetching, isLoading } = useGetEventAllQuery({ token });
    const navigate = useNavigate();
    console.log(useGetEventAllQuery({ token }), 'useGetEventAllQuery({ token })');

    const [deletesubjectData] = useDeleteSubjectDataMutation();
    console.log(data, 'deletesubjectData');
    const deletedata = async (id) => {
        const res = await deletesubjectData({ token, id });
    };
    const columns = [
        { name: 'ID', selector: (row) => row.id, sortable: true },
        { name: 'Title', selector: (row) => row.title, sortable: true },
        { name: 'Start Date', selector: (row) => row.start, sortable: true },
        { name: 'End Date', selector: (row) => row.end, sortable: true },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <Link to={`/dashboard/calender/event/${row.id}`}>
                        <button className="btn btn-primary ml-2 mr-2" style={{ marginRight: '10px' }}>
                            Edit
                        </button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => deletedata(row.id)}>
                        Delete
                    </button>
                </>
            )
        }
    ];
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
        <DataTable
            columns={columns}
            data={data}
            pagination
            fixedHeader
            // fixedHeaderScrollHeight="450px"
            // selectableRows
            actions={
                <button className="btn btn-info">
                    <Link to="/dashboard/book/create" className="add_button">
                        Add Subject
                    </Link>
                </button>
            }
            // subHeader
            // subHeaderComponent={
            //     <input type="text" className="w-25form-control" placeholder="Search Box" value={search} onChange={(e) => setsearch(e.target.value)}/>
            // }
        />
    );
}

export default Events;
