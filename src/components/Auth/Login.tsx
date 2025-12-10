// import { Link } from "react-router-dom"
// import { Button } from "../ui/button"
// import {
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import LoginBanner from "./LoginBanner"

// export function Login() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
//       <LoginBanner />
//       <div className="w-full max-w-lg mx-auto flex flex-col justify-center p-6">
//         <CardHeader>
//           <CardTitle className="text-2xl md:text-4xl text-primary">
//             Login to your account
//           </CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form>
//             <div className="flex flex-col gap-6">
              
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </div>

//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input id="password" type="password" required />
//               </div>

//             </div>
//           </form>

//           <div className="my-4">
//             <p>
//               You don't have an account?{" "}
//               <Link to="/register" className="text-primary underline">
//                 Sign Up
//               </Link>
//             </p>
//           </div>

//         </CardContent>

//         <CardFooter className="flex-col gap-2 mt-4">
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//         </CardFooter>
//       </div>

//     </div>
//   )
// }

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import LoginBanner from "./LoginBanner";
import { useState } from "react";
import { BACKEND_API } from "../../../apiConfig";
import { showToast } from "../Common/showToast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",   // email or username depending on backend
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // VERY IMPORTANT (cookies)
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || "Login failed", "error");
        return;
      }

      // success toast
      showToast(data.message || "Login successful", "success");

      // redirect to dashboard or home
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <LoginBanner />

      <div className="w-full max-w-lg mx-auto flex flex-col justify-center p-6">
        <CardHeader>
          <CardTitle className="text-2xl md:text-4xl text-primary">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="my-4">
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="identifier"
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
                  onChange={handleChange}
                />
              </div>

            </div>

            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>

          <div className="my-4">
            <p>
              You don't have an account?{" "}
              <Link to="/register" className="text-primary underline">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}

export default Login;
