import React, {useCallback, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import throttle from 'lodash/throttle';
import {
    Alert, AlertTitle,
    Autocomplete,
    AutocompleteProps,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent, DialogProps,
    DialogTitle, Grid,
    TextField
} from "@mui/material";
import {
    ListGamesDocument,
    useCreateGameMutation,
    useListTeamsQuery, useSearchAutocompleteTeamsLazyQuery
} from "@fe/generated/graphql";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

interface AutocompleteTeamSelectProps extends Omit<AutocompleteProps<any, false, any, any>, "renderInput" | "onChange" | "options"> {
    onSelectedTeam: (team: string | null) => void
    disabledTeamId: string | null
    label: string
}

function AutocompleteTeamSelect(props: AutocompleteTeamSelectProps) {
    const {label, onSelectedTeam, disabledTeamId, disabled, ...p} = props
    const [value, setValue] = useState<any | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [initialLoad, setInitialLoad] = useState<boolean>(false)

    const [search, {loading, data}] = useSearchAutocompleteTeamsLazyQuery()
    const throttler = useCallback(throttle(search, 350), []);

    useEffect(() => {
        (async () => {
            if (!initialLoad || !disabled) {
                await search({
                    variables: {withPlayers: true}
                })
                setInitialLoad(true)
            }
        })();

    }, [initialLoad])

    useEffect(() => {
        if (!inputValue || inputValue === value?.name) return;
        throttler({variables: {name: `%${inputValue}%`, withPlayers: true}})

    }, [inputValue])

    return (
        <Autocomplete
            {...p}
            disabled={disabled}
            loading={loading}
            options={data?.teams?.data ?? []}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionDisabled={option => disabledTeamId ? disabledTeamId === option.id : false}
            getOptionLabel={(option) => option.name}
            onChange={(event: any, newValue) => {
                if (typeof newValue == "string") return;
                setValue(newValue);
                onSelectedTeam(newValue?.id ?? null)
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            //filterOptions={(x) => x}
            //autoComplete
            //autoHighlight
            //includeInputInList
            //filterSelectedOptions
            noOptionsText={"Search the team"}
            value={value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {(loading ?? false) ?
                                    <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}

interface NewGameDialog {
    open: DialogProps['open']
    onClose: () => void
}

export default function NewGameDialog(props: NewGameDialog): JSX.Element {

    const {open, onClose} = props

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
    const hasEnoughTeams = (data?.teams?.paginatorInfo?.total ?? 3) >= 2;
    const canAdd = !!team1 && !!team2 && !loadingCreateGame;

    const handleClose = () => {
        setTeam1(null)
        setTeam2(null)
        onClose()
    };

    const handleSubmit = async () => {

        if (!team1 || !team2) return;

        const game = await createGame({
            variables: {
                team1: team1,
                team2: team2,
                playedAt: new Date()
            }
        })

        handleClose()

        navigate(`/games/${game.data?.createGame.id}`)

    }

    return (
        <React.Fragment>

            <Dialog fullWidth={true}
                    maxWidth={"lg"}
                    open={open}
                    onClose={(event, reason) =>
                        (reason !== 'backdropClick' ? handleClose() : null)}>

                <DialogTitle>Add new game</DialogTitle>
                <DialogContent>
                    {loading &&
                    <Grid container justifyContent={"center"} alignContent={"center"}>
                        <Grid item>
                            <CircularProgress color="inherit" size={20}/>
                        </Grid>
                    </Grid>}

                    {!hasEnoughTeams ? <Alert sx={{mb: 3, ml: 1, mr: 1}} severity="warning">
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


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!canAdd} onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

}
