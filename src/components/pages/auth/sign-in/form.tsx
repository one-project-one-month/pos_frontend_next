"use client";

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import GoogleSignInBtn from "./google-signIn-btn";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}
const SignInForm = () => {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<SignInFormElement>) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;
        const data = {
            email: formElements.email.value,
            password: formElements.password.value,
        };
        console.log("credential signin data", data);

        const res = await signIn("credentials", { ...data, redirect: true, callbackUrl: "/" });
        if (!res || !res.ok) {
            return console.error({ res });
        }
    };

    return (
        <section className="">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen  lg:py-0">
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <ThemeToggle buttonProps={{ size: "icon", className: "rounded-full " }} />
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                            Sign in to your account
                        </h1>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <Button variant={"default"} type="submit" className="w-full">
                                Sign in
                            </Button>
                        </form>
                        <div className="flex items-center">
                            <div className="flex-grow border-t border-gray-500"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-500"></div>
                        </div>
                        <GoogleSignInBtn
                            className="w-full overflow-hidden "
                            onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignInForm;
