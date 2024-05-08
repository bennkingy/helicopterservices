import Image from "next/image";

export type StatusIconProps = { status: boolean; className?: string };

const StatusIcon = ({ status, className }: StatusIconProps) => {
	const imageUrl = status ? "/images/Check.png" : "/images/checkTwo.svg";
	const altText = status ? "Option selected" : "Option not selected";

	return (
		<Image
			priority
			src={imageUrl}
			width={18}
			height={18}
			alt={altText}
			className={`m-0 p-0 ${className}`}
		/>
	);
};

export default StatusIcon;
