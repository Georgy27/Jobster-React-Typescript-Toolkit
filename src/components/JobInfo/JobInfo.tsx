import Wrapper from "./JobInfo.styles";
import { ReactNode } from "react";
interface InfoJob {
  icon: ReactNode;
  text: string;
}
const JobInfo: React.FC<InfoJob> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="test">{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
