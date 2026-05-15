import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layout/AuthLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/register", {
      onSuccess: () => reset(),
    });
  };

  return (
    <AuthLayout>
      <div className={cn("flex flex-col gap-6")}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={submit} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-sm text-balance text-muted-foreground">
                    Enter your email below to create your account
                  </p>
                </div>

                {/* Email Field */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="youremail@example.com"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </Field>

                {/* Password Fields */}
                <Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                      <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        required
                      />
                      {errors.password_confirmation && (
                        <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                      )}
                    </Field>
                  </div>
                  <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                </Field>

                {/* Submit Button */}
                <Field>
                  <Button type="submit" disabled={processing} className="w-full">
                    {processing ? "Creating Account..." : "Create Account"}
                  </Button>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                {/* TODO: Add your social buttons here later */}

                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </FieldGroup>
            </form>

            {/* Right side image */}
            <div className="relative hidden bg-muted md:block">
              <img
                src="/images/logo.jpg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}