import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {RecoilRoot} from "recoil";
import {BrowserRouter as Router} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import apolloClient from '@fe/apollo'
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)


ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <Router>
                <RecoilRoot>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <App/>
                    </LocalizationProvider>
                </RecoilRoot>
            </Router>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
