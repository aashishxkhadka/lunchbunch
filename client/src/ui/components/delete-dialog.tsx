import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "../../components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
type Props = {
    onDelete: () => void;
}
export function DeleteDialog({ onDelete }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="danger"><Trash2 /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-sm rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
