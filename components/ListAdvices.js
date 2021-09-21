import { useEffect, useState } from 'react';
import api from '../api/index'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';;



const ListAdvices = () => {

    const [advices, setAdvices] = useState(null);
    const [listadvices, setListAdvices] = useState([]);


    useEffect(() => {

        const getData = async () => {

            try {
                const response = await api.get("/advice");
                console.log('resonse', response);
                console.log('advice', response.data.slip.advice)
                setAdvices(response.data);

            } catch (e) { }
        };

        getData();

    }, []);

    if (!advices) {
        return "Cargando consejos..."
    }

    const handleNextAdvice = () => {
        const randomAdvice = async () => {
            const res = await api.get("/advice");
            setAdvices(res.data);
        }

        randomAdvice();

    }

    const handleFavoriteAdvice = () => {

        setListAdvices((prevState) => {
            const newAdvice = advices.slip.advice
            console.log('consejo nuevo', newAdvice)
            return [...prevState, newAdvice];
        })
    }


    return (
        <div>
            <div>
                <h2>Consejo del día</h2>
                <p>{advices.slip.advice}</p>
                <Button variant="contained" onClick={handleFavoriteAdvice}>Marcar como favorito</Button>
                <Button variant="contained" onClick={handleNextAdvice}>Siguiente consejo</Button>
            </div>
            <div>
                <h2>Consejos favoritos</h2>

                {listadvices}
                <Button variant="contained">Quitar de la lista</Button>
            </div>
        </div>
    );

};



export default ListAdvices;
