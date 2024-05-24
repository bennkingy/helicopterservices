"use server";

import sharp from "sharp";

function bufferToBase64(buffer: Buffer): string {
	return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function getFileBufferRemote(url: string) {
	const response = await fetch(url);
	return Buffer.from(await response.arrayBuffer());
}

function getFileBuffer(src: string) {
	return getFileBufferRemote(src);
}

export async function getPlaceholderImage(filepath: string) {
	try {
		const originalBuffer = await getFileBuffer(filepath);
		const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer();
		return {
			src: filepath,
			placeholder: bufferToBase64(resizedBuffer),
		};
	} catch {
		return {
			src: filepath,
			placeholder:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==",
		};
	}
}
