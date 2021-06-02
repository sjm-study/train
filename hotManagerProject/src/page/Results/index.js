import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Alert } from 'antd'
import { router } from '@/untils/router'

import styles from './index.less'


function Index() {
    const [playOne, setPlayOne] = useState({})
    const [playTwo, setPlayTwo] = useState({})

    const [error, setError] = useState(false)

    const [text,setText] = useState('')

    useEffect(() => {
        const route = router()
        // console.log(route.query)
        // var p = window.location.href
        // var play1 = p.split('play1=')[1] && p.split('play1=')[1].split('&')[0]
        // var play2 = p.split('play2=')[1]
        if (route.query.play1 && route.query.play2) {
            axios.get(`https://api.github.com/users/${route.query.play1}`).then(res => {
                setPlayOne(res.data)
            }).catch(error => { 
                setError(true) 
                setText('API rate limit')
            })
            axios.get(`https://api.github.com/users/${route.query.play2}`).then(res => setPlayTwo(res.data)).catch(error => { setText('API rate limit'), setError(true) })
        } else {
            // window.location.href = '#/battlel'
            setError(true)
            setText('url error')
        }
    }, [])

    const changeNumber = (number) => {
        return (number || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }

    const Results = (num1, num2) => {
        if (num1 > num2) {
            return 'Winner'
        } else if (num1 < num2) {
            return 'Loser'
        } else {
            return 'Draw'
        }
    }


    return (
        <div>

            {
                !error ?
                    <Row className={styles.warpper} >
                        <Col style={{ width: '100%', padding: '10px 5px', maxWidth: 400 }} sm={12} xs={12}  >
                            <div className={styles.inner} >
                                <span style={{ fontWeight: '500', fontSize: 18, display: 'block', marginBottom: 10 }} >{Results(playOne.public_repos, playTwo.public_repos)}</span>
                                <div>
                                    <img src={playOne.avatar_url} alt="avatar_url" style={{ width: 110, height: 'auto' }} />
                                </div>
                                <span style={{ color: '#000', fontSize: 15, margin: '10px 0', display: 'block', fontWeight: '600' }} >Scores: {playOne.public_repos}</span>
                                <span style={{ color: '#1890ff', fontSize: 18, margin: '10px 0', display: 'block', fontWeight: '600' }} >{playOne.name}</span>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-user' style={{ color: 'rgb(255,191,116)', marginLeft: 2, }}></span>
                                        <span style={{ fontSize: 14, fontWeight: '600', marginLeft: 8 }} >{playOne.location}</span>
                                    </div>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-star' style={{ color: 'rgb(255,215,0)' }}></span>
                                        <span style={{ fontSize: 14, marginLeft: 5 }} >{changeNumber(playOne.followers)}</span>
                                    </div>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-share-alt fa-rotate-270' style={{ color: 'rgb(147,201,242)' }}></span>
                                        <span style={{ fontSize: 14, marginLeft: 7 }} >{changeNumber(playOne.following)}</span>
                                    </div>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-warning' style={{ color: 'rgb(240,144,151)' }}></span>
                                        <span style={{ fontSize: 14, marginLeft: 5 }} >{changeNumber(playOne.public_repos)}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: '100%', padding: '10px 5px', maxWidth: 400 }} sm={12} xs={12}>
                            <div className={styles.inner} > 
                                <span style={{ fontWeight: '500', fontSize: 18, display: 'block', marginBottom: 10 }} >{Results(playTwo.public_repos, playOne.public_repos)}</span>
                                <div>
                                    <img src={playTwo.avatar_url} alt="avatar_url" style={{ width: 110, height: 'auto' }} />
                                </div>
                                <span style={{ color: '#000', fontSize: 15, margin: '10px 0', display: 'block', fontWeight: '600' }} >Scores: {playTwo.public_repos}</span>
                                <span style={{ color: '#1890ff', fontSize: 18, margin: '10px 0', display: 'block', fontWeight: '600' }} >{playTwo.name}</span>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-user' style={{ color: 'rgb(255,191,116)', marginLeft: 2, }}></span>
                                        <span style={{ fontSize: 14, fontWeight: '600', marginLeft: 8 }} >{playTwo.location}</span>
                                    </div>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-star' style={{ color: 'rgb(255,215,0)' }}></span>
                                        <span style={{ fontSize: 14, marginLeft: 5 }} >{changeNumber(playTwo.followers)}</span>
                                    </div>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-share-alt fa-rotate-270' style={{ color: 'rgb(147,201,242)' }}></span>
                                        <span style={{ fontSize: 14, marginLeft: 7 }} >{changeNumber(playTwo.following)}</span>
                                    </div>
                                    <div style={{ width: '70%', textAlign: 'left' }}>
                                        <span className='fa fa-warning' style={{ color: 'rgb(240,144,151)' }}></span>
                                        <span style={{ fontSize: 14, marginLeft: 5 }} >{changeNumber(playTwo.public_repos)}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Alert
                        message={text}
                        type="error"
                        closable
                        style={{ marginTop:20 }}
                    />
            }



            <div style={{ width: '100%', justifyContent: 'center', marginTop: 50, display: 'flex' }}>
                <button style={{ fontSize: 18, width: 200, paddingTop: 8, paddingBottom: 8, }}
                    onClick={() => { window.location.href = `#/battle` }}
                >Reset</button>
            </div>

        </div>
    )
}

export default Index