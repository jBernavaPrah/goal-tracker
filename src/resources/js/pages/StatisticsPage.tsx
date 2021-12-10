import {
    useStatisticsQuery
} from "@fe/generated/graphql";
import {
    Grid,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";
import CentredLoader from "@fe/components/CentredLoader";
import Button from "@mui/material/Button";


export default function StatisticsPage(): JSX.Element {

    const {data: {statistics = []} = {}, loading, refetch} = useStatisticsQuery({
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
    })

    if (loading) return <CentredLoader/>

    return (
        <Grid container justifyContent={"center"}>
            <Grid item>
                <Grid container justifyContent={"right"}>
                    <Button size={"small"} onClick={() => refetch()}>Refresh</Button>
                </Grid>

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Player Team</TableCell>
                                <TableCell align="right">Wins</TableCell>
                                <TableCell align="right">Losses</TableCell>
                                <TableCell align="right">Ratio</TableCell>
                                <TableCell align="right">Goals For</TableCell>
                                <TableCell align="right">Goals Against</TableCell>
                                <TableCell align="right">Goals Difference</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {!statistics.length && <TableRow>
                                <TableCell rowSpan={7}>No Teams found..</TableCell>
                            </TableRow>}

                            {statistics?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.wins}</TableCell>
                                    <TableCell align="right">{row.losses}</TableCell>
                                    <TableCell align="right">{row.ratio}</TableCell>
                                    <TableCell align="right">{row.goalsFor}</TableCell>
                                    <TableCell align="right">{row.goalsAgainst}</TableCell>
                                    <TableCell align="right">{row.goalDifference}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>


        </Grid>
    )
}
