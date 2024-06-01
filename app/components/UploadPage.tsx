"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
// @ts-ignore
import { useDropzone } from "react-dropzone";

const getBase64Blur = async (file: File) => {
	const reader = new FileReader();
	return new Promise<string>((resolve, reject) => {
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			resolve(reader.result as string);
		};
		reader.onerror = reject;
	});
};

const uploadToServer = async (base64Image: string) => {
	const response = await fetch("/api", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ image: base64Image }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Failed to upload image");
	}

	const data = await response.json();
	return data.base64;
};

export default function UploadPage() {
	const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];
			const base64Image = await getBase64Blur(file);
			const base64Blur = await uploadToServer(base64Image);
			setBlurDataURL(base64Blur);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		// @ts-ignore
		accept: "image/*",
	});

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			className="my-20"
		>
			<div
				{...getRootProps()}
				style={{
					border: "2px dashed #ccc",
					padding: "20px",
					cursor: "pointer",
					marginBottom: "20px",
					textAlign: "center",
				}}
			>
				<input {...getInputProps()} />
				<p>
					Drag &apos;n&apos; drop you image files here, then copy the blur
					string
				</p>
			</div>
			{blurDataURL && (
				<>
					<div>
						<h2>Blurred Image:</h2>
						<Image
							src={blurDataURL}
							alt="Blurred Image"
							width={400}
							height={400}
							placeholder="blur"
							blurDataURL={blurDataURL}
						/>
					</div>
					<h3 className="mt-5">Copy blur string:</h3>
					{blurDataURL ? blurDataURL : ""}
				</>
			)}
		</div>
	);
}
