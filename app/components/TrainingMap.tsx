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
									<div className="font-workSans font-bold text-[10px] sm:text-base py-5 sm:py-10">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base py-5 sm:py-10">
										&nbsp;&nbsp;&nbsp;AFP&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr className="row2">
						<td className="p-2 sm:p-3 relative lineDown" />
						<td className="relative lineAndHalf lineArrow" />
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
										Night
										<br />
										Rating
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
										Type
										<br />
										Rating
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3" />
						<td className="p-2 sm:p-3" />
					</tr>
					<tr className="row4" style={{ backgroundColor: "#E3E9F1" }}>
						<td className="p-2 sm:p-3" />
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
										CPL(H)
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3" />
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
										Simulator
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr className="row5" style={{ backgroundColor: "#E3E9F1" }}>
						<span className="mapTitle font-openSans">Commerical</span>
						<td className="p-2 sm:p-3" />
						<td className="p-2 sm:p-3" />
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
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
									<div className="font-workSans font-bold text-[10px] sm:text-base">
										&nbsp;&nbsp;&nbsp;IRI&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
						</td>
						<td className="p-2 sm:p-3" />
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TrainingMap;
