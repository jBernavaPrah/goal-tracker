import Button, {ButtonProps} from "@mui/material/Button";
import React, {useState} from "react";
import {TextField} from "@mui/material";
import ConfirmationDialog from "@fe/components/ConfirmActionDialog";
import {StatisticsDocument, useCreateTeamMutation} from "@fe/generated/graphql";
import {gql} from "@apollo/client";


export default function CreateNewTeamButton(props: ButtonProps = {}): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const {children = "Create New Team"} = props
    const [name, setName] = useState<string>("")

    const [createTeam, {loading}] = useCreateTeamMutation({
        refetchQueries:[StatisticsDocument],
        update: (cache, result) => {

            cache.modify({
                fields: {
                    teams(existing, {}) {

                        if (!result.data?.createTeam) return existing;

                        const ref = cache.writeFragment({
                            data: result.data?.createTeam,
                            fragment: gql`
                                fragment A on Team {
                                    id
                                }
                            `
                        })

                        return {
                            ...existing,
                            data: [
                                ...existing.data,
                                ref
                            ],
                            paginatorInfo: {
                                ...existing.paginatorInfo,
                                total: existing.paginatorInfo.total + 1
                            }
                        };
                    }
                }
            })
        }
    })

    const handleOk = async () => {
        await createTeam({
            variables: {
                name
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
            <Button {...props} onClick={() => setOpen(true)}>{children}</Button>
            <ConfirmationDialog
                maxWidth={"lg"}
                open={open}
                onOk={handleOk}
                onClose={handleCancel}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: !name || loading
                }}
                title={"Create New Team"}
                content={
                    <TextField label="Name of the team"
                               fullWidth
                               value={name}
                               onChange={(event) =>
                                   setName(event.target.value)}/>
                }

            />
        </>
    )
}
