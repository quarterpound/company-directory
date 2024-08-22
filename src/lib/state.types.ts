import { SearchValidation } from "@/components/pages/home/validation";

interface StateVariables {
  filters: SearchValidation | null;
}

interface StateActions {
  setFilters: (data: SearchValidation) => void;
}

export type State = StateVariables & StateActions;
