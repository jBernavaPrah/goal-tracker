import {Navigate, useParams} from "react-router-dom";
import {
    useDeleteGoalMutation,
    useGameDetailsQuery,
    useListPlayersByTeamQuery,
    useCreateGoalMutation,
    useListGoalsByGameAndTeamQuery,
    GameDetailsQuery,
    ListGoalsByGameAndTeamQuery
} from "@fe/generated/graphql";
import {Card, CardHeader, Chip, Divider, Grid,  Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import CentredLoader from "@fe/components/CentredLoader";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import {gql} from "@apollo/client";
import {DeepExtractTypeSkipArrays} from "ts-deep-extract-types";


interface DeleteGoalButtonProps {
    playerId: string
    gameId: string
}

function CreateGoalButton(props: DeleteGoalButtonProps): JSX.Element {

    const {playerId, gameId} = props

    const [createGoal, {loading: loadingCreateGoal}] = useCreateGoalMutation({
        update: (cache, result) => {

            if (!result.data?.createGoal) return;

            cache.updateFragment({
                    id: cache.identify(result.data?.createGoal.game),
                    fragment: gql`
                        fragment AAA on Game {
                            totalGoalsTeam1
                            totalGoalsTeam2
                        }
                    `
                },
                (data) => ({
                    ...data,
                    totalGoalsTeam1: result.data?.createGoal.game.totalGoalsTeam1,
                    totalGoalsTeam2: result.data?.createGoal.game.totalGoalsTeam2
                })
            )

            cache.modify({

                fields: {
                    goals(existings) {

                        return [
                            ...existings, result.data?.createGoal
                        ]
                    }
                }
            })

        }
    })

    return (
        <Button disabled={loadingCreateGoal} onClick={() => createGoal({
            variables: {
                player: playerId,
                game: gameId
            }
        })} variant="outlined" startIcon={<AddIcon/>}>
            Add Goal
        </Button>
    )
}

interface TeamDetailPlayersProps {
    game: DeepExtractTypeSkipArrays<GameDetailsQuery, ["game"]>
    team: DeepExtractTypeSkipArrays<GameDetailsQuery, ["game", "team1"]>
}

function TeamDetailPlayersList(props: TeamDetailPlayersProps) {
    const {team, game} = props

    const {data: {players} = {}, loading} = useListPlayersByTeamQuery({
        variables: {
            team: team.id
        }
    })


    if (loading || !players) return <CentredLoader/>

    return (
        <Stack spacing={2}>
            {players.data?.filter((player) => player.team.id === team.id)
                .map((value, index) =>
                <Card key={index}>
                    <CardHeader
                        action={
                            <CreateGoalButton playerId={value.id} gameId={game.id}/>
                        }
                        title={value.name}
                    />
                </Card>)}
        </Stack>
    )

}

interface TeamDetailProps {
    game: DeepExtractTypeSkipArrays<GameDetailsQuery, ["game"]>
    team: DeepExtractTypeSkipArrays<GameDetailsQuery, ["game", "team1"]>
}

function TeamDetail(props: TeamDetailProps): JSX.Element {
    const {team, game} = props


    return (
        <>
            <Typography variant={"h5"} align={"center"}>{team.name}</Typography>

            <Divider sx={{m: 2}}/>
            <GoalDetailsListGoals team={team} game={game}/>
            <Divider sx={{m: 2}}/>
            <TeamDetailPlayersList team={team} game={game}/>

        </>
    )
}

interface GoalChipProps {
    goal: DeepExtractTypeSkipArrays<ListGoalsByGameAndTeamQuery, ["goals"]>
    playerName: string
    createdAt: string
}

function GoalChip(props: GoalChipProps): JSX.Element {
    const {goal, playerName, createdAt} = props

    const [deleteGoal, {loading}] = useDeleteGoalMutation()
    if (loading) return <></>
    return (
        <Chip
            label={`${playerName} at ${dayjs(createdAt).format("HH:mm")}`}
            deleteIcon={<DeleteIcon/>}
            onDelete={() => deleteGoal({
                variables: {
                    id: goal.id
                },
                update: (cache, result) => {
                    if (!result.data?.deleteGoal) return;
                    cache.evict({id: cache.identify(result.data?.deleteGoal)})
                    cache.gc()

                    cache.updateFragment({
                            id: cache.identify(result.data?.deleteGoal.game),
                            fragment: gql`
                            fragment MyTodo on Game {
                              totalGoalsTeam1
                              totalGoalsTeam2
                            }
                          `
                        }, (data) => ({
                            ...data,
                            totalGoalsTeam1: result.data?.deleteGoal.game.totalGoalsTeam1,
                            totalGoalsTeam2: result.data?.deleteGoal.game.totalGoalsTeam2
                        })
                    );


                    //cache.updateFragment()

                }
            })}/>
    )
}

interface GameDetailsListGoals {
    game: DeepExtractTypeSkipArrays<GameDetailsQuery, ["game"]>
    team: DeepExtractTypeSkipArrays<GameDetailsQuery, ["game", "team1"]>
}

function GoalDetailsListGoals(props: GameDetailsListGoals): JSX.Element {

    const {game, team} = props

    const {data: {goals} = {}, loading} = useListGoalsByGameAndTeamQuery({
        variables: {
            game: game.id,
            team: team.id
        }
    })


    if (loading || !goals) return <></>

    return (
        <Grid container justifyContent={"center"} spacing={2}>
            {goals?.filter((goal) => goal.player.team.id === team.id).map((value, index) =>
                <Grid key={index} item>
                    <GoalChip goal={value} playerName={value.player.name}
                              createdAt={value.createdAt}/>
                </Grid>)}
        </Grid>
    )
}


export default function GamePage(): JSX.Element {

    const {id} = useParams<"id">()
    const {data: {game} = {}, loading} = useGameDetailsQuery({
        variables: {
            id: id ?? ''
        },
        skip: !id
    })

    if (loading) return <CentredLoader/>
    if (!game) return <Navigate to={"/"}/>

    if (!id) return <Navigate to={"/games"}/>

    return (
        <>
            <Grid container
                  justifyContent={"center"}
                  alignItems={"center"}>
                <Grid item>
                    <Typography variant={"h3"}
                                align={"center"}>{game.totalGoalsTeam1} - {game.totalGoalsTeam2}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <TeamDetail team={game?.team1} game={game}/>
                </Grid>
                <Grid item md={6}>
                    <TeamDetail team={game?.team2} game={game}/>
                </Grid>
            </Grid>

        </>
    )
}
