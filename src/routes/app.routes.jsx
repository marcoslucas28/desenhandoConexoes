import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { Draw } from '../pages/Draw'

export function AppRoutes(){
    return(
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/draw' element={<Draw />} />
            </Routes>
    )
}