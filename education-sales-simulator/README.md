# Education Sales Simulator (教育顧問銷售模擬器)

這是一個互動式模擬器，用於訓練教育顧問掌握一套經過驗證的銷售流程，從建立關係到完成交易。

## 本地端運行 (Local Development)

本專案是一個純前端應用，沒有複雜的後端或建置流程。您只需要一個簡單的本地網頁伺服器即可運行。

1.  將所有專案檔案下載到您的電腦上。
2.  在專案的根目錄下，啟動一個本地伺服器。如果您安裝了 Python，可以使用以下指令：
    ```bash
    # For Python 3
    python -m http.server
    ```
    如果您有 Node.js 和 `serve` 套件，可以使用：
    ```bash
    npx serve
    ```
3.  在瀏覽器中開啟伺服器提供的網址 (通常是 `http://localhost:8000` 或 `http://localhost:3000`)。

## 部署到 GitHub Pages (Deploy to GitHub Pages)

您可以輕鬆地將此應用程式免費部署到 GitHub Pages。

1.  **在 GitHub 建立一個新的倉庫 (Repository)。**

2.  **將您所有的專案檔案推送到這個倉庫。**
    包含 `index.html`, `index.tsx`, `App.tsx`, `components/` 資料夾等等。

3.  **啟用 GitHub Pages 功能。**
    - 進入您剛剛建立的 GitHub 倉庫頁面，點擊上方的 "Settings" 標籤。
    - 在左側選單中，點擊 "Pages"。
    - 在 "Build and deployment" 這個區塊下，將 "Source" 設定為 "Deploy from a branch"。
    - 在下方的 "Branch" 設定中，選擇您推送程式碼的分支（通常是 `main`），並將資料夾設定為 `/(root)`。
    - 點擊 "Save"。

4.  **等待部署完成。**
    GitHub 需要幾分鐘的時間來部署您的網站。完成後，您會在同一個頁面上方看到您的網站網址，格式通常是 `https://<您的使用者名稱>.github.io/<您的倉庫名稱>/`。

這樣就完成了！您的銷售模擬器現在已經上線。