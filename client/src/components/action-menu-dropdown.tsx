import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Query } from "../queries";
import { CreateCategoryModal } from "../ui/components/categories/create-category";
import { Category as CategoryType } from "../ui/components/categories/category-list";
import { Button } from "./ui/button";
import { useState } from "react";
export function ActionMenuDropdown({ item }: { item: CategoryType }) {
    const removeCatgegory = new Query().removeCategory;
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setIsModalOpen(!isModalOpen)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        removeCatgegory.mutate({ id: item.categoryId });
                    }} className="hover:text-red-500">
                        <Button variant="ghost" size={'sm'}>Delete</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >

            {isModalOpen && <CreateCategoryModal open={isModalOpen} category={item} mode="update" />
            }
        </>

    )
}