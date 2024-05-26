import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import ScrollToTop from "../components/UI/scroll/ScrollToTop";
import React from "react";

export default function Applayout() {
    return (
        <>
            <ScrollToTop/>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}