import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { DialogHeader } from "../../../components/ui/dialog";
import { Edit2, PlusCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useAddProduct, useGetCategories, useUpdateProduct } from "../../../queries/queries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Category } from "../../admin/categories/category-list";

type ProductProps = {
    mode?: string;
    product?: {
        productId: string;
        name: string;
        imageUrl: string;
        description: string;
        brand: string;
        volume: number;
        abv: number;
        categoryId?: string;
        price: number;
        stockQuantity: number;
    };
    open?: boolean;
};

// Define Zod schema for validation
const productSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    imageUrl: z.string().url({ message: "Invalid URL format" }),
    description: z.string().min(1, { message: "Description is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    volume: z.number().min(1, { message: "Volume must be greater than 0" }),
    abv: z.number().min(0,{ message: "Kcal must be between number" }),
    categoryId: z.string().min(0),
    price: z.number().min(0, { message: "Price must be a positive number" }),
    stockQuantity: z.number().min(1, { message: "Stock Quantity must be at least 1" }),
});

export function CreateProductModal({ product, mode, open }: ProductProps) {
    const categories = useGetCategories().data?.data;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: mode ? product?.name : "",
            imageUrl: mode ? product?.imageUrl : "",
            description: mode ? product?.description : "",
            brand: mode ? product?.brand : "",
            volume: mode ? product?.volume : 0,
            abv: mode ? product?.abv : 0,
            categoryId: mode ? product?.categoryId : "",
            price: mode ? product?.price : 0,
            stockQuantity: mode ? product?.stockQuantity : 1
        }
    });

    const createProduct = useAddProduct();
    const updateProduct = useUpdateProduct();

    function handleFormSubmit(data: any) {
        console.log('errors: ', errors)
        console.log('data', data)
        const productId = product?.productId;
        mode ? updateProduct.mutate({ productId, ...data }) :
            createProduct.mutate(data);
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                {mode ? (
                    <Button variant={'secondary'} size={'sm'}>
                        <Edit2 />
                    </Button>
                ) : (
                    <Button>
                        Add New <PlusCircle className="ml-2" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="min-w-[900px]">
                <DialogHeader>
                    <DialogTitle>{mode ? "Update Product Details" : "Add New Product"}</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-2 gap-4">
                            {/* General Information */}
                            <fieldset className="border p-4 col-span-2 grid grid-cols-2 gap-4">
                                <legend className="col-span-2 font-semibold">General Information</legend>
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input {...register("name")} type="text" name="name" />
                                    {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                                </div>
                                <div>
                                    <Label htmlFor="imageUrl">Image URL</Label>
                                    <Input {...register("imageUrl")} type="text" name="imageUrl" />
                                    {errors.imageUrl && <span className="text-red-600">{errors.imageUrl.message}</span>}
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea {...register("description")} name="description" rows={4} />
                                    {errors.description && <span className="text-red-600">{errors.description.message}</span>}
                                </div>
                            </fieldset>

                            {/* Brand Details */}
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <fieldset className="border p-4 grid grid-cols-2  gap-4">
                                    <legend className="col-span-2 font-semibold">Brand Details</legend>
                                    <div className="col-span-2">
                                        <Label htmlFor="brand">Brand</Label>
                                        <Input {...register("brand")} type="text" name="brand" />
                                        {errors.brand && <span className="text-red-600">{errors.brand.message}</span>}
                                    </div>
                                </fieldset>
                                <fieldset className="border p-4 grid grid-cols-2 gap-4">
                                    <legend className="col-span-2 font-semibold">Category</legend>
                                    <div className="col-span-2">
                                        <Label htmlFor="categoryId">Category</Label>
                                        <Select onValueChange={(value) => setValue("categoryId", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories?.map((category: Category) => (
                                                    <SelectItem key={category?.categoryId} value={category?.categoryId}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.categoryId && <span className="text-red-600">{errors.categoryId.message}</span>}
                                    </div>
                                </fieldset>

                            </div>

                            {/* Product Specifications */}
                            <fieldset className="border p-4 col-span-2 grid grid-cols-2 gap-4">
                                <legend className="col-span-2 font-semibold">Product Specifications</legend>
                                <div>
                                    <Label htmlFor="volume">Volume</Label>
                                    <Input {...register("volume", { valueAsNumber: true })} type="number" name="volume" />
                                    {errors.volume && <span className="text-red-600">{errors.volume.message}</span>}
                                </div>
                                <div>
                                    <Label htmlFor="abv">Kcal (Calories)</Label>
                                    <Input {...register("abv", { valueAsNumber: true })} type="number" name="abv" />
                                    {errors.abv && <span className="text-red-600">{errors.abv.message}</span>}
                                </div>
                            </fieldset>

                            {/* Category */}

                            {/* Pricing & Inventory - Full Width */}
                            <fieldset className="border p-4 col-span-2 grid grid-cols-2 gap-4">
                                <legend className="col-span-2 font-semibold">Pricing & Inventory</legend>
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input {...register("price", { valueAsNumber: true })} type="number" name="price" />
                                    {errors.price && <span className="text-red-600">{errors.price.message}</span>}
                                </div>
                                <div>
                                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                                    <Input {...register("stockQuantity", { valueAsNumber: true })} type="number" name="stockQuantity" />
                                    {errors.stockQuantity && <span className="text-red-600">{errors.stockQuantity.message}</span>}
                                </div>
                            </fieldset>

                            {/* Submit Button - Full Width */}
                            <div className="col-span-2 flex justify-end mt-4">
                                <Button type="submit">{mode ? "Update" : "Create"}</Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    );
}
