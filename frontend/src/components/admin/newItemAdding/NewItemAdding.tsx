import React, { useEffect, useState } from 'react'
import { Box, TextField, InputAdornment, CardMedia, Stack, Button, Typography, Alert } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import DownloadIcon from '@mui/icons-material/Download';


const MAX_FILE_SIZE = 524000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const formSchema = z.object({
    name: z.string().min(1, { message: "Обязательное поле" }),
    cost: z.string().min(1, { message: "Обязательное поле" }),
    image: z
        .any()
        .refine((files) => files?.[0]?.size > 0, `Upload image`)
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 500KB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})
type AddNewItemFormData = z.infer<typeof formSchema>

export const NewItemAdding: React.FC<{}> = () => {

    const {
        control,
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm<AddNewItemFormData>({
        defaultValues: {
            name: '',
            cost: '',
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<AddNewItemFormData> = (data) => {
        console.log(data)
    }


    const [selectedFile, setSelectedFile] = useState<any>()
    const [preview, setPreview] = useState<string>()
    const [selectedFileName, setSelectedFileName] = useState('')

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        setSelectedFileName(selectedFile.name)
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
        }
        setSelectedFile(e.target.files[0])
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                <Stack alignItems="center" justifyContent='center'>
                    {preview ?
                        <>
                            <CardMedia
                                component='img'
                                sx={{ height: 175, width: 245, border: 'dashed 3px black' }}
                                image={preview}
                                title="scooter"
                            />
                            <Typography>{selectedFileName}</Typography>
                        </>
                        :
                        <>
                            <DownloadIcon color='primary' sx={{ width: 245, height: 175, border: 'dashed 3px black' }} />
                            <Typography>Upload image</Typography>
                        </>
                    }
                    <Stack alignItems="center" justifyContent='center'>
                        <Button sx={{ mt: 2 }} variant="contained" component="label">
                            Upload image
                            <input hidden onChangeCapture={onSelectFile} accept="image/*" multiple type="file" {...register("image")} />
                        </Button>
                        {errors.image &&
                            <Alert sx={{ mt: 2 }} variant="outlined" severity="error">
                                {`${errors.image?.message}`}
                            </Alert>
                        }
                    </Stack>
                </Stack>
                <Stack sx={{ width: '100%' }}>
                    <Controller
                        name='name'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <TextField {...field}
                            type="text"
                            error={!!errors.name}
                            helperText={errors.name ? errors.name?.message : ''}
                            label="Item name" variant='outlined'
                            fullWidth
                            margin='dense' />}
                    />
                    <Controller
                        name='cost'
                        control={control}
                        render={({ field }) => <TextField {...field}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CurrencyRubleIcon /></InputAdornment>,
                            }}
                            type="number"
                            error={!!errors.cost}
                            helperText={errors.cost ? errors.cost?.message : ''}
                            label="Cost of item" variant='outlined'
                            fullWidth
                            margin='dense' />}
                    />
                    <LoadingButton loading={false} type='submit' variant='contained' sx={{ mt: 2, marginLeft: 'auto' }}>Submit</LoadingButton>
                </Stack>
            </Stack>
        </Box>
    )
}