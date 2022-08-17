import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'
import { monedas } from '../data/monedas'
import { useEffect, useState } from 'react'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Fomulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    
    const [moneda ,SelectMonedas] = useSelectMonedas({ label: "Elige tu Moneda" , opciones: monedas });
    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas({ label: "Elige tu Criptomoneda" , opciones: criptos});

    useEffect(() => {
        const consultarAPI = async () =>{
            const url= "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            
            const arrayCrytos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name, 
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto;
            })
            setCriptos(arrayCrytos);
        }
        consultarAPI();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes("")) {
            setError(true);
            return;
        }

        setError(false);
        setMonedas({
            moneda, 
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas/>
                <SelectCriptomonedas/>

                <InputSubmit 
                    type="submit" 
                    value="Cotizar" 
                />
            </form>
        </>
    )
}

export default Fomulario
