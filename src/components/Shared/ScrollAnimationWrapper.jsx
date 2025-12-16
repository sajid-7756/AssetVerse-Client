import { motion } from "motion/react";

const ScrollAnimationWrapper = ({
  children,
  className = "",
  direction = "up", // up, down, left, right, none
  delay = 0,
  duration = 0.5,
  scale = 1,
  once = true,
  ...props
}) => {
  const getVariants = () => {
    const variants = {
      hidden: { opacity: 0, scale: scale !== 1 ? 0.8 : 1 },
      visible: {
        opacity: 1,
        scale: scale,
        transition: {
          duration: duration,
          delay: delay,
          ease: "easeOut",
        },
      },
    };

    if (direction === "up") variants.hidden.y = 50;
    else if (direction === "down") variants.hidden.y = -50;
    else if (direction === "left") variants.hidden.x = 50;
    else if (direction === "right") variants.hidden.x = -50;

    // Reset x/y for visible state to ensure it animates to 0
    variants.visible.y = 0;
    variants.visible.x = 0;

    return variants;
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, margin: "-50px" }}
      variants={getVariants()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
