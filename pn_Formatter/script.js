'use strict';

// 新しい正規表現（() | () で「または」を表現）
// パターンA: 3桁-6桁-1桁
// パターンB: 4桁-6桁-2桁
const regex = /([A-Z0-9]{3}-[A-Z0-9]{6}-[0-9]{1})|([A-Z0-9]{4}-[A-Z0-9]{6}-[0-9]{2})/;

document.getElementById('runBtn').addEventListener('click', () => {
    // 1. 入力値を取得
    const inputArea = document.getElementById('inputList');
    const resultArea = document.getElementById('resultArea');
    const rawText = inputArea.value;

    // 2. テキストを改行、カンマ、タブ、スペースのどれかで分割
    const lines = rawText.split(/[\n\r, \t]+/);

    // 3. 正規表現パターンの定義
    // 前段(3-4文字) - 中段(6文字) - 後段(1-2文字)
    const regex = /(([A-Z0-9]{3}-[A-Z0-9]{6}-[0-9]{1})|([A-Z0-9]{4}-[A-Z0-9]{6}-[0-9]{2}))/;

    // 4. 結果を格納する変数（HTMLとして書き出す）
    let outputHtml = '';

    lines.forEach((line) => {
        const trimmedLine = line.trim().toUpperCase(); // 前後空白削除 & 大文字化

        if (trimmedLine === "") return; // 空行はスルー

        // matchメソッドで「正しい部分」を探す
        const found = trimmedLine.match(regex);

        if (found) {
            // found[0] にはマッチした「品番部分」だけが入る
            const cleanPN = found[0];
            outputHtml += `<div style="color: #1a73e8;">${cleanPN}</div>`;
        } else {
            // 行頭がパターンに合わない（前に余計な文字がある等）場合はエラー
            // outputHtml += `<div style="color: #d93025;">${trimmedLine} (No valid PN found)</div>`;
        }
    });

    // 5. 画面に反映
    resultArea.innerHTML = outputHtml || '変換する品番を入力してください';
    resultArea.style.color = '#d93025'; // 結果エリアを表示
});

// --- 追加：全件コピーボタンの処理 ---
document.getElementById('copyAllBtn').addEventListener('click', () => {
    if (extractedPNs.length === 0) {
        alert('コピーする品番がありません');
        return;
    }

    // 配列の中身を「改行」でつなげて一つの文字列にする
    const textToCopy = extractedPNs.join('\n');

    // クリップボードに書き込み
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(extractedPNs.length + '件の品番をコピーしました');
    }).catch(err => {
        console.error('コピーに失敗しました', err);
    });
});