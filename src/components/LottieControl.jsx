import Lottie from "lottie-react";

const LottieControl = ({ animationData }) => {

  return (
    <div>
      <Lottie animationData={animationData} height={400} width={400} />
    </div>
  );
};

export default LottieControl;
