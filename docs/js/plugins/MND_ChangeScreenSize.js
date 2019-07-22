/*:
 * ===============================
 * MND_ChangeScreenSize.js
 * =============================== 
 * @plugindesc 修改游戏屏幕分辨率
 * @author 莴瓜 @66rpg
 * 
 * @param Screen Width
 * @desc 屏幕宽度
 * @default 816
 * 
 * @param Screen Height
 * @desc 屏幕高度
 * @default 624
 * 
 * @help
 * 配置 Screen Width 和 Screen Height 即可。
 *
 * by 鳗驼螺(Mandarava) 2016.06.06
 */

(function(){
    var params=PluginManager.parameters("MND_ChangeScreenSize");
    var screenWidth=Number(params["Screen Width"]);
    var screenHeight=Number(params["Screen Height"]);

    SceneManager._screenWidth  = screenWidth;
    SceneManager._screenHeight = screenHeight;
    SceneManager._boxWidth     = screenWidth;
    SceneManager._boxHeight    = screenHeight;

    var newWidth = screenWidth - window.innerWidth;
    var newHeight = screenHeight - window.innerHeight;  
    window.moveBy(- newWidth / 2, - newHeight / 2);
    window.resizeBy(newWidth, newHeight);
})();