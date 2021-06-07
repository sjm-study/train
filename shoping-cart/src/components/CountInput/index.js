import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd'

export default function Index(props) {

    const { count, order } = props

    const [input, setInput] = useState(count)

    useEffect(()=> {
        setInput(props.count)
    }, [props])

    const add = () => {
        var p = 0
        for (let i = 0; i < order.quantitly.length; i++) {
            const element = order.quantitly[i];
            if (element.availableSizes === order.order.availableSizes) {
                p = element.quantitly
                break
            }
        }
        if (p + order.order.quantitly > input) {
            props.addClick(input + 1)
            setInput(pre => pre + 1)
        }
    }

    const reduces = () => {
        if (input > 1) {
            props.reduceClick(input - 1)
            setInput(pre => pre - 1)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }} >
            <Button style={{ textAlign: 'center', width: 42 }} onClick={add} >+</Button>
            <Input style={{ width: 70, textAlign: 'center' }} value={input} />
            <Button style={{ textAlign: 'center', width: 42 }} onClick={reduces} >-</Button>
        </div>
    )
}