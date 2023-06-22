import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import HomePage from './pages/home';
import OptionPage from './pages/optionspage';
import MusicPreferences from './pages/musicpreferences';
import SelectPlaylistsPages from './pages/selectplaylists';
import TellOurAIPage from './pages/tellourai';
import StartSwipingPage from './pages/startswiping';

export default function App() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    // const location = useLocation()
    // alert(location)
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="options" element={<OptionPage />} />
                <Route path="musicpreferences" element={<MusicPreferences />} />
                <Route path="selectplaylists" element={<SelectPlaylistsPages />} />
                <Route path="tellourai" element={<TellOurAIPage />} />
                <Route path="startswiping" element={<StartSwipingPage />} />
                {/* <Route path="*" element={<NoPage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

