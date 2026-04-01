# 9mmRIOT Official Website

9mm Parabellum Bullet ONLY COPY BAND EVENT
**9mmRIOT** の公式ウェブサイトです。

---

## サイト概要

| 項目 | 内容 |
|---|---|
| イベント名 | 9mmRIOT（9mmライオット） |
| 内容 | 9mm Parabellum Bullet オンリーのコピーバンドイベント |
| 公式X | [@9mmRIOT](https://x.com/9mmRIOT) |
| YouTube | [@9mmriot970](https://www.youtube.com/@9mmriot970) |

---

## サイトマップ

```
                    ┌─────────────────────────────────────┐
                    │          トップページ (index.html)          │
                    │                                     │
                    │  ┌─────┐ ┌─────┐ ┌─────┐ ┌───────┐ │
                    │  │HERO │ │NEWS │ │ABOUT│ │ EVENT │ │
                    │  │     │ │最新3件│ │紹介文│ │次回情報│ │
                    │  └─────┘ └──┬──┘ └──┬──┘ │過去4件│ │
                    │             │       │    └──┬────┘ │
                    │  ┌─────┐    │       │       │      │
                    │  │MOVIE│    │       │       │      │
                    │  │YouTube│   │       │       │      │
                    │  └─────┘    │       │       │      │
                    │  ┌───────┐  │       │       │      │
                    │  │CONTACT│  │       │       │      │
                    │  │X DM  │  │       │       │      │
                    │  └───────┘  │       │       │      │
                    └─────────────┼───────┼───────┼──────┘
                                 │       │       │
              ┌──────────────────┘       │       └──────────────────┐
              ▼                          ▼                          ▼
    ┌─────────────────┐        ┌──────────────┐          ┌──────────────────┐
    │  NEWS 一覧       │        │  ABOUT 詳細   │          │  EVENT 一覧       │
    │  (news.html)    │        │  (about.html) │          │  (event.html)    │
    │                 │        │               │          │                  │
    │  カテゴリ絞り込み  │        │  理念          │          │  NEXT EVENT      │
    │  EVENT/INFO/    │        │  ヒストリー年表  │          │  PAST EVENTS     │
    │  ENTRY/MEDIA    │        │               │          │  全8回一覧        │
    └─────────────────┘        └──────────────┘          └────────┬─────────┘
                                                                  │
                        ┌──────────┬──────────┬──────────┬────────┘
                        ▼          ▼          ▼          ▼
                  ┌──────────┐┌──────────┐┌──────────┐┌──────────┐
                  │ riot1    ││ riot2    ││  ...     ││ riot8    │
                  │ vol.01   ││ vol.02   ││          ││          │
                  │          ││          ││          ││          │
                  │ フライヤー ││ フライヤー ││          ││ フライヤー │
                  │ 開催情報  ││ 開催情報  ││          ││ 開催情報  │
                  │ 出演バンド ││ 出演バンド ││          ││ 出演バンド │
                  │          ││          ││          ││ YouTube  │
                  └──────────┘└──────────┘└──────────┘└──────────┘
                        ◄──── 前後ナビゲーションで全ページつながる ────►

                  ┌───────────────────────────┐
                  │  ENTRY（開催ごとに作成）       │
                  │  entry-riot9.html             │
                  │  entry-riot10.html  ← 将来    │
                  │  entry-riot11.html  ← 将来    │
                  │                               │
                  │  はじめての方へ                  │
                  │  応募の流れ(3STEP)              │
                  │  募集要項カード                  │
                  │  注意事項                       │
                  └───────────────────────────┘
```

---

## ページ一覧と内容

### トップページ（index.html）

1ページ完結のランディングページ。スクロールで各セクションを表示。

| セクション | 内容 |
|---|---|
| HERO | フルスクリーン。ロゴ + キャッチコピー + 「NEXT EVENT」「ABOUT」ボタン |
| NEWS | 最新のお知らせ3件。news.jsonから自動読み込み |
| ABOUT | イベント紹介文 + 統計（8回開催 / 50+バンド / 10年の歴史）+ ライブ写真 |
| EVENT | 次回イベント情報カード + 過去イベント4件（RIOT5〜8） |
| MOVIE | 9mmRIOT vol.08のYouTubeアーカイブ（サムネイルクリックで再生） |
| CONTACT | XのDMへの案内 |

### NEWS 一覧（pages/news.html）

- お知らせの全件表示
- カテゴリ別フィルター（EVENT / INFO / ENTRY / MEDIA）
- データは `news.json` で管理（1ファイル編集で両ページに反映）

### ABOUT 詳細（pages/about.html）

- 9mmRIOTの理念・紹介文
- HISTORY: 2016年〜現在までの年表

### EVENT 一覧（pages/event.html）

- NEXT EVENT: 9mmRIOT vol.09 の情報カード
- PAST EVENTS: 全8回の一覧（フライヤーサムネイル付き）
- 各イベントをクリックで詳細ページに遷移

### イベント詳細（pages/riot1.html 〜 riot8.html）

各回の詳細ページ。全8ページ。

| 要素 | 内容 |
|---|---|
| フライヤー | イベントのフライヤー画像（左側に大きく表示） |
| 開催情報 | 日程・会場・開場時間・チケット料金 |
| 出演バンド | 出演バンド名一覧（出演順） |
| アーカイブ | YouTubeライブ配信のサムネイル（RIOT5以降） |
| ナビゲーション | 前回 ← → 次回 のページ送り |

### 出演バンド募集（pages/entry-riot9.html）

**開催ごとにページを作成** します。条件（持ち時間・出演費・日程等）が回ごとに異なるためです。

- 募集ステータス表示（準備中 / 募集中 / 締切）
- 「はじめての方へ」: 初心者歓迎メッセージ
- 応募の流れ: 3ステップ図解（メンバー集め → フォーム応募 → 出演決定）
- 募集要項: 4枚のカード（持ち時間 / 出演費 / セトリ調整 / 配信）
- 注意事項
- 応募フォームへの導線（Google フォーム連携予定）

#### 次回の募集ページ作成方法

1. `entry-riot9.html` をコピーして `entry-riot10.html` を作成
2. タイトル・日程・会場・条件（持ち時間・出演費等）を書き換え
3. `event.html` のリンク先を新しいファイルに変更

---

## 技術構成

```
HTML + CSS + JavaScript（フレームワーク不使用）
```

| 項目 | 詳細 |
|---|---|
| HTML | 静的HTML。全15ページ |
| CSS | 1ファイル（style.css）。CSS変数でテーマ管理、レスポンシブ対応 |
| JavaScript | 1ファイル（main.js）。スクロールアニメーション、ハンバーガーメニュー、NEWS読み込み |
| NEWS管理 | news.json（JSONファイルを編集するだけで更新可能） |
| フォント | Google Fonts（Noto Sans JP + Oswald） |
| アイコン | Font Awesome 6（CDN） |
| 画像 | ロゴ、フライヤー8枚、ライブ写真1枚 |

### デザイン

| 項目 | 値 |
|---|---|
| テーマ | ダーク（黒ベース） |
| 背景色 | `#0a0a0a` |
| アクセントカラー | `#c41e3a`（赤） |
| 文字色 | `#e8e8e8`（白系） |
| レスポンシブ | PC / タブレット / スマホ 3段階対応 |

---

## ファイル構成

```
10_ソースコード/
│
├── index.html              トップページ
├── news.json               NEWSデータ（これを編集するだけでNEWS更新）
├── favicon.svg             ファビコン（黒背景 + R）
├── README.md               このファイル
│
├── CSS/
│   └── style.css           メインスタイルシート（全ページ共通）
│
├── JS/
│   └── main.js             JavaScript（アニメーション・メニュー・NEWS読み込み）
│
├── images/
│   ├── logo.png            ロゴ画像（ヘッダー・フッター・ファビコン用）
│   ├── hero-photo.jpg      トップページABOUTセクションのライブ写真
│   └── flyers/             フライヤー画像
│       ├── riot1-flyer.jpg
│       ├── riot2-flyer.jpg
│       ├── riot3-flyer.jpg
│       ├── riot4-flyer.jpg
│       ├── riot5-flyer.jpg
│       ├── riot6-flyer.jpg
│       ├── riot7-flyer.jpg
│       └── riot8-flyer.jpg
│
└── pages/                  個別ページ
    ├── about.html          ABOUT 詳細
    ├── event.html          EVENT 一覧
    ├── news.html           NEWS 一覧
    ├── entry-riot9.html    9mmRIOT vol.09 出演バンド募集（開催ごとに作成）
    ├── riot1.html          9mmRIOT vol.01（2016）
    ├── riot2.html          9mmRIOT vol.02（2017）
    ├── riot3.html          9mmRIOT vol.03（2018）
    ├── riot4.html          9mmRIOT vol.04（2019）
    ├── riot5.html          Re:9mmRIOT vol.05（2022）
    ├── riot6.html          9mmRIOT vol.06（2023）
    ├── riot7.html          9mmRIOT vol.07（2024）
    └── riot8.html          9mmRIOT vol.08（2025）
```

---

## ローカルでの確認方法

### 方法1: そのまま開く

`index.html` をブラウザにドラッグ&ドロップ

> **注意**: `file://` プロトコルではNEWSの自動読み込み（fetch）が動作しません。
> NEWSはHTMLに書かれたフォールバックが表示されます。

### 方法2: ローカルサーバー（推奨）

```bash
# 10_ソースコード フォルダで実行
npx serve

# または
python -m http.server 8000
```

`http://localhost:3000`（または `8000`）で全機能が動作します。

---

## デプロイ

### GitHub + Netlify

1. `10_ソースコード/` の中身をGitHubリポジトリのルートに配置
2. Netlifyに接続
3. Publish directory: `/`（デフォルト）
4. 自動デプロイ完了

---

## NEWS の更新方法

`news.json` を編集するだけ。トップページ（最新3件）とNEWS一覧（全件）に自動反映。

```json
[
  {
    "date": "2026.04.09",
    "tag": "EVENT",
    "text": "9mmRIOT vol.09 開催決定！",
    "link": "pages/event.html"
  }
]
```

新しい記事は **配列の先頭に追加**（上が最新）。

| tag | 用途 | 色 |
|---|---|---|
| EVENT | イベント告知 | 赤 |
| INFO | 一般お知らせ | グレー |
| ENTRY | バンド募集 | 緑 |
| MEDIA | 動画公開 | 紫 |

RIOTアカウントからのローカルpushテスト
