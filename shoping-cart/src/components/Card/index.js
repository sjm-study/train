import React, { useState, useEffect } from 'react'
// import Imge1 from '@/assents/img/10547961582846888_1.jpg'
import styles from './index.css'
import { connect } from 'dva'
import { Radio, Modal, InputNumber, message } from 'antd'


function Index(props) {

    const { goods, dispatch } = props

    const [isModalVisible, setIsModalVisible] = useState(false)

    const [size, setSize] = useState('')
    const [sizeList, setSizeList] = useState()
    const [count, setAccount] = useState(0)
    const [total, setTotal] = useState(0)


    const changeNumber = (number) => {
        var p = parseFloat(number).toFixed(2)
        return p
    }

    useEffect(() => {
        var results = []
        goods.quantitly.forEach(el => {
            if (el.quantitly === 0) {
                var p = {
                    value: el.availableSizes,
                    label: el.availableSizes,
                    disabled: true
                }
                results.push(p)
            } else {
                var pp = {
                    value: el.availableSizes,
                    label: el.availableSizes,
                    disabled: false
                }
                results.push(pp)
            }
        })
        setSizeList(results)
    }, [])

    const addCart = async () => {
        if (count && size.length > 0) {
            var data = goods
            data.order = {
                availableSizes: size,
                quantitly: count
            }
            await dispatch({
                type: 'productList/deleteProduct',
                payload: data
            })
            for (let i = 0; i < data.quantitly.length; i++) {
                const element = data.quantitly[i];
                if (element.availableSizes === size) {
                    data.total = data.quantitly[i].quantitly + count
                }
            }
            console.log('data')
            console.log(data)
            // delete data.quantitly
            await dispatch({
                type: 'cart/addCart',
                payload: data
            })

            setIsModalVisible(false)

        } else {
            message.error('Please choose size and quantity!', 5)
        }
    }

    const changeSize = (e) => {
        var list = goods.quantitly
        for (let i = 0; i < list.length; i++) {
            console.log('xunhuan')
            const element = list[i];
            if (element.availableSizes === e.target.value) {

                setTotal(element.quantitly)
                break
            }
        }
        setSize(e.target.value)
    }

    const showModal = () => {
        var list = goods.quantitly
        setTotal(list[0].quantitly)
        var results = []
        goods.quantitly.forEach(el => {
            if (el.quantitly === 0) {
                var p = {
                    value: el.availableSizes,
                    label: el.availableSizes,
                    disabled: true
                }
                results.push(p)
            } else {
                var pp = {
                    value: el.availableSizes,
                    label: el.availableSizes,
                    disabled: false
                }
                results.push(pp)
            }
        })
        setSizeList(results)
        setSize(list[0].availableSizes)
        setIsModalVisible(true)
    }


    return (
        <div className={styles.cardWrapper} >
            {/* <img src={changeImgUrl().default} style={{ width: 220}} /> */}
            <img src={require(`../../assets/img/${goods.sku}_1.jpg`)} style={{ width: 220 }} alt={'img'} />
            <p style={{ marginTop: 10, fontSize: 15, height: 46, textAlign: 'center', marginBottom: 0 }} >{goods.title}</p>
            <div style={{ width: 30, height: 2, backgroundColor: 'rgb(240, 211, 98)' }} ></div>
            <span style={{ fontSize: 14 }}>{goods.currencyFormat}
                <span style={{ fontSize: 20, fontWeight: 'bold' }} >{changeNumber(goods.price).split('.')[0]}</span>
                <span>.{changeNumber(goods.price).split('.')[1]}</span>
            </span>
            <span style={{ color: '#888', fontStyle: 'italic' }}>
                or {goods.installments} x $1.21
            </span>
            <a className={styles.addCradButton} onClick={showModal}>
                Add to cart
            </a>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={addCart} onCancel={() => { setIsModalVisible(false) }} destroyOnClose={true} >
                <div>
                    <div style={{ display: 'flex' }} >
                        <span style={{ fontSize: 20, marginRight: 30 }} >Size</span>
                        <Radio.Group
                            options={sizeList}
                            onChange={(e) => { changeSize(e) }}
                            value={size}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: 20 }}>
                        <span style={{ fontSize: 20, marginRight: 10 }} >Count</span>
                        <InputNumber min={0} max={total} defaultValue={0} onChange={e => setAccount(e)} />
                        <span style={{ fontSize: 15, marginTop: 5, marginLeft: 13 }} >Surplus: {total}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default connect((cart) => ({
    cart: cart.state
}))(Index)