import {
    ListPlayersByTeamQuery,
    useDeletePlayerMutation,
} from "@fe/generated/graphql";
import React, {useState} from "react";
import {Card, CardActions, CardContent, CardHeader, IconButton} from "@mui/material";
import {DeepExtractTypeSkipArrays} from "ts-deep-extract-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "@fe/components/ConfirmActionDialog";
import CentredLoader from "@fe/components/CentredLoader";
import UpdatePlayerButton from "@fe/components/UpdatePlayerButton";

interface PlayerCardProps {
    player: DeepExtractTypeSkipArrays<ListPlayersByTeamQuery, ["players", "data"]>
}

export default function PlayerInfo(props: PlayerCardProps): JSX.Element {
    const {player} = props
    const [deletePlayer, {loading: deletePlayerLoading}] = useDeletePlayerMutation({
        update: (cache, result) => {

            if (!result.data?.deletePlayer) {
                return;
            }

            cache.evict({id: cache.identify(result.data?.deletePlayer)})
            cache.gc()

        }
    });
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <Card>
                <CardHeader
                    action={
                        <IconButton aria-label="settings"
                                    disabled={deletePlayerLoading} size={"small"}
                                    onClick={() => setOpen(true)}>
                            <DeleteIcon/>
                        </IconButton>
                    }
                    title={player.name}
                />

                {deletePlayerLoading ?
                    <CardContent>
                        <CentredLoader/>
                    </CardContent>
                    : <CardContent>
                        Total Goals of the player: {player.goals?.paginatorInfo.total}
                    </CardContent>
                }
                <CardActions>
                    <UpdatePlayerButton player={player}/>
                </CardActions>
            </Card>
            <ConfirmationDialog
                okButtonProps={{
                    children: "Delete it"
                }}
                open={open}
                onCancel={() => setOpen(false)}
                onOk={async () => {
                    setOpen(false)
                    await deletePlayer({
                        variables: {
                            id: player.id
                        }
                    })
                }
                }/>
        </>
    )
}
