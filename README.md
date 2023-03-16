> OpenAI 已经开始大规模对未绑卡的，和邮箱状态异常的账号进行封号（基本全是是从网上买的号，我使用自己的账号配合云函数使用了很长时间目前没有问题），所以如果你的账号并不是从官方渠道注册的，请暂时不要使用本项目和任何公共代理服务，包括选择云函数美国地区，Cloudflare Worker， Azure 等。
> 
> 如果大家需要使用代理，请选择一台美国地区，IP固定的的服务器按照下方的【自托管】部分自行搭建。

***

# 猴子也能学会的华为云函数搭建 OpenAI 国内代理教程

> 优势：免费！函数前100万次/月调用免费！比 Cloudflare Worker 简单，支持香港等多地区可选，部署简单，一行代码都不用写，注册就能用，猴子也能学会！
> 
> 劣势：不支持 SSE，用户体验欠佳，但完全能用！

PS：本教程不仅仅针对云函数，你也可以托管在自己的服务器上，或者 Azure 等平台，只要能运行 Node.js 程序即可，参加下方[【自托管】](#自托管)部分。

注意：本教程只是教你搭建一个 OpenAI 的代理，需要配合其他类似软件使用，直接访问会出现 404 的错误。

本文档可能有所不足，各位大佬欢迎补充。

## 你需要准备什么：

- 一台电脑
- 一个手机号
- 一个脑子

## 教程开始

在 [https://www.huaweicloud.com/](https://www.huaweicloud.com/) 注册账号

进入云函数控制台：[https://console.huaweicloud.com/functiongraph](https://console.huaweicloud.com/functiongraph)

依次点击【函数】->【函数列表】->【创建函数】->【创建空白函数】，然后按照以下配置，**没写出来的就不用管，使用默认设置**

- 函数类型：HTTP函数
- 地域：亚太-新加坡（也可以是中国之外的任何国家）
- 函数名称：openai-proxy（也可以随便取个名字）
- 运行环境：Nodejs 16.13（或者更高的版本）
- 代码源：本地上传zip包（[点我下载 ZIP 包](https://github.com/zhangwenkang0/openai-proxy/releases/download/v1.0.0/openai-proxy.zip)）
- 修改app.js代码: 将其中"YOUR OpenAI Key"替换为你自己openAI key

- 设置配置:
    常规设置：
     - 执行超时时间：900 秒
- 并发: 单实例并发数: 2
- 日志配置 -> 日志投递：启用（每月免费500M，需要先创建日志组和日志流[云日志](https://console.huaweicloud.com/lts/)）
- 触发器（这里可能要创建一个新的触发器）：
    - 触发器类型: API网关服务(APIG)
    - 分组: 这里可能要创建新的分组，有个按钮【创建分组】，创建完后倒回到刷新就能看到
    - 安全验证: None
    - 后端超时时间: 600000
    
创建完后，可以看调用URL，可以尝试用post调用了
Eg: https://你的调用URL/v1/chat/completions

PS: 触发器的URL没有配置独立域名每月调用1000次，需要绑定域名才能取消限制。在[API网关](https://console.huaweicloud.com/apig)的【API管理】进行配置

## 自托管

- 自托管运行
```
npm install
npm run start
```

## 鸣谢
fork自： https://github.com/Ice-Hazymoon/openai-scf-proxy
做了代码修改以适配华为云
