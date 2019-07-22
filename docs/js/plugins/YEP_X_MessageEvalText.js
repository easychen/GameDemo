//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Eval Text
// YEP_X_MessageEvalText.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageEvalText = true;

var Yanfly = Yanfly || {};
Yanfly.MsgEval = Yanfly.MsgEval || {};
Yanfly.MsgEval.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Req YEP_MessageCore.js) Adds \evalText<<code>> to the text
 * code list so that you can run JavaScript code and display it as text.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_MessageCore. Make sure this plugin is located under
 * YEP_MessageCore in the plugin list.
 *
 * This is a small plugin that adds in a \evalText<<code>> text code for
 * messages so that people can run JavaScript code and display it as text.
 * This can be used to make calculations on the fly without needing to use
 * Change Variable events prior to displaying the amount or to determine what
 * kind of string would be displayed without making a plethora of Conditional
 * Branch events.
 *
 * ============================================================================
 * Text Code
 * ============================================================================
 *
 * \evalText<<code>>
 * - Replace 'code' with JavaScript code. It will run the code inside, then
 * return whatever is the last line of the code that's ran. Here are some
 * examples of what you could do this with:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Examples:
 *
 * ---
 *
 * \evalText<<$gameActors.actor(1).atk + $gameActors.actor(2).atk>>
 * - Displays the sum of actor 1's ATK and actor 2's ATK.
 *
 * ---
 *
 * \evalText<<Math.min(1000, $gameParty.gold())>>
 * - Displays either '1000' or the party's gold count, depending on which one
 * is currently smaller.
 *
 * ---
 *
 * \evalText<<['His','Her','Its'][\v[123]]>>
 * - Depending on the value of Variable 123, this will display 'His' if the
 * Variable 123 value is equal to 0, 'Her' if the value is equal to 1, or 'Its'
 * if the value is equal to 2.
 *
 * ---
 *
 * \evalText<<['Abel','Brandon','Chris'][$gameVariables.value(456)]>>
 * - Depending on the value of Variable 456, this will display 'Abel' if the
 * Variable 456 value is equal to 0, 'Brandon' if the value is equal to 1, or
 * 'Chris' if the value is equal to 2.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.MsgEval.Window_Base_convertEscCharacters =
  Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
  var text = Yanfly.MsgEval.Window_Base_convertEscCharacters.call(this, text);
  if (Imported.YEP_X_MessageMacros1) text = this.convertMacroText(text);
  text = text.replace(/\\/g, '\x1b');
  text = text.replace(/\x1b\x1b/g, '\\');
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bEVALTEXT<<(.*?)>>/gi, function() {
    return eval(arguments[1]);
  }.bind(this));
  return text;
};

Window_Base.prototype.battler = function() {
  if ($gameParty.inBattle()) {
    if (BattleManager.actor()) return BattleManager.actor();
    if (BattleManager._subject) return BattleManager._subject;
  }
  if (SceneManager._scene._actor) return SceneManager._scene._actor;
  return $gameParty.members()[0];
};

//=============================================================================
// Error Message
//=============================================================================
} else {

Imported.YEP_X_MessageEvalText = false;
var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MessageEvalText without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}
//=============================================================================
// End of File
//=============================================================================