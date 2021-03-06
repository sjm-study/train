import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { connect } from 'dva'
import CountInput from '../CountInput/index'
function Index(props) {
    const { data, dispatch } = props

    const deleteClick = () => {
        dispatch({
            type: 'cart/deleteCart',
            payload: data
        })
        dispatch({
            type: 'productList/addProductItem',
            payload: data
        })
    }

    const addItem = async (count) => {
        if (count === 'false') {
            // var p = data
            // p.order.quantitly++
            // console.log('到高了')
            // await dispatch({
            //     type: 'productList/ProductCountToHigh',
            //     payload: p
            // })
        } else {
            var p = data
            p.order.quantitly++
            await dispatch({
                type: 'cart/changeCount',
                payload: p
            })
            // var array = productList
            // for (let j = 0; j < array.length; j++) {
            //     const element = array[j];
            //     if (element.id === p.id) {
            //         element.quantitly = p.quantitly
            //         break
            //     }
            // }
            await dispatch({
                type: 'productList/changeProductCount',
                payload: p
            })

        }
    }

    const reduceItem = (count) => {
        if (count === 'false') {

        } else {
            var p = data
            p.order.quantitly--
            dispatch({
                type: 'cart/changeCount',
                payload: p
            })
            // var array = productList
            // for (let j = 0; j < array.length; j++) {
            //     const element = array[j];
            //     if (element.id === p.id) {
            //         element.quantitly = p.quantitly
            //         break
            //     }
            // }
            dispatch({
                type: 'productList/changeProductCount',
                payload: p
            })

        }
    }

    return (
        <div style={{ display: 'flex', borderTop: '1px solid rgb(200,200,200)', padding: 8 }} >
            <div>
                <img src={require(`../../assets/img/${data.sku}_2.jpg`)} style={{ width: 100 }} alt={'img'} />
            </div>
            <div style={{ marginLeft: 10 }} >
                <div >
                    <a onClick={deleteClick}>
                        <CloseOutlined style={{ fontSize: 20, marginLeft: 245 }} />
                    </a>
                    <div>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: 18 }}>{data.name}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <span style={{ fontStyle: 'italic' }} >$ | {data.style}</span>
                            <span style={{ color: '#eb1700', fontSize: 16, fontWeight: '600' }} >$ {parseFloat(data.order.quantitly * data.price).toFixed(2)}</span>
                        </div>
                        <span style={{ fontStyle: 'italic' }} >Quantitly: {data.order.availableSizes} x {data.order.quantitly}</span>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <CountInput count={data.order.quantitly} addClick={count => addItem(count)} reduceClick={count => reduceItem(count)}
                                order={data}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default connect(({ cart, productList }) => ({
    cart,
    productList: productList
}))(Index)