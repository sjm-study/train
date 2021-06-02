import React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'

import PoPular from '@/page/Populat';
import Battle from '@/page/Battle'
import Results from '@/page/Results/index'
import Index from '@/page/index'

export default function route() {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' component={Index} />
                {/* <Route path='/' component={PoPular} /> */}
                {/* <Route path='/battle' component={Battle} /> */}
                <Route path='/results' component={Results} />
                {/* <Redirect path='/' /> */}
            </Switch>
        </HashRouter>
    )
}