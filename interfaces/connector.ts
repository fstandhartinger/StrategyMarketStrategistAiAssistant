// interfaces/connector.ts
export interface BaseConnector {
  in_use: boolean;
  id: string;
  name_for_human: string;
  name_for_ai: string;
  description_for_human: string;
  description_for_ai: string;
  prompt_template: string | undefined;
}

type ConnectorType =
  | "EMail"
  | "Documents"
  | "Database"
  | "Google"
  | "Calculator"
  | "Custom";

export type ConfigSettingType =
  | "string"
  | "boolean"
  | "number"
  | "string[]"
  | "Date"
  | "DateTime";

export interface ConfigMessage {
  type: "message";
  text: string;
}

export interface ConfigSetting {
  type: "setting";
  id: string;
  path_in_config_json: string;
  data_type: ConfigSettingType;
}

export type ConfigElement = ConfigMessage | ConfigSetting;

export interface Connector extends BaseConnector {
  type: ConnectorType | string;
  description: string;
  name: string;
  is_configurable: boolean;
  config_elements: ConfigElement[];
  config_json: Record<string, any>;
  prompt_template: string | undefined;
  maxAgentIterations: number;
}

// Hier können Sie die vollständigen Connector-Definitionen hinzufügen, einschließlich der neuen Felder
// config_elements und config_json. Die Felder in_use, id, name_for_human usw. wurden in die Basisklasse verschoben.
