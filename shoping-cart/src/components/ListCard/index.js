import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { connect } from 'dva'
function Index(props) {
    const { data, dispatch } = props

    const deleteClick = () => {
        dispatch({
            type: 'cart/deleteCart',
            payload: {
                id: data.id
            }
        })
        dispatch({
            type: 'productList/addProductItem',
            payload: {
                data: data
            }
        })
    }

    return (
        <div style={{ display: 'flex', borderTop: '1px solid rgb(200,200,200)', padding: 8 }} >
            <div>
                <img src={require(`../../assets/img/${data.sku}_2.jpg`)} style={{ width: 100 }} />
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
                            <span style={{ color: '#eb1700', fontSize: 16, fontWeight: '600' }} >$ {parseFloat(data.quantitly * data.price).toFixed(2)}</span>
                        </div>
                        <span style={{ fontStyle: 'italic' }} >Quantitly: {data.quantitly}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default connect((cart) => ({
    cart
}))(Index)