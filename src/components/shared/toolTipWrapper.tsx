import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipWrapperProps {
  children: ReactNode;
  content: string;
  secondContent?: string;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  content,
  secondContent,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="text-center">
        <p>{content}</p>
        <p>{secondContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;
