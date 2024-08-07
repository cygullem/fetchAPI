import { Routes, Route } from "react-router-dom";
import ViewClient from "./ViewClient";
import App from "./App";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/client/:clientId" element={<ViewClient />} />
        </Routes>
    );
}

export default AppRoutes;