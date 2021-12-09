import React, {useState} from "react";
import Button, {ButtonProps} from "@mui/material/Button";
import {Team, useCreatePlayerMutation} from "@fe/generated/graphql";
import ConfirmationDialog from "@fe/components/ConfirmActionDialog";
import {TextField} from "@mui/material";
import {gql} from "@apollo/client";

interface CreateNewPlayerButtonProps extends ButtonProps {
    team: Pick<Team, "id">
}

export default function CreateNewPlayerButton({team, ...props}: CreateNewPlayerButtonProps): JSX.Element {
    const {children = "Add Player"} = props;

    const [name, setName] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const [createPlayer] = useCreatePlayerMutation({
        update: (cache, result) => {
            if (!result.data?.createPlayer) return;
            console.log(result.data?.createPlayer);

            cache.modify({
                fields: {
                    players(exists) {

                        if (!result.data?.createPlayer) return exists;

                        const ref = cache.writeFragment({
                            data: result.data?.createPlayer,
                            fragment: gql`
                                fragment aaa on Player {
                                    id
                                }`
                        })

                        return {
                            ...exists,
                            data: [...exists.data, ref]
                        };
                    }
                }
            })

        }
    })

    const handleOk = async () => {
        await createPlayer({
            variables: {
                name,
                team: team.id
            }
        })
        setName("")
        setOpen(false)
    }

    const handleCancel = () => {
        setName("")
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
                title={"Create New Player"}
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
