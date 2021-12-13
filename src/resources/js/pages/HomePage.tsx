import React from "react"
import {Grid} from "@mui/material";
import TableStatistics from "@fe/components/TableStatistics";
import Typography from "@mui/material/Typography";

export default function HomePage(): JSX.Element {


    return (
        <>
            <Grid container justifyContent={"center"}>
                <Grid item>
                    <Typography variant={"h4"}>Welcome to Goal Tracker</Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent={"center"} sx={{mt:2}}>
                <Grid item>
                    <TableStatistics/>
                </Grid>
            </Grid>


        </>
    )
}
