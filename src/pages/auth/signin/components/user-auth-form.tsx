import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '../../../../providers/auth-provider';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string()
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { handleLogin, loading: loadiing } = useAuth();
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const router = useRouter();
  const [loading] = useState(false);
  const defaultValues = {
    email: 'demo@gmail.com',
    password: '123456'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPasswordSection(true);
  };

  const onSubmit = async (data: UserFormValue) => {
    await handleLogin();
    if (loadiing) <>Loading</>;
    router.push('/');
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full space-y-4"
        >
          <div className="fixed-section">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={`password-section ${showPasswordSection ? 'expand' : ''}`}
          >
            {showPasswordSection && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          {showPasswordSection ? (
            <Button disabled={loading} className="ml-auto w-full" type="submit">
              Login
            </Button>
          ) : (
            <Button className="ml-auto w-full" onClick={handleButtonClick}>
              Nút Không Phải Submit
            </Button>
          )}
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
}
