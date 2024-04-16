import LottieControl from "./LottieControl";
import loader from "/src/assets/loader.json";

const Loader = () => {
  return <LottieControl animationData={loader} height={100} width={100} />;
};

export default Loader;
