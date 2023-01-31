import React, { useState, useEffect } from 'react'
import { TextField, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { setPage, setQuery as setQueryGlobal } from '../../redux/scootersCatalogReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import useDebounce from '../../customHooks/useDebounce'

export const SearchForm: React.FC<{}> = () => {
    const dispatch = useAppDispatch()
    const queryValue = useAppSelector(state => state.catalog.query)
    const [query, setQuery] = useState(queryValue)
    const debouncedQuery = useDebounce(query, 700)

    useEffect(() => {
        dispatch(setQueryGlobal(debouncedQuery))
    }, [dispatch, debouncedQuery])

    const onSearchChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuery(e.currentTarget.value)
        dispatch(setPage(1))
    }
    return (
        <>
            <TextField onChange={(e) => { onSearchChange(e) }} value={query} label="Поиск" size="small" />
            <IconButton type='submit' >
                <SearchIcon />
            </IconButton>
        </>
    )
}