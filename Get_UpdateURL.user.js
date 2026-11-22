// ==UserScript==
// @name        Get UpdateURL 🔵
// @namespace        http://tampermonkey.net/
// @version        0.5
// @description        自動更新用のURL・メタデータを生成　　ショートカット「F10」
// @author        personwritep
// @match        https://github.com/personwritep/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @updateURL        https://github.com/personwritep/Get_UpdateURL/raw/main/Get_UpdateURL.user.js
// @downloadURL        https://github.com/personwritep/Get_UpdateURL/raw/main/Get_UpdateURL.user.js
// ==/UserScript==


window.addEventListener('keydown', check_key);
function check_key(event){
    if(event.keyCode==121){ // ショートカット「F10」
        event.preventDefault();
        event.stopImmediatePropagation();
        make_mata(); }}


function make_mata(){
    let file_name; // 入力枠に記入されたファイル名
    let meta_url; // 生成するURL
    let now_url=location.href;
    now_url=now_url.split('?')[0];
    let all_part=now_url.split('/');

    if(all_part.length>6){
        let fname_input=document.querySelector('input[aria-label="File name"]');
        if(!fname_input){
            alert(
                "⛔ ファイル名の入力枠がありません \n"+
                " ➔ ファイルの編集画面を開いてから「F10」を押してください"); }
        else{
            file_name=fname_input.value;
            if(file_name=='' || !file_name){
                alert("ファイル名を入力してください"); }
            else{
                if(file_name.includes('.user.js')){
                    all_part[7]=file_name; } // 入力枠のファイル名を設定
                else{
                    let name_parts=file_name.split('_');
                    if(name_parts.length>1){ // バージョンがあると思われる場合
                        let file_ver=name_parts[name_parts.length-1]; // 最後の「_0.3」等のバージョン表示を取得
                        file_ver=file_ver.replace(/\./g, ''); // ドットを削除
                        if(file_ver.match(/^[0-9]+$/)){
                            name_parts.pop(); }} // 末尾がバージョン表示なら削除
                    all_part[7]=name_parts.join('_') +'.user.js'; }


                all_part[5]='raw';
                meta_url=all_part.join('/');

                let add_meta_url=
                    '// @updateURL        '+ meta_url +'\n'+
                    '// @downloadURL        '+ meta_url;


                if (navigator.clipboard && add_meta_url){ // copyToClipboardを実行
                    navigator.clipboard.writeText(add_meta_url);

                    alert("クリップボードに「Update URL」を生成保存しました"); }

            } // if(file_name=='' || !file_name)

        } // if(!fname_input)

    } // if(all_part.length>6)

} // make_mata()
