import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "../hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

const baseUrl = import.meta.env.VITE_API_URL as string;

export function useUserLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["userLogin"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/login`, data);
      const token = response.data.token;
      // Save token to localStorage
      localStorage.setItem("token", token);
      console.log("Login successful and token saved:", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Logged in successfully!",
        variant: "success",
      });
      navigate({
        to: "/",
        replace: true,
      });
    },
    onError: () => {
      toast({
        title: "Failed to login",
        description: "Please check your email and password",
        variant: "destructive",
      });
    },
  });
}

export function useAdminLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["adminLogin"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/admin/login`, data);
      const user = { ...response.data, isAdmin: true };
      localStorage.setItem("user", JSON.stringify(user));
    },
    onSuccess: () => {
      toast({
        title: "Logged in successfully!",
        variant: "success",
      }),
        navigate({
          to: "/admin/dashboard",
          replace: true,
        });
    },
    onError: () => {
      toast({
        title: "Failed to login",
        description: "Please check your email and password",
        variant: "destructive",
      });
    },
  });
}

export function useUserRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["userRegister"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/register`, data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Account created successfully",
        variant: "success",
      });
      navigate({
        to: "/auth",
      });
    },
    onError: () => {
      toast({
        title: "Failed to create account",
        description: "User already exists.",
        variant: "destructive",
      });
    },
  });
}
export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/product`);
      return response;
    },
  });
}

export function useGetProductById(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/product/${id}`);
      return response;
    },
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/category`);
      return response;
    },
  });
}

export function useGetCategoryById(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/category/${id}`);
      return response;
    },
  });
}

export function useGetCartItems() {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/cart`);
      return response;
    },
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/product`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product added successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error adding product",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: async (data: any) => {
      const response = await axios.put(
        `${baseUrl}/product/${data.productId}`,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product updated successfully",
        variant: "success",
      });
    },
  });
}

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["removeProduct"],
    mutationFn: async ({ id }: { id: string }) => {
      const response = await axios.delete(`${baseUrl}/product/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product deleted successfully",
        variant: "success",
      });
    },
  });
};
export function useRemoveCartItem() {
  const queryClient = useQueryClient(); // Use queryClient hook

  return useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${baseUrl}/cart?cartId=${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] }); // Invalidate the cart items query
      toast({
        title: "Cart item removed successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to remove cart item",
        description: `Error: ${error.message || "Unknown error"}`,
        variant: "destructive",
      });
    },
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient(); // Use queryClient hook

  return useMutation({
    mutationKey: ["addCartItem"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/cart`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] }); // Invalidate the cart items query
      toast({
        title: "Cart item added successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add cart item",
        description: `Error: ${error.message || "Unknown error"}`,
        variant: "destructive",
      });
    },
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient(); // Use queryClient hook

  return useMutation({
    mutationKey: ["addCategory"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/category`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategories"] }); // Invalidate the categories query
      toast({
        title: "Category added successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add category",
        description: `Error: ${error.message || "Unknown error"}`,
        variant: "destructive",
      });
    },
  });
}

export function useRemoveCategory() {
  const queryClient = useQueryClient(); // Use queryClient hook

  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: async ({ id }: { id: string }) => {
      const response = await axios.delete(`${baseUrl}/category/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategories"] }); // Invalidate the categories query
      toast({
        title: "Category deleted successfully",
        description: "The category has been removed from the list.",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete category",
        description: `Error: ${error.message || "Unknown error"}`,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient(); // Use queryClient hook

  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: async (data: any) => {
      const response = await axios.put(
        `${baseUrl}/category/${data.catId}`,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategories"] }); // Invalidate the categories query
      toast({
        title: "Category updated successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update category",
        description: `Error: ${error.message || "Unknown error"}`,
        variant: "destructive",
      });
    },
  });
}

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/user`);
      return response;
    },
  });
}

export function useUserDeltete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async (data: any) => {
      const response = await axios.delete(`${baseUrl}/user/${data.userId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User removed",
        description: "User successfully removed from database.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete user",
        description: "Please check your email and password",
        variant: "destructive",
      });
    },
  });
}

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/user/${id}`);
      return response;
    },
  });
}

// Feedback
export function useGetFeedbacksByProductId(productId: string) {
  return useQuery({
    queryKey: ["feedback", productId],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/feedback/${productId}`);
      return response;
    },
  });
}

export function useGetFeedbackByUserId(userId: string) {
  return useQuery({
    queryKey: ["feedbackByUser", userId],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/feedback/user/${userId}`);
      return response;
    },
  });
}

export function useAddFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addFeedback"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/feedback`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      toast({
        title: "Feedback added successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to add feedback",
        description: "Something went wrong. Please try again!",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteFeedback"],
    mutationFn: async (feedbackId: string) => {
      const response = await axios.delete(`${baseUrl}/feedback/${feedbackId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedback", "feedbackByUser", "getAllFeedbacks"],
      });
      toast({
        title: "Feedback deleted successfully",
        variant: "success",
      });
    },
  });
}

export function useGetAllFeedbacks() {
  return useQuery({
    queryKey: ["getAllFeedbacks"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/feedback/`);
      return response;
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  return function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate({
      to: "/",
      replace: true,
    });
    toast({
      title: "Logged out successfully!",
      variant: "success",
    });
  };
}

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/order/all`);
      return response.data;
    },
  });
}

export function useGetOrderById(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/order/${id}`);
      return response.data;
    },
  });
}

export function useGetOrdersByUserId(id: string) {
  return useQuery({
    queryKey: ["ordersByUser", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/order/user/${id}`);
      return response.data;
    },
  });
}

export function useCreateOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createOrder"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/order`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Your order has been created successfully",
        variant: "success",
      });
      localStorage.setItem("cart", JSON.stringify([]));
      navigate({
        to: "/order-summary",
        replace: true,
      });
    },
    onError: () => {
      toast({
        title: "Failed to create order",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateOrder"],
    mutationFn: async (data: any) => {
      const response = await axios.put(
        `${baseUrl}/order/${data.orderId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Order status updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to update order status.",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: async (orderId: string) => {
      const response = await axios.delete(`${baseUrl}/order/${orderId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Your order has been cancelled",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Order cancellation failed.",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useGetProductsByCategoryId(categoryId: string) {
  return useQuery({
    queryKey: ["productsByCategory", categoryId],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/product/category/${categoryId}`
      );
      return response;
    },
  });
}

export function useGetAllNotifications() {
  return useQuery({
    queryKey: ["getAllNotifications"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/notifications/all`);
      return response;
    },
  });
}

export function useGetNotificationByUserId(userId: string) {
  return useMutation({
    mutationKey: ["notification", userId],
    mutationFn: async () => {
      const response = await axios.get(`${baseUrl}/notifications/${userId}`);
      return response;
    },
  });
}

export function useGetPromotionalNotifications() {
  return useQuery({
    queryKey: ["getPromotionalNotifications"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/notifications/promos`);
      return response;
    },
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createNotification"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/notifications`, data);
      return response;
    },
    // onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["getAllNotifications"] });
    //   toast({
    //     title: "Notification created successfully",
    //     variant: "success",
    //   });
    // },
    onError: () => {
      toast({
        title: "Failed to create notification",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useGetUserDetailsByUsername(username: string) {
  return useQuery({
    queryKey: ["get-user-details-by-username", username],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/userprofile/username/${username}`
      );
      return response.data;
    },
  });
}

export function useUpdateuserDetails() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-user-details"],
    mutationFn: async (data: any) => {
      const response = await axios.put(`${baseUrl}/userprofile/`, data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Profile successfully updated.",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-details-by-username"],
      });
    },
    onError: () => {
      toast({
        title: "Failed to update details.",
        description: "Error  updating details, please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useMakeUserProfile() {
  return useMutation({
    mutationKey: ["make-user-profile"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/userprofile/`, data);
      return response.data;
    },
  });
}
