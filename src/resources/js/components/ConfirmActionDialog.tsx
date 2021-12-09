import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle} from "@mui/material";
import Button, {ButtonProps} from "@mui/material/Button";

export interface ConfirmationDialogRawProps extends DialogProps {
    onCancel: () => void,
    onOk: () => void,
    title?: string,
    content?: JSX.Element | string
    okButtonProps?: ButtonProps
    cancelButtonProps?: ButtonProps
}

export default function ConfirmationDialog({

                                               onCancel,
                                               onOk,
                                               title = "Confirm",
                                               content = "The action cannot be undone.",
                                               okButtonProps = {},
                                               cancelButtonProps = {},
                                               ...other
                                           }: ConfirmationDialogRawProps) {

    const {children: cancelText = "Cancel"} = cancelButtonProps;
    const {children: okText = "Ok"} = okButtonProps;

    return (
        <Dialog
            {...other}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {content}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onCancel} {...cancelButtonProps}>
                    {cancelText}
                </Button>
                <Button {...okButtonProps} onClick={onOk}>{okText}</Button>
            </DialogActions>
        </Dialog>
    );
}
