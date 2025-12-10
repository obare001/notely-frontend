import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import LoginBanner from "./LoginBanner";
import { useState } from "react";
import { BACKEND_API } from "../../../apiConfig";
import { showToast } from "../Common/showToast";

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      showToast(data.message || 'Registration successful', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
     <LoginBanner />
      <div className="w-full max-w-lg mx-auto flex flex-col justify-center p-6">
        <CardHeader>
          <CardTitle className="text-2xl md:text-4xl text-primary">
            Register your account
          </CardTitle>
          <CardDescription>
            Enter your email below to register your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="my-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  name="firstName"
                  placeholder="John"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input 
                  id="last_name" 
                  type="text" 
                  placeholder="Doe" 
                  name="lastName"
                  required 
                  onChange={handleChange}
                  />
              </div>

                <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                    id="username" 
                    type="text" 
                    placeholder="JD"
                    name="username"
                     required 
                     onChange={handleChange}
                     />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                    name="password"
                   required
                    onChange={handleChange} />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </CardFooter>
          </form>

          <div className="my-4">
            <p>
              You have an account?{" "}
              <Link to="/login" className="text-primary underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>

        
      </div>
    </div>
  );
}
