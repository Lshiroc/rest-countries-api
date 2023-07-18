import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from './../../Store/statesReducer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import style from './home.module.scss';
import searchIcon from './../../assets/icons/search.svg';
import searchLightIcon from './../../assets/icons/search-light.svg';
import arrowDownIcon from './../../assets/icons/arrow-down.svg';
import arrowDownLightIcon from './../../assets/icons/arrow-down-light.svg';
import axios from 'axios';

export default function Home() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [currentTheme, setCurrentTheme] = useState(null);
    const theme = localStorage.getItem("theme") || "light";
    const themed = useSelector(state => state.statesReducer.theme);
    let cancelToken;

    const fetchData = async () => {
        const resp = await fetch('https://restcountries.com/v3.1/all');
        let data = await resp.json();
        let sortedData =  data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setData(sortedData);
        setShowData(sortedData);
    }

    const fetchRegion = async (region) => {
        if(region == "all") {
            setShowData(data);
        } else {
            const resp = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            let data = await resp.json();
            let sortedData =  data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            setShowData(data);
        }
    }

    const searchCountry = async (country) => {
        if(country.length == 0) {
            setShowData(data);
            return false;
        }

        if(typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Canceling the previous request");
        }
        
        try {
            cancelToken = axios.CancelToken.source();
            const result = await axios.get(
                `https://restcountries.com/v3.1/name/${country}`,
                {cancelToken: cancelToken.token}
            );
            setShowData(result.data);
        } catch(err) {
            console.error(err);
            setShowData([]);
        }

    }
    
    useEffect(() => {
        let thm = localStorage.getItem("theme") || "light";
        if(thm == "dark") {
            setCurrentTheme("dark");
        } else {
            setCurrentTheme("light");
        }

        fetchData();
    }, [])

    return (
        <main className={`sectionx ${style.main} ${themed && themed == "dark" ? style.dark : theme == "dark" && style.dark}`}>
            <Helmet>
                <title>Countries - REST API</title>
            </Helmet>
            <div className={style.sortElements}>
                <div className={style.search}>
                    <div className={style.icon}>
                        {
                            themed == "dark" ? (
                                <img src={searchLightIcon} alt="Search" />
                            ) : (
                                <img src={searchIcon} alt="Search" />
                            )
                        }
                    </div>
                    <input type="text" name="search" onChange={(e) => searchCountry(e.target.value)} placeholder='Search for a country...' autoComplete='false' />
                </div>
                <div className={`${style.filter} ${isFilterOpen && style.open}`} onClick={() => setIsFilterOpen(prevVal => !prevVal)}>
                    <div className={style.current}>
                        <div className={style.text}>Filter by Region</div>
                        <div className={style.icon}>
                            {
                                themed == "dark" ? (
                                    <img src={arrowDownLightIcon} draggable="false" alt="Open" />
                                ) : (
                                    <img src={arrowDownIcon} draggable="false" alt="Open" />
                                )
                            }
                        </div>
                    </div>
                    <div className={style.options} onClick={(e) => e.stopPropagation()}>
                        <div className={style.option} onClick={() => {setIsFilterOpen(false); fetchRegion('all')}}>All</div>
                        <div className={style.option} onClick={() => {setIsFilterOpen(false); fetchRegion('africa')}}>Africa</div>
                        <div className={style.option} onClick={() => {setIsFilterOpen(false); fetchRegion('america')}}>America</div>
                        <div className={style.option} onClick={() => {setIsFilterOpen(false); fetchRegion('asia')}}>Asia</div>
                        <div className={style.option} onClick={() => {setIsFilterOpen(false); fetchRegion('europe')}}>Europe</div>
                        <div className={style.option} onClick={() => {setIsFilterOpen(false); fetchRegion('oceania')}}>Oceania</div>                        
                    </div>
                </div>
            </div>
            <div className={style.content}>
                {
                    showData.map((country, index) => (
                        <Link to={`/${country.name.common}`} key={index} className={style.country}>
                            <div className={style.flag}>
                                <img src={`${country.flags["png"]}`} draggable="false" alt={`The flag of ${country.name.common}`} />
                            </div>
                            <div className={style.info}>
                                <div className={style.name}>{country.name.common}</div>
                                <div className={style.text}><span>Population: </span>{country?.population && (new Intl.NumberFormat().format(country?.population)).replaceAll(',', '.')}</div>
                                <div className={style.text}><span>Region: </span>{country.region}</div>
                                <div className={style.text}><span>Capital: </span>{country.capital}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </main>
    )
}
