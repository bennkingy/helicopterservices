// TODO: @Benn to add code to get actual values from source

// URL List
export const homeUrl = "http://localhost:3000/";
export const trainingUrl = homeUrl + "training";
export const industryUrl = homeUrl + "industry";
export const flightsUrl = homeUrl + "flights";
export const aboutUsUrl = homeUrl + "about-us";
export const fleetUrl = aboutUsUrl + "/" + "helicopter-fleet";
export const enquiryUrl = homeUrl + "enquire";

// General test variables
export const pageLoadTimeout = 3000;
export const blackFont = "rgb(2, 8, 23)";
export const redFont = "rgb(239, 68, 68)";

// Form User Data
export const email = "benn.king@TopGs.com";
export const name = "Benn King";
export const enquiryMessage = "Can I please get a quote for ...";

// Schema
export const enquiryTitleContent = "Enquire";
export const emailFieldLabel = "Email";
export const emailFieldText =
	"Please enter your email in the following format: email@gmail.com";
export const nameFieldLabel = "Name";
export const nameFieldText = "Please enter your full name";
export const enquiryFieldLabel = "Enquire";
export const enquiryFieldText = "Please enter your message here";
export const enquiryButtonContent = "Submit Enquiry";
export const successToaster = `Thank you ${name} for your inquiry. We will get back to you within 24 hours.`;

// Validation - Error Messages
export const emailErrorMessage = "Please enter a valid email address";
export const nameErrorMessage = "Please enter your name";
export const enquiryErrorMessage = "Please enter your message";
