let old_bgm_vol = 0;

function iframe_close()
{
    cg_bgm_on();
    $("#ftwindow").remove();
    // $gameScreen.startFadeIn(24,true);
}

function item_action( id )
{
    $gameParty.gainItem( $dataItems[id] , 1 );
    AudioManager.playMe({ name: "Item", pan: 0, pitch: 100, volume: 90 }); 
}

function cg_get_all_items()
{
    return $gameParty.allItems();
}

function cg_have_item( name )
{
    let have = false;
    $gameParty.allItems().forEach( item =>
    {
        if( item.name == name ) have = true;
    });
    return have;
}

function cg_get_item_id_by_name( name )
{
    var id = 0;
    $dataItems.forEach( item =>
    {
        if( item )
        {
            if( item.name == name ) id = item.id;
        }
    });
    return id;
}

function cg_keep_item( name )
{
    if( !cg_have_item( name ) )
    {
        const item_id = cg_get_item_id_by_name(name);

        if( item_id > 0 )
            $gameParty.gainItem( $dataItems[item_id] , 1 );
    }
}

function cg_get_item( name )
{
    cg_keep_item( name );
    AudioManager.playMe({ name: "Item", pan: 0, pitch: 100, volume: 90 });
}

function cg_bgm_on()
{
    ConfigManager.bgmVolume = old_bgm_vol > 0 ? old_bgm_vol : 50;
}

function cg_bgm_off()
{
    old_bgm_vol = ConfigManager.bgmVolume;
    ConfigManager.bgmVolume = 0;
}

function toggle_bgm()
{
    if( ConfigManager.bgmVolume > 0 )
    {
        old_bgm_vol = ConfigManager.bgmVolume;
        ConfigManager.bgmVolume = 0;
    }
    else
    {
        ConfigManager.bgmVolume = old_bgm_vol > 0 ? old_bgm_vol : 50;
    } 
}

function ftqq_create_div( url )
{
    // if( !$("#ftswitch").length )
    // {
    //     // 添加iframe
    //     var iSwitch = document.createElement('div');
    //     iSwitch.id = 'ftswitch';
    //     iSwitch.innerHTML = '<a href="javascript:$(\'.show\').removeClass(\'show\');void(0);">x</a>';
    //     document.getElementsByTagName('body')[0].appendChild(iSwitch);
    // }

    if( !$("#ftwindow").length )
    {
        // 添加iframe
        var iDiv = document.createElement('iframe');
        iDiv.id = 'ftwindow';
        iDiv.src = url;
        document.getElementsByTagName('body')[0].appendChild(iDiv);
    }

    
    // $gameScreen.startFadeOut(24,true);
    $("#ftwindow").addClass("show");
    cg_bgm_off();
    // $("#ftswitch").addClass("show");
    // $("#ftwindow").dblclick(()=>$("#ftwindow").removeClass("show")  );
    
}

/*
 *
 // 设置移动方式 0 为固定
 $gameMap._events[2]._moveType = 0;
 */