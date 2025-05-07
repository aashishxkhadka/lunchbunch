import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card } from "../../../components/ui/card";
import { CreateCategoryModal } from "./create-category";
import { useGetCategories, useRemoveCategory } from "../../../queries/queries";
import { DeleteDialog } from "../../components/delete-dialog";

export type Category = {
    categoryId: string;
    name: string;
    description: string
}

export function CategoryTable() {
    const categories = useGetCategories().data?.data as Category[];
    const removeCategory = useRemoveCategory();
    function handleDelete(id: string) {
        removeCategory.mutate({ id });
    }
    return (
        <>
            <Card className="p-4">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <h2 className="font-bold  text-2xl">Manage Categories</h2>
                        <CreateCategoryModal />
                    </div>
                    <Table>
                        <TableCaption>A list of categories. Lunch .</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories?.map((cat) => (
                                <TableRow key={cat.categoryId}>
                                    <TableCell className="font-medium">{cat.name}</TableCell>
                                    <TableCell>{cat.description}</TableCell>
                                    <TableCell className="flex gap-4">
                                        <CreateCategoryModal category={cat} mode="update" />
                                        <DeleteDialog onDelete={() => handleDelete(cat.categoryId)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </>
    )
}

