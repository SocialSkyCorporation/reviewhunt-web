import React from "react";
import PropTypes from "prop-types";
import { Collapse } from "antd";
import {TextInput, Screenshots} from './FormTypes';

const CreateQuestForm = ({}) => {
  return (
      <div>
      <TextInput title={"Quest Name"} containerStyle={{marginTop: 0}}/>
      <TextInput title={"Description"} />
      <Screenshots title={"Proof Example"} single/>

      </div>
  );
};

CreateQuestForm.propTypes = {};

CreateQuestForm.defaultProps = {};

export default CreateQuestForm;
