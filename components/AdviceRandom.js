import { useEffect, useState } from 'react';
import api from '../api/index'
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid"
import styles from '../styles/Home.module.css'
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";



const AdviceRamdomPage = () => {

    const [advices, setAdvices] = useState(null);
    const [listadvices, setListAdvices] = useState([]);
    const [idAdvice, setIdAdvice] = useState(null);
    const [result, setResult] = useState([]);
    const onSubmit = (formData) => setResult(JSON.stringify(formData));
    const [viewSearch, setViewSearch] = useState([]);

    const {
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm();


    useEffect(() => {
        getData();
    }, []);


    useEffect(() => {
        deletActualAdvice(idAdvice);
    }, [idAdvice]);

    const onFinish = (formData) => {
        console.log('Busqueda', formData);
        getDataSearch(formData.text);

    }

    const getDataSearch = async (word) => {

        try {
            const response = await api.get("/advice/search/" + word);
            console.log('response seacrh', response.data.slips);
            setViewSearch(response.data.slips);

        } catch (e) { }
    };




    const getData = async () => {

        try {
            const response = await api.get("/advice");
            console.log('resonse', response);
            console.log('advice', response.data.slip.advice)
            setAdvices(response.data);

        } catch (e) { }
    };


    if (!advices) {
        return <div className={styles.pageLoad}>
            <h1>Cargando consejos...</h1>
        </div>
    }

    const handleNextAdvice = () => {
        getData();
    }


    const handleFavoriteAdvice = () => {

        setListAdvices((prevState) => {
            const newAdvice = advices.slip
            console.log('consejo nuevo', newAdvice)
            return [...prevState, newAdvice];

        })
    }


    function deletActualAdvice(index) {
        const newList = listadvices.filter(function (advice) {
            return advice.id !== index;
        });

        setListAdvices(newList);
        console.log('lista id', newList);

    }

    const handleRemoveAdvice = (id) => {
        console.log('eliminacion ', advices.slip.id)
        setIdAdvice(id);
    }


    return (
        <div>
            <Grid container xs={12} className={styles.first}>
                <Grid xs={4}>

                    <Grid xs={12}>
                        <h2>Consejo del día</h2>
                        <p>{advices.slip.advice}</p>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid xs={6}>
                            <Button variant="contained" onClick={handleFavoriteAdvice}>Marcar como favorito</Button>
                        </Grid>
                        <Grid xs={6}>
                            <Button variant="contained" onClick={handleNextAdvice}><SearchIcon />Siguiente consejo</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={8}>
                    <div>
                        <h2>Consejos favoritos</h2>
                        {listadvices.map((list) => (
                            <div key={list.id}>
                                {list.advice}
                                <Button variant="text" onClick={() => handleRemoveAdvice(list.id)}><DeleteIcon /> Quitar de la lista</Button>
                                <Divider className={styles.divider} />
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
            <Grid className={styles.first}>
                <div>
                    <h2>Buscador de consejos</h2>
                    <form onSubmit={handleSubmit(onFinish)}>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}

                                    label="Ingrese une palabra clave"
                                    variant="outlined"
                                    type="text"
                                />
                            )}
                        />
                        <p></p>
                        <Button variant="contained" type="submit"><SearchIcon /> Buscar</Button>
                    </form>
                    <Grid>
                        <h2>Resultados de la Búsqueda</h2>
                        {viewSearch.map((view) => (
                            <div key={view.id}>
                                {view.advice}
                                <Button variant="text" type="submit" onClick={handleFavoriteAdvice} >Marcar como Favorito</Button>
                                <Divider className={styles.divider} />
                            </div>
                        ))}
                    </Grid>
                </div>
            </Grid>
        </div>
    );

};



export default AdviceRamdomPage;
