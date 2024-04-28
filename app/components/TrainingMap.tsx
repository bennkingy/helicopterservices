const TrainingMap = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-4 xs:6 sm:8 md:gap-10 lg:gap-14 text-center text-white ">
      <div className="aspect-square	border border-gray-300 bg-slate-500 drop-shadow-brand" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }} ><div className=" bg-slate-500">PPL(H)</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="col-span-2 aspect-auto border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }} ><div className=" bg-slate-500">Advanced Flying Programme</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500 relative" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }} ><div className=" bg-slate-500">Single</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" ><div className=" bg-slate-500">Night rating</div></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500 relative">
        <svg className="absolute bottom-[100%]" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#64748B" />
            </marker>
          </defs>
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg><div className=" bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}>Type rating</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">CPL(H)</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">Twin</div></div>
      <div className="col-span-2 aspect-auto bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">Simulator</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">IR(H)</div></div>
      <div className="col-span-2 bg-slate-500  aspect-auto" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">PBN</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">FI(H)</div></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">TRI</div></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">IRI</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">FE(H)</div></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">TRE(H)</div></div>
      <div className="aspect-square	border border-gray-300 bg-slate-500" style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}><div className=" bg-slate-500">IRE</div></div>
      <div className="aspect-square"></div>
      <div className="aspect-square"></div>
    </div>
  )
}

export default TrainingMap