type props = {
  className?: string; // e.g. 'py-5'
};

const YouTube = ({ className }: props) => {
  return (
    <div className={className} style={{
      position: "relative",
      paddingBottom: "56.25%" /* 16:9 */,
      height: 0,
    }}><iframe style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    }} width="560" height="315" src="https://www.youtube.com/embed/MU0tqzLQmNQ?si=eHqHeDblMJ_pxJ4e&loop=1&enablejsapi=1&autoplay=1&mute=1&frameborder=0&controls=0&showinfo=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
  )
}

export default YouTube  