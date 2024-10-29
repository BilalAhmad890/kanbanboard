import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDashboardContext } from "./DashboardContext";
import {ProfileForm} from "@/components/Dashboard/ProfileForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Loader2, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { del, put } from "@/lib/Api";
import Sidebar from "./Sidebar";
import ButtonLogOut from "./ButtonLogOut";
import { ProfileFormValues } from "@/lib/zod";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const ProfilePage = () => {
  const { user, isLoading } = useDashboardContext();
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    console.log(theme)
    setIsDarkMode(theme === "light");
  }, [theme]);


  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log(theme)
    setTheme(newTheme);
    setIsDarkMode(newTheme === "light");
  }
  const { handleLogout, isPending: isLoggingOut } = ButtonLogOut();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();
 
  const username = user?.userName;
const userEmail = user?.email
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (values: ProfileFormValues) => put("/update-profile", values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      const errorMessage = error.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage,{
        className: "text-red-400"
      });
  }
  });

  const { mutate: deleteAccount, isPending: isDeleting } = useMutation({
    mutationFn: () => del("/delete-user"),
    onSuccess: () => {
      toast.success("Account deleted successfully");
      navigate("/")
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="container w-full mx-auto py-10">
        <Card className="border-0 mt-10">
          <CardHeader>
            <CardTitle className="text-3xl tracking-normal">Profile Settings</CardTitle>
            <CardDescription>
              Manage your profile settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Profile Form */}
            <div className="space-y-4">
              <ProfileForm
                onSubmit={updateProfile}
                defaultValues={{ 
                  userName: username,
                  email: userEmail
                 }}
                isPending={isUpdating}
              />
            </div>

            {/* Theme Toggle */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Dark Theme</h3>
              <div className="flex items-center space-x-2 translate-y-1">
                <ModeToggle/>
              </div>
            </div>

            {/* Account Actions */}
            <div className="space-y-4">
              <div className="flex flex-col md:w-1/4 w-full md:space-x-5 md:flex-row space-y-5 md:space-y-0">
                {/* Logout Dialog */}
                <AlertDialog
                  open={showLogoutDialog}
                  onOpenChange={setShowLogoutDialog}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will need to login again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleLogout()}
                        disabled={isLoggingOut}
                      >
                        {isLoggingOut && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )} Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Delete Account Dialog */}
                <AlertDialog
                  open={showDeleteDialog}
                  onOpenChange={setShowDeleteDialog}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteAccount()}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isDeleting}
                      >
                        {isDeleting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )} Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
