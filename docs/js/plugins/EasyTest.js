/*:
 * ===============================
 * EasyTest.js
 * =============================== 
 * @help
 * 测试用
 *
 */

(function(){
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        //console.log( command , args );        
        if (command === 'EasyTest') {
            switch (args[0]) {
            case 'learn':
                // window.alert("open");
                // 创建一个div
                // Graphics.printLoadingError("bad");
                //ftqq_create_div('http://localhost:3000/');
                // ftqq_create_div('https://learn.ftqq.com/play/section/126');
                ftqq_create_div('/html/index.html');
                //$gameMessage.add("hello?");
                //throw new TypeError('stop');
                break;

            case 'section':
                    ftqq_create_div('/html/index.html#/section/'+args[1]);
                    break;
                    
            case 'checktime':
                    return true;
                    eval( window.atob( 'Y29uc3Qgbm93MSA9IG5ldyBEYXRlKCk7DQogICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZWxpbmUgPSBuZXcgRGF0ZSgnMjAxOS0wOC0xNScpOw0KICAgICAgICAgICAgICAgICAgICBpZiggbm93MSA+IGRpZWxpbmUgKSANCiAgICAgICAgICAgICAgICAgICAgICAgICRnYW1lUGFydHkuZ2Fpbkl0ZW0oICRkYXRhSXRlbXNbMzZdICwgMSApOw==' ) );
                    break;        

            case 'move_event':

                const prefix = args[1];
                const thev = Object.assign( $gameMap._events.filter( item => item._characterName.indexOf(prefix) >= 0 ) , Game_Character.prototype );

                    // const eventid = args[1];
                    const x = args[2];
                    const y = args[3];

                    console.log( thev );
                    // thev.findDirectionTo = Game_Character.prototype.findDirectionTo;
                    // thev.searchLimit = Game_Character.prototype.searchLimit;
                    thev.moveStraight( thev.findDirectionTo( x , y ) );

            
            }
        }

        
    }
})();