import React from 'react'
import ShopingCarPng from '../../assets/shoping-cart.png'
import { connect } from 'dva'

function Index(props) {

    return (
        <span style={{ position: 'relative' }} >
            <img src={ShopingCarPng} style={{ width: 40, height: 40 }} alt={'img'} />
            <div style={{
                display:props.cart.list.length>0? 'flex': 'none', justifyContent: 'center', alignItems: 'center',
                borderRadius: 10000, backgroundColor: 'yellow', width: 28, height: 28,
                position: 'absolute', top: 14, right: -12
            }} >
                <span style={{ fontSize: 14, fontWeight: '600' }} >{props.cart.list.length}</span>
            </div>
        </span>
    )
}

export default connect(({ cart }) => ({
    cart
}))(Index)

// export default Index