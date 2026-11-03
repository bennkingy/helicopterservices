// Framer Motion's animation engine, loaded on demand by <LazyMotion> (see
// app/components/MotionProvider.tsx) so it isn't in the first JavaScript the
// page downloads. Components use `m.div` etc. instead of `motion.div`.
import { domAnimation } from "framer-motion";

export default domAnimation;
