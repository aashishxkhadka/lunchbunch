import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card } from "../../../components/ui/card";
import { DeleteDialog } from "../../components/delete-dialog";
import { useDeleteFeedback, useGetAllFeedbacks } from "../../../queries/queries";
import { feedbackType } from "../../pages/product/product-description";

export function FeedbackTable() {
    const feedbacks = useGetAllFeedbacks().data?.data;
    console.log('all feedbacks:', feedbacks)

    const removeFeedback = useDeleteFeedback();

    function handleDelete(id: string) {
        console.log("deleteing user ...")
        console.log("id", id)
        removeFeedback.mutate(id);
    }
    return (
        <>
            <Card className="p-4">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-2xl">Manage Reviews</h2>
                    </div>
                    <Table>
                        <TableCaption>A list of all registered users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SN</TableHead>
                                <TableHead>Review</TableHead>
                                <TableHead>Review Date</TableHead>
                                <TableHead>Reviewer</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feedbacks?.map((fb: feedbackType, index:number) => (
                                <TableRow key={fb.feedbackId}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{fb.comment}</TableCell>
                                    <TableCell className="font-medium">{new Date(fb.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{fb.user.username} <br/> {fb.user.email}</TableCell>
                                    <TableCell className="flex gap-4">
                                        <DeleteDialog onDelete={() => handleDelete(fb.feedbackId)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </>
    );
}
