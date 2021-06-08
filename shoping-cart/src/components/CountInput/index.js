import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd'

export default function Index(props) {

    const { count, order } = props

    const [input, setInput] = useState(count)

    useEffect(() => {
        setInput(props.count)
    }, [props])

    const add = () => {
        if (order.total > input) {
            props.addClick(input + 1)
            setInput(pre => pre + 1)
        } else {
            props.addClick('false')
        }
    }

    const reduces = () => {
        if (input > 1) {
            props.reduceClick(input - 1)
            setInput(pre => pre - 1)
        } else {
            props.reduceClick('false')
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