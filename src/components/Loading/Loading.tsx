import { CircularProgress } from "@mui/joy";

const Loading = () => {
  return (
    <div className="">
      <CircularProgress
        color="primary"
        determinate={false}
        size="lg"
        value={25}
        variant="soft"
      />
    </div>
  );
};
export default Loading;
