"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PasswordForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch } = useForm();
  const newPassword = watch("newPassword");

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                required
                minLength={8}
                {...register("currentPassword")}
              />
            </div>
            <div />
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                required
                minLength={8}
                {...register("newPassword")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
                pattern={newPassword}
                title="Passwords must match"
                {...register("confirmPassword")}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">Save changes</Button>
            <Button variant="link" className="text-muted-foreground">
              Forgot your password?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordForm;

