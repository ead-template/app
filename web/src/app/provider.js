//provider.js
"use client";
import { Provider } from "react-redux";
import store  from "../store/store";
import InitServices from "@/app/InitServices";
import ThemeProvider from "@/theme/ThemeProvider";
import React from "react";

export function Providers({ children }) {
    return <Provider store={store}>
        <ThemeProvider>
            <InitServices />
            {children}
        </ThemeProvider>
    </Provider>;
}
