import {Autocomplete, AutocompleteProps, CircularProgress, TextField} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {useSearchAutocompleteTeamsLazyQuery} from "@fe/generated/graphql";
import throttle from "lodash/throttle";

interface AutocompleteTeamSelectProps extends Omit<AutocompleteProps<any, false, any, any>, "renderInput" | "onChange" | "options"> {
    onSelectedTeam: (team: string | null) => void
    disabledTeamId: string | null
    label: string
}

export default function AutocompleteTeamSelect(props: AutocompleteTeamSelectProps) {
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
