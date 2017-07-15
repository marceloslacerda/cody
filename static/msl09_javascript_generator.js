'use strict';
/* https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#t84rq9 */

function stripQuotes(name) {
  return name.replace(/^'|'$/g, '');
}

Blockly.JavaScript['meta_call'] = function(block) {
  var value_f_name = Blockly.JavaScript.valueToCode(block, 'F_NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var value_arguments = Blockly.JavaScript.valueToCode(block, 'ARGUMENTS', Blockly.JavaScript.ORDER_ATOMIC);
  value_f_name = stripQuotes(value_f_name);
  var code = value_f_name + '.apply(null, ' + value_arguments + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['meta_value'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = stripQuotes(value_name);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['meta_set'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'var ' + stripQuotes(value_name) + ' = ' + value_value + ';\n';
  return code;
};

Blockly.JavaScript['code_block'] = function(block) {
  var statements_statement1 = Blockly.JavaScript.statementToCode(block, 'STATEMENT1');
  var value_statement2 = Blockly.JavaScript.valueToCode(block, 'STATEMENT2', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
  var code = '';
  if(statements_statement1) code += statements_statement1;
  if(value_statement2) code += value_statement2.replace(/^\(|\)$/g, '');
  return code;
};
