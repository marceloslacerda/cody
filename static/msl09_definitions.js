'use strict';

Blockly.defineBlocksWithJsonArray(
[{
  "type": "meta_call",
  "message0": "call function %1 name %2 arguments %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "F_NAME",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "ARGUMENTS",
      "check": "Array",
      "align": "RIGHT"
    }
  ],
  "output": null,
  "colour": 45,
  "tooltip": "Call a named function",
  "helpUrl": ""
},
{
  "type": "meta_value",
  "message0": "get value %1 name %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String",
      "align": "RIGHT"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 45,
  "tooltip": "Get value of variable programatically",
  "helpUrl": ""
},
{
  "type": "meta_set",
  "message0": "set value %1 name %2 value %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 45,
  "tooltip": "programatically set a value",
  "helpUrl": ""
}]
    );
