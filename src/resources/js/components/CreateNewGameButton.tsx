import Button, {ButtonProps} from "@mui/material/Button";
import React, {useState} from "react";
import {Alert, AlertTitle, CircularProgress, Grid} from "@mui/material";
import ConfirmationDialog from "@fe/components/ConfirmActionDialog";
import {
    ListGamesDocument,
    useCreateGameMutation, useListTeamsQuery
} from "@fe/generated/graphql";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import AutocompleteTeamSelect from "@fe/components/AutocompleteTeamSelect";


export default function CreateNewGameButton(props: ButtonProps = {}): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const {children = "Create New Game"} = props


    const navigate = useNavigate()
    const [team1, setTeam1] = useState<string | null>(null)
    const [team2, setTeam2] = useState<string | null>(null)

    const [createGame, {loading: loadingCreateGame}] = useCreateGameMutation({
        refetchQueries: [
            ListGamesDocument
        ]
    })

    const {data, loading} = useListTeamsQuery({
        variables: {
            withPlayers: true
        }
    })

    const hasEnoughTeams = (data?.teams?.paginatorInfo?.total ?? 0) >= 2;

    const handleOk = async () => {
        if (!team1 || !team2) return;
        const game = await createGame({
            variables: {
                team1: team1,
                team2: team2,
                playedAt: new Date()
            }
        })

        handleCancel()

        navigate(`/games/${game.data?.createGame.id}`)
    }

    const handleCancel = () => {
        setTeam1(null)
        setTeam2(null)
        setOpen(false)
    }

    return (
        <>
            <Button {...props} onClick={() => setOpen(true)}>{children}</Button>
            <ConfirmationDialog
                maxWidth={"lg"}
                fullWidth={true}
                open={open}
                onOk={handleOk}
                onClose={handleCancel}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: !(!!team1 && !!team2 && !loadingCreateGame)
                }}
                title={"Create New Game"}
                content={
                    <>
                        {loading ?
                            <Grid container justifyContent={"center"} alignContent={"center"}>
                                <Grid item>
                                    <CircularProgress color="inherit" size={20}/>
                                </Grid>
                            </Grid> : !hasEnoughTeams ? <Alert sx={{mb: 3, ml: 1, mr: 1}} severity="warning">
                                    <AlertTitle>Ops...</AlertTitle>
                                    Create at least two teams or be sure to add at least one player to each team — <Button
                                    variant={"text"}
                                    onClick={() => navigate("/teams")}>Go to Teams page</Button>
                                </Alert> :
                                <Grid container justifyContent={"space-between"} alignContent={"center"}>
                                    <Grid item md={5} xs={12}>
                                        <AutocompleteTeamSelect
                                            disabled={!hasEnoughTeams}
                                            onSelectedTeam={(team) => setTeam1(team)}
                                            disabledTeamId={team2}
                                            label={"Select Team 1"}/>
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        <Typography
                                            align={"center"}
                                            variant={"h3"}
                                            gutterBottom>VS</Typography>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <AutocompleteTeamSelect
                                            disabled={!hasEnoughTeams}
                                            onSelectedTeam={(team) => setTeam2(team)}
                                            disabledTeamId={team1}
                                            label={"Select Team 2"}/>
                                    </Grid>
                                </Grid>
                        }
                    </>
                }

            />
        </>
    )
}
