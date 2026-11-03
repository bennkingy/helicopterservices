import type { Meta, StoryObj } from "@storybook/nextjs";
import Footer from "./Footer";

// The weather widget calls OpenWeatherMap; without NEXT_PUBLIC_WEATHER_API it shows its fallback.
const meta: Meta<typeof Footer> = { title: "Site/Footer", component: Footer };
export default meta;
export const Desktop: StoryObj<typeof Footer> = {};
export const Phone: StoryObj<typeof Footer> = { globals: { viewport: { value: "mobile" } } };
