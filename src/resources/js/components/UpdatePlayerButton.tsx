import React, {useEffect, useState} from "react";
import Button, {ButtonProps} from "@mui/material/Button";
import {Player, useUpdatePlayerNameMutation} from "@fe/generated/graphql";
import ConfirmationDialog from "@fe/components/ConfirmActionDialog";
import {TextField} from "@mui/material";

interface CreateNewPlayerButtonProps extends ButtonProps {
    player: Pick<Player, "id" | "name">
}

export default function UpdatePlayerButton({player, ...props}: CreateNewPlayerButtonProps): JSX.Element {
    const {children = "Update Player"} = props;

    const [name, setName] = useState<string>(player.name)
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setName(player.name)
    }, [player.name])

    const [updatePlayer] = useUpdatePlayerNameMutation({})

    const handleOk = async () => {
        await updatePlayer({
            variables: {
                id: player.id,
                name,

            }
        })
        setOpen(false)
    }

    const handleCancel = () => {

        setOpen(false)
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} {...props}>{children}</Button>
            <ConfirmationDialog
                maxWidth={"lg"}
                open={open}
                onOk={handleOk}
                onClose={handleCancel}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: !name
                }}
                title={"Update Player"}
                content={
                    <TextField label="Name"
                               fullWidth
                               value={name}
                               onChange={(event) =>
                                   setName(event.target.value)}/>
                }

            />
        </>


    )
}
