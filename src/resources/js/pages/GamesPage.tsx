import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {GameFieldsFragment, useListGamesQuery} from "@fe/generated/graphql";
import Typography from "@mui/material/Typography";
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import NewGameDialog from "@fe/components/NewGameDialog";
import dayjs from "dayjs";
import Skeletons from "@fe/components/Skeletons";
import TitlePage from "@fe/components/TitlePage";

interface GameCardProps {
    game: GameFieldsFragment
}

function GameCard(props: GameCardProps): JSX.Element {
    const {game} = props
    const navigate = useNavigate()

    return (
        <Card>
            <CardHeader
                title={`${game.team1.name} VS ${game.team2.name}`}
                subheader={`Played ${dayjs(game.playedAt).fromNow()}`}
            />
            <CardContent>
                <Typography align={"center"}
                            variant={"h4"}>{game.totalGoalsTeam1 ?? 0} - {game.totalGoalsTeam2 ?? 0}</Typography>
            </CardContent>
            <CardActions>
                <Button size={"small"} onClick={() => navigate(`/games/${game.id}`)}
                >See Details</Button>
            </CardActions>
        </Card>
    )
}

function ListGames(): JSX.Element {

    const {data, loading} = useListGamesQuery()

    if (loading) return <Skeletons/>

    return (
        <Grid container justifyContent={"space-around"} spacing={3}>
            {data?.games?.data?.map((value, index) =>
                <Grid key={index} item xs={6} md={4}>
                    <GameCard game={value}/>
                </Grid>
            )}
        </Grid>

    )

}

export default function GamesPage(): JSX.Element {


    const [openNewGameDialog, setOpenNewGameDialog] = useState<boolean>(false)


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <TitlePage title={"Games"}/>
                </Grid>
                <Grid container justifyContent={"right"} sx={{mb: 2}}>
                    <Button onClick={() => setOpenNewGameDialog(true)} size={"small"}>Create Game</Button>
                </Grid>
                <Grid item xs={12}>
                    <ListGames/>
                </Grid>

            </Grid>
            <NewGameDialog open={openNewGameDialog} onClose={() => setOpenNewGameDialog(false)}/>
        </>

    )
}
