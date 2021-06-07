import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
// import PoPular from "@/page/Populat";
// import Battle from "@/page/Battle/index"
// import Reacts from "@/page/Results/index"
// import Loading from "@/untils/lazy";
import Bundle from "@/untils/loadable";


export default function Router() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/popular/:select' component={Bundle(() => import("@/page/Populat/index"))} />
          <Route path='/battle' component={Bundle(() => import("@/page/Battle/index"))} />
          <Route path='/results' component={Bundle(() => import("@/page/Results/index"))} />
          <Redirect to='/popular/select=All' />
        </Switch>
      </HashRouter>
    )
}