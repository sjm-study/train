import React, { useState, useEffect } from 'react';
import { Row, Col, Drawer, Select, message, Modal } from 'antd';
import Card from '../components/Card/index'
// import axios from 'axios'
import request from '../utils/request'
import ShopingCar from '../components/ShopingCar/index'
import ListCard from '../components/ListCard/index'
import { LoadingOutlined } from '@ant-design/icons'
import { connect } from 'dva'
import style from './App.css'
import getData from '../services/production'

const { Option } = Select;

function App(props) {
  const { productList, dispatch } = props

  const [sizeList, setSizeList] = useState([
    {
      name: 'XS',
      select: false
    },
    {
      name: 'S',
      select: false
    },
    {
      name: 'M',
      select: false
    },
    {
      name: 'ML',
      select: false
    },
    {
      name: 'L',
      select: false
    },
    {
      name: 'XL',
      select: false
    },
    {
      name: 'XXL',
      select: false
    },
  ])

  const [goodList, setGoodList] = useState([])
  const [visible, setVisible] = useState(false)
  const [temList, setTemList] = useState([])
  const [selectValue, setSelectValue] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (productList.length === 0) {
      console.log('123132')
     console.log(getData())
      getData().then(async res => {
        await dispatch({
          type: 'productList/addProduct',
          payload: {
            list: res.data.products
          }
        })
        setGoodList(res.data.products)
        // setTemList(res.data.products)
        setLoading(false)
      }).catch(error => {
        message.error('loading error', 10)
      })
    }

  }, [])

  // useEffect(() => {
  //   setGoodList(productList)
  // }, [productList])

  const changeprice = (value, list) => {
    setLoading(true)
    var p = list
    switch (value) {
      case 'moren':
      case '':
        setTimeout(async () => {
          setLoading(false)
          await dispatch({
            type: 'productList/defaultSort',
            payload: {
              list: p
            }
          })
          setGoodList([...productList])
        }, 1000);

        break;

      case 'hight':
        setTimeout(async () => {
          setLoading(false)
          await dispatch({
            type: 'productList/hightSort',
            payload: {
              list: p
            }
          })
          setGoodList([...productList])
        }, 1000);
        break;

      case 'low':
        setTimeout(async () => {
          setLoading(false)
          await dispatch({
            type: 'productList/lowSort',
            payload: {
              list: p
            }
          })
          setGoodList([...productList])
        }, 1000);
        break;

      default:
        break;
    }
    setSelectValue(value)
  }

  const changeData = (key) => {
    var arr = sizeList
    arr[key].select = !arr[key].select

    var list = JSON.parse(localStorage.products)

    var lastSelect = arr.filter(p => p.select)  // 选中的码数

    if (lastSelect.length === 0) {
      changeprice(selectValue, list)
    } else {
      var results = []
      for (let i = 0; i < lastSelect.length; i++) {
        if (i === 0) {
          console.log('第一次')
          results = list.filter(p => p.availableSizes.indexOf(lastSelect[i].name) > -1)
        } else {
          results = results.filter(p => p.availableSizes.indexOf(lastSelect[i].name) > -1)
        }
      }
      changeprice(selectValue, results)
    }
    setSizeList([...arr])
  }


  return (
    <div className={style.App}>
      {/* 购物车 */}
      <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
        <span onClick={() => setVisible(true)} style={{ position: 'relative' }}>
          <ShopingCar />
        </span>

      </div>


      <Row>
        {/* left */}
        <Col sm={4}>
          <p style={{ fontWeight: '600', fontSize: 20 }} >Sizes:</p>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
            {
              sizeList.map((item, index) => {
                return (
                  <div key={index} style={{
                    backgroundColor: item.select ? '#000' : 'rgb(243,243,243)', width: 50, height: 50, borderRadius: 10000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5
                  }} onClick={() => changeData(index)} >
                    <a style={{ color: !item.select ? '#000' : '#fff', fontSize: 16 }} >{item.name}</a>
                  </div>
                )
              })
            }
          </div>
        </Col>

        <Col sm={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 25 }} >
            <span>{productList.length} Product(s) found</span>
            <div>
              <span style={{ fontSize: 15 }} >Order by &nbsp;&nbsp;</span>
              <Select defaultValue="" style={{ width: 120 }} onChange={(value) => changeprice(value, productList)}>
                <Option value="moren">默认</Option>
                <Option value="hight">价格高到低</Option>
                <Option value="low">价格低到高</Option>
              </Select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
            {
              productList.map((item, index) => {
                return (
                  <Card goods={item} key={index} />
                )
              })
            }
          </div>
        </Col>
      </Row>
      <div style={{ position: 'absolute', top: '50%', margin: '0 auto', width: '100%', display: loading ? 'block' : 'none' }} >
        <div style={{ backgroundColor: '#6d6c6c', width: 100, height: 100, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
          <LoadingOutlined style={{ fontSize: 50, textAlign: 'center', display: 'block', color: 'white' }} />
        </div>

      </div>

      <Drawer
        title="Shoping Card"
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        width={450}
      >
        {
          props.cart.list.length > 0 ?
            <div style={{ paddingLeft: 5, paddingRight: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }} >
                <ShopingCar />
              </div>
              {/* list */}
              <div style={{ marginTop: 20 }}>
                {
                  props.cart.list.map((item, index) => {
                    return (
                      <ListCard data={item} key={index} />
                    )
                  })
                }
              </div>
              <div style={{ borderTop: '1px solid rgb(200,200,200)', paddingTop: 25, display: 'flex', justifyContent: 'space-between' }} >
                <span style={{ fontSize: 20, fontWeight: '600' }} >SUBTOTAL</span>
                <span style={{ color: '#eb1700', fontSize: 20, fontWeight: '600' }}>${props.cart.subtotal}</span>
              </div>
              <a style={{
                width: '100%', textAlign: 'center', display: 'block', paddingTop: 10, paddingBottom: 10,
                fontSize: 18, marginTop: 20, borderRadius: 6
              }} className={style.checktOUTButton} onClick={()=>setIsModalVisible(true)}>
                CHECKOUT
          </a>
            </div>
            :
            <div style={{ paddingLeft: 5, paddingRight: 5, flex: 1 }}>
              <p style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }} >No Data</p>
            </div>
        }


      </Drawer>

      <Modal title="CheckOut" visible={isModalVisible} onOk={() => {
        dispatch({
          type: 'cart/clearCart'
        })
        setIsModalVisible(false)
      }} onCancel={() => { setIsModalVisible(false) }} centered>
        <p style={{ fontWeight: 'bold', fontSize: 18 }} >Are you sure to checkout your orders?</p>
        <p style={{ fontWeight: 'bold', fontSize: 18 }} >Subtotal: ${props.cart.subtotal}</p>
      </Modal>

    </div>
  );
}

export default connect(({ cart, productList }) => ({
  cart: cart,
  productList: productList
}))(App)
