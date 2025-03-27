import { Identifiable } from "@shared/interfaces/identifiable.interfaces";
import { LogBase } from "./log-base.interface";

export interface LogEntry extends LogBase, Identifiable {
  contentPreview: string;
  isContentShown: boolean;
  isContentPinned: boolean;
}
