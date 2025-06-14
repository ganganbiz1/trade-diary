# Trade Diary Admin

投資ブログの記事管理システム

## 機能

- ダッシュボード - 投資統計とクイックアクション
- 記事一覧 - 記事の一覧表示、編集、削除
- 記事作成 - 新規記事の作成
- 記事編集 - 既存記事の編集
- 記事詳細 - 記事の詳細表示

## 開発環境セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3001](http://localhost:3001) を開いて管理画面にアクセスしてください。

## 技術スタック

- Next.js 15.3.3
- React 19
- TypeScript
- Material-UI
- Tailwind CSS

## ディレクトリ構造

```
admin/
├── src/
│   ├── app/              # App Router
│   │   ├── layout.tsx    # ルートレイアウト
│   │   ├── page.tsx      # ダッシュボード
│   │   └── articles/     # 記事関連ページ
│   ├── components/       # 共通コンポーネント
│   └── types/           # 型定義
├── package.json
└── README.md
```

## 今後の拡張予定

- バックエンドAPIとの連携
- 認証機能
- 画像アップロード機能
- リッチテキストエディタの導入
- 記事のプレビュー機能 