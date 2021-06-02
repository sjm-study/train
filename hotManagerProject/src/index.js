import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PoPular from '@/page/Populat';
// import Battle from '@/page/Battle'
// import Results from '@/page/Results/index'
import { router } from '@/untils/router'
import Loading from '@/untils/lazy'

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.css'
import { hot } from 'react-hot-loader'
import 'antd/dist/antd.css'

import styles from './index.less'
const Index = (props) => {

    const [route, setRoute] = useState({ page: '', param: '' })
    const [theme, setTheme] = useState('light')

    const [battle, setBattle] = useState('')

    useEffect(() => {
        hashchange()

        window.addEventListener('hashchange', hashchange)

        return () => window.removeEventListener('hashchange', hashchange)
    }, [])

    const hashchange = () => {
        const route = router();
        setRoute(route)
    };

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <div className={theme === 'light' ? styles.light : styles.dark} style={{padding: '0 15px 0 15px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <div className={styles.menu}>
                    <a
                        href="#"
                        className={route.page === '' ? styles.active : ''}
                    >PoPular
                </a>
                    <a
                        href="#/battle"
                        className={route.page === 'battle' ? styles.active : ''}
                    >Battle
                </a>
                </div>
                <div>
                    <i className={'fa fa-exchange'} style={{ fontSize: 25, marginTop: 20 }} onClick={changeTheme}></i>
                </div>
            </div>

            {
                route.page === '' && <PoPular theme={theme} />
            }
            {
                route.page === 'battle' && <Loading load={() => import('@/page/Battle/index')}>
                    {(Com) => <Com />}
                </Loading>
            }
            {
                route.page === 'results' && <Loading load={() => import('@/page/Results/index')}>
                {(Com) => <Com />}
            </Loading>
            }

        </div>
    )

};

ReactDOM.render(<Index />, document.getElementById('root'));
