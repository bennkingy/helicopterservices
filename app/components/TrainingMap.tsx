const TrainingMap = () => {
	return (
		<div className="sm:px-20 mb-10 sm:mb-24 max-w-[960px] mx-auto">
			<table className="w-full border-separate border-spacing-0 table-fixed">
				<tbody>
					<tr className="row2">
						<td className="p-2 sm:p-3">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base py-5 sm:py-10">
										&nbsp;&nbsp;&nbsp;PPL(H)&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3 relative line" />
						<td className="p-2 sm:p-3 relative line" />
						<td className="p-2 sm:p-3 relative line lineArrow" />
						<td colSpan={1} className="p-2 sm:p-3">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base py-5 sm:py-10">
										&nbsp;&nbsp;&nbsp;AFP&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr className="row2">
						<td className="p-2 sm:p-3 relative lineDown" />
						<td className="relative lineAndHalf lineArrow" />
						<td className="p-2 sm:p-3 relative lineDownSmall lineDownSmallArrow">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;Single&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td />
						<td />
					</tr>
					<tr className="row3">
						<td className="p-2 sm:p-3 relative lineDown">
							<span className="mapTitle font-openSans">
								&nbsp;&nbsp;&nbsp;Private&nbsp;&nbsp;&nbsp;
							</span>
							<span className="lineArrow"></span>
						</td>
						<td className="p-2 sm:p-3 relative lineDownSmall lineDownSmallArrow">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										Night
										<br />
										Rating
									</div>
								</div>
							</div>
							<span className="lineHalf"></span>
						</td>
						<td className="p-2 sm:p-3 relative z-[2]">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										Type
										<br />
										Rating
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3" />
						<td className="p-2 sm:p-3"></td>
					</tr>
					<tr className="row4" style={{ backgroundColor: "#E3E9F1" }}>
						<td className="p-2 sm:p-3 relative">
							<span className="lineUp"></span>
							<span className="lineArrow"></span>
						</td>
						<td className="p-2 sm:p-3 relative">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										CPL(H)
									</div>
								</div>
							</div>
							<span className="lineHalf"></span>
						</td>
						<td className="p-2 sm:p-3 line line relative lineArrow">
							<span className="lineArrowLeft"></span>
							<span className="lineUp"></span>
						</td>
						<td className="p-2 sm:p-3  relative lineDownSmall lineDownSmallArrow">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;Twin&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td colSpan={1} className="p-2 sm:p-3">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										Simulator
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr className="row5" style={{ backgroundColor: "#E3E9F1" }}>
						<span className="mapTitle font-openSans">Commerical</span>
						<td className="p-2 sm:p-3 relative lineDown lineDownSmallArrow" />
						<td className="p-2 sm:p-3 relative lineDownHalfway lineDownSmallArrow">
							<span className="line"></span>
							<span className="lineHalf"></span>
							<span className="lineArrow"></span>
							<span className="absolute line z-[2]"></span>
						</td>
						<td className="p-2 sm:p-3  relative lineDownSmall lineDownSmallArrow">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;IR(H)&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td colSpan={1} className="p-2 sm:p-3">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										PBN
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr className="row6">
						<td className="p-2 sm:p-3">
							<span className="mapTitle font-openSans">Instructor</span>
						</td>
						<td className="p-2 sm:p-3  relative lineDownSmall lineDownSmallArrow">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;FI(H)&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3  relative lineDownSmall lineDownSmallArrow">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;TRI&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3  relative lineDownSmall lineDownSmallArrow">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;IRI&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3" />
					</tr>
					<tr className="row7" style={{ backgroundColor: "#E3E9F1" }}>
						<td className="p-2 sm:p-3">
							<span className="mapTitle font-openSans">Examiner</span>
						</td>
						<td className="p-2 sm:p-3">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;FI(H)&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;TRI&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3">
							<div className="shadow-sm sm:shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										maxHeight: "136px",
									}}
								>
									<div className="font-workSans font-bold text-[10px] sm:text-[12px] md:text-base">
										&nbsp;&nbsp;&nbsp;IRI&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3 text-[8px] sm:text-[10px] lg:text-base text-center">
							QMP/ICAO license holders should call us for advice
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TrainingMap;
