import React, { useMemo } from "react";
import { Input, Icon, Select } from "antd";

const { Option } = Select;

export const OptimizedInput = props => {
  return useMemo(() => {
    return <Input {...props} />;
  }, [props.value]);
};

export const OptimizedInputPassword = props => {
  return useMemo(() => {
    return <Input.Password {...props} />;
  }, [props.value]);
};

export const OptimizedSelect = props => {
  return useMemo(() => {
    return <Select {...props}>{props.children}</Select>;
  }, [props.value, props.children]);
};