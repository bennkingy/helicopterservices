import type { Meta, StoryObj } from "@storybook/nextjs";
import Tvlogos from "./Tvlogos";

const meta: Meta<typeof Tvlogos> = { title: "Homepage/Tvlogos", component: Tvlogos, parameters: { layout: "padded" } };
export default meta;
export const Default: StoryObj<typeof Tvlogos> = {};
