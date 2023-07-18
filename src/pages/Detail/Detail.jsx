import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import style from './detail.module.scss';
import arrowLeft from './../../assets/icons/arrow-left.svg';
import arrowLeftLight from './../../assets/icons/arrow-left-light.svg';

export default function Detail() {
    const [data, setData] = useState({});
    const [borders, setBorders] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { country } = useParams();
    const navigate = useNavigate();
    const theme = useSelector(state => state.statesReducer.theme) || localStorage.getItem("theme") || "light";

    const back = () => {
        navigate(-1);
    }

    const fetchCountry = async (country) => {
        // setImageLoaded(false);
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
        <main className={`sectionx ${style.main} ${imageLoaded && style.loaded} ${theme == "dark" && style.dark}`}>
            <div className={style.backBtn} onClick={() => back()}>
                <div className={style.icon}>
                    {
                        theme == "dark" ? (
                            <img src={arrowLeftLight} alt="Back" />
                        ) : (
                            <img src={arrowLeft} alt="Back" />
                        )
                    }
                </div>
                <div className={style.text}>Back</div>
            </div>
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.flag}>
                        <img src={data?.flags?.svg} onLoad={() => setImageLoaded(true)} alt={data?.name?.common} />
                    </div>
                    <div className={style.info}>
                        <h1 className={style.name}>{data?.name?.common}</h1>
                        <div className={style.infoText}>
                            <div className={style.column}>
                                <div className={style.text}><span>Native Name:</span> {data?.name?.nativeName ? Object.values(data?.name?.nativeName)[0]?.common : data?.name?.common}</div>
                                <div className={style.text}><span>Region: </span> {data?.region}</div>
                                <div className={style.text}><span>Languages: </span> {
                                    data?.languages && Object.values(data?.languages).join(', ')
                                }</div>
                                <div className={style.text}><span>Sub Regions: </span> {data?.subregion}</div>
                                <div className={style.text}><span>Capital: </span> {data?.capital && Object.values(data?.capital)[0]}</div>
                            </div>
                            <div className={style.column}>
                                <div className={style.text}><span>Top Level Domain: </span> {data?.tld && data?.tld[0]}</div>
                                <div className={style.text}><span>Population: </span> {data?.population && (new Intl.NumberFormat().format(data?.population)).replaceAll(',', '.')}</div>
                                <div className={style.text}><span>Currencies: </span> {
                                    data?.currencies && Object.values(data?.currencies)?.map((currency) => (
                                        currency.name
                                    ))
                                }</div>
                            </div>
                        </div>
                        {borders.length > 0 && (
                            <div className={style.borderCountries}>
                                <p className={style.text}>Border Countries: </p>
                                {
                                    borders && borders?.map((country, index) => (
                                        <Link key={index} to={`/${country?.name?.common}`} className={style.country}>{country?.name?.common}</Link>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
                {/* <div className={style.loadingTemplate}>
                    <div className={style.flag}>
                        <div className={style.loadBox}></div>
                    </div>
                    <div className={style.info}>
                        <div className={style.title}>
                            <div className={style.loadBox}></div>
                        </div>
                        <div className={style.infoBox}>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                            <div className={style.infoLine}>
                                <div className={style.loadBox}></div>
                            </div>
                        </div>
                        <div className={style.borders}>
                            <div className={style.loadBox}></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </main>
    )
}
