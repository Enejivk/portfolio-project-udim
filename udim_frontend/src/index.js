/** @format */

import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'
import {GoogleOAuthProvider} from '@react-oauth/google'
import {AuthContext} from './apiAndContext/AuthContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {GroupProvider} from './apiAndContext'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <GoogleOAuthProvider clientId="718769441824-8tmhu9230sbc299k96ul29kg5kvnrtat.apps.googleusercontent.com">
        <BrowserRouter>
            <AuthContext>
                <GroupProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </GroupProvider>
            </AuthContext>
        </BrowserRouter>
    </GoogleOAuthProvider>
)
