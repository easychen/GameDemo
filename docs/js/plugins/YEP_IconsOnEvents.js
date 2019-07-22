//=============================================================================
// Yanfly Engine Plugins - Icons On Events
// YEP_IconsOnEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_IconsOnEvents = true;

var Yanfly = Yanfly || {};
Yanfly.IconsOnEvents = Yanfly.IconsOnEvents || {};
Yanfly.IconsOnEvents.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Allows you to put icons on events and the player!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to put icons on events and/or the player? With this plugin, you
 * can easily do it through a notetag, comment tag, movement script, or script
 * calls. The icons can be attached to either the target's head or moved around
 * with buffer values! Placing icons on events can be used for a variety of
 * things, such as puzzles involving holding items or using icons to mark
 * certain objects on the map. The possibilities are endless!
 *
 * ============================================================================
 * Instructions - Notetags and Comment Tags
 * ============================================================================
 *
 * The easiest way to attach icons to events would be to use notetags and/or
 * comment tags. Using notetags will make the icon always attached to the event
 * while using comment tags will make the icon attached to the event only if
 * the page containing the comment tag is active.
 *
 *   <Icon on Event: n>
 *   - Replace 'n' with the icon you wish to attach to the event.
 *
 *   <Icon on Event Buffer X: +x>
 *   <Icon on Event Buffer X: -x>
 *   - Replace 'x' with the buffer amount for X. For X, a negative number moves
 *   it left and a positive one moves it right.
 *
 *   <Icon on Event Buffer Y: +y>
 *   <Icon on Event Buffer Y: -y>
 *   - Replace 'y' with the buffer amount for Y. For Y, a negative number moves
 *   it up and a positive one moves it down.
 *
 *   <Icon on Event Buffer: +x, +y>
 *   <Icon on Event Buffer: -x, -y>
 *   - Replace 'x' and 'y' with the respective buffer values you wish to apply.
 *   For X, a negative number moves it left and a positive one moves it right.
 *   For Y, a negative number moves it up and a positive one moves it down.
 *
 * Keep in mind these notetags and comment tags only work for events. They do
 * not work on the player character. If you wish to apply icons to the player
 * character, you'd have to use one of the methods below.
 *
 * ============================================================================
 * Instructions - Movement Route - Script
 * ============================================================================
 *
 * Using a Movement Route event to attach an icon is a bit easier than using a
 * Script Call to attach an icon. Whichever is the target in the Movement Route
 * dropdown list is the target that will have an icon attached to it when the
 * following script command is used:
 *
 *   this.setIconOnEvent(n)
 *   - Replace 'n' with the icon index you wish to use.
 *
 * If you wish to change the X and Y buffers on the icon, use the following
 * script commands:
 *
 *   this.setIconOnEventBufferX(n)
 *   this.setIconOnEventBufferY(n)
 *   - Replace 'n' with the positioning buffer you wish to alter X or Y by.
 *   For X, a negative number moves it left and a positive one moves it right.
 *   For Y, a negative number moves it up and a positive one moves it down.
 *
 * To clear the icon or to reset the X and Y buffers, use the following
 * script commands:
 *
 *   this.clearIconOnEvent()
 *   - This will clear the icon on the event.
 *
 *   this.resetIconOnEventBuffers()
 *   - This will reset the X and Y buffers to what they are in the plugin
 *   parameter settings.
 *
 * ============================================================================
 * Instructions - Script Calls
 * ============================================================================
 *
 * Using script calls are a little bit more difficult but they're more flexible
 * to use than Movement Route scripts.
 *
 *   ---
 *
 *   var target = $gameMap.event(i);
 *   target.setIconOnEvent(j);
 *   - This will grab event 'i' from the map and place icon 'j' on it.
 *
 *   var target = $gamePlayer;
 *   target.setIconOnEvent(j);
 *   - This will place icon 'j' on the player character.
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.setIconOnEvent(j);
 *   - This will target follower 'i' and place icon 'j' on that follower.
 *
 *   ---
 *
 * To adjust the buffer values of the targets, try the following script calls.
 *
 *   ---
 *
 *   var target = $gameMap.event(i);
 *   target.setIconOnEventBufferX(x);
 *   target.setIconOnEventBufferY(y);
 *   - The target becomes event 'i'. The 'x' and 'y' values will determine
 *   the X and Y buffers of the icon on the target.
 *
 *   var target = $gamePlayer;
 *   target.setIconOnEventBufferX(x);
 *   target.setIconOnEventBufferY(y);
 *   - The target becomes the player. The 'x' and 'y' values will determine
 *   the X and Y buffers of the icon on the target.
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.setIconOnEventBufferX(x);
 *   target.setIconOnEventBufferY(y);
 *   - The target becomes follower 'i'. The 'x' and 'y' values will determine
 *   the X and Y buffers of the icon on the target.
 *
 *   ---
 *
 * To clear the icon or to reset the X and Y buffers, use the following
 * script calls:
 *
 *   ---
 *
 *   var target = $gameMap.event(i);
 *   target.clearIconOnEvent();
 *   - The target becomes event 'i'. Clears the icon on the target.
 *
 *   var target = $gamePlayer;
 *   target.clearIconOnEvent();
 *   - The target becomes the player. Clears the icon on the target.
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.clearIconOnEvent();
 *   - The target becomes follower 'i'. Clears the icon on the target.
 *
 *   var target = $gameMap.event(i);
 *   target.resetIconOnEventBuffers();
 *   - The target becomes event 'i'. Resets the X and Y buffers.
 *
 *   var target = $gamePlayer;
 *   target.resetIconOnEventBuffers();
 *   - The target becomes the player. Resets the X and Y buffers.
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.resetIconOnEventBuffers();
 *   - The target becomes follower 'i'. Resets the X and Y buffers.
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
 * @param X Buffer
 * @desc Change how far left or right the icon should appear over
 * events. These are default values and can be changed later.
 * @default 0
 *
 * @param Y Buffer
 * @desc Change how far up or down the icon should appear over
 * events. These are default values and can be changed later.
 * @default 12
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_IconsOnEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IconsOnEventsBufferX = Number(Yanfly.Parameters['X Buffer']);
Yanfly.Param.IconsOnEventsBufferY = Number(Yanfly.Parameters['Y Buffer']);

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.IconsOnEvents.Game_CharacterBase_initMembers =
  Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Yanfly.IconsOnEvents.Game_CharacterBase_initMembers.call(this);
  this.initIconOnEvent();
};

Game_CharacterBase.prototype.initIconOnEvent = function() {
  this._iconOnEvent = 0;
  this._iconOnEventBufferX = Yanfly.Param.IconsOnEventsBufferX;
  this._iconOnEventBufferY = Yanfly.Param.IconsOnEventsBufferY;
};

Game_CharacterBase.prototype.iconOnEvent = function() {
  if (this._iconOnEvent === undefined) this.initIconOnEvent();
  return this._iconOnEvent;
};

Game_CharacterBase.prototype.setIconOnEvent = function(iconIndex) {
  if (this._iconOnEvent === undefined) this.initIconOnEvent();
  this._iconOnEvent = iconIndex;
};

Game_CharacterBase.prototype.iconOnEventBufferX = function() {
  if (this._iconOnEventBufferX === undefined) this.initIconOnEvent();
  return this._iconOnEventBufferX;
};

Game_CharacterBase.prototype.setIconOnEventBufferX = function(value) {
  if (this._iconOnEventBufferX === undefined) this.initIconOnEvent();
  this._iconOnEventBufferX = value;
};

Game_CharacterBase.prototype.iconOnEventBufferY = function() {
  if (this._iconOnEventBufferY === undefined) this.initIconOnEvent();
  return this._iconOnEventBufferY;
};

Game_CharacterBase.prototype.setIconOnEventBufferY = function(value) {
  if (this._iconOnEventBufferY === undefined) this.initIconOnEvent();
  this._iconOnEventBufferY = value;
};

Game_CharacterBase.prototype.clearIconOnEvent = function() {
  this.setIconOnEvent(0);
};

Game_CharacterBase.prototype.resetIconOnEventBuffers = function() {
  this._iconOnEventBufferX = Yanfly.Param.IconsOnEventsBufferX;
  this._iconOnEventBufferY = Yanfly.Param.IconsOnEventsBufferY;
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.IconsOnEvents.Game_Event_setupPageSettings =
  Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
  this.clearIconOnEvent();
  this.resetIconOnEventBuffers();
  Yanfly.IconsOnEvents.Game_Event_setupPageSettings.call(this);
  this.setupIconOnEventNotetags();
  this.setupIconOnEventCommentTags();
};

Game_Event.prototype.setupIconOnEventNotetags = function() {
  if (this.event().note === '') return;
  var note1 = /<Icon On Event: (\d+)>/i;
  var note2 = /<Icon On Event Buffer X: ([\+\-]\d+)>/i;
  var note3 = /<Icon On Event Buffer Y: ([\+\-]\d+)>/i;
  var note4 = /<Icon On Event Buffer: ([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  if (this.event().note.match(note1)) {
    this.setIconOnEvent(parseInt(RegExp.$1));
  } else if (this.event().note.match(note2)) {
    this.setIconOnEventBufferX(parseInt(RegExp.$1));
  } else if (this.event().note.match(note3)) {
    this.setIconOnEventBufferY(parseInt(RegExp.$1));
  } else if (this.event().note.match(note4)) {
    this.setIconOnEventBufferX(parseInt(RegExp.$1));
    this.setIconOnEventBufferY(parseInt(RegExp.$2));
  }
};

Game_Event.prototype.setupIconOnEventCommentTags = function() {
  if (!this.page()) return;
  var note1 = /<Icon On Event: (\d+)>/i;
  var note2 = /<Icon On Event Buffer X: ([\+\-]\d+)>/i;
  var note3 = /<Icon On Event Buffer Y: ([\+\-]\d+)>/i;
  var note4 = /<Icon On Event Buffer: ([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this.setIconOnEvent(parseInt(RegExp.$1));
      } else if (ev.parameters[0].match(note2)) {
        this.setIconOnEventBufferX(parseInt(RegExp.$1));
      } else if (ev.parameters[0].match(note3)) {
        this.setIconOnEventBufferY(parseInt(RegExp.$1));
      } else if (ev.parameters[0].match(note4)) {
        this.setIconOnEventBufferX(parseInt(RegExp.$1));
        this.setIconOnEventBufferY(parseInt(RegExp.$2));
      }
    }
  }
};

//=============================================================================
// Sprite_Character
//=============================================================================

Yanfly.IconsOnEvents.Sprite_Character_initMembers =
  Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function() {
  Yanfly.IconsOnEvents.Sprite_Character_initMembers.call(this);
  this.createIconOnEventSprite();
};

Sprite_Character.prototype.createIconOnEventSprite = function() {
  this._iconOnEventSprite = new Sprite();
  this._iconOnEventSprite.bitmap = ImageManager.loadSystem('IconSet');
  this._iconOnEventSprite.setFrame(0, 0, 0, 0);
  this._iconOnEventSprite.anchor.x = 0.5;
  this._iconOnEventSprite.anchor.y = 1;
  this._iconOnEventId = 0;
  this.addChild(this._iconOnEventSprite);
};

Yanfly.IconsOnEvents.Sprite_Character_updateOther =
  Sprite_Character.prototype.updateOther;
Sprite_Character.prototype.updateOther = function() {
  Yanfly.IconsOnEvents.Sprite_Character_updateOther.call(this);
  this.updateIconOnEvent();
};

Sprite_Character.prototype.updateIconOnEvent = function() {
  if (this._character && this._character.iconOnEvent()) {
    this._iconOnEventId = this._character.iconOnEvent();
  } else {
    this._iconOnEventId = 0;
  }
  var pw = Sprite_StateIcon._iconWidth;
  var ph = Sprite_StateIcon._iconHeight;
  var sx = this._iconOnEventId % 16 * pw;
  var sy = Math.floor(this._iconOnEventId / 16) * ph;
  this._iconOnEventSprite.setFrame(sx, sy, pw, ph);
  if (this._iconOnEventId > 0) {
    var bufferX = this._character.iconOnEventBufferX();
    var bufferY = this._character.iconOnEventBufferY();
    this._iconOnEventSprite.x = bufferX;
    this._iconOnEventSprite.y = -1 * this.height + bufferY;
  }
};

Yanfly.IconsOnEvents.Sprite_Character_updateIconOnEvent =
  Sprite_Character.prototype.updateIconOnEvent;
Sprite_Character.prototype.updateIconOnEvent = function() {
  Yanfly.IconsOnEvents.Sprite_Character_updateIconOnEvent.call(this);
  this.removeChild(this._iconOnEventSprite);
  this.addChild(this._iconOnEventSprite);
};

//=============================================================================
// End of File
//=============================================================================