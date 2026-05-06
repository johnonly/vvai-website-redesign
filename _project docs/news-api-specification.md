# News API Integration Specification

**Document Version:** 1.0  
**Last Updated:** May 5, 2026  
**Purpose:** Technical specification for integrating VVAI website news page with internal operating platform CMS

---

## Table of Contents

1. [Overview](#overview)
2. [Data Schema](#data-schema)
3. [API Endpoints](#api-endpoints)
4. [Authentication](#authentication)
5. [Request Format](#request-format)
6. [Response Format](#response-format)
7. [Query Parameters](#query-parameters)
8. [Field Mappings](#field-mappings)
9. [Caching Strategy](#caching-strategy)
10. [Error Handling](#error-handling)
11. [Integration Examples](#integration-examples)
12. [Testing](#testing)

---

## Overview

The VVAI website displays news, product updates, company announcements, and security bulletins on the `/about/news` page. This document specifies how the frontend fetches news data from the internal operating platform's CMS API.

**Current Implementation:**
- News data is stored statically in `messages/en.json`, `messages/zh.json`, `messages/zh-tw.json`
- Posts are hardcoded and require manual updates

**Target Implementation:**
- News data fetched dynamically from internal CMS API
- Support for multi-language content
- Real-time updates without code deployments
- SEO-friendly with ISR (Incremental Static Regeneration)

**Data Flow:**
```
Internal CMS Platform → API Gateway → Next.js API Route → News Page Component
                                     ↓
                              Cache Layer (Redis/Vercel)
```

---

## Data Schema

### News Post Object

| Field Name | Type | Required | Max Length | Description |
|------------|------|----------|------------|-------------|
| `id` | string (UUID) | Yes | 36 | Unique post identifier |
| `slug` | string | Yes | 100 | URL-friendly identifier (e.g., `engine-2-0-launch`) |
| `title` | string | Yes | 200 | Post headline |
| `excerpt` | string | Yes | 500 | Short summary/preview text |
| `content` | string (Markdown/HTML) | No | 50000 | Full article content |
| `category` | enum | Yes | - | Post category type |
| `publishedAt` | ISO 8601 timestamp | Yes | - | Publication date/time (UTC) |
| `updatedAt` | ISO 8601 timestamp | Yes | - | Last modification date/time (UTC) |
| `author` | Author object | No | - | Post author details |
| `featuredImage` | Image object | No | - | Hero image/thumbnail |
| `tags` | string[] | No | - | Associated tags/keywords |
| `locale` | string | Yes | 10 | Content language (e.g., `en`, `zh`, `zh-tw`) |
| `status` | enum | Yes | - | Publication status |
| `readTime` | number | No | - | Estimated reading time in minutes |
| `seo` | SEO object | No | - | SEO metadata overrides |

### Category Enum

```typescript
type NewsCategory = 
  | 'product'       // Product launches, updates, features
  | 'company'       // Company announcements, milestones
  | 'security'      // Security updates, compliance, certifications
  | 'partnerships'  // Partner announcements, integrations
```

### Status Enum

```typescript
type PostStatus = 
  | 'draft'      // Not visible to public
  | 'published'  // Live and visible
  | 'scheduled'  // Scheduled for future publication
  | 'archived'   // No longer displayed but accessible via direct link
```

### Author Object

```typescript
interface Author {
  id: string                // Author ID in CMS
  name: string              // Display name (e.g., "V V AI Team")
  title?: string            // Job title (e.g., "Product Manager")
  avatar?: string           // Avatar image URL
  bio?: string              // Short bio
}
```

### Image Object

```typescript
interface Image {
  url: string               // Full image URL (CDN)
  alt: string               // Alt text for accessibility
  width: number             // Image width in pixels
  height: number            // Image height in pixels
  thumbnail?: string        // Thumbnail/optimized version URL
  blurhash?: string         // Blurhash for progressive loading
}
```

### SEO Object

```typescript
interface SEO {
  metaTitle?: string        // Custom meta title (defaults to post title)
  metaDescription?: string  // Custom meta description (defaults to excerpt)
  ogImage?: string          // Custom Open Graph image URL
  keywords?: string[]       // SEO keywords
  noIndex?: boolean         // Exclude from search engines
}
```

---

## API Endpoints

### 1. Get All News Posts (List)

**Endpoint:** `GET /api/v1/news/posts`  
**Purpose:** Fetch paginated list of published news posts

**Frontend Usage:** News listing page (`/about/news`)

**Request:**
```http
GET /api/v1/news/posts?locale=en&limit=10&offset=0&category=product HTTP/1.1
Host: internal-cms.vvai.com
Authorization: Bearer {access_token}
```

**Response:** See [Response Format](#response-format) below

---

### 2. Get Featured Posts

**Endpoint:** `GET /api/v1/news/posts/featured`  
**Purpose:** Fetch posts marked as featured for homepage/news page hero

**Request:**
```http
GET /api/v1/news/posts/featured?locale=en&limit=1 HTTP/1.1
Host: internal-cms.vvai.com
Authorization: Bearer {access_token}
```

---

### 3. Get Single Post

**Endpoint:** `GET /api/v1/news/posts/{slug}`  
**Purpose:** Fetch full content of a specific post by slug

**Frontend Usage:** Individual article page (`/about/news/{slug}`)

**Request:**
```http
GET /api/v1/news/posts/engine-2-0-launch?locale=en HTTP/1.1
Host: internal-cms.vvai.com
Authorization: Bearer {access_token}
```

---

### 4. Get Posts by Category

**Endpoint:** `GET /api/v1/news/posts?category={category}`  
**Purpose:** Filter posts by specific category

**Request:**
```http
GET /api/v1/news/posts?category=security&locale=en HTTP/1.1
Host: internal-cms.vvai.com
Authorization: Bearer {access_token}
```

---

### 5. Search Posts

**Endpoint:** `GET /api/v1/news/search`  
**Purpose:** Full-text search across posts

**Request:**
```http
GET /api/v1/news/search?q=AI+engine&locale=en HTTP/1.1
Host: internal-cms.vvai.com
Authorization: Bearer {access_token}
```

---

## Authentication

### Option 1: API Key (Recommended for Server-to-Server)

Include API key in request headers:

```http
GET /api/v1/news/posts HTTP/1.1
Host: internal-cms.vvai.com
X-API-Key: your_internal_api_key
```

**Implementation:**
- Store API key in environment variable: `INTERNAL_CMS_API_KEY`
- Call from Next.js server-side only (API routes or `getServerSideProps`)

### Option 2: OAuth 2.0 Client Credentials

For enterprise-grade security:

```http
GET /api/v1/news/posts HTTP/1.1
Host: internal-cms.vvai.com
Authorization: Bearer {access_token}
```

**Token Endpoint:**
```http
POST /oauth/token HTTP/1.1
Host: internal-cms.vvai.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
client_id={client_id}&
client_secret={client_secret}&
scope=news:read
```

---

## Request Format

### Query Parameters (All Endpoints)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `locale` | string | Yes | `en` | Content language (`en`, `zh`, `zh-tw`) |
| `limit` | number | No | `10` | Number of results per page (max: 100) |
| `offset` | number | No | `0` | Pagination offset |
| `category` | enum | No | - | Filter by category |
| `status` | enum | No | `published` | Filter by status (CMS only) |
| `featured` | boolean | No | - | Only featured posts |
| `sort` | string | No | `-publishedAt` | Sort field (`-publishedAt`, `title`, etc.) |
| `q` | string | No | - | Search query (for `/search` endpoint) |

### Example Requests

**Get latest 6 posts in English:**
```
GET /api/v1/news/posts?locale=en&limit=6&sort=-publishedAt
```

**Get all security posts in Chinese:**
```
GET /api/v1/news/posts?locale=zh&category=security&limit=20
```

**Get featured post:**
```
GET /api/v1/news/posts/featured?locale=en&limit=1
```

**Search for "AI engine":**
```
GET /api/v1/news/search?q=AI+engine&locale=en
```

---

## Response Format

### Success Response (List)

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "slug": "engine-2-0-launch",
        "title": "V V AI Engine 2.0: Multi-Modal Intelligence is Here",
        "excerpt": "Our next-generation AI foundation now understands text, voice, and images simultaneously — powering smarter work agents and personal assistants.",
        "category": "product",
        "publishedAt": "2026-03-28T08:00:00.000Z",
        "updatedAt": "2026-03-28T08:00:00.000Z",
        "author": {
          "id": "author-001",
          "name": "V V AI Product Team",
          "avatar": "https://cdn.vvai.com/authors/product-team.jpg"
        },
        "featuredImage": {
          "url": "https://cdn.vvai.com/news/engine-2-0-hero.jpg",
          "alt": "V V AI Engine 2.0 Architecture Diagram",
          "width": 1200,
          "height": 630,
          "thumbnail": "https://cdn.vvai.com/news/engine-2-0-hero-thumb.jpg",
          "blurhash": "LGF5?xYk^6#M@-5c,1J5@[or[Q6."
        },
        "tags": ["AI Engine", "Multi-Modal", "Machine Learning"],
        "locale": "en",
        "status": "published",
        "readTime": 4,
        "seo": {
          "metaTitle": "Announcing V V AI Engine 2.0 — Multi-Modal AI",
          "metaDescription": "Our next-generation AI foundation brings multi-modal intelligence to enterprises and consumers worldwide.",
          "keywords": ["AI", "Machine Learning", "Multi-Modal AI"]
        }
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "slug": "education-partners-apac",
        "title": "V V AI Reaches 100+ Education Partners Across APAC",
        "excerpt": "From Singapore to the Philippines, our education suite now powers home-school collaboration for over 100 institutions and thousands of families.",
        "category": "partnerships",
        "publishedAt": "2026-03-15T09:00:00.000Z",
        "updatedAt": "2026-03-15T09:00:00.000Z",
        "author": {
          "id": "author-002",
          "name": "V V AI Partnerships Team"
        },
        "featuredImage": null,
        "tags": ["Education", "Partnerships", "APAC"],
        "locale": "en",
        "status": "published",
        "readTime": 3,
        "seo": null
      }
    ],
    "pagination": {
      "total": 24,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  },
  "meta": {
    "timestamp": "2026-05-05T14:30:00.000Z",
    "version": "1.0"
  }
}
```

### Success Response (Single Post)

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "post": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "slug": "engine-2-0-launch",
      "title": "V V AI Engine 2.0: Multi-Modal Intelligence is Here",
      "excerpt": "Our next-generation AI foundation now understands text, voice, and images simultaneously...",
      "content": "# V V AI Engine 2.0: The Future of Multi-Modal AI\n\nToday marks a significant milestone...\n\n## Key Features\n\n- **Multi-Modal Understanding**: Process text, voice, and images simultaneously\n- **Real-Time Inference**: Sub-100ms response times\n- **Enterprise Scale**: Handles millions of concurrent requests\n\n[Full article content in Markdown or HTML]",
      "category": "product",
      "publishedAt": "2026-03-28T08:00:00.000Z",
      "updatedAt": "2026-03-28T08:00:00.000Z",
      "author": {
        "id": "author-001",
        "name": "V V AI Product Team",
        "title": "Product Management",
        "avatar": "https://cdn.vvai.com/authors/product-team.jpg",
        "bio": "Building the future of AI-powered productivity tools."
      },
      "featuredImage": {
        "url": "https://cdn.vvai.com/news/engine-2-0-hero.jpg",
        "alt": "V V AI Engine 2.0 Architecture",
        "width": 1200,
        "height": 630,
        "thumbnail": "https://cdn.vvai.com/news/engine-2-0-hero-thumb.jpg",
        "blurhash": "LGF5?xYk^6#M@-5c,1J5@[or[Q6."
      },
      "tags": ["AI Engine", "Multi-Modal", "Machine Learning", "Product Launch"],
      "locale": "en",
      "status": "published",
      "readTime": 4,
      "seo": {
        "metaTitle": "Announcing V V AI Engine 2.0 — Multi-Modal AI",
        "metaDescription": "Our next-generation AI foundation brings multi-modal intelligence to enterprises worldwide.",
        "ogImage": "https://cdn.vvai.com/news/engine-2-0-og.jpg",
        "keywords": ["AI", "Machine Learning", "Multi-Modal AI", "Enterprise AI"]
      }
    },
    "related": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "slug": "health-suite-launch",
        "title": "Introducing Health Suite: Your AI-Powered Health Manager",
        "excerpt": "V V Health brings intelligent health tracking...",
        "category": "product",
        "publishedAt": "2026-02-05T10:00:00.000Z"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-05-05T14:30:00.000Z",
    "version": "1.0"
  }
}
```

### Error Responses

#### Not Found

**Status:** `404 Not Found`

```json
{
  "success": false,
  "error": {
    "code": "POST_NOT_FOUND",
    "message": "Post with slug 'invalid-slug' not found.",
    "details": {
      "slug": "invalid-slug",
      "locale": "en"
    }
  }
}
```

#### Validation Error

**Status:** `400 Bad Request`

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Invalid query parameters.",
    "details": {
      "errors": [
        {
          "field": "limit",
          "message": "Limit must be between 1 and 100."
        }
      ]
    }
  }
}
```

#### Unauthorized

**Status:** `401 Unauthorized`

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key."
  }
}
```

#### Rate Limit Exceeded

**Status:** `429 Too Many Requests`

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 60 seconds.",
    "retryAfter": 60
  }
}
```

---

## Query Parameters

### Sorting

Use `sort` parameter with field name. Prefix with `-` for descending order:

```
?sort=-publishedAt          # Latest first (default)
?sort=publishedAt           # Oldest first
?sort=title                 # Alphabetical
?sort=-updatedAt            # Recently updated
```

### Filtering

Combine multiple filters:

```
?category=product&locale=en&featured=true
```

### Pagination

Standard offset-based pagination:

```
?limit=10&offset=0    # First page (posts 1-10)
?limit=10&offset=10   # Second page (posts 11-20)
?limit=10&offset=20   # Third page (posts 21-30)
```

---

## Field Mappings

### Current Static Data → API Response Mapping

Map existing hardcoded news data to API response fields:

| Current Field (JSON) | API Field | Transformation |
|---------------------|-----------|----------------|
| `title` | `title` | Direct mapping |
| `excerpt` | `excerpt` | Direct mapping |
| `categoryKey` | `category` | Direct mapping |
| `date` | `publishedAt` | Parse to ISO 8601 timestamp |
| `readTime` | `readTime` | Extract number from "X min read" |
| - | `id` | New: UUID from CMS |
| - | `slug` | New: Generate from title |
| - | `content` | New: Full article content |
| - | `author` | New: Author metadata |
| - | `featuredImage` | New: Image object |

### Category Color Mapping (Frontend)

Maintain existing category colors in frontend:

```typescript
const CATEGORY_COLORS: Record<string, string> = {
  product: '#5590F6',      // Blue
  company: '#8B5CF6',      // Purple
  security: '#10B981',     // Green
  partnerships: '#22D3EE', // Cyan
}
```

---

## Caching Strategy

### 1. Server-Side Caching (Recommended)

Use Next.js ISR (Incremental Static Regeneration) with revalidation:

```typescript
// In /app/[locale]/about/news/page.tsx

export const revalidate = 300 // Revalidate every 5 minutes

async function getNewsData(locale: string) {
  const response = await fetch(
    `${process.env.INTERNAL_CMS_API_URL}/api/v1/news/posts?locale=${locale}&limit=10`,
    {
      headers: {
        'X-API-Key': process.env.INTERNAL_CMS_API_KEY!,
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    }
  )
  return response.json()
}
```

### 2. CDN Caching

Configure cache headers from your CMS API:

```http
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```

**Strategy:**
- Cache posts list for 5 minutes
- Serve stale content for up to 10 minutes while revalidating
- Purge cache on post publish/update via webhook

### 3. Redis/KV Cache (Optional)

For high-traffic scenarios:

```typescript
import { kv } from '@vercel/kv'

async function getCachedPosts(locale: string) {
  const cacheKey = `news:posts:${locale}`
  
  // Try cache first
  const cached = await kv.get(cacheKey)
  if (cached) return cached
  
  // Fetch from API
  const data = await fetchFromCMS(locale)
  
  // Cache for 5 minutes
  await kv.set(cacheKey, data, { ex: 300 })
  
  return data
}
```

### Cache Invalidation

Your CMS should trigger cache invalidation via webhook when:
- New post published
- Post updated
- Post deleted/archived

**Webhook Endpoint:** `POST /api/revalidate`

```typescript
// /api/revalidate/route.ts

export async function POST(request: Request) {
  const { slug, locale } = await request.json()
  
  // Verify webhook secret
  const secret = request.headers.get('x-webhook-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Revalidate news listing page
  await revalidatePath(`/${locale}/about/news`)
  
  // Revalidate specific post page if slug provided
  if (slug) {
    await revalidatePath(`/${locale}/about/news/${slug}`)
  }
  
  return Response.json({ revalidated: true })
}
```

---

## Error Handling

### Frontend Error Handling

```typescript
// In Next.js component

async function fetchNews(locale: string) {
  try {
    const response = await fetch(`/api/news?locale=${locale}`)
    
    if (!response.ok) {
      const error = await response.json()
      
      // Log error for monitoring
      console.error('[News API Error]', error)
      
      // Handle specific error codes
      if (error.code === 'POST_NOT_FOUND') {
        notFound() // Next.js 404 page
      }
      
      throw new Error(error.message)
    }
    
    return await response.json()
  } catch (error) {
    console.error('[News Fetch Failed]', error)
    
    // Fallback to static data or show error message
    return getFallbackNews(locale)
  }
}

// Fallback to static JSON data
function getFallbackNews(locale: string) {
  // Import from messages files as backup
  const messages = require(`@/messages/${locale}.json`)
  return messages.news.posts
}
```

### Graceful Degradation

If CMS API is unavailable:

1. **Serve cached version** (stale data is better than no data)
2. **Fallback to static JSON** from messages files
3. **Display error banner** to admins only
4. **Log errors** to monitoring service

```typescript
async function getNewsWithFallback(locale: string) {
  try {
    return await fetchFromCMS(locale)
  } catch (error) {
    console.error('[CMS Unavailable] Falling back to static data')
    
    // Import static fallback
    const { news } = await import(`@/messages/${locale}.json`)
    return news.posts
  }
}
```

---

## Integration Examples

### Example 1: Fetch News for Listing Page

```typescript
// /app/[locale]/about/news/page.tsx

import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 300 // 5 minutes

async function getNews(locale: string) {
  const response = await fetch(
    `${process.env.INTERNAL_CMS_API_URL}/api/v1/news/posts?locale=${locale}&limit=10&sort=-publishedAt`,
    {
      headers: {
        'X-API-Key': process.env.INTERNAL_CMS_API_KEY!,
      },
      next: { revalidate: 300 },
    }
  )
  
  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`)
  }
  
  const { data } = await response.json()
  return data.posts
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations('news')
  
  // Fetch news from CMS
  const posts = await getNews(locale)
  
  // Split into featured and rest
  const featured = posts[0]
  const rest = posts.slice(1)
  
  return (
    <>
      {/* Render featured post */}
      <FeaturedPost post={featured} />
      
      {/* Render grid of remaining posts */}
      <PostGrid posts={rest} />
    </>
  )
}
```

### Example 2: Fetch Single Post

```typescript
// /app/[locale]/about/news/[slug]/page.tsx

import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export const revalidate = 600 // 10 minutes for individual posts

async function getPost(locale: string, slug: string) {
  const response = await fetch(
    `${process.env.INTERNAL_CMS_API_URL}/api/v1/news/posts/${slug}?locale=${locale}`,
    {
      headers: {
        'X-API-Key': process.env.INTERNAL_CMS_API_KEY!,
      },
      next: { revalidate: 600 },
    }
  )
  
  if (response.status === 404) {
    return null
  }
  
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`)
  }
  
  const { data } = await response.json()
  return data.post
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
  
  if (!post) return {}
  
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [post.seo?.ogImage || post.featuredImage?.url],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author?.name],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article>
      {/* Render full post content */}
      <h1>{post.title}</h1>
      <time dateTime={post.publishedAt}>
        {new Date(post.publishedAt).toLocaleDateString(locale)}
      </time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const locales = ['en', 'zh', 'zh-tw']
  const paths = []
  
  for (const locale of locales) {
    const response = await fetch(
      `${process.env.INTERNAL_CMS_API_URL}/api/v1/news/posts?locale=${locale}&limit=100`,
      {
        headers: { 'X-API-Key': process.env.INTERNAL_CMS_API_KEY! },
      }
    )
    const { data } = await response.json()
    
    for (const post of data.posts) {
      paths.push({ locale, slug: post.slug })
    }
  }
  
  return paths
}
```

### Example 3: API Route Proxy (Alternative)

Create a Next.js API route to proxy CMS requests:

```typescript
// /app/api/news/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale') || 'en'
  const category = searchParams.get('category')
  const limit = searchParams.get('limit') || '10'
  
  // Build CMS API URL
  const cmsUrl = new URL(`${process.env.INTERNAL_CMS_API_URL}/api/v1/news/posts`)
  cmsUrl.searchParams.set('locale', locale)
  cmsUrl.searchParams.set('limit', limit)
  if (category) cmsUrl.searchParams.set('category', category)
  
  try {
    const response = await fetch(cmsUrl.toString(), {
      headers: {
        'X-API-Key': process.env.INTERNAL_CMS_API_KEY!,
      },
      next: { revalidate: 300 },
    })
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch news' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('[News API Error]', error)
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

Then use from client components:

```typescript
// Client component
'use client'

import { useEffect, useState } from 'react'

export function NewsList({ locale }: { locale: string }) {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    fetch(`/api/news?locale=${locale}`)
      .then(res => res.json())
      .then(data => setPosts(data.data.posts))
  }, [locale])
  
  return <div>{/* Render posts */}</div>
}
```

---

## Testing

### Test Cases

#### 1. Fetch All Posts

**Request:**
```bash
curl -X GET "https://internal-cms.vvai.com/api/v1/news/posts?locale=en&limit=10" \
  -H "X-API-Key: your_api_key"
```

**Expected:** `200 OK` with array of 10 posts

#### 2. Fetch Single Post by Slug

**Request:**
```bash
curl -X GET "https://internal-cms.vvai.com/api/v1/news/posts/engine-2-0-launch?locale=en" \
  -H "X-API-Key: your_api_key"
```

**Expected:** `200 OK` with full post content

#### 3. Invalid Slug

**Request:**
```bash
curl -X GET "https://internal-cms.vvai.com/api/v1/news/posts/invalid-slug?locale=en" \
  -H "X-API-Key: your_api_key"
```

**Expected:** `404 Not Found`

#### 4. Filter by Category

**Request:**
```bash
curl -X GET "https://internal-cms.vvai.com/api/v1/news/posts?category=security&locale=en" \
  -H "X-API-Key: your_api_key"
```

**Expected:** `200 OK` with only security posts

#### 5. Multi-Language Support

**Request:**
```bash
curl -X GET "https://internal-cms.vvai.com/api/v1/news/posts?locale=zh&limit=5" \
  -H "X-API-Key: your_api_key"
```

**Expected:** `200 OK` with posts in Simplified Chinese

#### 6. Pagination

**Request:**
```bash
curl -X GET "https://internal-cms.vvai.com/api/v1/news/posts?locale=en&limit=5&offset=5" \
  -H "X-API-Key: your_api_key"
```

**Expected:** `200 OK` with posts 6-10

### Environment Variables Required

```env
# CMS API Configuration
INTERNAL_CMS_API_URL=https://internal-cms.vvai.com
INTERNAL_CMS_API_KEY=your_secure_internal_api_key

# Alternative: OAuth Credentials
INTERNAL_CMS_CLIENT_ID=your_client_id
INTERNAL_CMS_CLIENT_SECRET=your_client_secret
INTERNAL_CMS_TOKEN_URL=https://internal-cms.vvai.com/oauth/token

# Cache Revalidation
REVALIDATE_SECRET=your_revalidate_webhook_secret

# Optional: CDN for Images
CDN_BASE_URL=https://cdn.vvai.com
```

### Postman Collection

Create a collection with these requests:

1. **Get All Posts** - `GET /api/v1/news/posts`
2. **Get Featured Posts** - `GET /api/v1/news/posts/featured`
3. **Get Single Post** - `GET /api/v1/news/posts/{slug}`
4. **Filter by Category** - `GET /api/v1/news/posts?category=product`
5. **Search Posts** - `GET /api/v1/news/search?q=AI`
6. **Pagination Test** - `GET /api/v1/news/posts?limit=5&offset=10`

---

## Migration Checklist

### Phase 1: CMS API Development (Backend Team)

- [ ] Implement `/api/v1/news/posts` endpoint
- [ ] Implement `/api/v1/news/posts/{slug}` endpoint
- [ ] Add multi-language support (en, zh, zh-tw)
- [ ] Add category filtering
- [ ] Add pagination
- [ ] Add search functionality
- [ ] Configure CDN for images
- [ ] Set up cache headers
- [ ] Implement authentication (API key or OAuth)
- [ ] Add rate limiting
- [ ] Create revalidation webhook

### Phase 2: Frontend Integration (Frontend Team)

- [ ] Create Next.js API proxy route `/api/news`
- [ ] Update news listing page to fetch from CMS API
- [ ] Implement ISR with 5-minute revalidation
- [ ] Add fallback to static JSON data
- [ ] Create individual post pages (`/about/news/[slug]`)
- [ ] Add error handling and loading states
- [ ] Implement cache invalidation via webhook
- [ ] Update sitemap to include dynamic posts
- [ ] Add structured data (JSON-LD) for SEO
- [ ] Test all locales (en, zh, zh-tw)

### Phase 3: Content Migration (Content Team)

- [ ] Import existing posts to CMS
- [ ] Add featured images for all posts
- [ ] Write full article content (currently only excerpts)
- [ ] Assign authors to posts
- [ ] Configure SEO metadata
- [ ] Set publication dates
- [ ] Test preview/draft functionality

### Phase 4: Testing & Launch

- [ ] End-to-end testing
- [ ] Performance testing (load times, caching)
- [ ] SEO validation (meta tags, structured data)
- [ ] Multi-language content verification
- [ ] Fallback mechanism testing
- [ ] Cache invalidation testing
- [ ] Monitoring and alerting setup
- [ ] Documentation for content editors

---

## Appendix: TypeScript Interfaces

```typescript
// types/news.ts

export interface NewsPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  category: NewsCategory
  publishedAt: string
  updatedAt: string
  author?: Author
  featuredImage?: Image
  tags?: string[]
  locale: string
  status: PostStatus
  readTime?: number
  seo?: SEO
}

export type NewsCategory = 'product' | 'company' | 'security' | 'partnerships'

export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived'

export interface Author {
  id: string
  name: string
  title?: string
  avatar?: string
  bio?: string
}

export interface Image {
  url: string
  alt: string
  width: number
  height: number
  thumbnail?: string
  blurhash?: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  keywords?: string[]
  noIndex?: boolean
}

export interface NewsAPIResponse {
  success: boolean
  data: {
    posts: NewsPost[]
    pagination: {
      total: number
      limit: number
      offset: number
      hasMore: boolean
    }
  }
  meta: {
    timestamp: string
    version: string
  }
}

export interface SinglePostResponse {
  success: boolean
  data: {
    post: NewsPost
    related?: NewsPost[]
  }
  meta: {
    timestamp: string
    version: string
  }
}
```

---

## Support & Questions

**For Implementation Questions:**

1. **Backend/CMS Team:** Implement API endpoints per this specification
2. **Frontend Team:** Integrate API calls with Next.js ISR and caching
3. **Content Team:** Migrate existing posts and create new content in CMS

**Document Maintainer:** Engineering Team  
**Last Review:** May 5, 2026  
**Next Review:** Quarterly or upon CMS platform updates
