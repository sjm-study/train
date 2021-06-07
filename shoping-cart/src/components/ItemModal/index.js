import React, { useState, useEffect } from 'react'
import { Modal, message, Radio, InputNumber } from 'antd'
import { connect } from 'dva'

function Index(props) {

    const { isModalVisible, updateIsModalVisible,dispatch,goods } = props

    // const [isModalVisible, setIsModalVisible] = useState(false)

    const [size, setSize] = useState('')
    const [sizeList, setSizeList] = useState()
    const [count, setAccount] = useState(0)
    const [total, setTotal] = useState(0)

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
                var p = {
                    value: el.availableSizes,
                    label: el.availableSizes,
                    disabled: false
                }
                results.push(p)
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
            await dispatch({
                type: 'cart/addCart',
                payload: data
            })
            updateIsModalVisible(false)

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

    return (
        <Modal title="Basic Modal" visible={isModalVisible} onOk={addCart} onCancel={() => { updateIsModalVisible(false) }} destroyOnClose='true' >
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
    )
}

export default connect((cart) => ({
    cart: cart.state
}))(Index)