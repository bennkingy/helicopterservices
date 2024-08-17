import about from "./about";
import blockContent from "./blockContent";
import fleet from "./fleet";
import flights from "./flights";
import { formType } from "./formType";
import { heroType } from "./heroType";
import { imageGalleryType } from "./imageGalleryType";
import industry from "./industry";
import legal from "./legal";
import pilots from "./pilot";
import { serviceType } from "./serviceType";
import settings, { dayHours, link, faq } from "./settings";
import training from "./training";

export const schemaTypes = [
	serviceType,
	pilots,
	imageGalleryType,
	heroType,
	training,
	blockContent,
	flights,
	legal,
	about,
	industry,
	settings,
	link,
	dayHours,
	formType,
	fleet,
	faq,
];
