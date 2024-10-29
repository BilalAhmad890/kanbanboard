import { Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card"; // Adjust the path as needed
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginDto } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link} from "react-router-dom";
import {post} from '@/lib/Api';
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { formattedDate } from "@/lib/formattedDate";
import { useState } from "react";
import ErrorMessage from "@/lib/error-message";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from "@/lib/isUser";


// Define a type for the fields
type Field = {
  name: | 'email' | 'password';
  label: string;
  type: | 'email' | 'password';
};

// Define the fields you want in the form
const fields: Field[] = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const LoginForm: React.FC = () => {
  const [globalError, setGlobalError] = useState<string>("");
  const navigate = useNavigate();
  const { refetch } = useIsAuthenticated();
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginDto) => post('/login', values),
    onSuccess: async () => {
        const authData = await refetch(); 

        if (authData && authData.data?.isAuthenticated ){
        toast("Signed in successfully!", {
            description: formattedDate,
            duration: 2500,
            dismissible: true,
            className: "font-semibold"
        });
        navigate("/dashboard");
      } else {
        toast("Authentication failed. Please try again.", {
            description: formattedDate,
            duration: 2500,
            dismissible: true,
            className: "text-red-400",
        });
    }
    },
    onError: (error: any) => {
      
      if (error.errors) {
        
        const errorMessage = error.errors[0].description;
        setGlobalError(errorMessage);  
      } else if (typeof error === 'string') {
       
        setGlobalError(error);
      } else {
        setGlobalError("An unexpected error occurred. Please try again.");
      }
    },
  });

  const onSubmit = async (values:LoginDto) => {
    mutate(values);
  };

  return (
    <Card className="md:w-[550px] w-[450px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardDescription className="mb-5 ml-6">
        <p>Login to access the dashboard</p>
      </CardDescription>
      <CardContent>
      {globalError && <ErrorMessage error={globalError} />}
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map(({ name, label, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter your ${label.toLowerCase()}`} type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <p className="text-sm tracking-wide">Dont have an account?<span className="font-semibold text-blue-400"> <Link to="/register"> Register </Link></span></p>
            <Button type="submit" className="w-full text-md font-bold">
                {isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )}Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
