import type { AuthImagePatternProps } from "@/types/types";

const AuthImagePattern = ({ title, description }: AuthImagePatternProps) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-slate-900 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-slate-700 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{description}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
