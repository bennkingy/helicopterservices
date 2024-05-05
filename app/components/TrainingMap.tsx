const TrainingMap = () => {
	return (
		<>
			<table className="w-full border-separate border-spacing-0 table-fixed">
				<tbody>
					<tr className="row2">
						<td className="p-3">
							<div className="shadow-lg cursor-pointer">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
									}}
								>
									<div className="font-workSans font-bold text-xs">PPL(H)</div>
								</div>
							</div>
						</td>
						<td className="p-3" />
						<td className="p-3" />
						<td className="p-3" />
						<td colSpan={2} className="p-3">
							<div className="shadow-lg cursor-pointer">
								<div
									className="bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
									}}
								>
									<div className="font-workSans font-bold text-xs text-center py-3 sm:py-20 max-h-[162px]">
										Advanced flying programme
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr className="row2">
						<td className="p-3">Private</td>
						<td />
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">Single</div>
							</div>
						</td>
						<td />
						<td />
						<td />
					</tr>
					<tr className="row3">
						<td className="p-3" />
						<td className="p-3">
							<div className="shadow-lg">
								<div
									className="aspect-square bg-white flex items-center justify-center"
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
									}}
								>
									<div className="font-workSans font-bold text-xs">
										Night
										<br />
										Rating
									</div>
								</div>
							</div>
						</td>
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">
									Type
									<br />
									rating
								</div>
							</div>
						</td>
						<td className="p-3" />
						<td className="p-3" />
						<td className="p-3" />
					</tr>
					<tr className="row4" style={{ backgroundColor: "#E3E9F1" }}>
						<td className="p-3">Commerical</td>
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className="bg-slate-500">CPL(H)</div>
							</div>
						</td>
						<td className="p-3" />
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className="bg-slate-500">Twin</div>
							</div>
						</td>
						<td colSpan={2} className="p-3">
							<div
								className="bg-slate-500"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								Simulator
							</div>
						</td>
					</tr>
					<tr className="row5" style={{ backgroundColor: "#E3E9F1" }}>
						<td className="p-3" />
						<td className="p-3" />
						<td className="p-3" />
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className="bg-slate-500">IR(H)</div>
							</div>
						</td>
						<td colSpan={2} className="p-3">
							<div
								className="bg-slate-500"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								PBN
							</div>
						</td>
					</tr>
					<tr className="row6">
						<td className="p-3">Instructor</td>
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">FI(H)</div>
							</div>
						</td>{" "}
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">TRI</div>
							</div>
						</td>{" "}
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">IRI</div>
							</div>
						</td>
						<td className="p-3" />
						<td className="p-3" />
					</tr>
					<tr className="row7" style={{ backgroundColor: "#E3E9F1" }}>
						<td className="p-3">Examiner</td>
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">FI(H)</div>
							</div>
						</td>{" "}
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">TRI</div>
							</div>
						</td>{" "}
						<td className="p-3">
							<div
								className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand"
								style={{
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
								}}
							>
								<div className=" bg-slate-500">IRI</div>
							</div>
						</td>
						<td className="p-3" />
						<td className="p-3" />
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default TrainingMap;
