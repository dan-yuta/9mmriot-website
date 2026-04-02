# Google フォーム応募システム 構築手順

フォームで応募を受付 → 既存スプレッドシートの「バンドメンバープロフィール」シートに自動反映する仕組みを作ります。

---

## 全体の流れ

```
応募者がフォーム入力
  ↓
Google フォームが回答を「フォームの回答」シートに記録
  ↓
Google Apps Script が自動で起動
  ↓
「バンドメンバープロフィール」シートにバンド名・パート・メンバー名を追記
```

---

## STEP 1: Google フォームを作成する

### 1-1. フォームを作成

1. [Google Forms](https://forms.google.com) にアクセス
2. 「空白のフォーム」を選択
3. タイトルを「9mmRIOT9 出演バンド応募フォーム」に設定

### 1-2. フォームの項目を追加

以下の順番で項目を追加してください。

| # | 項目名 | タイプ | 必須 | 備考 |
|---|---|---|---|---|
| 1 | バンド名 | 記述式（短文） | 必須 | 説明文:「仮でも未定でもOKです！」 |
| 2 | メンバー人数 | プルダウン | 必須 | 選択肢: 2, 3, 4, 5, 6, 7, 8 |
| 3 | メンバー1 パート | プルダウン | 必須 | 選択肢: Vo., Gt., Vo./Gt., Ba., Dr., Key., その他 |
| 4 | メンバー1 名前 | 記述式（短文） | 必須 | 説明文:「ニックネームでもOKです！」 |
| 5 | メンバー2 パート | プルダウン | 必須 | 同上の選択肢 |
| 6 | メンバー2 名前 | 記述式（短文） | 必須 | |
| 7 | メンバー3 パート | プルダウン | 任意 | |
| 8 | メンバー3 名前 | 記述式（短文） | 任意 | |
| 9 | メンバー4 パート | プルダウン | 任意 | |
| 10 | メンバー4 名前 | 記述式（短文） | 任意 | |
| 11 | メンバー5 パート | プルダウン | 任意 | |
| 12 | メンバー5 名前 | 記述式（短文） | 任意 | |
| 13 | メンバー6 パート | プルダウン | 任意 | |
| 14 | メンバー6 名前 | 記述式（短文） | 任意 | |
| 15 | メンバー7 パート | プルダウン | 任意 | |
| 16 | メンバー7 名前 | 記述式（短文） | 任意 | |
| 17 | メンバー8 パート | プルダウン | 任意 | |
| 18 | メンバー8 名前 | 記述式（短文） | 任意 | |
| 19 | バンドPR | 段落（長文） | 任意 | 説明文:「バンドの紹介文があればご記入ください」 |
| 20 | 代表者のXアカウント | 記述式（短文） | 必須 | 説明文:「連絡用に使用します（例: @xxxx）」 |
| 21 | 備考・質問 | 段落（長文） | 任意 | |

### 1-3. フォームの設定

- 「設定」タブ → 「回答」→「メールアドレスを収集する」をON（任意）
- 「プレゼンテーション」→ 確認メッセージを設定:
  「ご応募ありがとうございます！主催より確認のご連絡をいたします。」

---

## STEP 2: フォームの回答をスプレッドシートに紐づける

1. フォーム編集画面で「回答」タブをクリック
2. 「スプレッドシートにリンク」（緑のアイコン）をクリック
3. **「既存のスプレッドシートを選択」** を選ぶ
4. 対象のスプレッドシート `2026/yy/dd_9mmRIOT9` を選択
5. → 「フォームの回答」というシートが自動作成される

---

## STEP 3: Google Apps Script で自動転記を設定

フォーム回答が来たら「バンドメンバープロフィール」シートに自動で書き込むスクリプトを設定します。

### 3-1. スクリプトエディタを開く

1. スプレッドシートを開く
2. メニュー「拡張機能」→「Apps Script」をクリック

### 3-2. スクリプトを貼り付ける

エディタのコードをすべて削除し、以下を貼り付けてください。

```javascript
/**
 * フォーム送信時に「バンドメンバープロフィール」シートへ自動転記する
 */
function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const profileSheet = ss.getSheetByName('バンドメンバープロフィール');

  if (!profileSheet) {
    Logger.log('「バンドメンバープロフィール」シートが見つかりません');
    return;
  }

  const responses = e.namedValues;

  const bandName = responses['バンド名'][0];
  const bandPR = responses['バンドPR'] ? responses['バンドPR'][0] : '';

  // メンバー情報を収集（最大8人）
  const members = [];
  for (let i = 1; i <= 8; i++) {
    const partKey = 'メンバー' + i + ' パート';
    const nameKey = 'メンバー' + i + ' 名前';
    const part = responses[partKey] ? responses[partKey][0] : '';
    const name = responses[nameKey] ? responses[nameKey][0] : '';
    if (part && name) {
      members.push({ part: part, name: name });
    }
  }

  if (members.length === 0) return;

  // 現在のデータの最終行を取得
  const lastRow = profileSheet.getLastRow();

  // 空行を1行入れてから書き込み（バンド間の区切り）
  const startRow = lastRow + 2;

  // 出演番号を計算（B列の最大値 + 1）
  const bColValues = profileSheet.getRange('B3:B' + lastRow).getValues();
  let maxNum = 0;
  bColValues.forEach(row => {
    const val = parseInt(row[0]);
    if (!isNaN(val) && val > maxNum) maxNum = val;
  });
  const bandNum = maxNum + 1;

  // 各メンバーを1行ずつ書き込み
  members.forEach((member, index) => {
    const row = startRow + index;
    // B列: 出演番号（1人目のみ）
    if (index === 0) {
      profileSheet.getRange(row, 2).setValue(bandNum);
    }
    // C列: バンド名（1人目のみ）
    if (index === 0) {
      profileSheet.getRange(row, 3).setValue(bandName);
    }
    // D列: パート
    profileSheet.getRange(row, 4).setValue(member.part);
    // E列: メンバー名
    profileSheet.getRange(row, 5).setValue(member.name);
    // F列: バンドPR（1人目のみ）
    if (index === 0 && bandPR) {
      profileSheet.getRange(row, 6).setValue(bandPR);
    }
  });

  Logger.log('転記完了: ' + bandName + '（' + members.length + '人）');
}
```

### 3-3. トリガーを設定

1. Apps Script エディタの左メニューで「トリガー」（時計アイコン）をクリック
2. 「トリガーを追加」をクリック
3. 以下のように設定:
   - **実行する関数**: `onFormSubmit`
   - **イベントのソース**: スプレッドシートから
   - **イベントの種類**: フォーム送信時
4. 「保存」をクリック
5. Google アカウントの権限確認が出たら「許可」をクリック

### 3-4. テスト

1. フォームのプレビューからテスト回答を送信
2. 「バンドメンバープロフィール」シートに追記されていることを確認
3. テストデータを削除

---

## STEP 4: HPにフォームのリンクを設定

募集開始時に `pages/entry-riot9.html` を編集します。

```html
<!-- この部分のコメントを外してURLを設定 -->
<a href="GOOGLE_FORM_URL" target="_blank" rel="noopener" class="btn btn-primary">
  <i class="fa-solid fa-pen-to-square"></i> 応募フォームはこちら
</a>
```

`GOOGLE_FORM_URL` をフォームの公開URLに差し替えてください。

---

## 運用の流れ

```
1. 募集開始
   → Xで告知 + entry-riot9.html のフォームリンクを有効化

2. 応募受付中
   → フォーム回答 → スプレッドシートに自動転記
   → スプレッドシートで応募状況を確認

3. 募集締切
   → フォームの「回答を受付中」をOFFに変更
   → entry-riot9.html のステータスバッジを「締切」に変更
```

---

## トラブルシューティング

### スプレッドシートに反映されない場合

1. Apps Script の「実行ログ」を確認
2. トリガーが正しく設定されているか確認
3. シート名が「バンドメンバープロフィール」と完全一致しているか確認

### フォームの項目名を変更した場合

スクリプト内の `responses['メンバー1 パート']` などのキー名も合わせて変更してください。
項目名とスクリプトのキー名が一致しないと動作しません。
