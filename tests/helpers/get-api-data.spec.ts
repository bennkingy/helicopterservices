// import { getData } from "../path/to/your/getData"; // Adjust the import path accordingly
// import client from "../path/to/your/client"; // Adjust the import path accordingly

// jest.mock("../path/to/your/client", () => ({
// 	fetch: jest.fn(),
// }));

// describe("getData", () => {
// 	it("fetches data correctly", async () => {
// 		const mockData = {
// 			currentSlug: "example-slug",
// 			title: "Example Title",
// 			// add more mocked response data as per your schema
// 		};
// 		client.fetch.mockResolvedValue(mockData);

// 		const result = await getData("example-slug");

// 		expect(client.fetch).toHaveBeenCalledWith(
// 			expect.stringContaining("example-slug"),
// 		);
// 		expect(result).toEqual(mockData);
// 	});

// 	it("handles errors appropriately", async () => {
// 		client.fetch.mockRejectedValue(new Error("Failed to fetch"));

// 		await expect(getData("bad-slug")).rejects.toThrow("Failed to fetch");
// 	});
// });

// // //
// // async function getData(slug: string) {
// // 	const query = `
// //     *[_type == "training" && slug.current == '${slug}'] {
// //         "currentSlug": slug.current,
// //           title,
// //           hero,
// //           "heroImage": hero.image{
// //             asset->{
// //               _id,
// //               url,
// //               metadata {
// //                 dimensions,
// //                 lqip
// //               }
// //             }
// //           },
// //           seoTitle,
// //           seoDescription,
// //           body,
// //           service
// //       }[0]`;
// // 	const data = await client.fetch(query);

// // 	return data;
// // }
