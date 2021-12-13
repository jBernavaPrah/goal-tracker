import {
    Grid,
} from "@mui/material";
import TableStatistics from "@fe/components/TableStatistics";


export default function StatisticsPage(): JSX.Element {

    return (
        <Grid container justifyContent={"center"}>
            <Grid item>
                <TableStatistics/>
            </Grid>
        </Grid>
    )
}
