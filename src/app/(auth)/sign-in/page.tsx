'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import pic1 from '@/image/picsmart2.webp';
import { SignInSchema } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  });

  useEffect(() => {
    // Optional: Add side effects based on role selection
  }, [selectedRole]);

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setIsSubmitting(true);

    if (!selectedRole) {
      toast({
        title: "Role required",
        description: "Please select a role before submitting.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // const params = new URLSearchParams({
      // username: data.identifier,
      // role: selectedRole,
    // });

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const callbackUrl = `/profile`;

    console.log('Constructed callbackUrl:', callbackUrl);

    const result = await signIn('credentials', {
      redirect: true, // Do not auto-redirect; handle manually
      identifier: data.identifier,
      password: data.password,
      callbackUrl
    });

    if (result?.error) {
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive",
      });
    }
    // else if (result?.url) {
    //   router.push(result.url); // Redirect to the constructed URL
    // }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500"
      style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(70%)' }}>
      <div className="w-full max-w-md p-8 space-y-7 bg-white/70 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">
            Smart Classes
          </h1>
          <p className="mb-4 text-gray-600">Sign in to start your classes</p>
        </div>

        {/* Role Selection */}
        <div className="flex items-center space-x-4 mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={selectedRole === 'teacher'}
              onChange={() => setSelectedRole('teacher')}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">Teacher</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="student"
              checked={selectedRole === 'student'}
              onChange={() => setSelectedRole('student')}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">Student</span>
          </label>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email/Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email or username"
                      {...field}
                      className="hover:border-blue-500 focus:border-blue-500"
                      disabled={!selectedRole}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="hover:border-blue-500 focus:border-blue-500"
                      disabled={!selectedRole}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !selectedRole}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Not a member?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 transition duration-200">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
