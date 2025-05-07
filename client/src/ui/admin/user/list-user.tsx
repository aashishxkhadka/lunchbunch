import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card } from "../../../components/ui/card";
import { DeleteDialog } from "../../components/delete-dialog";
import { useGetUsers, useUserDeltete } from "../../../queries/queries";

export type User = {
    userId: string;
    username: string;
    dateOfBirth: string;
    email: string;
    role: string;
};

export function UserTable() {
    const users = useGetUsers()?.data?.data as User[];
    console.log("users detals", users)


    const removeUser = useUserDeltete();

    function handleDelete(id: string) {
        console.log("deleteing user ...")
        console.log("id", id)
        removeUser.mutate({userId: id});
    }
return (
        <>
            <Card className="p-4">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-2xl">Manage Users</h2>
                    </div>
                    <Table>
                        <TableCaption>A list of all registered users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                {/* <TableHead>Date of Birth</TableHead> */}
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users ? users?.map((user) => (
                                <TableRow key={user.userId}>
                                    <TableCell className="font-medium">{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    {/* <TableCell>{user.dateOfBirth}</TableCell> */}
                                    <TableCell className="flex gap-4">
                                        <DeleteDialog onDelete={() => handleDelete(user.userId)} />
                                    </TableCell>
                                </TableRow>
                            )): <>No users.</>}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </>
    );
}
