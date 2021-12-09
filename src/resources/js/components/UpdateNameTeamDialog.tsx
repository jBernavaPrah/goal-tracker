import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {
    Dialog, DialogActions,
    DialogContent, DialogProps,
    DialogTitle,
    TextField
} from "@mui/material";
import {
    useUpdateTeamMutation
} from "@fe/generated/graphql";

interface NewPlayerDialog {
    open: DialogProps['open']
    onClose: () => void
    teamId: string
    currentName: string
}

export default function UpdateNameTeamDialog(props: NewPlayerDialog): JSX.Element {

    const {open, onClose, teamId, currentName} = props

    const [name, setName] = useState<string>(currentName)
    const [updateTeam] = useUpdateTeamMutation()

    useEffect(() => {
        setName(currentName)
    }, [currentName])

    const canChange = !name;

    const handleClose = () => {
        setName("")
        onClose()
    };

    const handleSubmit = async () => {

        await updateTeam({
            variables: {
                name,
                id: teamId
            }
        })

        handleClose()
    }

    return (
        <React.Fragment>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change team name</DialogTitle>
                <DialogContent>
                    <TextField label="Name"
                               variant="standard"
                               value={name}
                               onChange={(event) => setName(event.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={canChange} onClick={handleSubmit}>Change</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

}
