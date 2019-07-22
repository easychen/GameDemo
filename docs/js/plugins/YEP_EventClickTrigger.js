//=============================================================================
// Yanfly Engine Plugins - Event Click Trigger
// YEP_EventClickTrigger.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventClickTrigger = true;

var Yanfly = Yanfly || {};
Yanfly.EvClTr = Yanfly.EvClTr || {};
Yanfly.EvClTr.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Lets the player click on designated notetagged events to
 * trigger them from afar!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to be able to click an event and just trigger it immediately
 * without having to have your player character walk all the way up to it to
 * examine it first before triggering it? With this plugin, you can. By setting
 * certain notetags and/or comment tags on specific events, the player can now
 * trigger an event from afar by just clicking on it.
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * To make an event click triggerable from anywhere on the screen, use either
 * notetags or comment tags to enable them to become clickable. If a notetag is
 * used, then this will apply to the whole event, no matter what page it is. If
 * only comment tags are used, it will only apply to that specific event page.
 *
 * Event Notetag and Comment Tags
 *
 *   <Click Trigger>
 *   - This will cause the event to be clickable from afar without needing the
 *   player to walk all the way up in front of it to trigger it.
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
 *
 */
//=============================================================================

//=============================================================================
// Game_Temp
//=============================================================================

Yanfly.EvClTr.Game_Temp_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {
  if (!this.isClickableEventAtXy(x, y)) {
    Yanfly.EvClTr.Game_Temp_setDestination.call(this, x, y);
  }
};

Game_Temp.prototype.isClickableEventAtXy = function(x, y) {
  var events = $gameMap.eventsXy(x, y);
  var length = events.length;
  for (var i = 0; i < events.length; ++i) {
    var ev = events[i];
    if (ev && ev.isClickTriggered()) {
      ev.onMouseClickTrigger();
      return;
    }
  }
};

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.EvClTr.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    Yanfly.EvClTr.TouchInput_onMouseMove.call(this, event);
    this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
    this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isClickTriggered = function() {
  if (this.event().note.match(/<Click Trigger>/i)) return true;
  if (this._isClickTriggerable === undefined) {
    this.setupEventClickTriggerCommentTags();
  }
  return this._isClickTriggerable;
};

Yanfly.EvClTr.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
  Yanfly.EvClTr.Game_Event_setupPage.call(this);
  this.setupEventClickTriggerCommentTags();
};

Game_Event.prototype.setupEventClickTriggerCommentTags = function() {
  if (!this.page()) return;
  this._isClickTriggerable = false;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(/<Click Trigger>/i)) {
        this._isClickTriggerable = true;
      }
    }
  }
};

Game_Event.prototype.onMouseClickTrigger = function() {
  if (this.isClickTriggered()) {
    $gameTemp.clearDestination();
    this.start();
  }
};

//=============================================================================
// End of File
//=============================================================================