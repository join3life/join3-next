import { createContext } from "react";

interface OrganizationProps {
  info: any;
  setInfo: (info: any) => void;
  skills: any;
  events: any;
  projects: any;
}

export default createContext({} as OrganizationProps);
