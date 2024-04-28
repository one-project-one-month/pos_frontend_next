"use client";

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/services/api/staffs";
import { signInStaffSchema } from "@/validations/staff";
import type { SignInStaffType } from "@/types/staff";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";

const SignInForm = () => {
    const router = useRouter();
    const { setStaffCode } = useSaleInvoiceContext((state) => state);
    const { mutate: signIn, isPending } = useSignIn();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInStaffType>({
        resolver: zodResolver(signInStaffSchema),
    });

    const handleSignIn = async (values: SignInStaffType) => {
        console.log(values);
        signIn(values, {
            onSuccess: (res) => {
                console.log(res);
                setStaffCode(values.staffCode);
                router.push("/");
            },
            onError: (error) => {
                console.error(error);
            },
        });
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

                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(handleSignIn)}>
                            <div>
                                <label
                                    htmlFor="staff_code"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    Staff code
                                </label>
                                <input
                                    {...register("staffCode")}
                                    id="staff_code"
                                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                    placeholder="s01"
                                />
                                <p className="text-xs text-red-600">
                                    {errors.staffCode?.message ?? ""}
                                </p>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    {...register("password")}
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                />
                                <p className="text-xs text-red-600">
                                    {errors.password?.message ?? ""}
                                </p>
                            </div>
                            <div className="flex items-center justify-end">
                                <a
                                    href="#"
                                    className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <Button
                                variant={"default"}
                                type="submit"
                                className="w-full"
                                disabled={isPending}>
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignInForm;
