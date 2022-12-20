import { createContext } from "react";

interface OrganizationProps {
  info: any;
  setInfo: (info: any) => void;
  skills: any;
  setSkills: (skills: any) => void;
  events: any;
  setEvents: (events: any) => void;
  projects: any;
  setProjects: (peojects: any) => void;
}

export default createContext({} as OrganizationProps);
