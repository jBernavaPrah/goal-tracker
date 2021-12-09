import React, {useState} from "react";
import Button, {ButtonProps} from "@mui/material/Button";
import {
    ListTeamsQuery, TeamDetailQuery, useDeleteTeamMutation, useListPlayersByTeamQuery,
    useListTeamsQuery
} from "@fe/generated/graphql";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Alert,
    AlertTitle,
    Card,
    CardActions,
    CardContent, CardHeader,
    Grid, IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Skeletons from "@fe/components/Skeletons";
import TitlePage from "@fe/components/TitlePage";
import {DeepExtractTypeSkipArrays} from "ts-deep-extract-types";
import CreateNewPlayerButton from "@fe/components/CreateNewPlayerButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayerInfo from "@fe/components/PlayerInfo";
import UpdateNameTeamDialog from "@fe/components/UpdateNameTeamDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "@fe/components/ConfirmActionDialog";
import CreateNewTeamButton from "@fe/components/CreateNewTeamButton";


interface TeamDetailsPlayerListProps {
    team: DeepExtractTypeSkipArrays<TeamDetailQuery, ["team"]>
}

function TeamDetailsPlayerList(props: TeamDetailsPlayerListProps): JSX.Element {

    const {team} = props

    const {data: {players} = {}, loading} = useListPlayersByTeamQuery({
        variables: {
            team: team.id
        }
    })

    if (loading) return <Skeletons height={50}/>

    return (

        <Accordion variant={"outlined"}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Players</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <Grid container justifyContent={"right"} sx={{mb: 2}}>
                    <CreateNewPlayerButton
                        size={"small"}
                        team={team}/>
                </Grid>

                <Grid container spacing={2}>
                    {players?.data?.filter((player) => player?.team.id === team.id).map((value, index) => (
                        <Grid key={index} item xs={12} md={6}>
                            <PlayerInfo player={value}/>
                        </Grid>
                    ))}

                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}

type TeamCardProps = {
    team: DeepExtractTypeSkipArrays<ListTeamsQuery, ["teams", "data"]>
}

function TeamCard(props: TeamCardProps): JSX.Element {
    const {team} = props

    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
    const [deleteTeam, {loading: loadingDeleteTeam}] = useDeleteTeamMutation({
        update: (cache, result) => {
            if (!result.data?.deleteTeam) return;
            cache.evict({
                id: cache.identify(result.data?.deleteTeam)
            })
            cache.gc()
        }
    })
    const handleConfirmationOk = async () => {
        setOpenConfirmation(false)
        await deleteTeam({
            variables: {
                id: team.id
            }
        })
    }

    return (
        <><Card>
            <CardHeader
                action={
                    <IconButton aria-label="settings"
                                disabled={loadingDeleteTeam} size={"small"}
                                onClick={() => setOpenConfirmation(true)}>
                        <DeleteIcon/>
                    </IconButton>
                }
                title={team.name}
            />
            <CardContent>

                <TeamDetailsPlayerList team={team}/>

            </CardContent>
            <CardActions>
                <UpdateTeamNameButton currentName={team.name} teamId={team.id}/>
            </CardActions>
        </Card>
            <ConfirmationDialog
                open={openConfirmation}
                onCancel={() => setOpenConfirmation(false)}
                onOk={handleConfirmationOk}
                content={
                    <>
                        <Typography variant={"body1"}>
                            This action will delete all players and all games played related to this team.
                        </Typography>
                        <Typography variant={"subtitle2"}>This action cannot be undone.</Typography>
                    </>
                }
            />

        </>


    )
}


function ListTeamContainer(): JSX.Element {

    // TODO: implement the paginator
    const {data: {teams} = {}, loading} = useListTeamsQuery()

    if (loading) return <Skeletons/>

    if (!teams?.data) return <Grid container>
        <Grid item>
            <Grid container justifyContent={"center"}>
                <Alert severity={"warning"} elevation={2}
                       action={
                           <CreateNewTeamButton color={"inherit"} size={"small"}>
                               Create new team</CreateNewTeamButton>
                       }
                >
                    <AlertTitle>No Teams found..</AlertTitle>
                </Alert>
            </Grid>
        </Grid>
    </Grid>

    return (
        <Grid container>
            <Grid item xs={12} sx={{mb: 2}}>
                <Grid container justifyContent={"right"}>
                    <CreateNewTeamButton/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {teams?.data?.map((value, index) => (
                    <Grid sm={12} md={6} key={index} item>
                        <TeamCard team={value}/>
                    </Grid>))}
            </Grid>
        </Grid>

    )
}


interface UpdateTeamNameButtonProps extends ButtonProps {
    teamId: string
    currentName: string
}

function UpdateTeamNameButton({teamId, currentName, ...props}: UpdateTeamNameButtonProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const {children = "Update Name"} = props
    return (
        <>
            <Button {...props} onClick={() => setOpen(true)}>{children}</Button>
            <UpdateNameTeamDialog currentName={currentName} teamId={teamId} open={open} onClose={() => setOpen(false)}/>
        </>
    )
}

export default function TeamsPage(): JSX.Element {

    return (
        <Grid container>
            <Grid item xs={12} sx={{mb: 2}}>
                <TitlePage title={"Teams"}/>
            </Grid>
            <Grid sx={{mb: 2}} item xs={12}>
                <ListTeamContainer/>
            </Grid>
        </Grid>

    )
}
