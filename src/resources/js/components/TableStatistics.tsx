import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useStatisticsQuery} from "@fe/generated/graphql";
import CentredLoader from "@fe/components/CentredLoader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import CreateNewTeamButton from "@fe/components/CreateNewTeamButton";

export default function TableStatistics(): JSX.Element {

    const {data: {statistics = []} = {}, loading, refetch} = useStatisticsQuery({
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
    })

    if (loading) return <CentredLoader/>

    return (

        <Grid container>


            <Grid item>

                <TableContainer component={Paper}>
                    <Grid container sx={{pl: 2, pr: 2}} justifyContent={"space-between"}>
                        <Grid item>
                            <Typography variant={"overline"}>Current Statistics</Typography>
                        </Grid>
                        <Grid item>
                            <Button size={"small"} onClick={() => refetch()}>Refresh</Button>
                        </Grid>
                    </Grid>
                    <Table sx={{minWidth: 650}} aria-label="Statistics of Teams">
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

                            {!statistics.length && <>
                                <TableRow>
                                    <TableCell colSpan={7} align={"center"}>No Teams found..</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={7} align={"center"}>
                                        <CreateNewTeamButton size={"medium"}
                                                             variant={"text"}/></TableCell>
                                </TableRow>
                            </>
                            }

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
        </Grid>)

}
