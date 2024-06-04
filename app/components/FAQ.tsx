import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
	question: string;
	answer: string;
	value: string;
}

const FAQList: FAQProps[] = [
	{
		question: "Is Helicopter Services competitive?",
		answer:
			"Yes, we are but it's not all about price. The standard and quality of instruction should be top of your list. We have the aviation experience to give you value for money. We will guide you through the PPL(H) course and you will receive the benefit of our instructors who have commercial ratings and possibly thousands of hours experience. Our Head of Training, Leon Smith, is both a commercial fixed-wing and helicopter pilot. Our instructors follow his leadership and experience.",
		value: "item-1",
	},
	{
		question: "Is flying safe?",
		answer:
			"One could ask that of any activity from flying helicopters to crossing the road. Statistics prove you are far safer in the air in comparison with other forms of transport. Quality of instruction is the key - we ensure you learn to a safe standard and practice until you are competent. We will guide you through the course. We can tailor an advanced programme of flying to further develop your competence.",
		value: "item-2",
	},
	{
		question: "How long does it take to complete a PPL?",
		answer:
			"Once you have passed your first ground exam (Aviation Law is taken prior to first solo) you must complete all the ground exams within a twelve-month period. You can take as long as you like to complete the flying course but if any of the exams become invalid (i.e. outside the twelve months) they would need to be re-taken. To achieve a satisfactory rate of progress, we would recommend flying regularly. You need to take the skills test within six months of completing your flight instruction. If you were learning to fly at the weekends think six to nine months.",
		value: "item-3",
	},
	{
		question: "Are the ground exams difficult?",
		answer:
			"Most students self-study which is normally sufficient, along with some assistance from their instructor. Ground school is available for any subject with which additional help is required.",
		value: "item-4",
	},
	{
		question: "How stringent is the medical?",
		answer:
			"The Class 2 medical for a PPL needs a basic requirement of good health. If, for instance, you wear glasses or contact lenses, the Aero Medical Examiner (AME) will simply annotate that you must take a spare pair of glasses with you when you fly. Commercial pilots require a Class 1 medical, which is a higher standard.",
		value: "item-5",
	},
	{
		question: "How do I keep my licence current?",
		answer:
			"For each type of helicopter that you hold on your licence, you need to fly a minimum of two hours per year to include an LPC (Line Proficiency Check) with an Examiner. Realistically this is not enough flying to be safe.  However, flying dual with a safety pilot, you would be able to maintain your licence economically.",
		value: "item-6",
	},
	{
		question: "Why is aviation so full of acronyms?",
		answer:
			"Even we can't answer that one. Without it, we'd get through even more paper! To give you an idea, Leon Smith is a CFI. He has an ATPL FIC TRE TRI QHI ratings and he's an FE... and FAA ATP IR CFII. If you want to know what they mean, find out at your next visit!",
		value: "item-7",
	},
	{
		question: "Is there a waiting list?",
		answer:
			"If you want to book a weekend flight you need about a week's notice; during the week just a day or two is fine. Contact us and we will do everything to help you enjoy an aviation experience.",
		value: "item-8",
	},
];

type props = {
	className?: string; // e.g. 'py-5'
	title?: string; // e.g. 'Mallard Plumbing and Heating'
};

export const FAQ = ({ className, title = "" }: props) => {
	return (
		<section className={className}>
			{title ? (
				<h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
			) : null}
			<Accordion type="single" collapsible className="w-full AccordionRoot">
				{FAQList.map(({ question, answer, value }: FAQProps) => (
					<AccordionItem key={value} value={value}>
						<AccordionTrigger className="text-left">
							{question}
						</AccordionTrigger>

						<AccordionContent>{answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			{/* <h3 className="font-medium mt-4">
				Still have questions?{" "}
				<a
					href="#"
					className="text-primary transition-all border-primary hover:border-b-2"
				>
					Contact us
				</a>
			</h3> */}
		</section>
	);
};
