import React, { useState, useEffect } from "react";
import _ from "lodash";

// Definieren Sie die Typen für ConfigElement, ConfigSetting und ConfigMessage
type ConfigDataType =
  | "string"
  | "boolean"
  | "number"
  | "string[]"
  | "Date"
  | "DateTime";

interface ConfigSetting {
  type: "setting";
  id: string;
  path_in_config_json: string;
  data_type: ConfigDataType;
}

interface ConfigMessage {
  type: "message";
  text: string;
}

type ConfigElement = ConfigSetting | ConfigMessage;

interface ConfigElementRendererProps {
  element: ConfigElement;
  config: Record<string, any>;
  onUpdate: (updatedConfig: Record<string, any>) => void;
}

const ConfigElementRenderer: React.FC<ConfigElementRendererProps> = ({
  element,
  config,
  onUpdate,
}) => {
  useEffect(() => {
    onUpdate(config);
  }, [config, onUpdate]);

  if (element.type === "message") {
    return <p>{element.text}</p>;
  } else if (element.type === "setting") {
    const setting = element as ConfigSetting;
    const value = _.get(config, setting.path_in_config_json);
    switch (setting.data_type) {
      case "string":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const updatedConfig = { ...config };
              _.set(updatedConfig, setting.path_in_config_json, e.target.value);
              onUpdate(updatedConfig);
            }}
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => {
              const updatedConfig = { ...config };
              _.set(
                updatedConfig,
                setting.path_in_config_json,
                e.target.checked,
              );
              onUpdate(updatedConfig);
            }}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const updatedConfig = { ...config };
              _.set(
                updatedConfig,
                setting.path_in_config_json,
                Number(e.target.value),
              );
              onUpdate(updatedConfig);
            }}
          />
        );
      case "string[]":
        return (
          <input
            type="text"
            value={value==null?"": value.join(", ")}
            onChange={(e) => {
              const updatedConfig = { ...config };
              const newValue = e.target.value
                .split(", ")
                .map((item) => item.trim());
              _.set(updatedConfig, setting.path_in_config_json, newValue);
              onUpdate(updatedConfig);
            }}
          />
        );
      case "Date":
      case "DateTime":
        return (
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => {
              const updatedConfig = { ...config };
              _.set(updatedConfig, setting.path_in_config_json, e.target.value);
              onUpdate(updatedConfig);
            }}
          />
        );
      default:
        return null;
    }
  }
  return null;
};

export default ConfigElementRenderer;
