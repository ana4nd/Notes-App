import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, EyeOff, Ghost, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const {setUser} = getData();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:3000/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/");
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen md:h-[760px] bg-green-100 overflow-hidden">
      <div className="min-h-screen flex flex-col to-muted/20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full flex flex-col items-center justify-center max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-green-600">
                Login Your Account
              </h1>
              <p className="text-gray-600">
                Start organizing your thoughts and ideas today
              </p>
            </div>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className={"text-green-600 text-center text-2xl"}>
                  Login
                </CardTitle>
                <CardDescription className="text-black text-center">
                  Login your account to get started with Notes App
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link className="ml-auto inline-block text-sm underline-offset-4 hover:underline" to={"/forgot-password"}>
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isloading}
                        variant={Ghost}
                        className={
                          "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent "
                        }
                      >
                        {showPassword ? (
                          <Eye className="w-4 h-4 text-gray-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500"
                >
                  {isloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Login account...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
