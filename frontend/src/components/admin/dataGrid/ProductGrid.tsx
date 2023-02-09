import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColumns, GridActionsCellItem } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Scooter } from '../../../redux/scootersCatalogReducer';
import { getScootersForAdmin, deleteScooterFromAdmin } from '../../../redux/adminReducer';


export const ProductGrid: React.FC<{}> = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getScootersForAdmin())
    }, [dispatch])

    const rows = useAppSelector(state => state.admin.scooters)
    const columns: GridColumns<Scooter> = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Product name',
            width: 150,
        },
        {
            field: 'mark',
            headerName: 'Rating',
            type: 'number',
            width: 110,
        },
        {
            field: 'cost',
            headerName: 'Cost',
            width: 150,
            type: 'number',
        },
        {
            field: 'batteryCapacity',
            headerName: 'Battery capacity',
            width: 110,
            type: 'number',
        },
        {
            field: 'power',
            headerName: 'Power',
            width: 100,
            type: 'number',
        },
        {
            field: 'speed',
            headerName: 'Speed',
            width: 100,
            type: 'number',
        },
        {
            field: 'time',
            headerName: 'Time',
            width: 100,
            type: 'number',
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => dispatch(deleteScooterFromAdmin(+params.id))}
                />,
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => console.log('edited', params.id)}
                />,
            ],
        },

    ];

    return (
        <Box sx={{ height: '90vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    )
}