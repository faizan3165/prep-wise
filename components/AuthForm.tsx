"use client";

import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.actions";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const isSignIn = type === "sign-in";
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCreds = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCreds?.user?.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account Created Successfully, Please Sign In");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        const userCreds = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCreds.user.getIdToken();

        if (!idToken) {
          toast.error("Sign In Failed, Please Try Again");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success(" Welcome Back!");
        router.push("/");
      }
    } catch (error: any) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");

      toast.error(
        `Error while ${isSignIn ? "signing in" : "signing up"} ${
          error?.message
        }`
      );
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={32} width={38} />

          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice Job Interviews With AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <>
                <FormField
                  label="Name"
                  placeholder="Your Name"
                  control={form.control}
                  name={"name"}
                />
              </>
            )}

            <FormField
              label="Email"
              placeholder="Your Email"
              control={form.control}
              name={"email"}
              type="email"
            />

            <FormField
              label="password"
              placeholder="Your password"
              control={form.control}
              name={"password"}
              type="password"
            />

            <Button className="btn">
              {isSignIn ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No Account Yet?" : "Have An Account Already?"}

          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
