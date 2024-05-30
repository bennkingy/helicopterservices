"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ContactSchema } from "../schema";

const ContacForm = () => {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [name, setName] = useState("");

	const form = useForm({
		resolver: zodResolver(ContactSchema),
		defaultValues: {
			email: "",
			name: "",
			body: "",
		},
	});

	const { toast } = useToast();

	const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// const { message } = await helloAction(data.name);
		setName(data.name);
		// toast({ description: message });
		setLoading(false);
		setStep(2);
	};

	const { pending } = useFormStatus();
	return (
		<div
			className="bg-[#E6ECF0] border-l-4 border-brand-light-blue p-10 pt-9 pb-11"
			style={{
				clipPath: "polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
			}}
		>
			{step === 1 ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4 mb-5">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel data-testId="nameLabel">Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="name"
												data-testId="nameField"
												placeholder="Please enter your name"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel data-testId="emailLabel">Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												data-testId="emailField"
												placeholder="Please enter your email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="contactNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel data-testId="contactNumberLabel">
											Contact number
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												data-testId="contactNumberField"
												placeholder="Please enter your full contact number"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Edit */}
							<div className="mt-5">
								<FormLabel data-testId="enquiryLabel">
									Your requirement
								</FormLabel>
							</div>
							<RadioGroup defaultValue="option-one">
								<div className="flex items-center space-x-2 -mt-2">
									<RadioGroupItem value="option-one" id="option-one" />
									<Label htmlFor="option-one" className="cursor-pointer">
										Training
									</Label>
								</div>
								<div className="flex items-center space-x-2 mt-1">
									<RadioGroupItem value="option-two" id="option-two" />
									<Label htmlFor="option-two" className="cursor-pointer">
										Flights
									</Label>
								</div>
								<div className="flex items-center space-x-2 mt-1">
									<RadioGroupItem value="option-three" id="option-three" />
									<Label htmlFor="option-three" className="cursor-pointer">
										Industry
									</Label>
								</div>
								<div className="flex items-center space-x-2 mt-1">
									<RadioGroupItem value="option-four" id="option-four" />
									<Label htmlFor="option-four" className="cursor-pointer">
										Other
									</Label>
								</div>
							</RadioGroup>
							{/* End Edit */}
							<FormField
								control={form.control}
								name="body"
								render={({ field }) => (
									<FormItem>
										<FormLabel data-testId="enquiryLabel">Message</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												data-testId="enquiryField"
												placeholder="Please enter your message here"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-brand-light-blue"
							// sm:max-w-[250px]
							disabled={pending}
							data-testId="submitEnquiryButton"
						>
							{loading
								? "Loading... Please wait while your enquiry is submitted "
								: "Submit Enquiry"}
						</Button>
					</form>
				</Form>
			) : (
				<div className="min-h-[400px] flex justify-center flex-col align-middle items-center">
					<Image
						src="/images/helicopter-message.svg"
						alt="Thank you for your enquiry!"
						width={109}
						height={36}
						quality={100}
					/>
					<h3 className="mt-10 text-center font-bold text-2xl text-brand-dark-blue font-workSans">
						Thank you {name} for your enquiry.
					</h3>
					<p className="mt-5 text-center font-bold text-base text-brand-dark-blue font-workSans">
						It has lifted off and is now on its way to us. We'll get back to you
						as soon as it lands.
					</p>
				</div>
			)}
		</div>
	);
};

export default ContacForm;
