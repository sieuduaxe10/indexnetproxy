# n8n + AI Blog Auto-Publishing Workflow

## 1. Setup n8n

### Option A: Docker (self-hosted)
```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```
Truy cập: http://localhost:5678

### Option B: n8n Cloud
Đăng ký tại https://n8n.io/cloud (có free tier)

---

## 2. Sanity API Token

1. Vào https://www.sanity.io/manage → chọn project
2. Settings → API → Tokens → Add API token
3. Đặt tên: `n8n-writer`, quyền: **Editor**
4. Copy token, lưu vào n8n Credentials (loại: Header Auth)

---

## 3. Workflow Design

```
[Schedule Trigger]
    ↓
[AI — Generate bài viết tiếng Việt]
    ↓
[Code — Convert Markdown → Portable Text]
    ↓
[HTTP Request — Create post trên Sanity]
    ↓
[HTTP Request — Trigger revalidation]
```

---

## 4. Chi tiết từng Node

### 4.1 Schedule Trigger
- Trigger type: Cron
- Ví dụ: Mỗi ngày lúc 9:00 sáng

### 4.2 AI Content Generation (HTTP Request)

**Claude API:**
```
URL: https://api.anthropic.com/v1/messages
Method: POST
Headers:
  x-api-key: <your-claude-api-key>
  anthropic-version: 2023-06-01
  Content-Type: application/json

Body:
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 4096,
  "messages": [{
    "role": "user",
    "content": "Viết một bài blog tiếng Việt về [chủ đề proxy/VPN/bảo mật]. Trả về JSON với format:\n{\"title\": \"...\", \"slug\": \"...\", \"excerpt\": \"...\", \"body\": \"nội dung markdown\", \"categories\": [\"proxy\"], \"metaTitle\": \"...\", \"metaDescription\": \"...\"}\n\nChỉ trả về JSON, không có text khác."
  }]
}
```

**Hoặc OpenAI:**
```
URL: https://api.openai.com/v1/chat/completions
Method: POST
Headers:
  Authorization: Bearer <your-openai-key>
  Content-Type: application/json

Body:
{
  "model": "gpt-4o",
  "messages": [{
    "role": "user",
    "content": "... (cùng prompt như trên)"
  }],
  "response_format": { "type": "json_object" }
}
```

### 4.3 Code Node — Markdown → Portable Text

```javascript
// Chuyển Markdown text thành Portable Text blocks đơn giản
const aiResponse = JSON.parse($input.first().json.content[0].text);
const markdown = aiResponse.body;

const blocks = markdown.split('\n\n').filter(Boolean).map((block, i) => {
  // Heading
  if (block.startsWith('### ')) {
    return {
      _type: 'block',
      _key: `block_${i}`,
      style: 'h3',
      children: [{ _type: 'span', _key: `span_${i}`, text: block.replace('### ', '') }],
    };
  }
  if (block.startsWith('## ')) {
    return {
      _type: 'block',
      _key: `block_${i}`,
      style: 'h2',
      children: [{ _type: 'span', _key: `span_${i}`, text: block.replace('## ', '') }],
    };
  }
  // Bullet list
  if (block.startsWith('- ')) {
    return block.split('\n').filter(l => l.startsWith('- ')).map((line, j) => ({
      _type: 'block',
      _key: `block_${i}_${j}`,
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      children: [{ _type: 'span', _key: `span_${i}_${j}`, text: line.replace('- ', '') }],
    }));
  }
  // Normal paragraph
  return {
    _type: 'block',
    _key: `block_${i}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `span_${i}`, text: block }],
  };
}).flat();

return {
  title: aiResponse.title,
  slug: aiResponse.slug,
  excerpt: aiResponse.excerpt,
  body: blocks,
  categories: aiResponse.categories,
  metaTitle: aiResponse.metaTitle,
  metaDescription: aiResponse.metaDescription,
};
```

### 4.4 HTTP Request — Create Post trên Sanity

```
URL: https://<projectId>.api.sanity.io/v2026-04-01/data/mutate/production
Method: POST
Headers:
  Authorization: Bearer <sanity-write-token>
  Content-Type: application/json

Body:
{
  "mutations": [{
    "create": {
      "_type": "post",
      "title": "{{ $json.title }}",
      "slug": {
        "_type": "slug",
        "current": "{{ $json.slug }}"
      },
      "excerpt": "{{ $json.excerpt }}",
      "body": {{ $json.body }},
      "publishedAt": "{{ $now.toISO() }}",
      "seo": {
        "metaTitle": "{{ $json.metaTitle }}",
        "metaDescription": "{{ $json.metaDescription }}"
      }
    }
  }]
}
```

**Lưu ý:** Vì KHÔNG có prefix `drafts.` trong `_id`, bài sẽ auto-publish ngay.

### 4.5 HTTP Request — Trigger Revalidation

```
URL: https://netproxy.io/api/revalidate
Method: POST
Headers:
  x-revalidation-secret: <your-revalidation-secret>
  Content-Type: application/json

Body:
{
  "_type": "post"
}
```

---

## 5. Liên kết Categories

Để gắn category cho bài viết, bạn cần tạo categories trước trên Sanity, rồi lấy `_id` của chúng.

Trong n8n, thêm vào mutation body:
```json
"categories": [
  { "_type": "reference", "_ref": "<category-document-id>" }
]
```

Bạn có thể query categories bằng GROQ:
```
https://<projectId>.api.sanity.io/v2026-04-01/data/query/production?query=*[_type=="category"]
```

---

## 6. Sanity Webhook (auto-revalidation)

Ngoài n8n trigger, cấu hình webhook trên Sanity để tự động revalidate khi ai đó sửa bài qua Studio:

1. Vào https://www.sanity.io/manage → project → API → Webhooks
2. Create webhook:
   - Name: `Revalidate Blog`
   - URL: `https://netproxy.io/api/revalidate`
   - Trigger on: Create, Update, Delete
   - Filter: `_type in ["post", "category"]`
   - Headers: `x-revalidation-secret: <secret>`
   - Projection: `{ _type, slug }`
