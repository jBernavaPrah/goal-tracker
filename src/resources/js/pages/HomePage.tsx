import React from "react"
import {Grid} from "@mui/material";
import StatisticsContainer from "@fe/containers/StatisticsContainer";

export default function HomePage(): JSX.Element {
    return (
        <>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item>
                    <StatisticsContainer/>
                </Grid>
            </Grid>


        </>
    )
}
