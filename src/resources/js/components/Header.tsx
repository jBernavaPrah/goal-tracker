import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

interface HeaderProps {
    title: string;
}

export default function Header(props: HeaderProps) {
    const {title} = props;

    return (
        <>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>

                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto', mt:2}}>
                <Button component={Link} variant={"contained"} size="large" to={"/games"}>Games</Button>
                <Button component={Link} variant={"contained"} size="large" to={"/teams"}>Teams</Button>
                <Button component={Link} variant={"contained"} size="large" to={"/statistics"}>Statistics</Button>

            </Toolbar>

        </>
    );
}
