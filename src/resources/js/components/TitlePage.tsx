import React from "react"
import Typography from "@mui/material/Typography";
import {Divider, Grid} from "@mui/material";

interface TitlePageProps {
    title: string
    subtitle?: string
}

export default function TitlePage(props: TitlePageProps): JSX.Element {

    const {title, subtitle = ""} = props;

    return <Grid container justifyContent={"center"}>
        <Grid item>
            <Typography variant={"h2"} gutterBottom>{title}</Typography>
            {subtitle && <Typography variant={"subtitle1"} gutterBottom>{subtitle}</Typography>}
            <Divider sx={{mt: 1, mb: 4}}/>
        </Grid>
    </Grid>
}

