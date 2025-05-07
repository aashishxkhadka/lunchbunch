import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "../../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { useForm } from "react-hook-form"
import { Textarea } from "../../../components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "../../../hooks/use-toast"
import { feedbackType } from "../../pages/product/product-description"
import { useAddFeedback } from "../../../queries/queries"

const reviewSchema = z.object({
  comment: z.string().min(10, "Review is too short. Try adding more details."),
});
export default function Feedbacks({ feedbacks, userId, productId }: { feedbacks: feedbackType[], userId: string, productId: string[] }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    }
  });
  const addFeedback = useAddFeedback();
  function onSubmit(data: any) {
    if (!userId || !productId[0]) {
      toast({
        title: "Error adding review.",
        description: "User must be logged in to leave a review.",
        variant: "destructive"
      })
      return;
    }
    addFeedback.mutate({ ...data, productId: productId[0], userId: userId });
  }

  console.error(errors)
  return (
    <Card className="container mx-auto  border-none shadow-none py-8">
      <Card className="border-none">
        <CardHeader className="mx-auto flex flex-row items-center justify-between">
          <CardTitle className="text-lg md:text-xl">Leave a review.</CardTitle>
        </CardHeader>
        <CardContent >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Textarea {...register("comment")} placeholder="Leave a nice comment." rows={5} />
            {errors.comment && <span className="text-red-500">{errors.comment.message} </span>}
            <div>
              <Button type="submit">Post Review</Button>
            </div>
          </form>
        </CardContent>

      </Card>
      <CardHeader className="mx-auto flex flex-row items-center justify-between">
        <CardTitle className="text-lg md:text-xl">Previous Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {feedbacks?.map((feedback) => (
          <div key={feedback?.feedbackId} className=" border p-2 rounded-lg mb-6 last:mb-0">
            <div className="flex items-center mb-2">
              <Avatar className="size-10 flex justify-center rounded-full mr-4 items-center border">
                <AvatarFallback>{feedback.user?.username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{feedback.user.username}</h3>
            </div>
            <p className="text-gray-600 mb-2">{feedback.comment}</p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsUp className="w-4 h-4 mr-2" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsDown className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}