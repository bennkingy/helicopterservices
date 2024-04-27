import about from './about'
import blockContent from './blockContent'
import flights from './flights'
import { formType } from './formType'
import helicopter from './helicopter'
import { heroType } from './heroType'
import { imageGalleryType } from './imageGalleryType'
import industry from './industry'
import legal from './legal'
import pilots from './pilot'
import { promotionType } from './promotionType'
import { serviceType } from './serviceType'
import settings, { dayHours, link } from './settings'
import training from './training'

export const schemaTypes = [serviceType, pilots, imageGalleryType, heroType, training, blockContent, helicopter, flights, legal, about, industry, settings, link, dayHours, promotionType, formType]
tail