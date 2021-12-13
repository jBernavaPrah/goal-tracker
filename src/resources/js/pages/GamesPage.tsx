import {useNavigate} from "react-router-dom";
import {GameFieldsFragment, useListGamesQuery} from "@fe/generated/graphql";
import Typography from "@mui/material/Typography";
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Skeletons from "@fe/components/Skeletons";
import TitlePage from "@fe/components/TitlePage";
import CreateNewGameButton from "@fe/components/CreateNewGameButton";

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

    if (!data?.games?.data.length) return (
        <Grid container justifyContent={"center"}>
            <Typography variant={"overline"} align={"center"}>No Games found.</Typography>
        </Grid>
    )

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


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <TitlePage title={"Games"}/>
                </Grid>
                <Grid container justifyContent={"right"} sx={{mb: 2}}>
                    <CreateNewGameButton/>
                </Grid>
                <Grid item xs={12}>
                    <ListGames/>
                </Grid>

            </Grid>
        </>

    )
}
