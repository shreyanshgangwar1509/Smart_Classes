// 'use client';
// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/components/ui/use-toast';
// import pic1 from '@/image/picsmart2.webp';
// import { signUpSchema } from '@/schemas/SignUpSchema';
// import { ApiResponse } from '@/types/ApiResponse';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios, { AxiosError } from 'axios';
// import { Loader2 } from 'lucide-react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// function Page() {
//   const [selectedRole, setSelectedRole] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//       classes: '',
//       role:'',
//     },
//   });


//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     if (!selectedRole) {
//       toast({
//         title: 'Role Required',
//         description: 'Please select either Teacher or Student.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await axios.post<ApiResponse>('/api/sign-up', { ...data,selectedRole});
//       toast({
//         title: 'Success',
//         description: response.data.message,
//       });
//       router.replace(`/verify/${data.username}`);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Signup failed',
//         description: axiosError.response?.data.message,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // handle new form for teacher

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500"
//       style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(70%)' }}
//     >
//       <div className="w-full max-w-md p-8 space-y-7 bg-white/75 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">Smart Classes</h1>
//           <p className="mb-4 text-gray-800">Sign up to start your anonymous classes</p>
//         </div>

//         {/* Role Selection */}
//         <div className="flex items-center space-x-4 mb-6">
//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               name="role"
//               value="teacher"
//               checked={selectedRole === 'teacher'}
//               onChange={() => setSelectedRole('teacher')}
//               className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//             />
//             <span className="text-black">Teacher</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               name="role"
//               value="student"
//               checked={selectedRole === 'student'}
//               onChange={() => setSelectedRole('student')}
//               className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//             />
//             <span className="text-black">Student</span>
//           </label>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-black">Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="option"
//                       placeholder="Enter your username"
//                       {...field}
//                       className="hover:border-blue-500 focus:border-blue-500"
//                       disabled={!selectedRole} // Disable input if no role is selected
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-black">Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Enter your username"
//                       {...field}
//                       className="hover:border-blue-500 focus:border-blue-500"
//                       disabled={!selectedRole} // Disable input if no role is selected
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {(selectedRole=='student')?(<FormField
//               control={form.control}
//               name="classes"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-black">Class</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Enter your Class"
//                       {...field}
//                       className="hover:border-blue-500 focus:border-blue-500"
//                       disabled={!selectedRole} // Disable input if no role is selected
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />) : (<h2 className='text-black text-bold'>Welcome {selectedRole}</h2>)}
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-black">Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter your email"
//                       {...field}
//                       className="hover:border-blue-500 focus:border-blue-500"
//                       disabled={!selectedRole} // Disable input if no role is selected
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-black">Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Enter your password"
//                       {...field}
//                       className="hover:border-blue-500 focus:border-blue-500"
//                       disabled={!selectedRole} // Disable input if no role is selected
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               disabled={isSubmitting || !selectedRole} // Disable button if no role is selected
//               className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
//             >
//               {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
//             </Button>
//           </form>
//         </Form>

//         <div className="text-center mt-4">
//           <p className="text-gray-600">
//             Already a member?{' '}
//             <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 transition duration-200">
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;



// // adding userid to params
// // const handleClick = () => {
// //     // Define your query parameters
// //     const params = new URLSearchParams({
// //       userId: '12345',
// //       username: 'john_doe',
// //     });

// //     // Construct the URL with query parameters
// //     const url = `/api/get-details?${params.toString()}`;

// //     // Navigate to the new URL
// //     router.push(url);
// //   };
'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import pic1 from '@/image/picsmart2.webp';
import { signUpSchema } from '@/schemas/SignUpSchema'; // Ensure role is included in this schema
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Ensure role is part of the schema


function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      classes: '',
      role: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      toast({
        title: 'Success',
        description: response.data.message,
      });
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Signup failed',
        description: axiosError.response?.data.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500"
      style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(70%)' }}
    >
      <div className="w-full max-w-md p-8 space-y-7 bg-white/75 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">Smart Classes</h1>
          <p className="mb-4 text-gray-800">Sign up to start your anonymous classes</p>
        </div>

        {/* Role Selection */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  {...form.register('role')}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-black">Teacher</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  {...form.register('role')}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-black">Student</span>
              </label>
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                      className="hover:border-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('role') === 'student' && (
              <FormField
                control={form.control}
                name="classes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Class</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your Class"
                        {...field}
                        className="hover:border-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="hover:border-blue-500 focus:border-blue-500"
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
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="hover:border-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting} // Disable button if submitting
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 transition duration-200">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
