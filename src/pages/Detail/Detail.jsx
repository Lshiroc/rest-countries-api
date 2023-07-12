import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import style from './detail.module.scss';
import arrowLeft from './../../assets/icons/arrow-left.svg';

export default function Detail() {
    const [data, setData] = useState({});
    const [borders, setBorders] = useState([]);
    const { country } = useParams();
    
    const fetchCountry = async (country) => {
        const resp = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        const result = await resp.json();
        setData(result[0]);
    }

    const fetchBorders = async (borders) => {
        const resp = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders?.join(',')}`);
        const result = await resp.json();
        setBorders(result);
    }

    useEffect(() => {
        if(country) {
            fetchCountry(country);
        }
    }, [country])

    useEffect(() => {
        if(data?.borders) {
            fetchBorders(data?.borders);
        }
    }, [data])

    return (
        <main className={`sectionx ${style.main}`}>
            <div className={style.backBtn}>
                <div className={style.icon}>
                    <img src={arrowLeft} alt="Back" />
                </div>
                <div className={style.text}>Back</div>
            </div>
            <div className={style.content}>
                <div className={style.flag}>
                    <img src={data?.flags?.svg} alt={data?.name?.common} />
                </div>
                <div className={style.info}>
                    <h1 className={style.name}>{data?.name?.common}</h1>
                    <div className={style.infoText}>
                        <div className={style.text}><span>Native Name:</span> Belgie</div>
                        <div className={style.text}><span>Top Level Domain: </span> .be</div>
                        <div className={style.text}><span>Population: </span> 11.319.511</div>
                        <div className={style.text}><span>Currencies: </span> Euro</div>
                        <div className={style.text}><span>Region: </span> Europe</div>
                        <div className={style.text}><span>Languages: </span> Dutch, French, German</div>
                        <div className={style.text}><span>Sub Regions: </span> Western Europe</div>
                        <div className={style.text}><span>Capital: </span> Brussels</div>
                    </div>
                    <div className={style.borderCountries}>
                        <p className={style.text}>Border Countries: </p>
                        {
                            borders && borders?.map((country, index) => (
                                <Link key={index} to={`/${country?.name?.common}`} className={style.country}>{country?.name?.common}</Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
