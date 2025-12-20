import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Rcsc from './pages/Rcsc'
import Moice from './pages/Moice'
import Mofaet from './pages/Mofae'
import Home from './pages/Home'

function App() {
  return (
    <>
    <h1>Welcome to the RAG Agent for Gov Agencies</h1>
      <BrowserRouter>
        <Routes>
          <Route path='' Component={<Home/>}></Route>
          <Route path='/rcsc' Component={<Rcsc/>}></Route>
          <Route path='/moice' Component={<Moice/>}></Route>
          <Route path='/mofaet' Component={<Mofaet/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
