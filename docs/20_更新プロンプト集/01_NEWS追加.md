# NEWS追加プロンプト

## 用途

NEWSを追加してgit pushする。

## プロンプト

```
D:\200_OneDrive\OneDrive\10_9mmRIOT関連\999_HP関連\10_ソースコード\news.json
に以下のNEWSを追加してgit pushしてください。

日付: YYYY.MM.DD
カテゴリ: EVENT / INFO / ENTRY / MEDIA
タイトル: ここにタイトル
リンク先: pages/event.html（またはURL、不要なら空欄）
```

## 補足

- news.jsonの配列の**先頭**に追加する（上が最新）
- カテゴリは4種類: EVENT（赤）, INFO（グレー）, ENTRY（緑）, MEDIA（紫）
- リンク先が外部URLの場合はhttps://から記載
- index.htmlのフォールバックHTMLも合わせて更新が必要
