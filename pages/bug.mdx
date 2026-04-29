# HLIELLama Bug 反馈记录

## 环境信息

| 项目 | 详情 |
|------|------|
| 设备 | Moore Threads M1000 MQ50 Board |
| NPU | HoumoNPU LQ50，24 GB |
| OS | Ubuntu，Linux 6.6.10，aarch64 |
| HLIELLama 版本 | llama.cpp=2.0.0，lanyue2.0 |
| llama-server build | 5950 (49a8c87b6)，GNU 9.4.0，Linux aarch64 |
| HouMo SDK 版本 | HMSW V1.0.0 |

---

## Bug 1：qwen3_nonthinking.jinja 导致答案路由到错误字段

### 模型

```
HiModel_xh2_qwen3_30b_a3b_256_32k_b1_1chip_2cores_v1.0.0_20260205.gguf
```

### 复现步骤

1. 使用以下命令启动 llama-server：

```bash
cd ~/houmo-HLIELLama-xh2 && ./bin/llama-server \
  -m models/HiModel_xh2_qwen3_30b_a3b_256_32k_b1_1chip_2cores_v1.0.0_20260205.gguf \
  --port 17701 \
  --host 127.0.0.1 \
  -ngl 999 \
  -c 8192 \
  -t 8 \
  --temp 0.7 \
  --top-p 0.95 \
  --repeat-penalty 1.15 \
  --repeat-last-n 256 \
  --chat-template-file bin/qwen3_nonthinking.jinja
```

2. 发送测试请求：

```bash
curl http://127.0.0.1:17701/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"1+1等于几"}],"max_tokens":200}' \
  | python3 -m json.tool | grep -E '"content"|"reasoning_content"'
```

### 预期结果

```json
"content": "1 + 1 等于 2。",
"reasoning_content": ""
```

✅ 答案在 `content` 字段  
✅ `reasoning_content` 为空

### 实际结果

```json
"content": "",
"reasoning_content": "1 + 1 等于 **2**。这是最基本的加法运算之一..."
```

❌ `content` 为空  
❌ 答案错误路由到 `reasoning_content` 字段

![Bug 1 实际结果截图](/images/1.png)

### 尝试过的修复方式

| 方式 | 命令 | 结果 |
|------|------|------|
| 加 `--reasoning-format deepseek` | `--reasoning-format deepseek` | ❌ 无效，问题依旧 |
| 去掉 `--reasoning-format` | 不加该参数 | ❌ 无效，问题依旧 |
| 加 `--reasoning-format none` | `--reasoning-format none` | 待验证 |

### 影响范围

- **WebUI 聊天**：答案显示在折叠的 "Reasoning..." 栏内，主对话框为空，用户体验差
- **API 调用**：需额外处理，读取逻辑需改为：
  ```python
  answer = msg.content or msg.reasoning_content
  ```

### 备注

- 思考模式本身已成功关闭（答案直接输出，无推理链，token 数少）
- 问题仅为字段路由错误，答案内容本身正确
- 该行为与 `qwen3_nonthinking.jinja` 模板和 HouMo llama.cpp 版本相关

---

## Bug 2：Qwen3.5-35B-A3B 思维链无限循环

### 模型

```
HiModel_xh2_qwen3.5_35b-a3b_256_64k_b1_1chip_2cores_v1.2.0_20260401.gguf
```

### 复现步骤

1. 启动服务（开启思考模式，默认参数）：

```bash
cd ~/houmo-HLIELLama-xh2 && ./bin/llama-server \
  -m models/himodel_qwen3.5_35b_gguf/HiModel_xh2_qwen3.5_35b-a3b_256_64k_b1_1chip_2cores_v1.2.0_20260401.gguf \
  --port 17701 \
  --host 127.0.0.1 \
  -ngl 999 \
  -c 64000 \
  -t 8 \
  --temp 0.6 \
  --top-p 0.95 \
  --reasoning-format deepseek
```

2. 在 WebUI 提问任意问题

### 预期结果

模型正常思考后输出答案，thinking 阶段合理结束。

### 实际结果

模型进入无限思维链循环，反复输出以下内容直到撑满上下文为止：

```
Wait, I need to make sure I don't sound like I'm making excuses.
"可能是技术限制。"
Okay.
Wait, I need to make sure I don't sound like I'm lying.
"我确实有...但..."
Okay.
（无限重复...）
```

### 性能数据（本次循环记录）

| 指标 | 数值 |
|------|------|
| 预填充速度 | 599 tokens/s |
| 解码速度 | 22.85 t/s |
| 总生成 tokens | 63,506 |
| 上下文占用 | 63,924 / 64,000（99.88%） |
| 总耗时 | 约 46 分钟 |
| 结束原因 | 上下文撑满被强制截断 |

### 尝试过的修复方式

| 方式 | 结果 |
|------|------|
| `--reasoning-budget 0` | ❌ 该版本不支持非 -1/0 以外的值，0 可用但无限循环仍发生 |
| `--reasoning-budget 0` + `--repeat-penalty 1.15` | ❌ 仍然循环 |
| 使用 `qwen3_nonthinking.jinja` 模板 | 待进一步验证 |

### 影响范围

- 模型无法正常使用，每次对话均陷入循环
- 占用全部 64K 上下文，需手动中断进程

### 备注

- Qwen3-30B-A3B（v1.0.0）无此问题，表现稳定
- 该问题可能与 Qwen3.5 模型和当前 HLIELLama 版本的兼容性有关
- 建议日常使用 Qwen3-30B-A3B 替代

---

## 总结建议

| 模型 | 推荐使用方式 | 稳定性 |
|------|------------|--------|
| Qwen3-30B-A3B | 关闭思考模式 + nonthinking.jinja | ✅ 稳定 |
| Qwen3.5-35B-A3B | 暂不推荐（无限循环未解决） | ⚠️ 不稳定 |
