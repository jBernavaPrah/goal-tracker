import React from "react";
import {CircularProgress, CircularProgressProps, Grid} from "@mui/material";

export default function CentredLoader(props: CircularProgressProps): JSX.Element {

    return (
        <Grid container justifyContent="center"
              alignItems="center">
            <Grid item>
                <CircularProgress {...props}/>
            </Grid>
        </Grid>
    )
}
