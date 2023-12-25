import { MoonLoader } from "react-spinners";

function LoadingPage() {
  return (
    <div
      style={{
        background: "black",
        height: "90vh",
        margin: 0, // Add this line to remove default body margin
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`body { background: black; }`}</style>
      <MoonLoader color={"#90ee90"} loading={true} />
    </div>
  );
}

export default LoadingPage;
