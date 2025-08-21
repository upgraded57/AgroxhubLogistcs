import AnimationNoFile from "@/assets/json/AnimationNoFile.json";
import Lottie from "lottie-react";
export default function EmptyState({ text }: { text?: string }) {
  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center">
      <Lottie
        animationData={AnimationNoFile}
        loop={true}
        autoPlay={true}
        style={{ width: 200, height: 200 }}
      />
      <p>{text ? text : "Nothing to see here yet!"}</p>
    </div>
  );
}
