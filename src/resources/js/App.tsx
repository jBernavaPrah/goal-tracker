import React from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import ErrorBoundary from "@fe/components/ErrorBoundary";
import HomePage from "@fe/pages/HomePage";
import GamePage from "@fe/pages/GamePage";
import GamesPage from "@fe/pages/GamesPage";
import TeamsPage from "@fe/pages/TeamsPage";
import {Container, createTheme, Paper, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline"
import Header from "@fe/components/Header";
import StatisticsPage from "@fe/pages/StatisticsPage";


const theme = createTheme()

function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Header title="Goal Tracker"/>
                <main>
                    <Paper sx={{p: 2, pb:4, mt:3, minHeight:"auto"}} elevation={2}>
                        <Outlet/>
                    </Paper>

                </main>
            </Container>
        </ThemeProvider>
    );
}

function App() {


    return (
        <ErrorBoundary>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={"games"} element={<Outlet/>}>
                        <Route index element={<GamesPage/>}/>
                        <Route path={":id"} element={<GamePage/>}/>
                    </Route>
                    <Route path={"teams"} element={<Outlet/>}>
                        <Route index element={<TeamsPage/>}/>
                        <Route path="*" element={<Navigate to={"/"}/>}/>
                    </Route>
                    <Route path={"statistics"} element={<StatisticsPage/>}/>
                </Route>
                <Route path="*" element={<Navigate to={"/"}/>}/>
            </Routes>
        </ErrorBoundary>
    );
}

export default App;
