import { Link } from "react-router-dom";
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

export function Register() {
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" type="text" placeholder="Doe" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
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
                <Input id="password" type="password" required />
              </div>
            </div>
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

        <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}
