"use client";

// import { helloAction } from "@/actions/hello-action";
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
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { ContactSchema } from "../schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContacForm = () => {
	const service = "service_p8qp31i";
	const publicKey = "lweYZnq7da8j9Gfxd";
	const templateId = "template_rgqsdjt";

	const serviceOptions = {
		Training: [
			"Service 1",
			"Service 2",
			"Service 3",
			// Add more services for Training
		],
		Flights: [
			"Flight Service 1",
			"Flight Service 2",
			"Flight Service 3",
			// Add more services for Flights
		],
		Industry: [
			"Industry Service 1",
			"Industry Service 2",
			"Industry Service 3",
			// Add more services for Industry
		],
		Other: [
			"Other Service 1",
			"Other Service 2",
			"Other Service 3",
			// Add more services for Other
		],
	};

	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [name, setName] = useState("");
  const [selectedRequirement, setSelectedRequirement] = useState("Training");

	useEffect(() => {
		emailjs.init(publicKey);
	}, []);

	const form = useForm({
		resolver: zodResolver(ContactSchema),
		defaultValues: {
			email: "",
			name: "",
			body: "",
			contactNumber: "",
			requirement: "Training",
      service: "",
		},
	});

	// const { toast } = useToast();

	const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
		setLoading(true);
		// const { message } = await helloAction(data.name);
		// toast({ description: message });
		try {
			await emailjs.send(
				service,
				templateId,
				{
					from_name: data.name,
					from_email: data.email,
					contact_number: data.contactNumber,
					message: data.body,
					requirement: data.requirement,
					// @ts-ignore
					service: data.service, 
				},
				publicKey,
			);
			setName(data.name);
			setStep(2);
		} catch (error) {
			console.error("Failed to send the email:", error);
		} finally {
			setLoading(false);
		}
	};

	const { pending } = useFormStatus();
	return (
		<div
			className="bg-[#E6ECF0] border-l-4 border-brand-light-blue p-6 pb-8 pt-5 sm:p-10 sm:pt-9 sm:pb-11"
			style={{
				clipPath: "polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
			}}
		>
			{step === 1 ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4 mb-0 sm:mb-5">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel data-test-id="nameLabel">Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="name"
												data-test-id="nameField"
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
										<FormLabel data-test-id="emailLabel">Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												data-test-id="emailField"
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
										<FormLabel data-test-id="contactNumberLabel">
											Contact number
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												data-test-id="contactNumberField"
												placeholder="Please enter your full contact number"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="requirement"
								// @ts-ignore
								render={({ field }) => (
									<FormItem>
										<div className="mt-5">
											<FormLabel data-test-id="enquiryLabel">
												Your requirement
											</FormLabel>
										</div>
										<Controller
											control={form.control}
											name="requirement"
											//@ts-ignore
											render={({ field }) => (
												<RadioGroup
													{...field}
											    onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedRequirement(value);
                          }}
													value={field.value}
												>
													<div className="flex items-center space-x-2 mt-0">
														<RadioGroupItem value="Training" id="option-one" />
														<Label
															htmlFor="option-one"
															className="cursor-pointer"
														>
															Training
														</Label>
													</div>
													<div className="flex items-center space-x-2 mt-1">
														<RadioGroupItem value="Flights" id="option-two" />
														<Label
															htmlFor="option-two"
															className="cursor-pointer"
														>
															Flights
														</Label>
													</div>
													<div className="flex items-center space-x-2 mt-1">
														<RadioGroupItem
															value="Industry"
															id="option-three"
														/>
														<Label
															htmlFor="option-three"
															className="cursor-pointer"
														>
															Industry
														</Label>
													</div>
													<div className="flex items-center space-x-2 mt-1">
														<RadioGroupItem value="Other" id="option-four" />
														<Label
															htmlFor="option-four"
															className="cursor-pointer"
														>
															Other
														</Label>
													</div>
												</RadioGroup>
											)}
										/>
									</FormItem>
								)}
							/>
<FormField
  control={form.control}
  name="service"
  render={({ field }) => (
    <FormItem>
      <FormLabel data-test-id="serviceLabel">
        Select Service
      </FormLabel>
      <FormControl>
        <Select
          {...field}
          onValueChange={field.onChange}
          data-test-id="serviceField"
        >
         <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
											{/* @ts-ignore */
											serviceOptions[selectedRequirement]?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
							<FormField
								control={form.control}
								name="body"
								render={({ field }) => (
									<FormItem>
										<FormLabel data-test-id="enquiryLabel">Message</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												data-test-id="enquiryField"
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
							data-test-id="submitEnquiryButton"
						>
							{loading ? "Submitting..." : "Submit Enquiry"}
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
						Thank you for your enquiry, {name}!
					</h3>
					<p className="mt-5 text-center font-semibold text-base text-brand-dark-blue font-workSans">
						Your enquiry has lifted off and is now on its way to us. We&apos;ll
						get back to you as soon as it lands, usually within 24 hours.
					</p>
				</div>
			)}
		</div>
	);
};

export default ContacForm;
