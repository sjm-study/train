import React, { useState, useEffect } from 'react'
// import Imge1 from '@/assents/img/10547961582846888_1.jpg'
import styles from './index.css'
import { connect } from 'dva'


function Index(props) {

    const { goods, dispatch } = props


    const changeNumber = (number) => {
        var p = parseFloat(number).toFixed(2)
        return p
    }

    const addCart =  () => {
        var data = goods
        data.quantitly = 1
         dispatch({
            type: 'cart/addCart',
            payload: data
        })
         dispatch({
            type: 'productList/deleteProduct',
            payload: { id: data.id }
        })
    }


    return (
        <div className={styles.cardWrapper} >
            {/* <img src={changeImgUrl().default} style={{ width: 220}} /> */}
            <img src={require(`../../assets/img/${goods.sku}_1.jpg`)} style={{ width: 220 }} />
            <p style={{ marginTop: 10, fontSize: 15, height: 46, textAlign: 'center', marginBottom: 0 }} >{goods.title}</p>
            <div style={{ width: 30, height: 2, backgroundColor: 'rgb(240, 211, 98)' }} ></div>
            <span style={{ fontSize: 14 }}>{goods.currencyFormat}
                <span style={{ fontSize: 20, fontWeight: 'bold' }} >{changeNumber(goods.price).split('.')[0]}</span>
                <span>.{changeNumber(goods.price).split('.')[1]}</span>
            </span>
            <span style={{ color: '#888', fontStyle: 'italic' }}>
                or {goods.installments} x $1.21
            </span>
            <a className={styles.addCradButton} onClick={addCart}>
                Add to cart
            </a>
        </div>
    )
}


export default connect((cart) => ({
    cart: cart.state
}))(Index)