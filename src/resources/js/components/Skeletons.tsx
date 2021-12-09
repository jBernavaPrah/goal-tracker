import React from "react";
import {Grid, Skeleton, SkeletonProps} from "@mui/material";


interface SkeletonsProps extends SkeletonProps {
    quantity?: number
}

export default function Skeletons({quantity = 3, ...props}: SkeletonsProps): JSX.Element {
    return (
        <Grid container justifyContent={"space-around"} spacing={3}>
            {Array.from({length: quantity}, (_, k) => (
                <Grid key={k} item sm={6} md={4}>
                    <Skeleton variant={"rectangular"} height={118} {...props}/>
                </Grid>
            ))}</Grid>
    )
}
