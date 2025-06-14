# Trade Diary - 投資ブログシステム

投資経験を記録し、学びを共有する投資ブログシステム

## プロジェクト構成

```
trade-diary/
├── frontend/          # メインブログサイト (Next.js)
├── admin/            # 管理画面 (Next.js)
├── backend/          # バックエンドAPI (予定)
└── docker-compose.yml
```

## ローカル開発環境

### Docker Composeでの起動

```bash
# 全サービスを起動
docker compose up

# 個別サービスの起動
docker compose up frontend  # メインサイト (http://localhost:3000)
docker compose up admin     # 管理画面 (http://localhost:3001)
```

### 各フォルダでの個別起動

```bash
# フロントエンド
cd frontend && npm run dev

# 管理画面
cd admin && npm run dev
```

## デプロイ

### Cloud Run (管理画面)

```bash
cd admin
gcloud builds submit --config cloudbuild.yaml
```

## アクセス先

- **メインサイト**: http://localhost:3000
- **管理画面**: http://localhost:3001

## 技術スタック

- Frontend: Next.js 15, React 19, Material-UI, TailwindCSS
- Admin: Next.js 15, React 19, Material-UI, TailwindCSS
- Container: Docker, Docker Compose
- Cloud: Google Cloud Run