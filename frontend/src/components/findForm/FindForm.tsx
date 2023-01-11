import React, { useState } from 'react'
import { Box, TextField, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { setPage, setQuery as setQueryGlobal } from '../../redux/scootersCatalogReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const FindForm: React.FC<{}> = () => {
    const dispatch = useAppDispatch()
    const queryValue = useAppSelector(state => state.catalog.query)

    const [query, setQuery] = useState(queryValue)
    const onFindSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setPage(1))
        dispatch(setQueryGlobal(query))
    }
    return (
        <Box onSubmit={(e) => { onFindSubmit(e) }} sx={{ flexGrow: 1 }} component="form" >
            <TextField onChange={(e) => setQuery(e.currentTarget.value)} value={query} label="Поиск" size="small" />
            <IconButton type='submit' >
                <SearchIcon />
            </IconButton>
        </Box>
    )
}