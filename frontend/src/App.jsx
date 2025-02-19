import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import RealisationAdd from "./pages/RealisationAdd"

import NotFound from "./pages/NotFound"
import CreatePost from "./pages/CreatePost"
import Posts from "./components/Post"
import PostView from "./pages/PostView"
import Realisations from "./components/Realisations"
import RealisationList from "./pages/RealisationsList"
import Service from "./pages/Service"
import Login from "./components/Login"

import 'bootstrap/dist/css/bootstrap.min.css';
import PricePool from "./pages/PricePool"
import Contacts from "./pages/Contacts"
import ProtectedRoute from "./components/ProtectedRoute"
import FormToPDF from "./components/PDFForm"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/realisations/add" element={<ProtectedRoute><RealisationAdd /></ProtectedRoute>}/>
          <Route path="/realisations/:id/posts/add" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/realisations/:id/posts" element={<PostView/>}/>
          <Route path="realisations/list" element={<RealisationList/>}/>
          <Route path="services/:service" element={<Service/>}/>
          <Route path="/prices" element={<PricePool/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/404" element={<NotFound />} />
          <Route path="/login" element={<Login />}/>
          <Route path="form" element={<FormToPDF />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
