import Lottie from "lottie-react";

const LottieControl = ({ animationData, height = 400, width = 400 }) => {
  return (
    <div>
      <Lottie animationData={animationData} height={height} width={width} />
    </div>
  );
};

export default LottieControl;
