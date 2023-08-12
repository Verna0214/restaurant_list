VV Restaurant List
===
*建立個人美食清單，分享好友同樂聚餐*

## Screenshots
- Index
![index.png](https://i.postimg.cc/7ZjVMCMt/2023-08-12-3-01-11.png)

- Detail
![detail.png](https://i.postimg.cc/MKPtH3cS/2023-08-12-3-01-35.png)

- Create
![create.png](https://i.postimg.cc/bYFqT8WS/2023-08-12-3-01-53.pngg)

- Edit
![edit.png](https://i.postimg.cc/kGDqmh65/2023-08-12-3-02-14.png)

## Prerequisites
- express @4.18.2
- express-handlebars @3.0.0
- font-awesome @4.7.0
- method-override @3.0.0
- mongoose @7.4.2
- dotenv @16.3.1

## Installation
1. 下載本專案
```
git clone
```
2. 進入專案資料夾
```
cd restaurant_list
```
3. 專案初始化
```
npm init -y
```
4. 下載相關套件
```
npm i (related modules)
```
5. 設定環境變數
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.sgwv8lr.mongodb.net/restaurant_list?retryWrites=true&w=majority
```
6. 下載種子資料
```
npm run seed
```
7. 啟動伺服器
```
npm run dev
```

## Features
- 使用者可以在首頁瀏覽全部的餐廳資料。
- 使用者可以點選 Detail 查看任一筆餐廳的詳細內容。
- 使用者可以點選 Create 新增任一筆餐廳的詳細內容。
- 使用者可以點選 Edit 編輯任一筆餐廳的詳細內容。
- 使用者可以點選 Delete 刪除任一筆餐廳的資料。
- 使用者進入任一筆餐廳的詳細內容可以點選地址顯示 Google Map。

## Development Environment
- Visual Studio Code @1.81.0

## Author
**Verna Chen**